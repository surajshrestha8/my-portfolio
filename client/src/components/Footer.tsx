import { Heart } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <footer className="py-12 bg-surface">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
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
            <p className="text-muted-foreground mt-2">
              Creative developer crafting immersive digital experiences.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-muted-foreground mb-2">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
            <p className="text-sm flex items-center gap-1">
              Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using React & Three.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
