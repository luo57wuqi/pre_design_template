export interface ProductInfo {
  title: string;
  stylePrompt: string;
  imageBase64: string;
  imageMimeType: string;
}

export interface GeneratedAssets {
  // Text Assets
  subtitle: string;
  inspirationText: string[]; // 4 paragraphs
  
  // Image Assets (Base64)
  heroImage: string; // Section 1
  modelInspirationImage: string; // Section 2
  sceneWideImage: string; // Section 3
  modelWearImage: string; // Section 4
  detailImage1: string; // Section 5 Top Right
  detailImage2: string; // Section 5 Bottom Left
  multiAngleImage: string; // Section 6
  backgroundTexture: string; // Common background
}

export interface GenerationStatus {
  isGenerating: boolean;
  step: string;
  progress: number; // 0 to 100
}

export enum ImageShape {
  RECTANGLE = 'RECTANGLE',
  OVAL = 'OVAL',
  SQUARE = 'SQUARE'
}