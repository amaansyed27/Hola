import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Share2, Copy, ArrowLeft, Eye, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import GreetingCard from "@/components/greeting/GreetingCard";
import ContinuousEffects from "@/components/greeting/ContinuousEffects";
import { fetchGreetingBlob } from "@/utils/api";
import { Greeting, ContinuousEffectType } from "@/types/greeting";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PreviewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [greeting, setGreeting] = useState<Greeting | null>(null);
  const [shareUrl, setShareUrl] = useState("");
  const [effectsEnabled, setEffectsEnabled] = useState(true);
  
  useEffect(() => {
    if (!id) return;

    const fetchGreeting = async () => {
      try {
        const foundGreeting = (await fetchGreetingBlob(id)) as Greeting; // Cast to Greeting type
        if (foundGreeting) {
          setGreeting(foundGreeting);
          setEffectsEnabled(foundGreeting.continuousEffectEnabled ?? true);
          const baseUrl = window.location.origin;
          setShareUrl(`${baseUrl}/greeting/${id}`);
        } else {
          throw new Error("Greeting not found");
        }
      } catch (error) {
        console.error("Error fetching greeting blob:", error);
        toast({
          title: "Greeting not found",
          description: "We couldn't find the greeting you're looking for.",
          variant: "destructive",
        });
        navigate("/create");
      }
    };

    fetchGreeting();
  }, [id, navigate, toast]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "The greeting link has been copied to your clipboard.",
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Could not copy the link. Please try again.",
          variant: "destructive"
        });
      });
  };

  const handleViewGreeting = () => {
    if (id) {
      navigate(`/greeting/${id}`);
    }
  };

  if (!greeting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  const continuousEffect = greeting.continuousEffect || 'none';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-20 relative">
        {/* Add Continuous Effects */}
        {continuousEffect !== 'none' && (
          <ContinuousEffects
            effect={continuousEffect as ContinuousEffectType}
            enabled={effectsEnabled}
          />
        )}
        
        <div className="container mx-auto py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/create")}
              className="mb-6"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Editor
            </Button>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold font-display">
                Preview Your Greeting
              </h1>
              <p className="text-muted-foreground mt-2">
                Share this greeting with {greeting.recipientName || "your recipient"}
              </p>
            </div>
            
            {/* Display effects toggle if continuous effects are applied */}
            {continuousEffect !== 'none' && (
              <div className="mb-6 flex justify-center">
                <div className="flex items-center space-x-2 bg-card rounded-full p-2 px-4 shadow-sm border">
                  <Label htmlFor="preview-effects-toggle" className="flex items-center gap-2 text-sm">
                    <Sparkles size={16} className="text-hola-purple" />
                    <span>{effectsEnabled ? 'Effects On' : 'Effects Off'}</span>
                  </Label>
                  <Switch
                    id="preview-effects-toggle"
                    checked={effectsEnabled}
                    onCheckedChange={setEffectsEnabled}
                  />
                </div>
              </div>
            )}
            
            <div className="bg-card p-6 rounded-xl shadow-sm mb-8 border">
              <GreetingCard greeting={greeting} isAnimated={true} />
            </div>
            
            <div className="bg-card p-6 rounded-xl shadow-sm border">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Share2 size={18} className="text-hola-purple" />
                Share Your Greeting
              </h2>
              
              <div className="flex flex-col md:flex-row gap-4">
                <Input 
                  value={shareUrl} 
                  readOnly 
                  className="flex-1"
                />
                <Button onClick={handleCopyLink} className="gap-2">
                  <Copy size={16} />
                  <span>Copy Link</span>
                </Button>
                <Button onClick={handleViewGreeting} variant="outline" className="gap-2">
                  <Eye size={16} />
                  <span>View</span>
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                Share this link with {greeting.recipientName || "your recipient"} to show them your greeting.
                The link will remain active and they can view it anytime.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PreviewPage;
