export type GreetingType = 'birthday' | 'anniversary' | 'festival' | 'congratulations' | 'thankyou' | 'general';

export interface GreetingTheme {
  id: string;
  name: string;
  backgroundClass: string;
  textColorClass: string;
  accentColorClass: string;
  occasionTypes: GreetingType[];
  custom?: boolean;
  backgroundImage?: string;
  backgroundGradient?: string;
  animatedGradient?: boolean;
  customTextColor?: string;
}

export type ElementType = 'heading' | 'text' | 'image' | 'icon' | 'separator' | 'emoji' | 'sticker';
export type ElementSize = 'small' | 'medium' | 'large' | 'custom';
export type ElementAlignment = 'left' | 'center' | 'right';
export type AnimationType = 
  'fade' | 'slide' | 'scale' | 'bounce' | 'rotate' | 
  'flip' | 'pulse' | 'glitter' | 'confetti' | 'shake' | 
  'swing' | 'float' | 'reveal' | 'sparkle' | 'none';

export interface CardElement {
  id: string;
  type: ElementType;
  content: string;
  style?: Record<string, string>;
  alignment?: ElementAlignment;
  size?: ElementSize;
  animation?: AnimationType;
  dragOrder?: number; // Optional property to store drag order
  url?: string; // Add url property for image elements
  textAnimation?: TextAnimationType; // New property for text animations
  scrollEffect?: ScrollEffectType; // New property for scroll effects
}

// New types for text animations and scroll effects
export type TextAnimationType = 
  'typing' | 'wave' | 'bounce' | 'flip' | 'fade' | 
  'glow' | 'shimmer' | 'rainbow' | 'none';

export type ScrollEffectType = 
  'fade-in' | 'slide-up' | 'zoom-in' | 'rotate-in' | 'none';

export type ContinuousEffectType = 'none' | 'confetti' | 'bubbles' | 'sparkles' | 'hearts' | 'stars';

export interface Greeting {
  id: string;
  recipientName: string;
  senderName: string;
  message: string;
  occasion: GreetingType;
  themeId: string;
  createdAt: number;
  animationType?: string;
  elements?: CardElement[];
  continuousEffect?: ContinuousEffectType;
  continuousEffectEnabled?: boolean;
  customTheme?: GreetingTheme; // Add this property to store custom themes
  availableThemes?: GreetingTheme[]; // Add this property to store available themes
}
