import { useState, useEffect, useRef } from 'react';
import { ContinuousEffectType } from '@/types/greeting';

interface ContinuousEffectsProps {
  effect: ContinuousEffectType;
  enabled: boolean;
}

const ContinuousEffects = ({ effect, enabled = true }: ContinuousEffectsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(enabled);
  const animationFrameRef = useRef<number | null>(null);
  
  useEffect(() => {
    setIsActive(enabled);
  }, [enabled]);
  
  useEffect(() => {
    if (!effect || effect === 'none' || !isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    let lastTime = 0;
    let particles: HTMLDivElement[] = [];
    
    // Rate of particles creation per second
    const particleRate = {
      confetti: 15,
      bubbles: 5,
      sparkles: 12,
      hearts: 8,
      stars: 6
    };
    
    // Colors for different effects
    const colors = {
      confetti: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f9d56e", "#ff8c94", "#9b5de5"],
      bubbles: ["#88d8b0", "#a6e3e9", "#71c9ce", "#cbf1f5"],
      sparkles: ["#ffd700", "#ffec99", "#ffeb3b", "#fff9c4"],
      hearts: ["#ff6b6b", "#ff8fab", "#f08080", "#ffb3c6"],
      stars: ["#ffd700", "#f8ed62", "#fff263", "#ffdf00"]
    };
    
    const createParticle = (timestamp: number) => {
      if (!container) return;
      
      const currentRate = particleRate[effect as keyof typeof particleRate] || 10;
      const interval = 1000 / currentRate;
      
      if (timestamp - lastTime > interval) {
        const particle = document.createElement('div');
        const size = Math.random() * 10 + 5;
        
        // Common properties
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.pointerEvents = 'none';
        
        const currentColors = colors[effect as keyof typeof colors] || colors.confetti;
        const color = currentColors[Math.floor(Math.random() * currentColors.length)];
        
        // Effect-specific styling
        switch(effect) {
          case 'confetti':
            particle.style.backgroundColor = color;
            particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            particle.style.top = `-${size}px`;
            particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            particle.style.animation = `fall-confetti ${Math.random() * 3 + 3}s linear forwards`;
            break;
            
          case 'bubbles':
            particle.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            particle.style.border = `1px solid ${color}`;
            particle.style.borderRadius = '50%';
            particle.style.bottom = `-${size}px`;
            particle.style.animation = `rise-bubble ${Math.random() * 4 + 4}s ease-in forwards`;
            break;
            
          case 'sparkles':
            particle.innerHTML = '✨';
            particle.style.color = color;
            particle.style.fontSize = `${size * 1.5}px`;
            particle.style.top = `-${size}px`;
            particle.style.animation = `fall-sparkle ${Math.random() * 2 + 2}s linear forwards`;
            break;
            
          case 'hearts':
            particle.innerHTML = '❤️';
            particle.style.fontSize = `${size * 1.5}px`;
            particle.style.bottom = `-${size}px`;
            particle.style.animation = `float-heart ${Math.random() * 5 + 3}s ease-out forwards`;
            break;
            
          case 'stars':
            particle.innerHTML = '⭐';
            particle.style.fontSize = `${size * 1.5}px`;
            particle.style.top = `-${size}px`;
            particle.style.animation = `twinkle-star ${Math.random() * 4 + 3}s ease-in-out forwards`;
            break;
        }
        
        container.appendChild(particle);
        particles.push(particle);
        
        // Remove particles after animation completes to avoid memory issues
        setTimeout(() => {
          if (particle.parentNode === container) {
            container.removeChild(particle);
            particles = particles.filter(p => p !== particle);
          }
        }, 8000);
        
        lastTime = timestamp;
      }
    };
    
    const animate = (timestamp: number) => {
      createParticle(timestamp);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Cleanup on unmount
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      particles.forEach(p => {
        if (p.parentNode === container) {
          container.removeChild(p);
        }
      });
      particles = [];
    };
  }, [effect, isActive]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-10"></div>
  );
};

export default ContinuousEffects;
