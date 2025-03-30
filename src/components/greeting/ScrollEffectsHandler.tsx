
import { useEffect } from 'react';

const ScrollEffectsHandler = () => {
  useEffect(() => {
    // Function to check if an element is in the viewport
    const isInViewport = (element: Element): boolean => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    };

    // Function to handle scroll and apply visible class to elements with scroll effects
    const handleScroll = () => {
      const elements = document.querySelectorAll('[data-scroll-effect]');
      
      elements.forEach((element) => {
        if (isInViewport(element)) {
          const effect = element.getAttribute('data-scroll-effect');
          if (effect && effect !== 'none') {
            element.classList.add('visible');
          }
        }
      });
    };

    // Initial check on mount
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
};

export default ScrollEffectsHandler;
