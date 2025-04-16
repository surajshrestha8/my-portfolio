import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimpleThemeToggleProps {
  className?: string;
}

const SimpleThemeToggle = ({ className }: SimpleThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        "relative overflow-hidden transition-colors duration-500", 
        theme === 'dark' 
          ? "bg-primary/10 hover:bg-primary/20" 
          : "bg-primary/10 hover:bg-primary/20",
        className
      )}
      aria-label="Toggle theme"
    >
      <span 
        className={`absolute inset-0 transform transition-transform duration-500 ${
          theme === 'dark' ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <Sun 
          className="h-5 w-5 text-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 theme-icon theme-icon-sun" 
        />
      </span>
      
      <span 
        className={`absolute inset-0 transform transition-transform duration-500 ${
          theme === 'dark' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <Moon 
          className="h-5 w-5 text-indigo-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 theme-icon theme-icon-moon" 
        />
      </span>
    </Button>
  );
};

export default SimpleThemeToggle;