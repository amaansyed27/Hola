import { useState } from "react";
import { CardElement } from "@/types/greeting";
import { Button } from "@/components/ui/button";
import { 
  Smile, 
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
import { EmojiPicker } from "../../greeting/EmojiPicker";

interface EmojiElementProps {
  element: CardElement;
  onChange: (element: CardElement) => void;
  onRemove: () => void;
  preview?: boolean;
}

const EmojiElement = ({ 
  element, 
  onChange, 
  onRemove,
  preview = false 
}: EmojiElementProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Default values for safety
  const safeElement = {
    ...element,
    content: element.content || "😊",
    size: element.size || "medium",
    alignment: element.alignment || "center"
  };

  if (preview) {
    const sizeClasses = {
      small: "text-xl",
      medium: "text-3xl",
      large: "text-5xl",
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

  const handleEmojiSelect = (emoji: string) => {
    onChange({ ...safeElement, content: emoji });
  };

  return (
    <div className="w-full mb-4 border border-border rounded-md p-3 bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Smile size={16} className="text-muted-foreground" />
          <span className="font-medium">Emoji</span>
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
          <EmojiPicker onEmojiSelect={handleEmojiSelect} selectedEmoji={safeElement.content} />

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
          <span className="text-3xl">{safeElement.content}</span>
        </div>
      )}
    </div>
  );
};

export default EmojiElement;
