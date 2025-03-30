import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Gift, Share2, Send, Heart, PartyPopper, Cake, Github, Wand2, Sparkles, Smile } from "lucide-react";
import Header from "@/components/layout/Header";

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.scroll-section');
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.8) {
          section.classList.add('active');
        }
      });

      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once for initial view
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      {/* Hero Section with Animation */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight gradient-text animate-fade-in">
              Share Joy with Beautiful Greetings
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Create personalized digital cards for birthdays, anniversaries, festivals, and more. 
              Add animations, effects, and share instantly with a link.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/create">
                <Button size="lg" className="gap-2 text-base bg-gradient-to-r from-hola-purple to-hola-teal transition-all hover:shadow-lg hover:-translate-y-0.5">
                  <Sparkles size={18} />
                  <span>Create a Greeting</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 animate-float opacity-20 md:opacity-40">
          <Gift size={48} className="text-hola-purple" />
        </div>
        <div className="absolute top-1/3 right-10 animate-float opacity-20 md:opacity-40" style={{ animationDelay: "1s" }}>
          <Cake size={48} className="text-hola-pink" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-float opacity-20 md:opacity-40" style={{ animationDelay: "1.5s" }}>
          <Heart size={36} className="text-hola-orange" />
        </div>
        <div className="absolute top-2/3 right-1/4 animate-float opacity-20 md:opacity-40" style={{ animationDelay: "2s" }}>
          <PartyPopper size={32} className="text-hola-teal" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background/60 dark:from-background dark:to-background/95">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display gradient-text">Create with Ease</h2>
            <p className="text-lg text-muted-foreground">
              Design beautiful greeting cards in minutes with our intuitive tools and magical effects
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="scroll-section bg-card dark:bg-card/70 rounded-lg p-6 shadow-md flex flex-col items-center text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <div className="w-16 h-16 mb-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-hola-purple">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pick Your Occasion</h3>
              <p className="text-muted-foreground">Choose from birthdays, anniversaries, festivals, congratulations and more</p>
            </div>
            
            <div className="scroll-section bg-card dark:bg-card/70 rounded-lg p-6 shadow-md flex flex-col items-center text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1" style={{ transitionDelay: "0.2s" }}>
              <div className="w-16 h-16 mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-hola-teal">
                <Wand2 size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customize Everything</h3>
              <p className="text-muted-foreground">Personalize with messages, photos, animations, colors, and special effects</p>
            </div>
            
            <div className="scroll-section bg-card dark:bg-card/70 rounded-lg p-6 shadow-md flex flex-col items-center text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1" style={{ transitionDelay: "0.4s" }}>
              <div className="w-16 h-16 mb-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-hola-orange">
                <Share2 size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Instantly</h3>
              <p className="text-muted-foreground">Generate a link and share your creation instantly through any messaging platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Card Showcase */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background/60 to-background dark:from-background/95 dark:to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display gradient-text">Beautiful Greetings for Everyone</h2>
            <p className="text-lg text-muted-foreground">
              Stunning designs and animations that bring joy to any occasion
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="scroll-section card-container rounded-lg overflow-hidden transform transition hover:scale-105">
              <div className="card-inner h-full">
                <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-8 rounded-lg shadow-lg h-full flex flex-col">
                  <h3 className="text-2xl text-white font-bold mb-4">Birthday Magic</h3>
                  <p className="text-white/90 mb-auto">Make someone's birthday extra special with animated cards and effects</p>
                  <div className="mt-6 flex justify-between items-end">
                    <PartyPopper className="text-white/80" />
                    <Sparkles className="text-white/80" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="scroll-section card-container rounded-lg overflow-hidden transform transition hover:scale-105" style={{ transitionDelay: "0.2s" }}>
              <div className="card-inner h-full">
                <div className="bg-gradient-to-r from-blue-400 to-cyan-500 p-8 rounded-lg shadow-lg h-full flex flex-col">
                  <h3 className="text-2xl text-white font-bold mb-4">Anniversary Love</h3>
                  <p className="text-white/90 mb-auto">Celebrate special moments with elegant anniversary cards and heart effects</p>
                  <div className="mt-6 flex justify-between items-end">
                    <Heart className="text-white/80" />
                    <Gift className="text-white/80" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="scroll-section card-container rounded-lg overflow-hidden transform transition hover:scale-105" style={{ transitionDelay: "0.4s" }}>
              <div className="card-inner h-full">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-8 rounded-lg shadow-lg h-full flex flex-col">
                  <h3 className="text-2xl text-white font-bold mb-4">Festival Joy</h3>
                  <p className="text-white/90 mb-auto">Share the joy of celebrations with vibrant animated cards and effects</p>
                  <div className="mt-6 flex justify-between items-end">
                    <Calendar className="text-white/80" />
                    <Smile className="text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background/60 dark:from-background dark:to-background/95">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display gradient-text">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              It's easy to create and share digital greeting cards in just a few steps
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="scroll-section flex flex-col md:flex-row gap-6 md:gap-10 items-center">
                <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-hola-purple">
                  <span className="text-xl md:text-2xl font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">Choose Your Template & Occasion</h3>
                  <p className="text-muted-foreground">
                    Select from a variety of themes and designs based on the occasion - birthdays, anniversaries, 
                    festivals, congratulations, or just to say thank you.
                  </p>
                </div>
              </div>
              
              <div className="scroll-section flex flex-col md:flex-row gap-6 md:gap-10 items-center" style={{ transitionDelay: "0.2s" }}>
                <div className="flex-shrink-0 bg-teal-100 dark:bg-teal-900/30 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-hola-teal">
                  <span className="text-xl md:text-2xl font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">Personalize Your Greeting</h3>
                  <p className="text-muted-foreground">
                    Add your personal message, upload photos, customize with emojis and stickers, 
                    and apply animations and effects to make your greeting unique.
                  </p>
                </div>
              </div>
              
              <div className="scroll-section flex flex-col md:flex-row gap-6 md:gap-10 items-center" style={{ transitionDelay: "0.4s" }}>
                <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900/30 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-hola-orange">
                  <span className="text-xl md:text-2xl font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3">Share With Your Loved Ones</h3>
                  <p className="text-muted-foreground">
                    Generate a unique link to your greeting and share it via email, text, or social media. 
                    Recipients can view your creation on any device, anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-hola-purple/10 to-hola-teal/10 dark:from-hola-purple/5 dark:to-hola-teal/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display gradient-text">Ready to Create Something Special?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start designing your personalized greeting card in minutes and spread joy to your loved ones.
            </p>
            <Link to="/create">
              <Button size="lg" className="gap-2 text-base bg-gradient-to-r from-hola-purple to-hola-teal transition-all hover:shadow-lg hover:-translate-y-0.5">
                <Send size={18} />
                <span>Create Your Greeting</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-200 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-display font-bold text-white">Hola!</span>
              <p className="mt-2 text-slate-400 text-sm">Share joy with beautiful greetings</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/create" className="text-slate-300 hover:text-white transition-colors">
                Create
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-400">© {new Date().getFullYear()} Hola! All rights reserved.</p>
            <div className="flex items-center justify-center mt-4 gap-2 text-slate-300">
              <p>Created with ❤️ by Amaan Syed</p>
              <a href="https://github.com/amaansyed27" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-white transition-colors">
                <Github size={16} />
                <span>github.com/amaansyed27</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
