import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { GeneratedAssets, ProductInfo } from "../types";

// Helper to convert blob to base64
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix for API calls if needed, but Gemini SDK often handles it or needs raw base64. 
      // For @google/genai, we usually need the raw base64 data part.
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const generateJewelryAssets = async (
  product: ProductInfo,
  onProgress: (msg: string, progress: number) => void
): Promise<GeneratedAssets> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // 1. Generate Text Copy
  onProgress("正在生成文案...", 10);
  const textAssets = await generateCopy(ai, product.title);

  // 2. Generate Background Texture
  onProgress("正在生成风格底纹...", 20);
  const backgroundTexture = await generateImage(ai, product, 
    `Texture background pattern, ${product.stylePrompt} style, subtle, elegant, low contrast, suitable for overlaying text.`,
    "1:1" // Texture can be tiled or stretched
  );

  // 3. Generate Hero Image (Section 1)
  onProgress("正在生成主场景图...", 30);
  const heroImage = await generateImage(ai, product,
    `Jewelry product photography, ${product.title}, ${product.stylePrompt}, clean composition, max 3 background elements, product 40% of frame, high angle or front view, professional lighting.`,
    "9:16" // Cropped later, but generating vertical helps
  );

  // 4. Generate Model Inspiration (Section 2)
  onProgress("正在生成灵感模特图...", 45);
  const modelInspirationImage = await generateImage(ai, product,
    `Fashion model wearing the jewelry, ${product.stylePrompt} style, close up on face and jewelry, artistic, high fashion, clean background.`,
    "1:1"
  );

  // 5. Generate Wide Scene (Section 3)
  onProgress("正在生成广角场景图...", 55);
  const sceneWideImage = await generateImage(ai, product,
    `Wide angle product shot of jewelry, ${product.stylePrompt}, clean minimal scene, 45 degree side lighting, strong shadows, 3d render style, product 70% of frame.`,
    "9:16"
  );

  // 6. Generate Model Wear (Section 4)
  onProgress("正在生成佩戴展示图...", 70);
  const modelWearImage = await generateImage(ai, product,
    `Model wearing jewelry, focus on the body part (neck/hand/ear) depending on item, ${product.stylePrompt}, clean skin texture, realistic, elegant, product 70% of frame.`,
    "3:4"
  );

  // 7. Generate Details (Section 5)
  onProgress("正在生成细节图...", 80);
  const [detailImage1, detailImage2] = await Promise.all([
    generateImage(ai, product, `Extreme close up macro shot of jewelry details, ${product.stylePrompt}, sparkling, high quality texture.`, "9:16"),
    generateImage(ai, product, `Artistic angle of jewelry, ${product.stylePrompt}, bokeh background, highlighting craftsmanship.`, "9:16")
  ]);

  // 8. Generate Multi Angle (Section 6)
  onProgress("正在生成多角度展示...", 90);
  const multiAngleImage = await generateImage(ai, product,
    `Jewelry product collage style or floating composition, ${product.stylePrompt}, slight shadow, white or light neutral background.`,
    "9:16"
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
};

// Helper for Text Generation
async function generateCopy(ai: GoogleGenAI, title: string): Promise<{ subtitle: string, inspirationText: string[] }> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Generate marketing copy for a jewelry product titled "${title}". 
    Output JSON with:
    1. "subtitle": exactly 8 Chinese characters summarizing the product elegance.
    2. "inspirationText": Array of 4 strings. Each string must be Chinese, poetic, describing design inspiration, under 15 characters each.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          subtitle: { type: Type.STRING },
          inspirationText: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Failed to generate text");
  
  return JSON.parse(text);
}

// Helper for Image Generation (Using Image Editing/Generation model)
async function generateImage(ai: GoogleGenAI, product: ProductInfo, prompt: string, aspectRatio: string): Promise<string> {
  // We use gemini-2.5-flash-image for speed and editing capabilities.
  // We pass the product image as a reference to control the generation (Image-to-Image / ControlNet style logic implicit in Gemini).
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: prompt + " The output must be high quality, photorealistic, commercial photography."
        },
        {
          inlineData: {
            mimeType: product.imageMimeType,
            data: product.imageBase64
          }
        }
      ]
    }
  });

  // Extract the image from the response
  // Note: Gemini 2.5 Flash Image returns inlineData in parts
  const parts = response.candidates?.[0]?.content?.parts;
  if (parts) {
    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return part.inlineData.data;
      }
    }
  }

  // Fallback: If no image returned, it might have returned text explaining why (e.g. safety).
  // For the sake of this demo, we'll throw.
  console.error("No image generated", response.text);
  throw new Error("Image generation failed. Please try a different style prompt.");
}
