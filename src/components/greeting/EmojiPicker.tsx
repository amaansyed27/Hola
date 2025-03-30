import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  selectedEmoji?: string;
}

// Emoji categories with their respective emoji sets
const EMOJI_CATEGORIES = {
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍'],
  people: ['👶', '👧', '🧒', '👦', '👩', '🧑', '👨', '👵', '🧓', '👴', '👲', '👳‍♀️', '👳‍♂️', '🧕', '👮‍♀️'],
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵'],
  food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝'],
  activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍'],
  travel: ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛴', '🚲'],
  objects: ['⌚', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼'],
  symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘'],
};

export function EmojiPicker({ onEmojiSelect, selectedEmoji = '😊' }: EmojiPickerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("smileys");

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
  };

  const filteredEmojis = searchQuery 
    ? Object.values(EMOJI_CATEGORIES).flat().filter(emoji => emoji.includes(searchQuery)) 
    : EMOJI_CATEGORIES[activeCategory as keyof typeof EMOJI_CATEGORIES] || [];

  return (
    <div className="border border-border rounded-md p-3 bg-card/50">
      <Input 
        type="text"
        placeholder="Search emoji..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-2"
      />
      
      {!searchQuery && (
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-4 mb-2">
            <TabsTrigger value="smileys">😊</TabsTrigger>
            <TabsTrigger value="people">👨</TabsTrigger>
            <TabsTrigger value="animals">🐶</TabsTrigger>
            <TabsTrigger value="food">🍔</TabsTrigger>
          </TabsList>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="activities">⚽</TabsTrigger>
            <TabsTrigger value="travel">✈️</TabsTrigger>
            <TabsTrigger value="objects">💡</TabsTrigger>
            <TabsTrigger value="symbols">❤️</TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      
      <div className="grid grid-cols-8 gap-2 mt-3 max-h-40 overflow-y-auto">
        {filteredEmojis.map((emoji, idx) => (
          <Button
            key={`${emoji}-${idx}`}
            variant={selectedEmoji === emoji ? "secondary" : "outline"}
            className="h-8 w-8 p-0 text-lg flex items-center justify-center"
            onClick={() => handleEmojiClick(emoji)}
          >
            {emoji}
          </Button>
        ))}
        {filteredEmojis.length === 0 && (
          <div className="col-span-8 text-center py-4 text-muted-foreground">
            No emojis found
          </div>
        )}
      </div>
    </div>
  );
}
