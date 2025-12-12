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
    fontFamily: '"SimSun", "Songti SC", "STSong", "华文宋体", "宋体", serif',
  };

  // Common colors
  const primaryRed = '#E02D2D';
  const subGray = '#666666';

  // Check if inspirationText exists and has content
  const inspirationText = assets.inspirationText && assets.inspirationText.length > 0 
    ? assets.inspirationText 
    : ['设计灵感内容加载中...', '设计灵感内容加载中...', '设计灵感内容加载中...', '设计灵感内容加载中...'];

  return (
    <div className="shadow-2xl overflow-hidden bg-white typography-mixed" style={containerStyle}>
      
      {/* ---------------- SECTION 1: Top Title Area (790x1400) ---------------- */}
      <div className="relative w-[790px] h-[1400px] flex flex-col justify-end items-center pb-[200px]">
        {/* Full bg image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
           <img 
            src={assets.heroImage ? `data:image/jpeg;base64,${assets.heroImage}` : ''}
            className="w-full h-full object-cover"
            alt="Hero"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg text-center max-w-[600px] border border-white/50">
           <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-widest leading-tight typography-heading chinese-text">{product.title || '产品标题'}</h1>
           <div 
            className="text-[32px] tracking-[0.4em] font-medium typography-body chinese-text" 
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
          <h2 className="text-[48px] font-bold typography-heading chinese-text" style={{ color: primaryRed }}>灵感设计感</h2>
          <p className="text-[32px] font-bold mt-3 tracking-widest typography-heading english-text" style={{ color: primaryRed }}>INSPIRATION</p>
        </div>

        {/* Model Image */}
        <div className={`w-[420px] h-[420px] overflow-hidden mb-16 border-4 border-white shadow-xl ${getRandomBorder(0)}`}>
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
        <div className="space-y-10 text-center px-10 max-w-[720px]">
          {inspirationText.map((text, idx) => (
            <p key={idx} className="text-2xl text-gray-800 tracking-wider leading-relaxed font-light typography-poetic chinese-text">
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
      <div className="relative w-[790px] h-[1400px] flex flex-col items-center pt-24">
         <div className="text-center mb-16">
          <h2 className="text-[48px] font-bold text-gray-900 typography-heading chinese-text">模特展示</h2>
          <p className="text-[32px] font-bold mt-3 tracking-widest typography-heading english-text" style={{ color: primaryRed }}>MODELS DISPLAY</p>
        </div>

        <div className="w-[75%] h-[1000px] relative shadow-xl bg-gray-50 overflow-hidden">
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
      <div className="relative w-[790px] h-[1400px] flex flex-col items-center pt-20">
        <div className="text-center mb-16">
          <h2 className="text-[48px] font-bold text-gray-900 typography-heading chinese-text">产品细节</h2>
          <p className="text-[32px] font-bold mt-3 tracking-widest typography-heading english-text" style={{ color: primaryRed }}>PRODUCT DETAILS</p>
        </div>

        <div className="w-full px-10 relative h-full">
            {/* Top Right Image */}
            <div className={`absolute top-0 right-12 w-[360px] h-[520px] overflow-hidden shadow-lg border-2 border-white ${getRandomBorder(2)}`}>
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
            <div className="absolute top-24 left-12 w-[320px] text-right">
               <h3 className="text-4xl text-gray-800 leading-normal font-bold tracking-wide typography-heading chinese-text">精致细节</h3>
               <p className="text-2xl text-gray-600 mt-6 leading-relaxed tracking-wider typography-body chinese-text">展现亮丽质感<br/>不放过每个细节</p>
            </div>

            {/* Bottom Left Image */}
            <div className={`absolute top-[620px] left-12 w-[360px] h-[520px] overflow-hidden shadow-lg border-2 border-white ${getRandomBorder(3)}`}>
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
             <div className="absolute top-[720px] right-12 w-[320px] text-left">
               <h3 className="text-4xl text-gray-800 leading-normal font-bold tracking-wide typography-heading chinese-text">匠心工艺</h3>
               <p className="text-2xl text-gray-600 mt-6 leading-relaxed tracking-wider typography-body chinese-text">细致打造造型<br/>呈现动人光彩</p>
            </div>
        </div>
      </div>

      {/* ---------------- SECTION 6: Multi-Angle (790x1500) ---------------- */}
      <div className="relative w-[790px] h-[1500px] flex items-center justify-center bg-gray-50/50">
         <div className="relative w-[720px] h-[1350px]">
            {/* Shadow Element */}
            <div className="absolute top-[12px] left-[12px] w-full h-full bg-black/50 blur-sm rounded-lg"></div>
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
      <div className="relative w-[790px] h-[1400px] flex flex-col items-center pt-24 bg-white">
         <div className="text-center mb-16">
          <h2 className="text-[48px] font-bold text-gray-900 typography-heading chinese-text">产品信息</h2>
          <p className="text-[32px] font-bold mt-3 tracking-widest typography-heading english-text" style={{ color: primaryRed }}>PRODUCT PARAMETERS</p>
        </div>

        {/* Center Product Image 30% */}
        <div className="w-[35%] aspect-square mb-16 relative flex items-center justify-center">
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
        <div className="w-[65%] space-y-10 text-2xl text-gray-700 bg-gray-50 p-12 rounded-xl border border-gray-100 shadow-inner">
             <div className="flex border-b border-gray-200 pb-6">
               <span className="font-bold w-36 text-gray-900 tracking-wider typography-emphasis chinese-text">【品牌】</span>
               <span className="tracking-wider typography-body chinese-text">中国黄金</span>
             </div>
             <div className="flex border-b border-gray-200 pb-6">
               <span className="font-bold w-36 text-gray-900 tracking-wider typography-emphasis chinese-text">【材质】</span>
               <span className="tracking-wider typography-body chinese-text">足金</span>
             </div>
             <div className="flex border-b border-gray-200 pb-6">
               <span className="font-bold w-36 text-gray-900 tracking-wider typography-emphasis chinese-text">【品名】</span>
               <span className="flex-1 truncate tracking-wider typography-body chinese-text">{product.title || '产品标题'}</span>
             </div>
             <div className="flex border-b border-gray-200 pb-6">
               <span className="font-bold w-36 text-gray-900 tracking-wider typography-emphasis chinese-text">【克重】</span>
               <span className="tracking-wider typography-body chinese-text">以实际下单为准</span>
             </div>
             <div className="flex">
               <span className="font-bold w-36 text-gray-900 tracking-wider typography-emphasis chinese-text">【尺寸】</span>
               <span className="tracking-wider typography-body chinese-text">以下单页面为准</span>
             </div>
        </div>

        <div className="mt-auto pb-24 text-gray-400 text-xl tracking-wider typography-body chinese-text">
             页面展示仅供参考，具体以实物为准
        </div>
      </div>

    </div>
  );
};

export default DetailCanvas;