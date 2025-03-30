import { useState } from "react";
import { CardElement } from "@/types/greeting";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Gift, 
  Award, 
  Star, 
  ThumbsUp, 
  PartyPopper,
  Cake, 
  Sparkles,
  Smile,
  Calendar,
  ToggleLeft,
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IconElementProps {
  element: CardElement;
  onChange: (element: CardElement) => void;
  onRemove: () => void;
  theme?: { accentColorClass: string };
  preview?: boolean;
}

const ICONS = {
  "heart": Heart,
  "gift": Gift,
  "award": Award,
  "star": Star,
  "thumbs-up": ThumbsUp,
  "party-popper": PartyPopper,
  "cake": Cake,
  "sparkles": Sparkles,
  "smile": Smile,
  "calendar": Calendar,
};

const IconElement = ({ 
  element, 
  onChange, 
  onRemove,
  theme,
  preview = false 
}: IconElementProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Default values for safety
  const safeElement = {
    ...element,
    content: element.content || "smile",
    size: element.size || "medium",
    alignment: element.alignment || "center"
  };
  
  const IconComponent = ICONS[safeElement.content as keyof typeof ICONS] || PartyPopper;

  if (preview) {
    const sizeClasses = {
      small: "w-6 h-6",
      medium: "w-10 h-10",
      large: "w-16 h-16",
    };

    // Create a container that's full width with flex display
    // and set justification based on alignment
    return (
      <div className="w-full mb-4 flex">
        <div className={`w-full flex ${
          safeElement.alignment === 'left' 
            ? 'justify-start' 
            : safeElement.alignment === 'right' 
              ? 'justify-end' 
              : 'justify-center'
        }`}>
          <IconComponent 
            className={`${theme?.accentColorClass || ''} ${sizeClasses[safeElement.size]}`} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-4 border border-border rounded-md p-3 bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <IconComponent size={16} className="text-muted-foreground" />
          <span className="font-medium">Icon</span>
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
        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-2 overflow-y-auto max-h-40">
            {Object.entries(ICONS).map(([key, Icon]) => (
              <Button
                key={key}
                variant={safeElement.content === key ? "secondary" : "outline"}
                className="h-12 w-12 p-0"
                onClick={() => onChange({ ...safeElement, content: key })}
              >
                <Icon className="h-6 w-6" />
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-3">
            {/* Size selector */}
            <Select
              value={safeElement.size}
              onValueChange={(value) => onChange({ ...safeElement, size: value as 'small' | 'medium' | 'large' })}
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

            {/* Alignment buttons with visual feedback */}
            <div className="flex border rounded-md">
              <Button
                type="button" 
                variant={safeElement.alignment === 'left' ? 'secondary' : 'ghost'}
                size="sm"
                className="rounded-none"
                onClick={() => onChange({ ...safeElement, alignment: 'left' })}
              >
                <AlignLeft size={14} />
              </Button>
              <Button
                type="button" 
                variant={safeElement.alignment === 'center' ? 'secondary' : 'ghost'}
                size="sm"
                className="rounded-none"
                onClick={() => onChange({ ...safeElement, alignment: 'center' })}
              >
                <AlignCenter size={14} />
              </Button>
              <Button
                type="button" 
                variant={safeElement.alignment === 'right' ? 'secondary' : 'ghost'}
                size="sm"
                className="rounded-none"
                onClick={() => onChange({ ...safeElement, alignment: 'right' })}
              >
                <AlignRight size={14} />
              </Button>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(false)}
              className="ml-auto"
            >
              Done
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-2 bg-muted/40 dark:bg-muted/20 rounded min-h-[2rem] flex items-center justify-center">
          <IconComponent className="h-8 w-8" />
        </div>
      )}
    </div>
  );
};

export default IconElement;
