import { useState, useEffect } from "react";
import { Greeting, CardElement } from "@/types/greeting";
import { getThemeById } from "@/utils/greetingData";
import ElementsManager from "./ElementsManager";
import ScrollEffectsHandler from "./ScrollEffectsHandler";
import "./greeting-animations.css";

interface GreetingCardProps {
  greeting: Greeting;
  isAnimated?: boolean;
  fullCard?: boolean;
}

const GreetingCard = ({ greeting, isAnimated = false, fullCard = true }: GreetingCardProps) => {
  const predefinedTheme = getThemeById(greeting.themeId);
  const theme = greeting.customTheme || predefinedTheme; // Use customTheme if available, otherwise fallback to predefinedTheme
  const [showElements, setShowElements] = useState(!isAnimated);
  const [animationKey, setAnimationKey] = useState(Date.now());

  useEffect(() => {
    if (isAnimated) {
      setShowElements(false);
      // Reset animation by updating key
      setAnimationKey(Date.now());

      const timer = setTimeout(() => {
        setShowElements(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isAnimated, greeting.animationType]);

  if (!theme) {
    // Return a fallback card if theme is not found
    return (
      <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl shadow-xl p-8 md:p-10 max-w-md mx-auto w-full flex flex-col items-center overflow-y-auto">
        <p className="text-white">Theme not found</p>
      </div>
    );
  }

  // Get card elements from greeting or use defaults
  const cardElements = greeting.elements && greeting.elements.length > 0
    ? greeting.elements
    : getDefaultElements();

  const getAnimationClass = () => {
    switch (greeting.animationType) {
      case 'fade':
        return 'animate-fade-in';
      case 'slide':
        return 'animate-slide-up';
      case 'scale':
        return 'animate-scale-in';
      case 'bounce':
        return 'animate-bounce';
      case 'rotate':
        return 'animate-rotate';
      case 'flip':
        return 'animate-flip';
      case 'pulse':
        return 'animate-pulse';
      case 'glitter':
        return 'animate-glitter';
      case 'shake':
        return 'animate-shake';
      case 'swing':
        return 'animate-swing';
      case 'float':
        return 'animate-float';
      case 'reveal':
        return 'animate-reveal';
      case 'sparkle':
        return 'animate-sparkle';
      default:
        return '';
    }
  };

  // Create card background style based on theme settings
  const cardStyle: React.CSSProperties = {};

  if (theme.backgroundImage) {
    // Custom background image
    cardStyle.backgroundImage = `url("${theme.backgroundImage}")`;
    cardStyle.backgroundSize = 'cover';
    cardStyle.backgroundPosition = 'center';
  } else if (theme.backgroundGradient) {
    // For gradients, we'll set the background directly
    cardStyle.background = theme.backgroundGradient;

    // For animated gradients, apply animation properties directly to the style
    if (theme.animatedGradient) {
      cardStyle.backgroundSize = '200% 200%';
      cardStyle.animation = 'gradient-animation 5s ease infinite';
      // Force GPU acceleration
      cardStyle.willChange = 'background-position';
    }
  }

  // Add custom text color if specified
  const textColor = theme.customTextColor || null;

  // Create getDefaultElements function here to match existing implementation
  function getDefaultElements(): CardElement[] {
    const defaultIcon = greeting.occasion === 'birthday' ? 'party-popper' : 
                        greeting.occasion === 'anniversary' ? 'heart' :
                        greeting.occasion === 'festival' ? 'gift' :
                        greeting.occasion === 'congratulations' ? 'award' :
                        greeting.occasion === 'thankyou' ? 'thumbs-up' : 'smile';

    const defaultHeading = greeting.occasion === 'birthday' ? 'Happy Birthday!' : 
                           greeting.occasion === 'anniversary' ? 'Happy Anniversary!' :
                           greeting.occasion === 'festival' ? 'Happy Celebrations!' :
                           greeting.occasion === 'congratulations' ? 'Congratulations!' :
                           greeting.occasion === 'thankyou' ? 'Thank You!' : 'Hello!';

    const recipientName = greeting.recipientName || "Friend";
    const senderName = greeting.senderName || "Me";

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
        content: `Dear ${recipientName},`,
        size: "medium",
        alignment: "center"
      },
      {
        id: "default-message",
        type: "text",
        content: greeting.message || "Have a wonderful day!",
        size: "medium",
        alignment: "center"
      },
      {
        id: "default-sender",
        type: "text",
        content: `With love,\n${senderName}`,
        size: "medium",
        alignment: "center"
      }
    ];
  }

  // Determine which CSS classes to apply
  const backgroundClass = theme.backgroundImage || theme.backgroundGradient 
    ? '' 
    : theme.backgroundClass;

  const cardClasses = `
    ${backgroundClass} 
    rounded-xl shadow-xl 
    p-8 md:p-10 
    w-full 
    flex flex-col items-center 
    overflow-y-auto 
    ${fullCard ? 'greeting-card-fullsize' : 'max-w-md mx-auto'}
    ${isAnimated && showElements ? getAnimationClass() : ''}
  `;

  return (
    <div 
      className={cardClasses}
      style={cardStyle}
      key={animationKey}
    >
      {showElements && (
        <>
          <ScrollEffectsHandler />
          <ElementsManager 
            elements={greeting.elements || []}
            onChange={() => {}} // No changes allowed in preview mode
            theme={theme}
            preview={true}
            customTextColor={textColor}
          />
        </>
      )}
    </div>
  );
};

export default GreetingCard;
