import { v4 as uuidv4 } from 'uuid';
import { Greeting, GreetingTheme, GreetingType, AnimationType, CardElement } from '@/types/greeting';

// Generate a unique ID for new greetings
export const generateGreetingId = (): string => {
  return uuidv4();
};

// Save greeting to localStorage
export const saveGreeting = (greeting: Greeting): void => {
  const greetingsStr = localStorage.getItem("greetings") || "{}";
  const greetings = JSON.parse(greetingsStr);
  greetings[greeting.id] = greeting;
  localStorage.setItem("greetings", JSON.stringify(greetings));
};

// Get greeting by ID
export const getGreetingById = (id: string): Greeting | null => {
  try {
    const greetingsStr = localStorage.getItem('hola-greetings');
    if (!greetingsStr) return null;
    
    const greetings: Greeting[] = JSON.parse(greetingsStr);
    return greetings.find(g => g.id === id) || null;
  } catch (error) {
    console.error('Error retrieving greeting:', error);
    return null;
  }
};

// Occasion options
export const occasionOptions = [
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'festival', label: 'Festival' },
  { value: 'congratulations', label: 'Congratulations' },
  { value: 'thankyou', label: 'Thank You' },
  { value: 'general', label: 'General' },
];

// Animation types
export const animationTypes = [
  { id: 'fade', name: 'Fade In' },
  { id: 'slide', name: 'Slide Up' },
  { id: 'scale', name: 'Scale In' },
  { id: 'bounce', name: 'Bounce' },
  { id: 'rotate', name: 'Rotate' },
  { id: 'flip', name: 'Flip' },
  { id: 'pulse', name: 'Pulse' },
  { id: 'glitter', name: 'Glitter' },
  { id: 'shake', name: 'Shake' },
  { id: 'swing', name: 'Swing' },
  { id: 'float', name: 'Float' },
  { id: 'reveal', name: 'Reveal' },
  { id: 'sparkle', name: 'Sparkle' },
];

// Continuous effect types
export const continuousEffectTypes = [
  { id: 'none', name: 'None' },
  { id: 'confetti', name: 'Confetti' },
  { id: 'bubbles', name: 'Bubbles' },
  { id: 'sparkles', name: 'Sparkles' },
  { id: 'hearts', name: 'Hearts' },
  { id: 'stars', name: 'Stars' },
];

// Greeting themes with expanded options
export const greetingThemes: GreetingTheme[] = [
  // Birthday Themes
  {
    id: 'birthday-festive',
    name: 'Birthday Festive',
    backgroundClass: 'bg-gradient-to-br from-purple-500 to-pink-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-200',
    occasionTypes: ['birthday'],
  },
  {
    id: 'birthday-confetti',
    name: 'Birthday Confetti',
    backgroundClass: 'bg-gradient-to-r from-blue-400 to-purple-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-300',
    occasionTypes: ['birthday'],
  },
  {
    id: 'birthday-elegant',
    name: 'Birthday Elegant',
    backgroundClass: 'bg-gradient-to-br from-gray-800 to-gray-900',
    textColorClass: 'text-yellow-300',
    accentColorClass: 'text-yellow-500',
    occasionTypes: ['birthday'],
  },
  {
    id: 'birthday-fun',
    name: 'Birthday Fun',
    backgroundClass: 'bg-gradient-to-br from-pink-400 to-orange-400',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-200',
    occasionTypes: ['birthday'],
  },
  {
    id: 'birthday-pastel',
    name: 'Birthday Pastel',
    backgroundClass: 'bg-gradient-to-br from-blue-200 to-pink-200',
    textColorClass: 'text-gray-800',
    accentColorClass: 'text-purple-600',
    occasionTypes: ['birthday'],
  },
  {
    id: 'birthday-whitegold',
    name: 'White Gold',
    backgroundClass: 'bg-gradient-to-br from-white to-amber-100',
    textColorClass: 'text-amber-800',
    accentColorClass: 'text-amber-600',
    occasionTypes: ['birthday'],
  },
  {
    id: 'birthday-royal',
    name: 'Royal Birthday',
    backgroundClass: 'bg-gradient-to-br from-indigo-800 to-purple-900',
    textColorClass: 'text-amber-200',
    accentColorClass: 'text-amber-400',
    occasionTypes: ['birthday'],
  },
  {
    id: 'birthday-tropical',
    name: 'Tropical',
    backgroundClass: 'bg-gradient-to-br from-teal-400 to-emerald-600',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-200',
    occasionTypes: ['birthday'],
  },
  
  // Anniversary Themes
  {
    id: 'anniversary-golden',
    name: 'Anniversary Golden',
    backgroundClass: 'bg-gradient-to-br from-amber-600 to-yellow-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-amber-200',
    occasionTypes: ['anniversary'],
  },
  {
    id: 'anniversary-romance',
    name: 'Anniversary Romance',
    backgroundClass: 'bg-gradient-to-br from-red-400 to-pink-400',
    textColorClass: 'text-white',
    accentColorClass: 'text-pink-200',
    occasionTypes: ['anniversary'],
  },
  {
    id: 'anniversary-classic',
    name: 'Anniversary Classic',
    backgroundClass: 'bg-gradient-to-br from-gray-700 to-gray-800',
    textColorClass: 'text-white',
    accentColorClass: 'text-red-300',
    occasionTypes: ['anniversary'],
  },
  {
    id: 'anniversary-hearts',
    name: 'Anniversary Hearts',
    backgroundClass: 'bg-gradient-to-br from-pink-500 to-rose-600',
    textColorClass: 'text-white',
    accentColorClass: 'text-pink-200',
    occasionTypes: ['anniversary'],
  },
  {
    id: 'anniversary-serene',
    name: 'Anniversary Serene',
    backgroundClass: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-blue-200',
    occasionTypes: ['anniversary'],
  },
  {
    id: 'anniversary-whitegold',
    name: 'White Gold',
    backgroundClass: 'bg-gradient-to-br from-gray-50 to-amber-100',
    textColorClass: 'text-amber-900',
    accentColorClass: 'text-amber-600',
    occasionTypes: ['anniversary'],
  },
  {
    id: 'anniversary-silver',
    name: 'Silver Anniversary',
    backgroundClass: 'bg-gradient-to-br from-slate-300 to-slate-400',
    textColorClass: 'text-slate-800',
    accentColorClass: 'text-slate-900',
    occasionTypes: ['anniversary'],
  },
  {
    id: 'anniversary-luxury',
    name: 'Luxury',
    backgroundClass: 'bg-gradient-to-br from-slate-900 to-gray-800',
    textColorClass: 'text-amber-300',
    accentColorClass: 'text-amber-500',
    occasionTypes: ['anniversary'],
  },
  
  // Festival Themes
  {
    id: 'festival-eid',
    name: 'Eid Mubarak',
    backgroundClass: 'bg-gradient-to-br from-emerald-600 to-teal-700',
    textColorClass: 'text-amber-100',
    accentColorClass: 'text-amber-300',
    occasionTypes: ['festival'],
  },
  {
    id: 'festival-christmas',
    name: 'Christmas Joy',
    backgroundClass: 'bg-gradient-to-br from-red-600 to-green-700',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-200',
    occasionTypes: ['festival'],
  },
  {
    id: 'festival-bright',
    name: 'Festival Bright',
    backgroundClass: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-200',
    occasionTypes: ['festival'],
  },
  {
    id: 'festival-lights',
    name: 'Festival Lights',
    backgroundClass: 'bg-gradient-to-br from-indigo-600 to-purple-600',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-300',
    occasionTypes: ['festival'],
  },
  {
    id: 'festival-vibrant',
    name: 'Festival Vibrant',
    backgroundClass: 'bg-gradient-to-br from-pink-500 to-yellow-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-200',
    occasionTypes: ['festival'],
  },
  {
    id: 'festival-traditional',
    name: 'Festival Traditional',
    backgroundClass: 'bg-gradient-to-br from-red-600 to-orange-500',
    textColorClass: 'text-yellow-100',
    accentColorClass: 'text-yellow-300',
    occasionTypes: ['festival'],
  },
  {
    id: 'festival-celebration',
    name: 'Festival Celebration',
    backgroundClass: 'bg-gradient-to-br from-green-500 to-emerald-600',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-200',
    occasionTypes: ['festival'],
  },
  {
    id: 'festival-diwali',
    name: 'Diwali Celebration',
    backgroundClass: 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-600',
    textColorClass: 'text-yellow-200',
    accentColorClass: 'text-yellow-100',
    occasionTypes: ['festival'],
  },
  {
    id: 'festival-holi',
    name: 'Holi Colors',
    backgroundClass: 'bg-gradient-to-br from-fuchsia-600 via-blue-500 to-green-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-200',
    occasionTypes: ['festival'],
  },
  {
    id: 'festival-whitegold',
    name: 'White Gold',
    backgroundClass: 'bg-gradient-to-br from-white to-amber-50',
    textColorClass: 'text-amber-800',
    accentColorClass: 'text-amber-600',
    occasionTypes: ['festival'],
  },
  {
    id: 'festival-christmas-classic',
    name: 'Classic Christmas',
    backgroundClass: 'bg-gradient-to-br from-green-800 to-green-600',
    textColorClass: 'text-red-200',
    accentColorClass: 'text-red-100',
    occasionTypes: ['festival'],
  },
  {
    id: 'festival-winter',
    name: 'Winter Holiday',
    backgroundClass: 'bg-gradient-to-br from-blue-300 to-blue-100',
    textColorClass: 'text-blue-900',
    accentColorClass: 'text-blue-700',
    occasionTypes: ['festival'],
  },

  // Congratulations Themes
  {
    id: 'congrats-success',
    name: 'Success',
    backgroundClass: 'bg-gradient-to-br from-green-500 to-teal-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-green-200',
    occasionTypes: ['congratulations'],
  },
  {
    id: 'congrats-achievement',
    name: 'Achievement',
    backgroundClass: 'bg-gradient-to-br from-blue-600 to-indigo-600',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-300',
    occasionTypes: ['congratulations'],
  },
  {
    id: 'congrats-celebration',
    name: 'Celebration',
    backgroundClass: 'bg-gradient-to-br from-purple-500 to-blue-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-200',
    occasionTypes: ['congratulations'],
  },
  {
    id: 'congrats-elegant',
    name: 'Elegant Success',
    backgroundClass: 'bg-gradient-to-br from-gray-800 to-gray-900',
    textColorClass: 'text-white',
    accentColorClass: 'text-green-400',
    occasionTypes: ['congratulations'],
  },
  {
    id: 'congrats-victory',
    name: 'Victory',
    backgroundClass: 'bg-gradient-to-br from-amber-500 to-orange-600',
    textColorClass: 'text-white',
    accentColorClass: 'text-amber-300',
    occasionTypes: ['congratulations'],
  },
  {
    id: 'congrats-whitegold',
    name: 'White Gold',
    backgroundClass: 'bg-gradient-to-br from-gray-50 to-amber-100',
    textColorClass: 'text-amber-900',
    accentColorClass: 'text-amber-600',
    occasionTypes: ['congratulations'],
  },
  {
    id: 'congrats-rich',
    name: 'Rich Achievement',
    backgroundClass: 'bg-gradient-to-br from-slate-900 to-slate-700',
    textColorClass: 'text-amber-300',
    accentColorClass: 'text-amber-500',
    occasionTypes: ['congratulations'],
  },
  {
    id: 'congrats-royal',
    name: 'Royal Success',
    backgroundClass: 'bg-gradient-to-br from-indigo-900 to-purple-900',
    textColorClass: 'text-amber-200',
    accentColorClass: 'text-amber-400',
    occasionTypes: ['congratulations'],
  },
  
  // Thank You Themes
  {
    id: 'thankyou-grateful',
    name: 'Grateful',
    backgroundClass: 'bg-gradient-to-br from-blue-400 to-teal-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-blue-200',
    occasionTypes: ['thankyou'],
  },
  {
    id: 'thankyou-appreciation',
    name: 'Appreciation',
    backgroundClass: 'bg-gradient-to-br from-orange-400 to-amber-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-200',
    occasionTypes: ['thankyou'],
  },
  {
    id: 'thankyou-warm',
    name: 'Warm Thanks',
    backgroundClass: 'bg-gradient-to-br from-red-400 to-orange-400',
    textColorClass: 'text-white',
    accentColorClass: 'text-red-200',
    occasionTypes: ['thankyou'],
  },
  {
    id: 'thankyou-sincere',
    name: 'Sincere',
    backgroundClass: 'bg-gradient-to-br from-emerald-500 to-green-600',
    textColorClass: 'text-white',
    accentColorClass: 'text-emerald-200',
    occasionTypes: ['thankyou'],
  },
  {
    id: 'thankyou-elegant',
    name: 'Elegant Thanks',
    backgroundClass: 'bg-gradient-to-br from-gray-700 to-slate-800',
    textColorClass: 'text-amber-300',
    accentColorClass: 'text-amber-400',
    occasionTypes: ['thankyou'],
  },
  {
    id: 'thankyou-whitegold',
    name: 'White Gold',
    backgroundClass: 'bg-gradient-to-br from-white to-amber-100',
    textColorClass: 'text-amber-800',
    accentColorClass: 'text-amber-600',
    occasionTypes: ['thankyou'],
  },
  {
    id: 'thankyou-soft',
    name: 'Soft Pastel',
    backgroundClass: 'bg-gradient-to-br from-purple-200 to-pink-200',
    textColorClass: 'text-purple-900',
    accentColorClass: 'text-purple-700',
    occasionTypes: ['thankyou'],
  },
  {
    id: 'thankyou-rich',
    name: 'Rich Gratitude',
    backgroundClass: 'bg-gradient-to-br from-amber-700 to-yellow-600',
    textColorClass: 'text-white',
    accentColorClass: 'text-amber-200',
    occasionTypes: ['thankyou'],
  },
  
  // General Themes
  {
    id: 'general-calm',
    name: 'Calm',
    backgroundClass: 'bg-gradient-to-br from-blue-400 to-purple-400',
    textColorClass: 'text-white',
    accentColorClass: 'text-blue-200',
    occasionTypes: ['general'],
  },
  {
    id: 'general-bright',
    name: 'Bright',
    backgroundClass: 'bg-gradient-to-br from-yellow-400 to-orange-400',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-200',
    occasionTypes: ['general'],
  },
  {
    id: 'general-minimal',
    name: 'Minimal',
    backgroundClass: 'bg-gradient-to-br from-gray-100 to-gray-300',
    textColorClass: 'text-gray-800',
    accentColorClass: 'text-gray-600',
    occasionTypes: ['general'],
  },
  {
    id: 'general-nature',
    name: 'Nature',
    backgroundClass: 'bg-gradient-to-br from-green-400 to-teal-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-green-200',
    occasionTypes: ['general'],
  },
  {
    id: 'general-elegant',
    name: 'Elegant',
    backgroundClass: 'bg-gradient-to-br from-gray-800 to-gray-900',
    textColorClass: 'text-white',
    accentColorClass: 'text-gray-400',
    occasionTypes: ['general'],
  },
  {
    id: 'general-sunset',
    name: 'Sunset',
    backgroundClass: 'bg-gradient-to-br from-orange-500 to-pink-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-yellow-200',
    occasionTypes: ['general'],
  },
  {
    id: 'general-whitegold',
    name: 'White Gold',
    backgroundClass: 'bg-gradient-to-br from-gray-50 to-amber-100',
    textColorClass: 'text-amber-900',
    accentColorClass: 'text-amber-600',
    occasionTypes: ['general'],
  },
  {
    id: 'general-luxury',
    name: 'Luxury',
    backgroundClass: 'bg-gradient-to-br from-slate-900 to-gray-800',
    textColorClass: 'text-amber-300',
    accentColorClass: 'text-amber-500',
    occasionTypes: ['general'],
  },
  {
    id: 'general-aurora',
    name: 'Aurora',
    backgroundClass: 'bg-gradient-to-br from-teal-500 via-purple-500 to-pink-500',
    textColorClass: 'text-white',
    accentColorClass: 'text-teal-200',
    occasionTypes: ['general'],
  },
  {
    id: 'general-cosmic',
    name: 'Cosmic',
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    textColorClass: 'text-purple-200',
    accentColorClass: 'text-purple-300',
    occasionTypes: ['general'],
  },
];

// Get themes filtered by occasion
export const getThemesByOccasion = (occasion: GreetingType): GreetingTheme[] => {
  // Get any saved custom themes
  const customThemesStr = localStorage.getItem('hola-custom-themes');
  const customThemes = customThemesStr ? JSON.parse(customThemesStr) as GreetingTheme[] : [];
  
  // Filter and combine built-in themes with custom themes
  const filteredThemes = greetingThemes.filter(
    theme => theme.occasionTypes.includes(occasion)
  );
  
  const filteredCustomThemes = customThemes.filter(
    theme => theme.occasionTypes.includes(occasion)
  );
  
  return [...filteredThemes, ...filteredCustomThemes];
};

// Get theme by ID
export const getThemeById = (id: string): GreetingTheme | null => {
  // Check built-in themes
  const theme = greetingThemes.find(theme => theme.id === id);
  if (theme) return theme;
  
  // Check custom themes in localStorage
  try {
    const customThemesStr = localStorage.getItem('hola-custom-themes');
    if (customThemesStr) {
      const customThemes = JSON.parse(customThemesStr) as GreetingTheme[];
      const customTheme = customThemes.find(theme => theme.id === id);
      if (customTheme) return customTheme;
    }
  } catch (error) {
    console.error('Error retrieving custom theme:', error);
  }
  
  return null;
};

// Generate default card elements based on occasion and greeting info
export const getDefaultElements = (
  occasion: GreetingType,
  recipientName: string = '',
  senderName: string = '',
  message: string = ''
): CardElement[] => {
  const defaultIcon = occasion === 'birthday' ? 'party-popper' : 
                      occasion === 'anniversary' ? 'heart' :
                      occasion === 'festival' ? 'gift' :
                      occasion === 'congratulations' ? 'award' :
                      occasion === 'thankyou' ? 'thumbs-up' : 'smile';
  
  const defaultHeading = occasion === 'birthday' ? 'Happy Birthday!' : 
                         occasion === 'anniversary' ? 'Happy Anniversary!' :
                         occasion === 'festival' ? 'Happy Celebrations!' :
                         occasion === 'congratulations' ? 'Congratulations!' :
                         occasion === 'thankyou' ? 'Thank You!' : 'Hello!';
  
  const defaultMessage = message || 'Wishing you a wonderful day filled with joy and happiness!';
  
  return [
    {
      id: "default-icon",
      type: "icon",
      content: defaultIcon,
      size: "large",
      alignment: "center"
    },
    {
      id: "default-heading",
      type: "heading",
      content: defaultHeading,
      size: "large",
      alignment: "center"
    },
    {
      id: "default-recipient",
      type: "text",
      content: `Dear ${recipientName || "Friend"},`,
      size: "medium",
      alignment: "center"
    },
    {
      id: "default-message",
      type: "text",
      content: defaultMessage,
      size: "medium",
      alignment: "center"
    },
    {
      id: "default-sender",
      type: "text",
      content: `With love,\n${senderName || "Me"}`,
      size: "medium",
      alignment: "center"
    }
  ];
};
