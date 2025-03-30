import { useState } from "react";
import { CardElement, TextAnimationType, ScrollEffectType } from "@/types/greeting";
import { Input } from "@/components/ui/input";
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Type, 
  ToggleLeft,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TextElementProps {
  element: CardElement;
  onChange: (element: CardElement) => void;
  onRemove: () => void;
  theme?: { textColorClass: string; customTextColor?: string };
  preview?: boolean;
  customTextColor?: string | null;
}

const TextElement = ({ 
  element, 
  onChange, 
  onRemove, 
  theme,
  preview = false,
  customTextColor
}: TextElementProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (preview) {
    const sizeClasses = {
      small: "text-sm",
      medium: "text-base",
      large: "text-xl font-semibold",
    };

    const alignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    };

    // Define text animation classes
    const textAnimationClasses = {
      'typing': "animate-typing",
      'wave': "animate-wave",
      'bounce': "animate-text-bounce",
      'flip': "animate-text-flip",
      'fade': "animate-text-fade",
      'glow': "animate-glow",
      'shimmer': "animate-shimmer",
      'rainbow': "animate-rainbow",
      'none': ""
    };

    // Define scroll effect classes
    const scrollEffectClasses = {
      'fade-in': "scroll-fade-in", 
      'slide-up': "scroll-slide-up",
      'zoom-in': "scroll-zoom-in",
      'rotate-in': "scroll-rotate-in",
      'none': ""
    };

    // Define text style with potential custom color
    const textStyle: React.CSSProperties = {};
    if (customTextColor || theme?.customTextColor) {
      textStyle.color = customTextColor || theme?.customTextColor;
    }

    const animationClass = element.textAnimation && element.textAnimation !== 'none' 
      ? textAnimationClasses[element.textAnimation] 
      : '';
    
    const scrollEffectClass = element.scrollEffect && element.scrollEffect !== 'none'
      ? scrollEffectClasses[element.scrollEffect]
      : '';

    return (
      <div 
        className={`w-full mb-4 ${!textStyle.color ? theme?.textColorClass || '' : ''} ${sizeClasses[element.size || 'medium']} ${alignClasses[element.alignment || 'center']} ${animationClass} ${scrollEffectClass}`}
        style={textStyle}
        data-scroll-effect={element.scrollEffect}
      >
        {element.content}
      </div>
    );
  }

  return (
    <div className="w-full mb-4 border dark:border-border rounded-md p-3 bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Type size={16} className="text-muted-foreground" />
          <span className="font-medium">{element.type === 'heading' ? 'Heading' : 'Text'}</span>
        </div>
        <div className="flex items-center gap-1">
          {!isEditing && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditing(true)}
            >
              <ToggleLeft size={16} />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRemove}
          >
            Remove
          </Button>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={element.content}
            onChange={(e) => onChange({ ...element, content: e.target.value })}
            placeholder={element.type === 'heading' ? 'Enter heading text...' : 'Enter text...'}
            className="w-full"
          />

          <div className="flex items-center gap-2">
            <div className="flex border rounded-md">
              <Button
                type="button" 
                variant={element.alignment === 'left' ? 'secondary' : 'ghost'}
                size="sm"
                className="rounded-none"
                onClick={() => onChange({ ...element, alignment: 'left' })}
              >
                <AlignLeft size={14} />
              </Button>
              <Button
                type="button" 
                variant={element.alignment === 'center' ? 'secondary' : 'ghost'}
                size="sm"
                className="rounded-none"
                onClick={() => onChange({ ...element, alignment: 'center' })}
              >
                <AlignCenter size={14} />
              </Button>
              <Button
                type="button" 
                variant={element.alignment === 'right' ? 'secondary' : 'ghost'}
                size="sm"
                className="rounded-none"
                onClick={() => onChange({ ...element, alignment: 'right' })}
              >
                <AlignRight size={14} />
              </Button>
            </div>

            <Select
              value={element.size || 'medium'}
              onValueChange={(value) => onChange({ ...element, size: value as 'small' | 'medium' | 'large' })}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(false)}
              className="ml-auto"
            >
              Done
            </Button>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Sparkles size={14} className="text-hola-purple" />
            <span className="text-sm font-medium">Animations:</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Select
                value={element.textAnimation || 'none'}
                onValueChange={(value) => onChange({ ...element, textAnimation: value as TextAnimationType })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Text Animation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="typing">Typing</SelectItem>
                  <SelectItem value="wave">Wave</SelectItem>
                  <SelectItem value="bounce">Bounce</SelectItem>
                  <SelectItem value="flip">Flip</SelectItem>
                  <SelectItem value="fade">Fade</SelectItem>
                  <SelectItem value="glow">Glow</SelectItem>
                  <SelectItem value="shimmer">Shimmer</SelectItem>
                  <SelectItem value="rainbow">Rainbow</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                value={element.scrollEffect || 'none'}
                onValueChange={(value) => onChange({ ...element, scrollEffect: value as ScrollEffectType })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Scroll Effect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="fade-in">Fade In</SelectItem>
                  <SelectItem value="slide-up">Slide Up</SelectItem>
                  <SelectItem value="zoom-in">Zoom In</SelectItem>
                  <SelectItem value="rotate-in">Rotate In</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2 bg-muted/40 dark:bg-muted/20 rounded min-h-[2rem]">
          {element.content || <span className="text-muted-foreground italic">Empty text</span>}
        </div>
      )}
    </div>
  );
};

export default TextElement;
