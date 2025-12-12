import React from 'react';
import { GeneratedAssets, ProductInfo } from '../types';

interface DetailCanvasProps {
  product: ProductInfo;
  assets: GeneratedAssets;
}

const DetailCanvas: React.FC<DetailCanvasProps> = ({ product, assets }) => {
  // Helper to get random border radius class
  const getRandomBorder = (index: number) => {
    return index % 2 === 0 ? 'rounded-full' : 'rounded-[40px]'; // Simple toggle between oval-ish and rect-ish
  };

  // Check if required data is available
  if (!product || !assets) {
    return <div>数据加载中...</div>;
  }

  const containerStyle = {
    width: '790px',
    margin: '0 auto',
    backgroundImage: assets.backgroundTexture ? `url(data:image/png;base64,${assets.backgroundTexture})` : 'none',
    backgroundSize: 'cover',
    fontFamily: '"SimSun", "Songti SC", serif', // Use Songti as requested
  };

  // Common colors
  const primaryRed = '#E02D2D';
  const subGray = '#666666';

  // Check if inspirationText exists and has content
  const inspirationText = assets.inspirationText && assets.inspirationText.length > 0 
    ? assets.inspirationText 
    : ['设计灵感内容加载中...', '设计灵感内容加载中...', '设计灵感内容加载中...', '设计灵感内容加载中...'];

  return (
    <div className="shadow-2xl overflow-hidden bg-white" style={containerStyle}>
      
      {/* ---------------- SECTION 1: Top Title Area (790x1400) ---------------- */}
      <div className="relative w-[790px] h-[1400px] flex flex-col justify-end items-center pb-[200px]">
        {/* Full bg image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
           <img 
            src={assets.heroImage ? `data:image/jpeg;base64,${assets.heroImage}` : ''}
            // className="w-full h-full auto-fill-stretch object-cover" 
            className="w-full h-full object-fill "
            // className="max-w-full max-h-full mx-auto my-auto object-contain" 
            alt="Hero"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center max-w-[600px] border border-white/50">
           <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-widest">{product.title || '产品标题'}</h1>
           <div 
            className="text-[28px] tracking-[0.2em]" 
            style={{ color: subGray }}
           >
             {assets.subtitle || '副标题'}
           </div>
        </div>
      </div>

      {/* ---------------- SECTION 2: Inspiration (790x1100) ---------------- */}
      <div className="relative w-[790px] h-[1100px] flex flex-col items-center pt-24">
        {/* Title Group */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] font-bold font-siyuan" style={{ color: primaryRed }}>灵感设计感</h2>
          <p className="text-[26px] font-bold mt-2 font-siyuan tracking-widest" style={{ color: primaryRed }}>INSPIRATION</p>
        </div>

        {/* Model Image */}
        <div className={`w-[400px] h-[400px] overflow-hidden mb-16 border-4 border-white shadow-xl ${getRandomBorder(0)}`}>
           <img 
             src={assets.modelInspirationImage ? `data:image/jpeg;base64,${assets.modelInspirationImage}` : ''}
             className="w-full h-full object-cover" 
             alt="Inspiration Model"
             onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
           />
        </div>

        {/* Text Paragraphs */}
        <div className="space-y-6 text-center">
          {inspirationText.map((text, idx) => (
            <p key={idx} className="text-2xl text-gray-800 tracking-wider leading-loose max-w-[600px] mx-auto">
              {text}
            </p>
          ))}
        </div>
      </div>

      {/* ---------------- SECTION 3: Product Scene (790x1400) ---------------- */}
      <div className="relative w-[790px] h-[1400px] flex items-center justify-center">
        {/* Wide Background Generated Scene */}
        <div className="absolute inset-0 z-0">
           <img 
             src={assets.sceneWideImage ? `data:image/jpeg;base64,${assets.sceneWideImage}` : ''}
             className="w-full h-full object-cover opacity-30 mix-blend-multiply" // Subtly blending scene
             alt="Background"
             onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
           />
        </div>

        {/* Product Focus */}
        <div className={`relative z-10 w-[70%] h-[70%] overflow-hidden bg-white shadow-2xl ${getRandomBorder(1)}`}>
           <img 
             src={assets.sceneWideImage ? `data:image/jpeg;base64,${assets.sceneWideImage}` : ''}
             className="w-full h-full object-cover" 
             style={{ transform: 'scale(1.1)' }} // Zoom in slightly
             alt="Scene Product"
             onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
           />
           {/* Simulate 45deg side light effect via CSS gradient overlay */}
           <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/30 pointer-events-none"></div>
        </div>
      </div>

      {/* ---------------- SECTION 4: Model Display (790x1400) ---------------- */}
      <div className="relative w-[790px] h-[1400px] flex flex-col items-center pt-20">
         <div className="text-center mb-12">
          <h2 className="text-[36px] font-bold font-siyuan text-gray-900">模特展示</h2>
          <p className="text-[26px] font-bold mt-2 font-siyuan tracking-widest" style={{ color: primaryRed }}>MODELS DISPLAY</p>
        </div>

        <div className="w-[70%] h-[1000px] relative shadow-xl bg-gray-50 overflow-hidden">
             <img 
             src={assets.modelWearImage ? `data:image/jpeg;base64,${assets.modelWearImage}` : ''}
             className="w-full h-full object-cover" 
             alt="Model Wear"
             onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
           />
        </div>
      </div>

      {/* ---------------- SECTION 5: Details (790x1400) ---------------- */}
      <div className="relative w-[790px] h-[1400px] flex flex-col items-center pt-16">
        <div className="text-center mb-16">
          <h2 className="text-[36px] font-bold font-siyuan text-gray-900">产品细节</h2>
          <p className="text-[26px] font-bold mt-2 font-siyuan tracking-widest" style={{ color: primaryRed }}>PRODUCT DETAILS</p>
        </div>

        <div className="w-full px-8 relative h-full">
            {/* Top Right Image */}
            <div className={`absolute top-0 right-10 w-[350px] h-[500px] overflow-hidden shadow-lg border-2 border-white ${getRandomBorder(2)}`}>
                <img 
                  src={assets.detailImage1 ? `data:image/jpeg;base64,${assets.detailImage1}` : ''} 
                  className="w-full h-full object-cover" 
                  alt="Detail 1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
            </div>
            
            {/* Top Left Text */}
            <div className="absolute top-20 left-10 w-[300px] text-right">
               <h3 className="text-3xl text-gray-800 leading-normal font-bold">精致细节</h3>
               <p className="text-xl text-gray-600 mt-4 leading-relaxed">展现亮丽质感<br/>不放过每个细节</p>
            </div>

            {/* Bottom Left Image */}
            <div className={`absolute top-[600px] left-10 w-[350px] h-[500px] overflow-hidden shadow-lg border-2 border-white ${getRandomBorder(3)}`}>
                <img 
                  src={assets.detailImage2 ? `data:image/jpeg;base64,${assets.detailImage2}` : ''} 
                  className="w-full h-full object-cover" 
                  alt="Detail 2"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
            </div>

             {/* Bottom Right Text */}
             <div className="absolute top-[700px] right-10 w-[300px] text-left">
               <h3 className="text-3xl text-gray-800 leading-normal font-bold">匠心工艺</h3>
               <p className="text-xl text-gray-600 mt-4 leading-relaxed">细致打造造型<br/>呈现动人光彩</p>
            </div>
        </div>
      </div>

      {/* ---------------- SECTION 6: Multi-Angle (790x1500) ---------------- */}
      <div className="relative w-[790px] h-[1500px] flex items-center justify-center bg-gray-50/50">
         <div className="relative w-[700px] h-[1300px]">
            {/* Shadow Element */}
            <div className="absolute top-[10px] left-[10px] w-full h-full bg-black/50 blur-sm rounded-lg"></div>
            {/* Main Image */}
            <div className="relative w-full h-full bg-white rounded-lg overflow-hidden border border-gray-200">
               <img 
                 src={assets.multiAngleImage ? `data:image/jpeg;base64,${assets.multiAngleImage}` : ''} 
                 className="w-full h-full object-cover" 
                 alt="Multi Angle"
                 onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
               />
            </div>
         </div>
      </div>

      {/* ---------------- SECTION 7: Parameters (790x1400) ---------------- */}
      <div className="relative w-[790px] h-[1400px] flex flex-col items-center pt-20 bg-white">
         <div className="text-center mb-12">
          <h2 className="text-[36px] font-bold font-siyuan text-gray-900">产品信息</h2>
          <p className="text-[26px] font-bold mt-2 font-siyuan tracking-widest" style={{ color: primaryRed }}>PRODUCT PARAMETERS</p>
        </div>

        {/* Center Product Image 30% */}
        <div className="w-[30%] aspect-square mb-12 relative flex items-center justify-center">
             <img 
               src={product.imageBase64 ? `data:${product.imageMimeType};base64,${product.imageBase64}` : ''} 
               className="w-full h-full object-contain" 
               alt="Original Product"
               onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
             />
        </div>

        {/* Text Info Area 30% */}
        <div className="w-[60%] space-y-8 text-2xl text-gray-700 bg-gray-50 p-10 rounded-xl border border-gray-100 shadow-inner">
             <div className="flex border-b border-gray-200 pb-4">
               <span className="font-bold w-32 text-gray-900">【品牌】</span>
               <span>中国黄金</span>
             </div>
             <div className="flex border-b border-gray-200 pb-4">
               <span className="font-bold w-32 text-gray-900">【材质】</span>
               <span>足金</span>
             </div>
             <div className="flex border-b border-gray-200 pb-4">
               <span className="font-bold w-32 text-gray-900">【品名】</span>
               <span className="flex-1 truncate">{product.title || '产品标题'}</span>
             </div>
             <div className="flex border-b border-gray-200 pb-4">
               <span className="font-bold w-32 text-gray-900">【克重】</span>
               <span>以实际下单为准</span>
             </div>
             <div className="flex">
               <span className="font-bold w-32 text-gray-900">【尺寸】</span>
               <span>以下单页面为准</span>
             </div>
        </div>

        <div className="mt-auto pb-20 text-gray-400 text-lg">
             页面展示仅供参考，具体以实物为准
        </div>
      </div>

    </div>
  );
};

export default DetailCanvas;