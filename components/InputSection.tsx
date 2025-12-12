import React, { useState } from 'react';
import { Upload, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ProductInfo } from '../types';
import { blobToBase64 } from '../services/doubaoService';

interface InputSectionProps {
  onGenerate: (data: ProductInfo) => void;
  isGenerating: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ onGenerate, isGenerating }) => {
  const [title, setTitle] = useState('');
  const [stylePrompt, setStylePrompt] = useState('极简现代, 高级灰调, 优雅');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const base64 = await blobToBase64(selectedFile);
      setPreview(`data:${selectedFile.type};base64,${base64}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    const base64Raw = preview?.split(',')[1];
    
    if (base64Raw) {
      onGenerate({
        title,
        stylePrompt,
        imageBase64: base64Raw,
        imageMimeType: file.type
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-red-500" />
        AI 详情页生成器 (豆包版)
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">产品白底图</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              {preview ? (
                <img src={preview} alt="Preview" className="h-full object-contain p-2" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">点击上传</span></p>
                  <p className="text-xs text-gray-500">JPG, PNG (MAX. 3MB)</p>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">产品标题</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例如：足金和田玉吊坠 祥云如意金镶玉"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
            required
          />
        </div>

        {/* Style Prompt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">风格提示词</label>
          <textarea
            value={stylePrompt}
            onChange={(e) => setStylePrompt(e.target.value)}
            placeholder="描述想要的氛围，例如：中国风，复古，清新，高级感..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition h-24 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating || !file || !title}
          className={`w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2
            ${isGenerating || !file || !title 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transform hover:-translate-y-0.5'}`}
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              生成中...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              生成详情页
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InputSection;