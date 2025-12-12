@echo off
title AI 珠宝详情页生成器部署脚本

echo 🚀 AI 珠宝详情页生成器部署脚本
echo ================================

REM 检查Node.js是否安装
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)

REM 检查npm是否安装
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未检测到 npm，请先安装 Node.js 和 npm
    pause
    exit /b 1
)

FOR /F "tokens=*" %%i IN ('node --version') DO SET NODE_VERSION=%%i
FOR /F "tokens=*" %%i IN ('npm --version') DO SET NPM_VERSION=%%i

echo ✅ Node.js 版本: %NODE_VERSION%
echo ✅ npm 版本: %NPM_VERSION%

echo.
echo 请选择部署方式:
echo 1) 静态文件部署 (构建后手动上传到服务器/对象存储)
echo 2) 本地服务器部署 (使用serve启动本地HTTP服务器)
echo 3) 构建项目 (仅构建，不启动服务器)
echo.

set /p choice=请输入选项 (1-3): 

if "%choice%"=="1" (
    echo 📦 开始构建项目...
    npm run build
    
    if %errorlevel% equ 0 (
        echo ✅ 构建完成！
        echo 📁 构建文件位于 dist/ 目录中
        echo 📋 您可以将 dist/ 目录中的所有文件上传到:
        echo    - 静态网站托管服务 (如 Vercel, Netlify, GitHub Pages)
        echo    - 云服务商的对象存储 (如 阿里云OSS, 腾讯云COS, AWS S3)
        echo    - 任何支持静态文件托管的服务器
    ) else (
        echo ❌ 构建失败，请检查错误信息
        pause
        exit /b 1
    )
) else if "%choice%"=="2" (
    echo 🔄 安装依赖...
    npm install
    
    if %errorlevel% neq 0 (
        echo ❌ 依赖安装失败
        pause
        exit /b 1
    )
    
    echo 📦 构建并启动服务器...
    npm run serve
    
    if %errorlevel% equ 0 (
        echo ✅ 服务器已启动！
        echo 🌐 访问地址: http://localhost:3000
    ) else (
        echo ❌ 启动失败，请检查错误信息
        pause
        exit /b 1
    )
) else if "%choice%"=="3" (
    echo 📦 仅构建项目...
    npm run build
    
    if %errorlevel% equ 0 (
        echo ✅ 构建完成！
        echo 📁 构建文件位于 dist/ 目录中
    ) else (
        echo ❌ 构建失败，请检查错误信息
        pause
        exit /b 1
    )
) else (
    echo ❌ 无效选项
    pause
    exit /b 1
)

pause