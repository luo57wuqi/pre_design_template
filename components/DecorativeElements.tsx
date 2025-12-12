import React from 'react';

// 金色装饰色
const goldAccent = '#D4AF37';
const deepGold = '#B8860B';
const lightGold = '#F0E68C';

// 装饰性角标组件 - 增强设计感
export const DecorativeCorner = ({ position }: { position: string }) => (
  <div className={`absolute decorative-corner ${position} w-10 h-10`}>
    {/* 主角标 */}
    <div className="absolute inset-0" 
         style={{ 
           borderTop: position.includes('top') ? `3px solid ${goldAccent}` : 'none',
           borderBottom: position.includes('bottom') ? `3px solid ${goldAccent}` : 'none',
           borderLeft: position.includes('left') ? `3px solid ${goldAccent}` : 'none',
           borderRight: position.includes('right') ? `3px solid ${goldAccent}` : 'none',
         }}></div>
    {/* 装饰性细节 */}
    <div className="absolute inset-0" 
         style={{ 
           borderTop: position.includes('top') ? `1px solid ${lightGold}` : 'none',
           borderBottom: position.includes('bottom') ? `1px solid ${lightGold}` : 'none',
           borderLeft: position.includes('left') ? `1px solid ${lightGold}` : 'none',
           borderRight: position.includes('right') ? `1px solid ${lightGold}` : 'none',
         }}></div>
  </div>
);

// 装饰性线条组件 - 增加渐变效果
export const DecorativeLine = ({ vertical = false }: { vertical?: boolean }) => (
  <div 
    className={`${vertical ? 'w-1 h-20' : 'w-20 h-1'} mx-auto decorative-line relative`}
  >
    <div 
      className="absolute inset-0"
      style={{ 
        background: vertical 
          ? `linear-gradient(to bottom, transparent, ${goldAccent}, transparent)` 
          : `linear-gradient(to right, transparent, ${goldAccent}, transparent)` 
      }}
    ></div>
  </div>
);

// 装饰性圆点组件 - 增加层次感
export const DecorativeDot = ({ size = 'w-6 h-6' }: { size?: string }) => (
  <div className="relative">
    {/* 主圆点 */}
    <div className={`${size} decorative-dot rounded-full absolute inset-0`} style={{ backgroundColor: goldAccent }}></div>
    {/* 内部高光圆点 */}
    <div className={`${size} decorative-dot rounded-full absolute inset-0`} 
         style={{ 
           backgroundColor: lightGold,
           transform: 'scale(0.6)',
           margin: 'auto'
         }}></div>
  </div>
);

// 装饰性边框组件 - 增加双层边框效果
export const DecorativeBorder = ({ color = 'rgba(212, 175, 55, 0.3)' }: { color?: string }) => (
  <>
    {/* 外层边框 */}
    <div className="absolute inset-0 decorative-border" 
         style={{ 
           borderColor: color, 
           borderWidth: '1px', 
           borderStyle: 'solid',
           boxShadow: `0 0 10px ${color}`
         }}></div>
    {/* 内层边框 */}
    <div className="absolute inset-2 decorative-border" 
         style={{ 
           borderColor: goldAccent, 
           borderWidth: '1px', 
           borderStyle: 'dashed'
         }}></div>
  </>
);

// 装饰性编号标记组件 - 增加立体感
export const DecorativeNumber = ({ number, position }: { number: number, position: string }) => (
  <div className={`absolute ${position} w-10 h-10 decorative-number flex items-center justify-center`} 
       style={{ 
         backgroundColor: 'white',
         borderColor: goldAccent, 
         color: deepGold, 
         borderWidth: '2px', 
         borderStyle: 'solid',
         borderRadius: '50%',
         boxShadow: `0 2px 5px rgba(212, 175, 55, 0.3)`
       }}>
    <span className="text-xl font-bold" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.1)' }}>{number}</span>
  </div>
);

// 新增装饰性花纹组件
export const DecorativePattern = ({ type = 'wave' }: { type?: 'wave' | 'dots' | 'zigzag' }) => {
  const patterns = {
    wave: (
      <svg width="100%" height="20" viewBox="0 0 100 20" className="decorative-pattern">
        <path d="M0,10 Q25,5 50,10 T100,10" stroke={goldAccent} strokeWidth="1" fill="none" />
      </svg>
    ),
    dots: (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: goldAccent }}></div>
        ))}
      </div>
    ),
    zigzag: (
      <svg width="100%" height="20" viewBox="0 0 100 20" className="decorative-pattern">
        <polyline points="0,10 10,0 20,10 30,0 40,10 50,0 60,10 70,0 80,10 90,0 100,10" 
                  stroke={goldAccent} strokeWidth="1" fill="none" />
      </svg>
    )
  };
  
  return <div className="decorative-pattern">{patterns[type]}</div>;
};