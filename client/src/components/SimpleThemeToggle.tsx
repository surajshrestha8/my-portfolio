import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SimpleThemeToggleProps {
  className?: string;
}

const SimpleThemeToggle = ({ className }: SimpleThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only show the toggle after component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9"></div>; // Placeholder with same dimensions
  }
  
  return (
    <Button 
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative overflow-hidden transition-all duration-500 border border-primary/20", 
        theme === 'dark' 
          ? "bg-primary/10 hover:bg-primary/20" 
          : "bg-primary/10 hover:bg-primary/20",
        className
      )}
      aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sun icon - shown in dark mode */}
      <Sun 
        className={cn(
          "h-5 w-5 text-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "transition-all duration-500",
          theme === 'dark' 
            ? "opacity-100 rotate-0" 
            : "opacity-0 rotate-90"
        )}
      />
      
      {/* Moon icon - shown in light mode */}
      <Moon 
        className={cn(
          "h-5 w-5 text-indigo-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
          "transition-all duration-500",
          theme === 'dark' 
            ? "opacity-0 -rotate-90" 
            : "opacity-100 rotate-0"
        )}
      />
    </Button>
  );
};

export default SimpleThemeToggle;