import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = document.documentElement.scrollTop;
      
      const scrollPercentage = (currentScroll / totalScroll) * 100;
      setProgress(scrollPercentage);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <div 
      className="progress-bar fixed top-0 left-0 h-[3px] bg-gradient-to-r from-primary via-accent to-secondary z-[1000]"
      style={{ width: `${progress}%` }}
    />
  );
};

export default ScrollProgress;
