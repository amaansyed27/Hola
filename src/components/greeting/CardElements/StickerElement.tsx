import { useState } from "react";
import { CardElement } from "@/types/greeting";
import { Button } from "@/components/ui/button";
import { 
  Sticker, 
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface StickerElementProps {
  element: CardElement;
  onChange: (element: CardElement) => void;
  onRemove: () => void;
  preview?: boolean;
}

// Define sticker sets by category with URLs
const STICKER_SETS = {
  birthday: [
    '🎂', '🎁', '🎈', '🎉', '🎊', '🎆', '🎇', '🧁', '🍰'
  ],
  love: [
    '❤️', '💕', '💖', '💘', '💝', '💓', '💗', '💟', '💌'
  ],
  celebration: [
    '🏆', '🥇', '🎖️', '🎗️', '🎭', '🎪', '🎨', '🎬', '🎼'
  ],
  nature: [
    '🌸', '🌺', '🌷', '🌹', '💐', '🌻', '🌼', '🍀', '🌈'
  ],
};

const StickerElement = ({ 
  element, 
  onChange, 
  onRemove,
  preview = false 
}: StickerElementProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("birthday");
  
  // Default values for safety
  const safeElement = {
    ...element,
    content: element.content || "🎂",
    size: element.size || "medium",
    alignment: element.alignment || "center"
  };

  if (preview) {
    const sizeClasses = {
      small: "text-2xl",
      medium: "text-4xl",
      large: "text-6xl",
    };

    if (safeElement.alignment === 'left') {
      return (
        <div className="w-full flex justify-start mb-4">
          <div className={`${sizeClasses[safeElement.size]}`}>{safeElement.content}</div>
        </div>
      );
    } else if (safeElement.alignment === 'right') {
      return (
        <div className="w-full flex justify-end mb-4">
          <div className={`${sizeClasses[safeElement.size]}`}>{safeElement.content}</div>
        </div>
      );
    } else {
      return (
        <div className="w-full flex justify-center mb-4">
          <div className={`${sizeClasses[safeElement.size]}`}>{safeElement.content}</div>
        </div>
      );
    }
  }

  const currentStickers = STICKER_SETS[activeTab as keyof typeof STICKER_SETS] || STICKER_SETS.birthday;

  return (
    <div className="w-full mb-4 border border-border rounded-md p-3 bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sticker size={16} className="text-muted-foreground" />
          <span className="font-medium">Sticker</span>
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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="birthday">Birthday</TabsTrigger>
              <TabsTrigger value="love">Love</TabsTrigger>
              <TabsTrigger value="celebration">Celebration</TabsTrigger>
              <TabsTrigger value="nature">Nature</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-5 gap-2 mt-3 max-h-40 overflow-y-auto">
              {currentStickers.map((sticker, index) => (
                <Button
                  key={index}
                  variant={safeElement.content === sticker ? "secondary" : "outline"}
                  className="h-12 w-12 p-0 text-2xl"
                  onClick={() => onChange({ ...safeElement, content: sticker })}
                >
                  {sticker}
                </Button>
              ))}
            </div>
          </Tabs>

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
          <span className="text-4xl">{safeElement.content}</span>
        </div>
      )}
    </div>
  );
};

export default StickerElement;
