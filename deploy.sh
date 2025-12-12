#!/bin/bash

# AI 珠宝详情页生成器部署脚本
# 支持多种部署方式

echo "🚀 AI 珠宝详情页生成器部署脚本"
echo "================================"

# 检查Node.js是否安装
if ! command -v node &> /dev/null
then
    echo "❌ 未检测到 Node.js，请先安装 Node.js"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null
then
    echo "❌ 未检测到 npm，请先安装 Node.js 和 npm"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo "✅ npm 版本: $(npm --version)"

# 显示菜单
echo ""
echo "请选择部署方式:"
echo "1) 静态文件部署 (构建后手动上传到服务器/对象存储)"
echo "2) 本地服务器部署 (使用serve启动本地HTTP服务器)"
echo "3) 构建项目 (仅构建，不启动服务器)"
echo ""

read -p "请输入选项 (1-3): " choice

case $choice in
  1)
    echo "📦 开始构建项目..."
    npm run build
    
    if [ $? -eq 0 ]; then
      echo "✅ 构建完成！"
      echo "📁 构建文件位于 dist/ 目录中"
      echo "📋 您可以将 dist/ 目录中的所有文件上传到:"
      echo "   - 静态网站托管服务 (如 Vercel, Netlify, GitHub Pages)"
      echo "   - 云服务商的对象存储 (如 阿里云OSS, 腾讯云COS, AWS S3)"
      echo "   - 任何支持静态文件托管的服务器"
    else
      echo "❌ 构建失败，请检查错误信息"
      exit 1
    fi
    ;;
    
  2)
    echo "🔄 安装依赖..."
    npm install
    
    if [ $? -ne 0 ]; then
      echo "❌ 依赖安装失败"
      exit 1
    fi
    
    echo "📦 构建并启动服务器..."
    npm run serve
    
    if [ $? -eq 0 ]; then
      echo "✅ 服务器已启动！"
      echo "🌐 访问地址: http://localhost:3000"
    else
      echo "❌ 启动失败，请检查错误信息"
      exit 1
    fi
    ;;
    
  3)
    echo "📦 仅构建项目..."
    npm run build
    
    if [ $? -eq 0 ]; then
      echo "✅ 构建完成！"
      echo "📁 构建文件位于 dist/ 目录中"
    else
      echo "❌ 构建失败，请检查错误信息"
      exit 1
    fi
    ;;
    
  *)
    echo "❌ 无效选项"
    exit 1
    ;;
esac