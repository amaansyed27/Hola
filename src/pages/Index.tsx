import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Welcome to Hola!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Create beautiful, personalized greeting cards for any occasion and share them instantly.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/create">
              <Button size="lg" className="gap-2">
                <Sparkles size={18} />
                <span>Create a Greeting</span>
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline">
                Explore Examples
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Hola! All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
