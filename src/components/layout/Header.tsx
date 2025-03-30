import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="border-b bg-background/95 backdrop-blur-md fixed top-0 left-0 right-0 z-10 shadow-sm">
      <div className="container mx-auto py-4 px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img 
              src="/hola.png" 
              alt="Hola Logo" 
              className="w-9 h-9 object-contain" 
            />
            <span className="text-2xl font-display font-bold gradient-text">
              Hola!
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-8">
              <Link 
                to="/" 
                className="text-sm font-medium text-foreground hover:text-hola-purple transition-colors px-1 py-1 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hola-purple transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                to="/create" 
                className="text-sm font-medium text-foreground hover:text-hola-purple transition-colors px-1 py-1 relative group"
              >
                Create
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-hola-purple transition-all group-hover:w-full"></span>
              </Link>
            </div>
          </nav>
          
          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* CTA Button */}
            <Link to="/create">
              <Button className="gap-2 bg-hola-purple hover:bg-hola-purple/90 text-white transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                <Sparkles size={16} className="animate-pulse" />
                <span>Create Greeting</span>
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button 
              className="p-2 rounded-md hover:bg-accent transition-colors text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t mt-3 animate-fade-in border-border">
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-base font-medium text-foreground hover:text-hola-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/create" 
                className="text-base font-medium text-foreground hover:text-hola-purple transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Create
              </Link>
              <Link 
                to="/create" 
                className="mt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full gap-2 bg-hola-purple hover:bg-hola-purple/90 text-white">
                  <Sparkles size={16} />
                  <span>Create Greeting</span>
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
