import { GeneratedAssets, ProductInfo } from "../types";

// 将base64字符串转换为Blob对象
function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: mimeType });
}

// 将Blob对象转换为File对象
function blobToFile(blob: Blob, filename: string): File {
  return new File([blob], filename, { type: blob.type });
}

// 辅助函数：将Blob转换为base64
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// 豆包API的文本生成函数
async function generateCopyWithDoubao(apiKey: string, title: string): Promise<{ subtitle: string, inspirationText: string[] }> {
  const url = "https://ark.cn-beijing.volces.com/api/v3/responses";
  
  const payload = {
    model: "doubao-seed-1-6-251015", // 使用实际的文本模型
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `为珠宝产品"${title}"生成营销文案。严格按照以下JSON格式输出，不要添加任何额外解释或文本：

{
  "subtitle": "[这里填入恰好8个中文字符的产品优雅总结]",
  "inspirationText": [
    "[第一句富有诗意的灵感文案，不超过15个字符]",
    "[第二句富有诗意的灵感文案，不超过15个字符]",
    "[第三句富有诗意的灵感文案，不超过15个字符]",
    "[第四句富有诗意的灵感文案，不超过15个字符]"
  ]
}

重要规则：
1. subtitle字段必须恰好是8个中文字符
2. inspirationText数组必须包含4个字符串元素
3. 每个灵感文案字符串不得超过15个字符
4. 所有内容必须是中文
5. 不要包含任何Markdown标记或额外说明
6. 直接输出JSON，不要添加任何前缀或后缀`
          }
        ]
      }
    ]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`文本生成失败: ${response.status}`);
  }

  const data = await response.json();
  // 解析返回的文本内容并提取JSON部分
  const content = data.choices?.[0]?.message?.content || '{}';
  
  try {
    // 如果返回的是带代码块的JSON，则去除代码块标记
    let jsonString = content.trim();
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.substring(7, jsonString.length - 3);
    } else if (jsonString.startsWith('```')) {
      jsonString = jsonString.substring(3, jsonString.length - 3);
    }
    
    // 确保我们只解析纯JSON
    const parsed = JSON.parse(jsonString);
    
    // 验证并确保格式正确
    if (!parsed.subtitle || typeof parsed.subtitle !== 'string') {
      throw new Error('缺少或无效的subtitle字段');
    }
    
    if (!Array.isArray(parsed.inspirationText) || parsed.inspirationText.length !== 4) {
      throw new Error('inspirationText必须是包含4个元素的数组');
    }
    
    // 验证每个灵感文案长度
    for (let i = 0; i < parsed.inspirationText.length; i++) {
      if (typeof parsed.inspirationText[i] !== 'string') {
        throw new Error(`inspirationText[${i}]必须是字符串`);
      }
    }
    
    return parsed;
  } catch (e) {
    console.error('解析JSON失败:', content);
    // 返回默认值以防解析失败
    return {
      subtitle: '璀璨臻品至美之选',
      inspirationText: [
        '匠心独运耀目光华',
        '典雅设计传世之美',
        '璀璨宝石恒久闪耀',
        '珍贵材质雕琢非凡'
      ]
    };
  }
}

// 豆包API的图像生成函数
async function generateImageWithDoubao(
  apiKey: string, 
  product: ProductInfo, 
  prompt: string
): Promise<string> {
  const url = "https://ark.cn-beijing.volces.com/api/v3/images/generations";
  
  // 创建一个临时的图片URL（在实际应用中可能需要上传到可访问的位置）
  // 这里我们使用base64数据URL作为image参数
  const imageUrl = `data:${product.imageMimeType};base64,${product.imageBase64}`;
  
  const payload = {
    model: "doubao-seedream-4-5-251128", // 使用实际的图像生成模型
    prompt: prompt,
    image: imageUrl,
    sequential_image_generation: "disabled",
    response_format: "b64_json", // 更改响应格式为base64，避免CORS问题
    size: "2K",
    stream: false,
    watermark: false
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`图像生成失败: ${response.status}, ${errorText}`);
  }

  const data = await response.json();
  // 直接从响应中获取base64编码的图像数据
  const base64ImageData = data.data?.[0]?.b64_json;
  
  if (!base64ImageData) {
    throw new Error("未返回有效的图像数据");
  }

  // 直接返回base64数据，避免CORS问题
  return base64ImageData;
}

// 根据风格选择生成对应的提示词
function getInspirationPrompt(product: ProductInfo): string {
  switch (product.inspirationStyle) {
    case 'manga':
      return `基于"${product.title}"珠宝的设计元素，创建一幅漫画风格插图。
              采用行星海城动漫的视觉美学，日系动漫风格，梦幻色彩，精致线条艺术，
              将珠宝元素融入富有想象力的场景中，艺术插画风格，高分辨率细节，
              ${product.stylePrompt}，聚焦关键设计元素，富有创意和艺术感。`;
    
    case 'paperCut':
      return `基于"${product.title}"珠宝的设计元素，创建一幅中国传统剪纸艺术风格插图。
              红色调为主，精细的剪纸镂空纹理，将珠宝形状转化为剪纸图案，
              融入中国传统纹样元素（如云纹、回纹、花卉等），
              平面化构图，对称美学，节日装饰艺术风格，
              ${product.stylePrompt}，体现传统文化与现代设计的结合。`;
              
    default: // traditional style
      return `佩戴珠宝的时尚模特，${product.stylePrompt}风格，聚焦面部和珠宝，艺术感，高雅时尚，背景简洁。`;
  }
}

// 主函数：生成珠宝资产
export const generateJewelryAssets = async (
  product: ProductInfo,
  onProgress: (msg: string, progress: number) => void
): Promise<GeneratedAssets> => {
  // 从全局作用域获取API Key
  const apiKey = (window as any).process?.env?.ARK_API_KEY || (window as any).process?.env?.VITE_ARK_API_KEY;
  if (!apiKey) {
    throw new Error("API Key缺失，请在.env.local文件中配置ARK_API_KEY");
  }

  try {
    // 1. 生成文案
    onProgress("正在生成文案...", 10);
    const textAssets = await generateCopyWithDoubao(apiKey, product.title);

    // 2. 生成背景纹理
    onProgress("正在生成风格底纹...", 20);
    const backgroundTexture = await generateImageWithDoubao(apiKey, product, 
      `纹理背景图案，${product.stylePrompt}风格，细腻优雅，低对比度，适合叠加文字，底纹和主题一致协调。`
    );

    // 3. 生成主图（第一部分）
    onProgress("正在生成主场景图...", 30);
    const heroImage = await generateImageWithDoubao(apiKey, product,
      `珠宝产品摄影，${product.title}，${product.stylePrompt}，构图简洁，最多3个背景元素，产品占画面40%，专业灯光,3:4。`
    );

    // 4. 生成灵感模特图（第二部分）
    onProgress("正在生成灵感模特图...", 45);
    const modelInspirationImage = await generateImageWithDoubao(apiKey, product,
      getInspirationPrompt(product)
    );

    // 5. 生成广角场景图（第三部分）
    onProgress("正在生成广角场景图...", 55);
    const sceneWideImage = await generateImageWithDoubao(apiKey, product,
      `珠宝的广角产品拍摄，${product.stylePrompt}，极简场景，45度侧光，强阴影，3D渲染风格，产品占画面70%。`
    );

    // 6. 生成佩戴展示图（第四部分）
    onProgress("正在生成佩戴展示图...", 70);
    const modelWearImage = await generateImageWithDoubao(apiKey, product,
      `模特佩戴珠宝，聚焦身体部位（颈部/手部/耳部），取决于物品类型，${product.stylePrompt}，肌肤质感干净，逼真优雅，产品占画面70%。`
    );

    // 7. 生成细节图（第五部分）
    onProgress("正在生成细节图...", 80);
    const [detailImage1, detailImage2] = await Promise.all([
      generateImageWithDoubao(apiKey, product, 
        `珠宝细节的极限微距拍摄，${product.stylePrompt}，闪闪发光，高质量纹理。不能改变产品的材质和光泽和结构和形状`),
      generateImageWithDoubao(apiKey, product, 
        `珠宝的艺术角度，${product.stylePrompt}，背景虚化，突出工艺品质。`)
    ]);

    // 8. 生成多角度展示图（第六部分）
    onProgress("正在生成多角度展示...", 90);
    const multiAngleImage = await generateImageWithDoubao(apiKey, product,
      `珠宝产品的拼贴风格或悬浮构图，${product.stylePrompt}，轻微阴影，白色或浅色中性背景。`
    );

    onProgress("组装完成", 100);

    return {
      ...textAssets,
      heroImage,
      modelInspirationImage,
      sceneWideImage,
      modelWearImage,
      detailImage1,
      detailImage2,
      multiAngleImage,
      backgroundTexture
    };
  } catch (error: any) {
    console.error("生成过程中出现错误:", error);
    throw new Error(`生成失败: ${error.message || "未知错误"}`);
  }
};