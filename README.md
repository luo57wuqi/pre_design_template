<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1XCeThxP1wyutx5tYzBxFxw4o3TIQjjaB

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `ARK_API_KEY` in [.env.local](.env.local) to your Doubao API key
3. Run the app:
   `npm run dev`

## 使用豆包API

本项目已支持使用豆包(Doubao)的大模型服务替代Google Gemini。您可以通过以下方式切换:

1. 获取豆包API Key:
   - 访问[豆包平台](https://www.doubao.com/)注册账号
   - 在控制台创建应用并获取API Key

2. 配置API Key:
   - 方法一：在项目根目录创建`.env.local`文件，添加`ARK_API_KEY=your_api_key_here`
   - 方法二：在应用界面中直接输入API Key（仅在当前会话有效）

3. 模型Endpoint:
   - 文本生成模型: `doubao-seed-1-6-251015`
   - 图像生成模型: `doubao-seedream-4-5-251128`
   - 如需使用自定义模型，可在[doubaoService.ts](services/doubaoService.ts)中修改对应模型名称

4. 图像尺寸要求:
   - 豆包图像生成API要求图像尺寸至少为3686400像素（约2K分辨率）
   - 项目已自动适配此要求，默认使用2K尺寸生成图像

5. CORS问题解决:
   - 项目通过设置`response_format`为`b64_json`直接获取base64编码的图像数据，避免了CORS跨域问题
   - 不再需要从第三方URL下载图像，提高稳定性和安全性

## 生产环境部署

本项目现已配置支持Tailwind CSS在生产环境中的正确使用：

1. 项目不再使用CDN方式引入Tailwind CSS
2. 添加了本地Tailwind CSS构建配置
3. 可通过`npm run build`命令构建生产环境版本

构建后的文件位于`dist`目录中，可直接部署到生产服务器。