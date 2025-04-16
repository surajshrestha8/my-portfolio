import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import SimpleThemeToggle from "./SimpleThemeToggle";

const Navbar = () => {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];
  
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6 ${
      isScrolled ? "bg-background/90 backdrop-blur-md shadow-md" : ""
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <a 
          href="#hero" 
          className="text-2xl font-heading font-bold flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#hero");
          }}
        >
          <span className="text-primary">&lt;</span>
          <span className="gradient-text">Portfolio</span>
          <span className="text-primary">/&gt;</span>
        </a>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center">
          <ul className="flex space-x-8 items-center mr-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className="hover:text-primary transition-colors duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Theme toggle in navbar */}
          <SimpleThemeToggle className="backdrop-blur-sm" />
        </div>
        
        {/* Mobile nav toggle */}
        <div className="md:hidden flex items-center gap-2">
          <SimpleThemeToggle className="backdrop-blur-sm" />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-surface transform transition-transform duration-300 ${
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      }`}>
        <ul className="py-4 px-6 space-y-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                className="block py-2 hover:text-primary transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
