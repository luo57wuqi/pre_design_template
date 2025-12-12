# 使用官方Node.js运行时作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装项目依赖
RUN npm ci --only=production

# 复制项目文件
COPY . .

# 构建生产版本
RUN npm run build

# 安装serve来运行静态文件
RUN npm install -g serve

# 暴露端口
EXPOSE 80

# 启动命令
CMD ["serve", "-s", "dist", "-l", "80"]