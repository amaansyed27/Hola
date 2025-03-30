import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Home, Send } from "lucide-react";
import GreetingCard from "@/components/greeting/GreetingCard";
import ContinuousEffects from "@/components/greeting/ContinuousEffects";
import { fetchGreetingBlob } from "@/utils/api"; // Add a utility function to fetch data from jsonblob.com
import { Greeting, ContinuousEffectType, GreetingTheme } from "@/types/greeting";

const ViewGreetingPage = () => {
  const { id } = useParams<{ id: string }>();
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchGreeting = async () => {
      try {
        const foundGreeting = await fetchGreetingBlob(id); // Fetch greeting by ID
        if (foundGreeting) {
          setGreeting(foundGreeting);
          setTimeout(() => setLoaded(true), 500);
        } else {
          throw new Error("Greeting not found");
        }
      } catch (error) {
        console.error("Error fetching greeting blob:", error);
        setGreeting(null);
      }
    };

    fetchGreeting();
  }, [id]);

  if (!greeting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4 text-foreground">Greeting Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The greeting you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button>
              <Home size={16} className="mr-2" />
              Go to Homepage
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const continuousEffect = greeting.continuousEffect || 'none';
  // Use the sender's preference for whether effects should be enabled
  const effectsEnabled = greeting.continuousEffectEnabled !== false;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative px-4 py-12 pb-24">
      {/* Added 'pb-24' to provide extra padding at the bottom */}
      {/* Continuous effects container - only show if enabled by the sender */}
      {continuousEffect !== 'none' && effectsEnabled && (
        <ContinuousEffects
          effect={continuousEffect as ContinuousEffectType}
          enabled={true}
        />
      )}

      <div className="max-w-xl w-full">
        <div className="my-8 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="max-height-container">
            <GreetingCard greeting={greeting} isAnimated={true} />
          </div>
        </div>

        <div className="flex flex-col items-center mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "1.5s", animationFillMode: "forwards" }}>
          {/* Remove the toggle control for recipients */}
          <div className="mt-12 flex flex-col items-center animate-fade-in" style={{ animationDelay: "2s" }}>
            <p className="text-sm text-muted-foreground mb-3">Create your own greeting card</p>
            <Link to="/create">
              <Button className="gap-2">
                <Send size={16} />
                <span>Create a Greeting</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="w-full text-center mt-16 text-sm text-muted-foreground">
        <p>Made with ❤️ by Hola!</p>
        <Link to="/create" className="text-hola-purple hover:text-hola-purple/80 transition-colors">
          Create your own greeting
        </Link>
      </footer>
    </div>
  );
};

export default ViewGreetingPage;
