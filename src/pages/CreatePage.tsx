import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Image as ImageIcon, 
  Palette, 
  Wand2,
  Upload,
  Trash2,
  X,
  SlidersHorizontal,
  BookOpen,
  PenTool,
  Eye,
  PlusCircle,
  Layout,
  LayoutGrid,
  Minus,
  Type,
  Heading1,
  MoveDown,
  TextCursorInput
} from "lucide-react";
import Header from "@/components/layout/Header";
import GreetingCard from "@/components/greeting/GreetingCard";
import ElementsManager from "@/components/greeting/ElementsManager";
import { 
  generateGreetingId, 
  saveGreeting, 
  occasionOptions, 
  greetingThemes,
  getThemesByOccasion,
  animationTypes,
  continuousEffectTypes,
  getThemeById,
  getDefaultElements
} from "@/utils/greetingData";
import { createOrUpdateGreetingBlob } from "@/utils/api";
import { Greeting, GreetingType, CardElement, ElementType, GreetingTheme, TextAnimationType, ScrollEffectType, ContinuousEffectType } from "@/types/greeting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const textAnimationOptions = [
  { id: 'none', name: 'None' },
  { id: 'typing', name: 'Typing Effect' },
  { id: 'wave', name: 'Wave' },
  { id: 'bounce', name: 'Bounce' },
  { id: 'flip', name: 'Flip' },
  { id: 'fade', name: 'Fade In/Out' },
  { id: 'glow', name: 'Glow' },
  { id: 'shimmer', name: 'Shimmer' },
  { id: 'rainbow', name: 'Rainbow' },
];

const scrollEffectOptions = [
  { id: 'none', name: 'None' },
  { id: 'fade-in', name: 'Fade In' },
  { id: 'slide-up', name: 'Slide Up' },
  { id: 'zoom-in', name: 'Zoom In' },
  { id: 'rotate-in', name: 'Rotate In' },
];

const CreatePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [greeting, setGreeting] = useState<Partial<Greeting>>({
    recipientName: "",
    senderName: "",
    message: "",
    occasion: "birthday" as GreetingType,
    themeId: greetingThemes[0].id,
    animationType: "fade",
    continuousEffect: "none" as ContinuousEffectType,
    continuousEffectEnabled: true,
  });
  
  const [elements, setElements] = useState<CardElement[]>([]);
  const [isElementsInitialized, setIsElementsInitialized] = useState(false);
  
  const [availableThemes, setAvailableThemes] = useState(
    getThemesByOccasion(greeting.occasion as GreetingType)
  );

  const [customBackgroundType, setCustomBackgroundType] = useState<"image" | "gradient">("gradient");
  const [customBackgroundImage, setCustomBackgroundImage] = useState<string>("");
  const [gradientStart, setGradientStart] = useState<string>("#8B5CF6");
  const [gradientEnd, setGradientEnd] = useState<string>("#EC4899");
  const [animatedGradient, setAnimatedGradient] = useState<boolean>(false);
  const [showElementsHelp, setShowElementsHelp] = useState(true);
  
  useEffect(() => {
    if (!isElementsInitialized) {
      const defaultElements = getDefaultElements(
        greeting.occasion as GreetingType,
        greeting.recipientName || '',
        greeting.senderName || '',
        greeting.message || ''
      );
      
      setElements(defaultElements);
      setIsElementsInitialized(true);
    }
  }, []);

  const handleBasicInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGreeting((prev) => ({ ...prev, [name]: value }));
    
    if (name === 'recipientName' || name === 'senderName' || name === 'message') {
      updateElementsByFieldName(name, value);
    }
  };

  const updateElementsByFieldName = (field: string, value: string) => {
    setElements(prevElements => 
      prevElements.map(el => {
        if (field === 'recipientName' && el.content && el.content.includes('Dear')) {
          return { ...el, content: `Dear ${value || "Friend"},` };
        }
        if (field === 'senderName' && el.content && el.content.includes('With love')) {
          return { ...el, content: `With love,\n${value || "Me"}` };
        }
        if (field === 'message' && el.type === 'text' && 
            !el.content.includes('Dear') && !el.content.includes('With love')) {
          return { ...el, content: value || "Wishing you a wonderful day filled with joy and happiness!" };
        }
        return el;
      })
    );
  };

  const handleOccasionChange = (value: string) => {
    const newOccasion = value as GreetingType;
    const themes = getThemesByOccasion(newOccasion);
    setAvailableThemes(themes);
    
    if (!themes.find(theme => theme.id === greeting.themeId)) {
      setGreeting(prev => ({ 
        ...prev, 
        occasion: newOccasion,
        themeId: themes[0]?.id || greetingThemes[0].id
      }));
    } else {
      setGreeting(prev => ({ ...prev, occasion: newOccasion }));
    }
    
    updateElementsByOccasion(newOccasion);
  };

  const updateElementsByOccasion = (occasion: GreetingType) => {
    const occasionText = {
      'birthday': 'Happy Birthday!',
      'anniversary': 'Happy Anniversary!',
      'festival': 'Happy Celebrations!',
      'congratulations': 'Congratulations!',
      'thankyou': 'Thank You!',
      'general': 'Hello!'
    };
    
    const iconMapping = {
      'birthday': 'party-popper',
      'anniversary': 'heart',
      'festival': 'gift',
      'congratulations': 'award',
      'thankyou': 'thumbs-up',
      'general': 'smile'
    };
    
    setElements(prevElements => 
      prevElements.map(el => {
        if (el.type === 'heading') {
          return { ...el, content: occasionText[occasion] };
        }
        if (el.type === 'icon') {
          return { ...el, content: iconMapping[occasion] };
        }
        return el;
      })
    );
  };

  const handleThemeChange = (value: string) => {
    setGreeting(prev => ({ ...prev, themeId: value }));
  };

  const handleAnimationChange = (value: string) => {
    setGreeting(prev => ({ ...prev, animationType: value }));
  };

  const handleContinuousEffectChange = (value: string) => {
    setGreeting(prev => ({ 
      ...prev, 
      continuousEffect: value as ContinuousEffectType 
    }));
  };

  const handleElementsChange = (updatedElements: CardElement[]) => {
    setElements(updatedElements);
  };

  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        setCustomBackgroundImage(imageData);
        
        const customThemeId = "custom-theme-" + Date.now();
        
        const customTheme: GreetingTheme = {
          id: customThemeId,
          name: "Custom Image",
          backgroundClass: "",
          textColorClass: "text-white",
          accentColorClass: "text-white",
          occasionTypes: [greeting.occasion as GreetingType],
          custom: true,
          backgroundImage: imageData
        };
        
        const updatedThemes = [...availableThemes.filter(theme => !theme.custom), customTheme];
        setAvailableThemes(updatedThemes);
        
        setGreeting(prev => ({
          ...prev,
          themeId: customThemeId,
          customTheme, // Embed the custom theme in the greeting data
        }));

        toast({
          title: "Image uploaded",
          description: "Custom background image applied successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGradientChange = () => {
    const customThemeId = "custom-gradient-" + Date.now();
    
    const gradientString = `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`;
    
    const customTheme: GreetingTheme = {
      id: customThemeId,
      name: "Custom Gradient",
      backgroundClass: "", 
      textColorClass: "text-white",
      accentColorClass: "text-white",
      occasionTypes: [greeting.occasion as GreetingType],
      custom: true,
      backgroundGradient: gradientString,
      animatedGradient: animatedGradient
    };
    
    const newThemes = [...availableThemes.filter(theme => !theme.custom), customTheme];
    setAvailableThemes(newThemes);
    
    setTimeout(() => {
      setGreeting(prev => ({
        ...prev,
        themeId: customThemeId,
        customTheme, // Embed the custom theme in the greeting data
      }));
    }, 0);
    
    toast({
      title: "Gradient applied",
      description: animatedGradient ? "Animated gradient background applied" : "Gradient background applied",
    });
  };

  const resetCustomBackground = () => {
    setAvailableThemes(prev => prev.filter(theme => !theme.custom));
    const defaultTheme = getThemesByOccasion(greeting.occasion as GreetingType)[0];
    setGreeting(prev => ({ ...prev, themeId: defaultTheme.id }));
    setCustomBackgroundImage("");
  };

  const handleTextAnimationChange = (textAnimation: TextAnimationType) => {
    setElements(prevElements => 
      prevElements.map(el => {
        if (el.type === 'text' || el.type === 'heading') {
          return { ...el, textAnimation };
        }
        return el;
      })
    );
    
    toast({
      title: "Text animation applied",
      description: `Applied "${textAnimation}" animation to all text elements`,
    });
  };

  const handleScrollEffectChange = (scrollEffect: ScrollEffectType) => {
    setElements(prevElements => 
      prevElements.map(el => {
        if (el.type === 'text' || el.type === 'heading') {
          return { ...el, scrollEffect };
        }
        return el;
      })
    );
    
    toast({
      title: "Scroll effect applied",
      description: `Applied "${scrollEffect}" scroll effect to all text elements`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const completeGreeting: Greeting = {
      ...greeting as Greeting,
      id: generateGreetingId(),
      createdAt: Date.now(),
      message: greeting.message || "",
      elements: elements,
    };

    try {
      await createOrUpdateGreetingBlob(completeGreeting.id, completeGreeting); // Save greeting by ID
      toast({
        title: "Greeting created!",
        description: "Your greeting has been created successfully.",
      });
      navigate(`/preview/${completeGreeting.id}`); // Navigate to preview page with greeting ID
    } catch (error) {
      console.error("Error saving greeting blob:", error);
      toast({
        title: "Error",
        description: "Failed to create greeting. Please try again.",
        variant: "destructive",
      });
    }
  };

  const currentTheme = getThemeById(greeting.themeId || "");
  
  const previewGreeting: Greeting = {
    ...greeting as Greeting,
    id: "preview",
    createdAt: Date.now(),
    elements: elements,
    customTheme: greeting.customTheme, // Ensure customTheme is passed to the preview
  };

  const elementTypes = [
    { id: 'heading', label: 'Heading', icon: <Layout size={16} /> },
    { id: 'text', label: 'Text', icon: <PenTool size={16} /> },
    { id: 'image', label: 'Image', icon: <ImageIcon size={16} /> },
    { id: 'icon', label: 'Icon', icon: <Sparkles size={16} /> },
    { id: 'separator', label: 'Separator', icon: <Minus size={16} /> },
    { id: 'emoji', label: 'Emoji', icon: <BookOpen size={16} /> },
    { id: 'sticker', label: 'Sticker', icon: <LayoutGrid size={16} /> },
  ];

  const handleAddElement = (type: ElementType) => {
    setShowElementsHelp(false);
    
    // Generate a unique ID for the new element
    const newElementId = `${type}-${Date.now()}`;
    
    // Create a new element based on the type
    let newElement: CardElement;
    
    switch (type) {
      case 'heading':
        newElement = {
          id: newElementId,
          type: 'heading',
          content: 'New Heading',
          size: 'large',
          alignment: 'center',
        };
        break;
      case 'text':
        newElement = {
          id: newElementId,
          type: 'text',
          content: 'Enter your text here',
          size: 'medium',
          alignment: 'center',
        };
        break;
      case 'image':
        newElement = {
          id: newElementId,
          type: 'image',
          content: '',
          size: 'medium',
          alignment: 'center',
        };
        break;
      case 'icon':
        newElement = {
          id: newElementId,
          type: 'icon',
          content: 'heart',
          size: 'medium',
          alignment: 'center',
        };
        break;
      case 'separator':
        newElement = {
          id: newElementId,
          type: 'separator',
          content: '',
          style: {
            style: 'solid',
            width: 'medium',
          },
        };
        break;
      case 'emoji':
        newElement = {
          id: newElementId,
          type: 'emoji',
          content: '😊',
          size: 'medium',
          alignment: 'center',
        };
        break;
      case 'sticker':
        newElement = {
          id: newElementId,
          type: 'sticker',
          content: '🎉',
          size: 'medium',
          alignment: 'center',
        };
        break;
      default:
        return;
    }
    
    // Add the new element to the elements array
    setElements(prevElements => [...prevElements, newElement]);
    
    // Show success toast
    toast({
      title: "Element added",
      description: `Added new ${type} element to your card`,
    });
  };

  const handleAnimationPreview = () => {
    const currentAnimation = greeting.animationType;
    
    setGreeting(prev => ({ ...prev, animationType: "none" }));
    
    setTimeout(() => {
      setGreeting(prev => ({ ...prev, animationType: currentAnimation }));
    }, 50);
    
    toast({
      title: "Preview animation",
      description: `Previewing "${currentAnimation}" animation`,
    });
  };

  const handleTextColorChange = (color: string) => {
    const customThemeId = greeting.themeId.startsWith("custom") ? greeting.themeId : "custom-text-" + Date.now();

    const currentTheme = getThemeById(greeting.themeId) || availableThemes[0];

    const customTheme: GreetingTheme = {
      ...currentTheme,
      id: customThemeId,
      name: "Custom Theme",
      textColorClass: "", // We'll override with inline style
      accentColorClass: "", // We'll override with inline style
      occasionTypes: [greeting.occasion as GreetingType],
      custom: true,
      customTextColor: color // Ensure customTextColor is included
    };

    const newThemes = [...availableThemes.filter(theme => theme.id !== customThemeId), customTheme];
    setAvailableThemes(newThemes);

    setGreeting(prev => ({
      ...prev,
      themeId: customThemeId,
      customTheme // Embed the updated custom theme in the greeting data
    }));

    try {
      const customThemesStr = localStorage.getItem('hola-custom-themes') || '[]';
      const customThemes = JSON.parse(customThemesStr) as GreetingTheme[];
      localStorage.setItem('hola-custom-themes', JSON.stringify([
        ...customThemes.filter(t => t.id !== customThemeId),
        customTheme
      ]));
    } catch (error) {
      console.error("Error saving custom theme:", error);
    }

    toast({
      title: "Text color updated",
      description: "Custom text color applied to card",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold font-display gradient-text">
                Create Your Greeting
              </h1>
              <p className="text-muted-foreground mt-2">
                Customize your greeting and share it with your loved ones
              </p>
            </div>
            
            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-3">
                <Tabs defaultValue="content" className="space-y-6">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="content" className="flex items-center gap-1.5">
                      <PenTool size={14} />
                      <span>Content</span>
                    </TabsTrigger>
                    <TabsTrigger value="elements" className="flex items-center gap-1.5">
                      <LayoutGrid size={14} />
                      <span>Elements</span>
                    </TabsTrigger>
                    <TabsTrigger value="design" className="flex items-center gap-1.5">
                      <Palette size={14} />
                      <span>Design</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="bg-card p-6 rounded-xl shadow-sm border">
                    <form className="space-y-6">
                      <div className="space-y-4">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                          <Sparkles size={18} className="text-hola-purple" />
                          Basic Information
                        </h2>
                        
                        <div className="space-y-2">
                          <Label htmlFor="occasion">Occasion</Label>
                          <Select 
                            value={greeting.occasion} 
                            onValueChange={handleOccasionChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select occasion" />
                            </SelectTrigger>
                            <SelectContent>
                              {occasionOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="recipientName">Recipient's Name</Label>
                          <Input
                            id="recipientName"
                            name="recipientName"
                            value={greeting.recipientName}
                            onChange={handleBasicInfoChange}
                            placeholder="Enter recipient's name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="senderName">Your Name</Label>
                          <Input
                            id="senderName"
                            name="senderName"
                            value={greeting.senderName}
                            onChange={handleBasicInfoChange}
                            placeholder="Enter your name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={greeting.message}
                            onChange={handleBasicInfoChange}
                            placeholder="Write your message..."
                            rows={5}
                          />
                        </div>
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="elements" className="bg-card p-6 rounded-xl shadow-sm border">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                          <LayoutGrid size={18} className="text-hola-purple" />
                          Card Elements
                        </h2>
                        
                        <div className="flex items-center gap-2">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setShowElementsHelp(!showElementsHelp)}
                                >
                                  {showElementsHelp ? <Eye size={14} /> : <SlidersHorizontal size={14} />}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{showElementsHelp ? "Hide help" : "Show help"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                      
                      {showElementsHelp && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-md text-sm mb-4">
                          <h3 className="font-medium mb-2">Customize Your Card</h3>
                          <p>Add, remove, and rearrange elements to create a personalized greeting card. You can:</p>
                          <ul className="list-disc ml-5 mt-2 space-y-1">
                            <li>Click the add button below to add new elements</li>
                            <li>Drag elements to reorder them</li>
                            <li>Edit each element's content and style</li>
                            <li>Remove elements you don't want</li>
                          </ul>
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        {isElementsInitialized ? (
                          <ElementsManager
                            elements={elements}
                            onChange={handleElementsChange}
                            theme={currentTheme}
                          />
                        ) : (
                          <div className="flex items-center justify-center h-64">
                            <p className="text-muted-foreground">Loading elements...</p>
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mt-6">
                          <h3 className="w-full text-sm font-medium mb-1">Add Elements:</h3>
                          {elementTypes.map((type) => (
                            <Button 
                              key={type.id}
                              variant="outline" 
                              size="sm"
                              className="flex items-center gap-1 h-8"
                              onClick={() => handleAddElement(type.id as ElementType)}
                            >
                              {type.icon}
                              <span>{type.label}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="design" className="bg-card p-6 rounded-xl shadow-sm border">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Palette size={18} className="text-hola-purple" />
                        Card Design
                      </h2>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="themeId">Choose a Theme</Label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                            {availableThemes.filter(theme => !theme.custom).map((theme) => (
                              <div 
                                key={theme.id} 
                                className={`
                                  ${theme.backgroundClass} 
                                  h-24 rounded-md cursor-pointer 
                                  relative flex items-center justify-center
                                  transition-all duration-200 hover:scale-105
                                  ${theme.id === greeting.themeId ? 'ring-2 ring-offset-2 ring-hola-purple dark:ring-offset-background' : ''}
                                `}
                                onClick={() => handleThemeChange(theme.id)}
                              >
                                {theme.id === greeting.themeId && (
                                  <div className="absolute top-2 right-2 bg-background dark:bg-card rounded-full p-1">
                                    <Check size={14} className="text-hola-purple" />
                                  </div>
                                )}
                                <span className={`${theme.textColorClass} font-medium`}>{theme.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="border border-border rounded-md p-4 mt-4 space-y-4">
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            <Wand2 size={18} className="text-hola-purple" />
                            Custom Background
                          </h3>
                          
                          <Tabs value={customBackgroundType} onValueChange={(v) => setCustomBackgroundType(v as "image" | "gradient")}>
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="image" className="flex items-center gap-1">
                                <ImageIcon size={14} />
                                <span>Image</span>
                              </TabsTrigger>
                              <TabsTrigger value="gradient" className="flex items-center gap-1">
                                <Palette size={14} />
                                <span>Gradient</span>
                              </TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="image" className="pt-4 space-y-3">
                              <div className="flex flex-col gap-3">
                                <Label>Upload Background Image</Label>
                                <Input 
                                  type="file" 
                                  accept="image/*" 
                                  onChange={handleBackgroundImageUpload}
                                  className="cursor-pointer"
                                />
                                <p className="text-xs text-muted-foreground">
                                  For best results, use an image with dimensions 800x600px or similar ratio
                                </p>
                                
                                {customBackgroundImage && (
                                  <div className="relative mt-2">
                                    <img 
                                      src={customBackgroundImage} 
                                      alt="Custom background" 
                                      className="w-full h-32 object-cover rounded-md"
                                    />
                                    <Button 
                                      variant="destructive" 
                                      size="sm"
                                      className="absolute top-2 right-2"
                                      onClick={resetCustomBackground}
                                    >
                                      <Trash2 size={14} />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="gradient" className="pt-4 space-y-3">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Start Color</Label>
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="w-8 h-8 rounded-full border"
                                      style={{ backgroundColor: gradientStart }}
                                    ></div>
                                    <Input 
                                      type="color" 
                                      value={gradientStart}
                                      onChange={(e) => setGradientStart(e.target.value)}
                                      className="w-full h-8"
                                    />
                                  </div>
                                </div>
                                
                                <div className="space-y-2">
                                  <Label>End Color</Label>
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="w-8 h-8 rounded-full border"
                                      style={{ backgroundColor: gradientEnd }}
                                    ></div>
                                    <Input 
                                      type="color" 
                                      value={gradientEnd}
                                      onChange={(e) => setGradientEnd(e.target.value)}
                                      className="w-full h-8"
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2 pt-2">
                                <Switch 
                                  id="animated-gradient"
                                  checked={animatedGradient}
                                  onCheckedChange={setAnimatedGradient}
                                />
                                <Label htmlFor="animated-gradient">Animate Gradient</Label>
                              </div>
                              
                              <div 
                                className="mt-3 h-20 rounded-md cursor-pointer"
                                style={{ background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})` }}
                              ></div>
                              
                              <div className="flex justify-between mt-3">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={resetCustomBackground}
                                  className="flex items-center gap-1"
                                >
                                  <X size={14} />
                                  <span>Reset</span>
                                </Button>
                                
                                <Button 
                                  size="sm"
                                  onClick={handleGradientChange}
                                  className="flex items-center gap-1"
                                >
                                  <Check size={14} />
                                  <span>Apply Gradient</span>
                                </Button>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </div>
                        
                        <div className="space-y-3 border-t border-border pt-4">
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            <Type size={18} className="text-hola-purple" />
                            Text Color
                          </h3>
                          
                          <div className="space-y-2">
                            <Label htmlFor="textColor">Custom Text Color</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <Input 
                                type="color" 
                                id="textColor"
                                defaultValue={currentTheme?.customTextColor || "#ffffff"}
                                onChange={(e) => handleTextColorChange(e.target.value)}
                                className="h-10"
                              />
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  const defaultTheme = getThemesByOccasion(greeting.occasion as GreetingType)[0];
                                  setGreeting(prev => ({ ...prev, themeId: defaultTheme.id }));
                                }}
                              >
                                Reset Text Color
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3 border-t border-border pt-4">
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            <TextCursorInput size={18} className="text-hola-purple" />
                            Text Animations
                          </h3>
                          
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="textAnimation">Animation Style</Label>
                              <div className="grid grid-cols-2 gap-2">
                                <Select 
                                  onValueChange={(value) => handleTextAnimationChange(value as TextAnimationType)}
                                  defaultValue="none"
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select text animation" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {textAnimationOptions.map((anim) => (
                                      <SelectItem key={anim.id} value={anim.id}>
                                        <div className="flex items-center gap-2">
                                          <Sparkles size={14} className="text-hola-purple" />
                                          <span>{anim.name}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleTextAnimationChange('none')}
                                >
                                  Reset Animations
                                </Button>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="scrollEffect">Scroll Effects</Label>
                              <div className="grid grid-cols-2 gap-2">
                                <Select 
                                  onValueChange={(value) => handleScrollEffectChange(value as ScrollEffectType)}
                                  defaultValue="none"
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select scroll effect" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {scrollEffectOptions.map((effect) => (
                                      <SelectItem key={effect.id} value={effect.id}>
                                        <div className="flex items-center gap-2">
                                          <MoveDown size={14} className="text-hola-purple" />
                                          <span>{effect.name}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleScrollEffectChange('none')}
                                >
                                  Reset Scroll Effects
                                </Button>
                              </div>
                              
                              <p className="text-xs text-muted-foreground mt-1">
                                Scroll effects will activate as users scroll through your card
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3 border-t border-border pt-4">
                          <h3 className="text-lg font-medium flex items-center gap-2">
                            <Sparkles size={18} className="text-hola-purple" />
                            Animation Effects
                          </h3>
                          
                          <div className="space-y-2">
                            <Label htmlFor="animation">Card Animation Style</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <Select 
                                value={greeting.animationType} 
                                onValueChange={handleAnimationChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select animation" />
                                </SelectTrigger>
                                <SelectContent className="max-h-72">
                                  <div className="grid grid-cols-1 gap-1">
                                    {animationTypes.map((anim) => (
                                      <SelectItem key={anim.id} value={anim.id}>
                                        <div className="flex items-center gap-2">
                                          <Sparkles size={14} className="text-hola-purple" />
                                          <span>{anim.name}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </div>
                                </SelectContent>
                              </Select>
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center gap-1"
                                onClick={handleAnimationPreview}
                              >
                                <Eye size={14} />
                                <span>Preview Animation</span>
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2 pt-4">
                            <Label htmlFor="continuousEffect">Continuous Effects</Label>
                            <div className="grid grid-cols-2 gap-2">
                              <Select 
                                value={greeting.continuousEffect || 'none'} 
                                onValueChange={handleContinuousEffectChange}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select continuous effect" />
                                </SelectTrigger>
                                <SelectContent>
                                  {continuousEffectTypes.map((effect) => (
                                    <SelectItem key={effect.id} value={effect.id}>
                                      <div className="flex items-center gap-2">
                                        <Sparkles size={14} className="text-hola-purple" />
                                        <span>{effect.name}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              <div className="flex items-center space-x-2 pl-2">
                                <Switch 
                                  id="continuous-effect-enabled"
                                  checked={greeting.continuousEffectEnabled}
                                  disabled={greeting.continuousEffect === "none"}
                                  onCheckedChange={(checked) => setGreeting(prev => ({ 
                                    ...prev, 
                                    continuousEffectEnabled: checked 
                                  }))}
                                />
                                <Label htmlFor="continuous-effect-enabled">
                                  Enable on load
                                </Label>
                              </div>
                            </div>
                            
                            <p className="text-xs text-muted-foreground mt-1">
                              Continuous effects like confetti or sparkles will play in the background of your greeting card.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6">
                  <Button 
                    onClick={handleSubmit} 
                    className="w-full gap-2"
                  >
                    <span>Preview Greeting</span>
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Card Preview</h2>
                <Card className="p-4 bg-card/50 backdrop-blur-sm flex items-center justify-center border">
                  {isElementsInitialized ? (
                    <div className="max-height-container overflow-y-auto w-full">
                      <GreetingCard greeting={previewGreeting} isAnimated={true} fullCard={true} />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 w-full">
                      <p className="text-muted-foreground">Loading preview...</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePage;
