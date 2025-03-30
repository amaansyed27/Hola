import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { GripVertical } from "lucide-react";
import { CardElement, GreetingTheme } from "@/types/greeting";
import TextElement from "./CardElements/TextElement";
import ImageElement from "./CardElements/ImageElement";
import IconElement from "./CardElements/IconElement";
import SeparatorElement from "./CardElements/SeparatorElement";
import EmojiElement from "./CardElements/EmojiElement";
import StickerElement from "./CardElements/StickerElement";

interface ElementsManagerProps {
  elements: CardElement[];
  onChange: (elements: CardElement[]) => void;
  preview?: boolean;
  theme?: GreetingTheme;
  customTextColor?: string | null;
}

const ElementsManager = ({ 
  elements, 
  onChange, 
  preview = false,
  theme,
  customTextColor = null
}: ElementsManagerProps) => {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onChange(items);
  };

  const handleElementChange = (index: number) => (updatedElement: CardElement) => {
    const newElements = [...elements];
    newElements[index] = updatedElement;
    onChange(newElements);
  };

  const handleRemoveElement = (index: number) => () => {
    const newElements = [...elements];
    newElements.splice(index, 1);
    onChange(newElements);
  };

  const handleMoveElement = (index: number, direction: 'up' | 'down') => () => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === elements.length - 1)) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const newElements = [...elements];
    const [removed] = newElements.splice(index, 1);
    newElements.splice(newIndex, 0, removed);
    onChange(newElements);
  };

  const renderElement = (element: CardElement, index: number) => {
    switch (element.type) {
      case 'text':
      case 'heading':
        return (
          <TextElement 
            key={index}
            element={element}
            onChange={handleElementChange(index)}
            onRemove={handleRemoveElement(index)}
            theme={theme}
            preview={preview}
            customTextColor={customTextColor}
          />
        );
      case 'image':
        return (
          <ImageElement
            key={index}
            element={element}
            onChange={handleElementChange(index)}
            onRemove={handleRemoveElement(index)}
            preview={preview}
          />
        );
      case 'icon':
        return (
          <IconElement
            key={index}
            element={element}
            onChange={handleElementChange(index)}
            onRemove={handleRemoveElement(index)}
            theme={theme}
            preview={preview}
          />
        );
      case 'separator':
        return (
          <SeparatorElement
            key={index}
            element={element}
            onRemove={handleRemoveElement(index)}
            onMoveUp={handleMoveElement(index, 'up')}
            onMoveDown={handleMoveElement(index, 'down')}
            theme={theme}
            preview={preview}
            isFirst={index === 0}
            isLast={index === elements.length - 1}
          />
        );
      case 'emoji':
        return (
          <EmojiElement
            key={index}
            element={element}
            onChange={handleElementChange(index)}
            onRemove={handleRemoveElement(index)}
            preview={preview}
          />
        );
      case 'sticker':
        return (
          <StickerElement
            key={index}
            element={element}
            onChange={handleElementChange(index)}
            onRemove={handleRemoveElement(index)}
            preview={preview}
          />
        );
      default:
        return <div key={index}>Unknown element type</div>;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="elements-list">
        {(provided) => (
          <div 
            className="space-y-4" 
            {...provided.droppableProps} 
            ref={provided.innerRef}
          >
            {elements.map((element, index) => (
              <Draggable key={element.id} draggableId={element.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="draggable-item"
                  >
                    <div className="flex items-center">
                      {!preview && (
                        <div {...provided.dragHandleProps} className="cursor-grab mr-2">
                          <GripVertical size={16} className="text-muted-foreground" />
                        </div>
                      )}
                      {renderElement(element, index)}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ElementsManager;
