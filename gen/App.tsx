import React, { useState } from 'react';
import InputSection from './components/InputSection';
import DetailCanvas from './components/DetailCanvas';
import { ProductInfo, GeneratedAssets, GenerationStatus } from './types';
import { generateJewelryAssets } from './services/doubaoService';
import { Download, AlertCircle, Key } from 'lucide-react';

const App: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [assets, setAssets] = useState<GeneratedAssets | null>(null);
  const [status, setStatus] = useState<GenerationStatus>({ isGenerating: false, step: '', progress: 0 });
  const [error, setError] = useState<string | null>(null);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleGenerate = async (info: ProductInfo) => {
    setProduct(info);
    setIsGenerating(true);
    setError(null);
    setAssets(null); // Reset previous result

    // 设置API Key到环境变量
    if (apiKey) {
      (window as any).process = {
        ...((window as any).process || {}),
        env: {
          ...((window as any).process?.env || {}),
          ARK_API_KEY: apiKey
        }
      };
    }

    try {
      const result = await generateJewelryAssets(info, (step, progress) => {
        setStatus({ isGenerating: true, step, progress });
      });
      setAssets(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "生成失败，请检查API Key或重试。");
    } finally {
      setIsGenerating(false);
      setStatus({ isGenerating: false, step: '', progress: 0 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">JewelryGenius</span>
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded">豆包版</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-sm"
            >
              <Key className="w-4 h-4" />
              API Key
            </button>
            {assets && (
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
              >
                <Download className="w-4 h-4" />
                打印/保存 PDF
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Key Input */}
        {showApiKeyInput && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">豆包API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="请输入您的豆包API Key"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
            />
            <p className="mt-2 text-sm text-gray-500">
              您的API Key仅在本次会话中使用，不会被存储到任何地方。
            </p>
          </div>
        )}

        {/* Input Area */}
        <InputSection onGenerate={handleGenerate} isGenerating={isGenerating} />

        {/* Error Display */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Progress Bar */}
        {isGenerating && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{status.step}</span>
              <span>{status.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-red-500 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${status.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Result Preview */}
        {product && assets && (
          <div className="mt-12">
            <div className="flex justify-center mb-6">
              <h3 className="text-lg font-medium text-gray-500">预览效果 (790px 宽)</h3>
            </div>
            {/* The Canvas itself */}
            <DetailCanvas product={product} assets={assets} />
          </div>
        )}
      </main>

      {/* Footer / Instructions */}
      {!assets && !isGenerating && (
        <div className="text-center text-gray-400 mt-12">
          <p>请上传白底图并填写信息以开始生成。</p>
          <p className="text-sm mt-2">支持生成：场景图、模特佩戴图、细节图及营销文案</p>
        </div>
      )}
    </div>
  );
};

export default App;