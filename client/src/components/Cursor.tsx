import { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseDown = () => {
      setIsActive(true);
    };
    
    const handleMouseUp = () => {
      setIsActive(false);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    
    // Active state for clickable elements
    const clickables = document.querySelectorAll("a, button, input, textarea");
    
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", () => setIsActive(true));
      el.addEventListener("mouseleave", () => setIsActive(false));
    });
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", () => setIsActive(true));
        el.removeEventListener("mouseleave", () => setIsActive(false));
      });
    };
  }, []);
  
  return (
    <div
      className={`custom-cursor fixed w-10 h-10 rounded-full border-2 border-primary pointer-events-none z-[9999] transition-all duration-200 mix-blend-difference ${
        isActive ? "w-[60px] h-[60px] border-accent" : ""
      }`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
      }}
    />
  );
};

export default Cursor;
