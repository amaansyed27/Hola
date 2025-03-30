import { useState } from "react";
import { CardElement } from "@/types/greeting";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Image as ImageIcon, 
  ToggleLeft, 
  Upload,
  ExternalLink,
  X,
  AlignLeft,
  AlignCenter,
  AlignRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ImageElementProps {
  element: CardElement;
  onChange: (element: CardElement) => void;
  onRemove: () => void;
  preview?: boolean;
}

const ImageElement = ({ 
  element, 
  onChange, 
  onRemove,
  preview = false 
}: ImageElementProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("url");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          ...element,
          content: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (preview) {
    if (!element.content) {
      return null;
    }

    const sizeClasses = {
      small: "max-w-[150px] max-h-[150px]",
      medium: "max-w-[250px] max-h-[250px]",
      large: "max-w-[350px] max-h-[350px]",
    };

    const safeElement = {
      ...element,
      alignment: element.alignment || "center",
      size: element.size || "medium"
    };

    if (safeElement.alignment === 'left') {
      return (
        <div className="w-full flex justify-start mb-4">
          <img 
            src={safeElement.content} 
            alt="Greeting card image"
            className={`object-contain rounded ${sizeClasses[safeElement.size]}`}
          />
        </div>
      );
    } else if (safeElement.alignment === 'right') {
      return (
        <div className="w-full flex justify-end mb-4">
          <img 
            src={safeElement.content} 
            alt="Greeting card image"
            className={`object-contain rounded ${sizeClasses[safeElement.size]}`}
          />
        </div>
      );
    } else {
      return (
        <div className="w-full flex justify-center mb-4">
          <img 
            src={safeElement.content} 
            alt="Greeting card image"
            className={`object-contain rounded ${sizeClasses[safeElement.size]}`}
          />
        </div>
      );
    }
  }

  return (
    <div className="w-full mb-4 border border-border rounded-md p-3 bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <ImageIcon size={16} className="text-muted-foreground" />
          <span className="font-medium">Image</span>
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">Image URL</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="url" className="pt-2">
              <div className="flex gap-2">
                <Input
                  value={element.content}
                  onChange={(e) => onChange({ ...element, content: e.target.value })}
                  placeholder="Enter image URL..."
                  className="w-full"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(element.content, '_blank')}
                  disabled={!element.content}
                >
                  <ExternalLink size={14} />
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="upload" className="pt-2">
              <div className="flex flex-col gap-2">
                <Input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
                <div className="text-xs text-muted-foreground">
                  Accepted formats: JPG, PNG, GIF (max 2MB)
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {element.content && (
            <div className="relative w-full max-w-[200px] mx-auto mt-4">
              <img 
                src={element.content} 
                alt="Preview" 
                className="w-full h-auto object-contain rounded-md border"
              />
              <Button 
                size="sm" 
                variant="ghost" 
                className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full bg-black/30 hover:bg-black/50"
                onClick={() => onChange({ ...element, content: "" })}
              >
                <X size={12} className="text-white" />
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2 pt-3">
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
          {element.content ? (
            <img 
              src={element.content} 
              alt="Greeting card image" 
              className="max-h-[100px] object-contain"
            />
          ) : (
            <div className="flex flex-col items-center text-muted-foreground">
              <Upload size={24} />
              <span className="text-sm">No image selected</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageElement;
