<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI 珠宝详情页生成器

这是一个基于豆包AI API的珠宝详情页自动生成工具。只需提供产品图片和基本信息，即可一键生成精美的电商详情页。

## 功能特性

- 自动生成产品文案（副标题、设计灵感等）
- AI生成多种场景图片（主图、场景图、模特图等）
- 响应式设计，支持打印优化
- 多种设计风格可选（传统、漫画、剪纸艺术）
- 智能装饰元素，根据产品名称自动匹配主题

## 运行环境要求

- Node.js 16+ （推荐 LTS 版本）
- npm 或 yarn 包管理器

## 本地运行

### 安装步骤

1. 克隆或下载本仓库代码
2. 安装项目依赖:
   ```bash
   npm install
   ```
3. 配置API密钥:
   - 重命名 `.env.local.example` 为 `.env.local`
   - 在 `.env.local` 文件中配置您的豆包API Key
4. 启动开发服务器:
   ```bash
   npm run dev
   ```
5. 在浏览器中打开 http://localhost:5173 查看应用

## 使用豆包API

本项目使用豆包(Doubao)的大模型服务生成文案和图像。

### 获取API Key

1. 访问[豆包平台](https://www.doubao.com/)注册账号
2. 在控制台创建应用并获取API Key

### 配置API Key

有两种方式配置API Key:

1. **推荐方式** - 环境变量配置:
   - 复制 `.env.local.example` 文件并重命名为 `.env.local`
   - 在 `.env.local` 文件中填写您的 `ARK_API_KEY`

2. **界面配置**:
   - 在应用界面中直接输入API Key（仅在当前会话有效）

### 模型说明

- 文本生成模型: `doubao-seed-1-6-251015`
- 图像生成模型: `doubao-seedream-4-5-251128`

如需使用自定义模型，可在 [doubaoService.ts](services/doubaoService.ts) 中修改对应模型名称。

### 图像生成要求

- 豆包图像生成API要求图像尺寸至少为3686400像素（约2K分辨率）
- 项目已自动适配此要求，默认使用2K尺寸生成图像

### CORS问题解决

项目通过设置`response_format`为`b64_json`直接获取base64编码的图像数据，避免了CORS跨域问题，提高稳定性和安全性。

## 生产环境部署

### 构建项目

运行以下命令构建生产环境版本:

```bash
npm run build
```

构建后的文件位于 `dist` 目录中。

### 部署选项

您可以选择以下任意一种方式部署应用:

#### 1. 静态文件部署

将 `dist` 目录中的所有文件部署到任何支持静态文件托管的服务，例如:
- Vercel
- Netlify
- GitHub Pages
- 云服务商的对象存储服务（如阿里云OSS、腾讯云COS等）

#### 2. 服务器部署

##### 使用部署脚本（推荐）

项目提供了跨平台的部署脚本:

- Windows系统: 运行 `deploy.bat`
- macOS/Linux系统: 运行 `deploy.sh`

脚本会引导您完成部署过程，并提供以下选项:
1. 静态文件部署 (构建后手动上传到服务器/对象存储)
2. 本地服务器部署 (使用serve启动本地HTTP服务器)
3. 构建项目 (仅构建，不启动服务器)

##### 手动部署

1. 安装依赖:
   ```bash
   npm install
   ```

2. 构建项目:
   ```bash
   npm run build
   ```

3. 启动服务器:
   ```bash
   npm run serve
   ```

服务器将在 http://localhost:3000 启动。

#### 3. Docker 部署（推荐）

项目根目录包含 Dockerfile，可直接构建 Docker 镜像:

```bash
docker build -t jewelry-detail-generator .
docker run -p 8080:80 jewelry-detail-generator
```

然后访问 http://localhost:8080

### 环境变量配置（生产环境）

在生产环境中，您需要配置以下环境变量:

```
ARK_API_KEY=your_doubao_api_key_here
```

不同部署平台的环境变量配置方式不同，请参考对应平台的文档。

## 项目结构

```
├── components/          # React组件
├── services/            # API服务
├── src/                 # 样式文件
├── types.ts             # TypeScript类型定义
├── App.tsx              # 主应用组件
├── index.tsx            # 应用入口
└── ...
```

## 技术栈

- React 18+
- TypeScript
- Tailwind CSS
- Vite
- 豆包AI API

## 注意事项

1. 请妥善保管您的API Key，不要泄露给他人
2. 本项目仅供学习交流使用，请遵守相关法律法规
3. 生成的图像和文案版权归创作者所有
4. 如遇到任何问题，请提交Issue或联系开发者