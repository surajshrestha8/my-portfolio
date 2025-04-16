import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import * as THREE from "three";

const Hero = () => {
  const hero3DRef = useRef<HTMLDivElement>(null);
  
  // Animated typing effect
  useEffect(() => {
    const typingElement = document.querySelector(".typing-text");
    if (!typingElement) return;
    
    const text = "Creative Developer";
    let currentText = "";
    let letterIndex = 0;
    
    const typeWriter = () => {
      if (letterIndex < text.length) {
        currentText += text.charAt(letterIndex);
        if (typingElement.textContent !== null) {
          typingElement.textContent = currentText;
        }
        letterIndex++;
        setTimeout(typeWriter, 100);
      }
    };
    
    setTimeout(typeWriter, 1000);
  }, []);
  
  // Simple 3D hero animation with Three.js
  useEffect(() => {
    if (!hero3DRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    
    renderer.setSize(
      hero3DRef.current.clientWidth, 
      hero3DRef.current.clientHeight
    );
    hero3DRef.current.appendChild(renderer.domElement);
    
    // Create a sphere geometry
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Create a material with custom shader
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vec3 color1 = vec3(0.23, 0.52, 1.0); // primary blue
          vec3 color2 = vec3(1.0, 0.0, 0.43);  // accent pink
          
          float noise = sin(vPosition.x * 5.0 + time) * sin(vPosition.y * 5.0 + time) * sin(vPosition.z * 5.0 + time);
          vec3 finalColor = mix(color1, color2, noise * 0.5 + 0.5);
          
          gl_FragColor = vec4(finalColor, 0.8);
        }
      `,
      uniforms: {
        time: { value: 0 },
      },
      transparent: true,
      wireframe: true,
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    camera.position.z = 5;
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      material.uniforms.time.value = elapsedTime;
      
      sphere.rotation.x = elapsedTime * 0.1;
      sphere.rotation.y = elapsedTime * 0.15;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!hero3DRef.current) return;
      
      const newWidth = hero3DRef.current.clientWidth;
      const newHeight = hero3DRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (hero3DRef.current) {
        hero3DRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);
  
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 reveal">
            <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight mb-4">
              <span className="block">Hi, I'm</span>
              <span className="gradient-text text-5xl md:text-7xl">Alex Johnson</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-muted-foreground font-heading mb-6">
              <span className="typing-text"></span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
              I craft interactive experiences and digital solutions with modern web technologies and creative 3D visualizations.
            </p>
            
            <div className="flex space-x-4">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => scrollToSection("#projects")}
              >
                View My Work
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => scrollToSection("#contact")}
              >
                Contact Me
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 reveal">
            {/* 3D Hero object container */}
            <div 
              ref={hero3DRef}
              className="w-full aspect-square max-w-md mx-auto relative animate-float" 
              id="hero-3d-container"
            />
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
