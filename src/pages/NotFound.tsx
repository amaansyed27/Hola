import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 font-display gradient-text">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Oops! Page not found</p>
        <Link to="/">
          <Button className="gap-2">
            <Home size={16} />
            <span>Return to Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
