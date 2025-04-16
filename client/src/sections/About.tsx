import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Download } from "lucide-react";
import * as THREE from "three";

const About = () => {
  const avatar3DRef = useRef<HTMLDivElement>(null);
  
  // Simple 3D avatar container animation
  useEffect(() => {
    if (!avatar3DRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    
    renderer.setSize(
      avatar3DRef.current.clientWidth, 
      avatar3DRef.current.clientHeight
    );
    avatar3DRef.current.appendChild(renderer.domElement);
    
    // Create a torus knot
    const geometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x3a86ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    
    camera.position.z = 5;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!avatar3DRef.current) return;
      
      const newWidth = avatar3DRef.current.clientWidth;
      const newHeight = avatar3DRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (avatar3DRef.current) {
        avatar3DRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <section id="about" className="py-24 relative bg-surface/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-2/5 reveal">
            {/* 3D avatar container */}
            <div 
              ref={avatar3DRef}
              className="relative w-full max-w-sm mx-auto aspect-square rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl" />
            </div>
          </div>
          
          <div className="lg:w-3/5 reveal">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground mb-6">
              I'm a creative developer passionate about building immersive digital experiences that bridge the gap between technology and art. With expertise in 3D web technologies, I transform ideas into interactive realities.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              My journey began with traditional web development, but quickly evolved as I discovered the potential of WebGL and Three.js to create compelling visual experiences directly in the browser.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-xl font-heading font-semibold mb-2">Education</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <GraduationCap className="text-primary h-5 w-5 mt-1 mr-2" />
                    <div>
                      <p className="font-medium">MSc in Computer Graphics</p>
                      <p className="text-sm text-muted-foreground">University of Technology, 2018-2020</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <GraduationCap className="text-primary h-5 w-5 mt-1 mr-2" />
                    <div>
                      <p className="font-medium">BSc in Computer Science</p>
                      <p className="text-sm text-muted-foreground">State University, 2014-2018</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-heading font-semibold mb-2">Experience</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Briefcase className="text-primary h-5 w-5 mt-1 mr-2" />
                    <div>
                      <p className="font-medium">Senior Creative Developer</p>
                      <p className="text-sm text-muted-foreground">Digital Studio Inc., 2020-Present</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Briefcase className="text-primary h-5 w-5 mt-1 mr-2" />
                    <div>
                      <p className="font-medium">Web 3D Developer</p>
                      <p className="text-sm text-muted-foreground">Interactive Agency, 2018-2020</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <Button
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white"
            >
              <Download className="h-4 w-4" />
              <span>Download Resume</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
