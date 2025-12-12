import React from 'react';
import { ProductInfo } from '../types';

// 定义不同主题的颜色方案
const themeColors = {
  // 默认金色主题 - 适用于大多数珠宝产品
  gold: {
    primary: '#D4AF37',
    secondary: '#B8860B',
    accent: '#F0E68C',
    background: '#FFF8DC'
  },
  // 红色主题 - 适用于婚庆类产品
  red: {
    primary: '#DC143C',
    secondary: '#8B0000',
    accent: '#FF6347',
    background: '#FFE4E1'
  },
  // 蓝色主题 - 适用于海洋/天空主题产品
  blue: {
    primary: '#4169E1',
    secondary: '#191970',
    accent: '#87CEEB',
    background: '#E0F7FA'
  },
  // 绿色主题 - 适用于自然/翡翠类产品
  green: {
    primary: '#228B22',
    secondary: '#006400',
    accent: '#90EE90',
    background: '#F0FFF0'
  }
};

// 定义不同主题的装饰图案
const themePatterns = {
  gold: ['wave', 'dots', 'floral'],
  red: ['heart', 'rose', 'curves'],
  blue: ['wave', 'bubble', 'cloud'],
  green: ['leaf', 'vine', 'flower']
};

// 智能角标组件
export const SmartDecorativeCorner = ({ 
  position, 
  product 
}: { 
  position: string; 
  product: ProductInfo;
}) => {
  // 根据产品名称和主题确定颜色方案
  const getColorScheme = () => {
    const title = product.title.toLowerCase();
    
    // 根据产品名称关键词判断主题
    if (title.includes('婚') || title.includes('嫁') || title.includes('爱') || title.includes('心')) {
      return themeColors.red;
    }
    
    if (title.includes('海') || title.includes('蓝') || title.includes('水') || title.includes('海洋')) {
      return themeColors.blue;
    }
    
    if (title.includes('绿') || title.includes('森') || title.includes('叶') || title.includes('自然')) {
      return themeColors.green;
    }
    
    // 默认使用金色主题
    return themeColors.gold;
  };
  
  const colors = getColorScheme();
  
  return (
    <div className={`absolute smart-decorative-corner ${position} w-10 h-10`}>
      {/* 主角标 */}
      <div className="absolute inset-0" 
           style={{ 
             borderTop: position.includes('top') ? `3px solid ${colors.primary}` : 'none',
             borderBottom: position.includes('bottom') ? `3px solid ${colors.primary}` : 'none',
             borderLeft: position.includes('left') ? `3px solid ${colors.primary}` : 'none',
             borderRight: position.includes('right') ? `3px solid ${colors.primary}` : 'none',
           }}></div>
      {/* 装饰性细节 */}
      <div className="absolute inset-0" 
           style={{ 
             borderTop: position.includes('top') ? `1px solid ${colors.accent}` : 'none',
             borderBottom: position.includes('bottom') ? `1px solid ${colors.accent}` : 'none',
             borderLeft: position.includes('left') ? `1px solid ${colors.accent}` : 'none',
             borderRight: position.includes('right') ? `1px solid ${colors.accent}` : 'none',
           }}></div>
    </div>
  );
};

// 智能线条组件
export const SmartDecorativeLine = ({ 
  vertical = false, 
  product 
}: { 
  vertical?: boolean; 
  product: ProductInfo;
}) => {
  // 根据产品名称和主题确定颜色方案
  const getColorScheme = () => {
    const title = product.title.toLowerCase();
    
    // 根据产品名称关键词判断主题
    if (title.includes('婚') || title.includes('嫁') || title.includes('爱') || title.includes('心')) {
      return themeColors.red;
    }
    
    if (title.includes('海') || title.includes('蓝') || title.includes('水') || title.includes('海洋')) {
      return themeColors.blue;
    }
    
    if (title.includes('绿') || title.includes('森') || title.includes('叶') || title.includes('自然')) {
      return themeColors.green;
    }
    
    // 默认使用金色主题
    return themeColors.gold;
  };
  
  const colors = getColorScheme();
  
  return (
    <div 
      className={`${vertical ? 'w-1 h-20' : 'w-20 h-1'} mx-auto smart-decorative-line relative`}
    >
      <div 
        className="absolute inset-0"
        style={{ 
          background: vertical 
            ? `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)` 
            : `linear-gradient(to right, transparent, ${colors.primary}, transparent)` 
        }}
      ></div>
    </div>
  );
};

// 智能圆点组件
export const SmartDecorativeDot = ({ 
  size = 'w-6 h-6', 
  product 
}: { 
  size?: string; 
  product: ProductInfo;
}) => {
  // 根据产品名称和主题确定颜色方案
  const getColorScheme = () => {
    const title = product.title.toLowerCase();
    
    // 根据产品名称关键词判断主题
    if (title.includes('婚') || title.includes('嫁') || title.includes('爱') || title.includes('心')) {
      return themeColors.red;
    }
    
    if (title.includes('海') || title.includes('蓝') || title.includes('水') || title.includes('海洋')) {
      return themeColors.blue;
    }
    
    if (title.includes('绿') || title.includes('森') || title.includes('叶') || title.includes('自然')) {
      return themeColors.green;
    }
    
    // 默认使用金色主题
    return themeColors.gold;
  };
  
  const colors = getColorScheme();
  
  return (
    <div className="relative">
      {/* 主圆点 */}
      <div className={`${size} smart-decorative-dot rounded-full absolute inset-0`} style={{ backgroundColor: colors.primary }}></div>
      {/* 内部高光圆点 */}
      <div className={`${size} smart-decorative-dot rounded-full absolute inset-0`} 
           style={{ 
             backgroundColor: colors.accent,
             transform: 'scale(0.6)',
             margin: 'auto'
           }}></div>
    </div>
  );
};

// 智能边框组件
export const SmartDecorativeBorder = ({ 
  color, 
  product 
}: { 
  color?: string; 
  product: ProductInfo;
}) => {
  // 根据产品名称和主题确定颜色方案
  const getColorScheme = () => {
    const title = product.title.toLowerCase();
    
    // 根据产品名称关键词判断主题
    if (title.includes('婚') || title.includes('嫁') || title.includes('爱') || title.includes('心')) {
      return themeColors.red;
    }
    
    if (title.includes('海') || title.includes('蓝') || title.includes('水') || title.includes('海洋')) {
      return themeColors.blue;
    }
    
    if (title.includes('绿') || title.includes('森') || title.includes('叶') || title.includes('自然')) {
      return themeColors.green;
    }
    
    // 默认使用金色主题
    return themeColors.gold;
  };
  
  const colors = getColorScheme();
  const borderColor = color || `rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, 0.3)`;
  
  return (
    <>
      {/* 外层边框 */}
      <div className="absolute inset-0 smart-decorative-border" 
           style={{ 
             borderColor: borderColor, 
             borderWidth: '1px', 
             borderStyle: 'solid',
             boxShadow: `0 0 10px ${borderColor}`
           }}></div>
      {/* 内层边框 */}
      <div className="absolute inset-2 smart-decorative-border" 
           style={{ 
             borderColor: colors.primary, 
             borderWidth: '1px', 
             borderStyle: 'dashed'
           }}></div>
    </>
  );
};

// 智能编号标记组件
export const SmartDecorativeNumber = ({ 
  number, 
  position, 
  product 
}: { 
  number: number; 
  position: string; 
  product: ProductInfo;
}) => {
  // 根据产品名称和主题确定颜色方案
  const getColorScheme = () => {
    const title = product.title.toLowerCase();
    
    // 根据产品名称关键词判断主题
    if (title.includes('婚') || title.includes('嫁') || title.includes('爱') || title.includes('心')) {
      return themeColors.red;
    }
    
    if (title.includes('海') || title.includes('蓝') || title.includes('水') || title.includes('海洋')) {
      return themeColors.blue;
    }
    
    if (title.includes('绿') || title.includes('森') || title.includes('叶') || title.includes('自然')) {
      return themeColors.green;
    }
    
    // 默认使用金色主题
    return themeColors.gold;
  };
  
  const colors = getColorScheme();
  
  return (
    <div className={`absolute ${position} w-10 h-10 smart-decorative-number flex items-center justify-center`} 
         style={{ 
           backgroundColor: 'white',
           borderColor: colors.primary, 
           color: colors.secondary, 
           borderWidth: '2px', 
           borderStyle: 'solid',
           borderRadius: '50%',
           boxShadow: `0 2px 5px rgba(${parseInt(colors.primary.slice(1, 3), 16)}, ${parseInt(colors.primary.slice(3, 5), 16)}, ${parseInt(colors.primary.slice(5, 7), 16)}, 0.3)`
         }}>
      <span className="text-xl font-bold" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.1)' }}>{number}</span>
    </div>
  );
};

// 智能装饰图案组件
export const SmartDecorativePattern = ({ 
  type, 
  product 
}: { 
  type?: 'wave' | 'dots' | 'floral' | 'heart' | 'rose' | 'curves' | 'bubble' | 'cloud' | 'leaf' | 'vine' | 'flower'; 
  product: ProductInfo;
}) => {
  // 根据产品名称和主题确定颜色方案和图案类型
  const getColorScheme = () => {
    const title = product.title.toLowerCase();
    
    // 根据产品名称关键词判断主题
    if (title.includes('婚') || title.includes('嫁') || title.includes('爱') || title.includes('心')) {
      return { colors: themeColors.red, patterns: themePatterns.red };
    }
    
    if (title.includes('海') || title.includes('蓝') || title.includes('水') || title.includes('海洋')) {
      return { colors: themeColors.blue, patterns: themePatterns.blue };
    }
    
    if (title.includes('绿') || title.includes('森') || title.includes('叶') || title.includes('自然')) {
      return { colors: themeColors.green, patterns: themePatterns.green };
    }
    
    // 默认使用金色主题
    return { colors: themeColors.gold, patterns: themePatterns.gold };
  };
  
  const { colors, patterns } = getColorScheme();
  const patternType = type || patterns[0]; // 如果未指定类型，则使用主题的第一个图案
  
  const patternComponents = {
    wave: (
      <svg width="100%" height="20" viewBox="0 0 100 20" className="smart-decorative-pattern">
        <path d="M0,10 Q25,5 50,10 T100,10" stroke={colors.primary} strokeWidth="1" fill="none" />
      </svg>
    ),
    dots: (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.primary }}></div>
        ))}
      </div>
    ),
    floral: (
      <svg width="100%" height="20" viewBox="0 0 100 20" className="smart-decorative-pattern">
        <path d="M10,10 Q15,5 20,10 Q25,15 30,10 Q35,5 40,10" stroke={colors.primary} strokeWidth="1" fill="none" />
        <circle cx="20" cy="10" r="2" fill={colors.primary} />
      </svg>
    ),
    heart: (
      <svg width="100%" height="20" viewBox="0 0 100 20" className="smart-decorative-pattern">
        <path d="M10,10 C10,5 15,5 15,10 C15,15 10,15 10,10 Z" fill={colors.primary} />
        <path d="M15,10 C15,5 20,5 20,10 C20,15 15,15 15,10 Z" fill={colors.primary} />
      </svg>
    ),
    rose: (
      <svg width="100%" height="20" viewBox="0 0 100 20" className="smart-decorative-pattern">
        <circle cx="10" cy="10" r="3" fill={colors.primary} />
        <path d="M7,10 Q5,7 10,5 Q15,7 13,10 Q15,13 10,15 Q5,13 7,10 Z" fill={colors.secondary} />
      </svg>
    ),
    curves: (
      <svg width="100%" height="20" viewBox="0 0 100 20" className="smart-decorative-pattern">
        <path d="M0,10 C25,0 25,20 50,10 C75,0 75,20 100,10" stroke={colors.primary} strokeWidth="1" fill="none" />
      </svg>
    ),
    bubble: (
      <svg width="100%" height="20" viewBox="0 0 100 20" className="smart-decorative-pattern">
        {[...Array(5)].map((_, i) => (
          <circle key={i} cx={10 + i * 20} cy="10" r="3" fill={colors.primary} />
        ))}
      </svg>
    ),
    cloud: (
      <svg width="100%" height="20" viewBox="0 0 100 20" className="smart-decorative-pattern">
        <path d="M10,10 C5,10 5,5 10,5 C15,5 15,10 10,10 Z" fill={colors.primary} />
        <path d="M20,10 C15,10 15,5 20,5 C25,5 25,10 20,10 Z" fill={colors.primary} />
        <path d="M15,12 C10,12 10,7 15,7 C20,7 20,12 15,12 Z" fill={colors.primary} />
      </svg>
    ),
    leaf: (
      <svg width="100%" height="20" viewBox="0 0 100 20" className="smart-decorative-pattern">
        <path d="M10,10 Q5,5 15,5 Q20,10 15,15 Q5,15 10,10 Z" fill={colors.primary} />
      </svg>
    ),
    vine: (
      <svg width="100%" height="20" viewBox="0 0 100 20" className="smart-decorative-pattern">
        <path d="M0,10 C25,5 25,15 50,10 C75,5 75,15 100,10" stroke={colors.primary} strokeWidth="1" fill="none" />
        {[...Array(5)].map((_, i) => (
          <circle key={i} cx={i * 25} cy="10" r="2" fill={colors.primary} />
        ))}
      </svg>
    ),
    flower: (
      <svg width="100%" height="20" viewBox="0 0 100 20" className="smart-decorative-pattern">
        <circle cx="10" cy="10" r="2" fill={colors.primary} />
        {[...Array(5)].map((_, i) => (
          <path 
            key={i} 
            d={`M10,10 L${10 + 5 * Math.cos(i * 2 * Math.PI / 5)},${10 + 5 * Math.sin(i * 2 * Math.PI / 5)} M${10 + 3 * Math.cos(i * 2 * Math.PI / 5)},${10 + 3 * Math.sin(i * 2 * Math.PI / 5)} L${10 + 5 * Math.cos(i * 2 * Math.PI / 5)},${10 + 5 * Math.sin(i * 2 * Math.PI / 5)}`} 
            stroke={colors.primary} 
            strokeWidth="1" 
            fill="none" 
          />
        ))}
      </svg>
    )
  };
  
  return <div className="smart-decorative-pattern">{patternComponents[patternType] || patternComponents.wave}</div>;
};