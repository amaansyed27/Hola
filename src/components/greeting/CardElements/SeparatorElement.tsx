import { CardElement } from "@/types/greeting";
import { Button } from "@/components/ui/button";
import { Minus, MoveVertical, ChevronUp, ChevronDown, Settings } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SeparatorElementProps {
  element: CardElement;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  theme?: { accentColorClass: string };
  preview?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

const SeparatorElement = ({ 
  element,
  onRemove, 
  onMoveUp,
  onMoveDown,
  theme,
  preview = false,
  isFirst = false,
  isLast = false
}: SeparatorElementProps) => {
  const [expanded, setExpanded] = useState(false);
  const [style, setStyle] = useState(element.style?.style || "solid");
  const [width, setWidth] = useState(element.style?.width || "medium");
  
  if (preview) {
    let widthClass = "w-16";
    if (width === "thin") widthClass = "w-12";
    if (width === "wide") widthClass = "w-24";
    if (width === "full") widthClass = "w-full";
    
    let borderStyle = "border-t-2";
    if (style === "dashed") borderStyle = "border-t-2 border-dashed";
    if (style === "dotted") borderStyle = "border-t-2 border-dotted";
    if (style === "double") borderStyle = "border-t-4 border-double";
    
    return (
      <div className="w-full my-4 flex justify-center">
        <hr className={`${widthClass} ${borderStyle} ${theme?.accentColorClass?.replace('text-', 'border-') || 'border-gray-300'}`} />
      </div>
    );
  }

  return (
    <div className="element-controls group border border-border bg-card">
      <div className="element-controls-header">
        <div className="element-type-icon">
          <Minus size={16} className="text-muted-foreground" />
          <span className="font-medium">Separator</span>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setExpanded(!expanded)}
                  disabled={isFirst}
                >
                  <Settings size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit separator settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={onMoveUp}
                  disabled={isFirst}
                >
                  <ChevronUp size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Move up</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={onMoveDown}
                  disabled={isLast}
                >
                  <ChevronDown size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Move down</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRemove}
            className="text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Remove
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="element-content-editor bg-muted/40 dark:bg-muted/20">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium">Line Style</label>
              <Select 
                value={style} 
                onValueChange={setStyle}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Line Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium">Width</label>
              <Select 
                value={width} 
                onValueChange={setWidth}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Width" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="thin">Thin</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="wide">Wide</SelectItem>
                  <SelectItem value="full">Full Width</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      <div className="p-2 mt-2 bg-muted/40 dark:bg-muted/20 rounded flex items-center justify-center">
        <hr className={`
          ${width === "thin" ? "w-12" : width === "wide" ? "w-24" : width === "full" ? "w-full" : "w-16"} 
          ${style === "dashed" ? "border-t-2 border-dashed" : 
             style === "dotted" ? "border-t-2 border-dotted" : 
             style === "double" ? "border-t-4 border-double" : "border-t-2"} 
          border-border
        `} />
      </div>
    </div>
  );
};

export default SeparatorElement;
