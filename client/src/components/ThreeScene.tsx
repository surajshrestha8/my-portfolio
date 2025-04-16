import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene = ({ className }: ThreeSceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    
    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute(
      "position", 
      new THREE.BufferAttribute(posArray, 3)
    );
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: 0x3a86ff,
      transparent: true,
      opacity: 0.6,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 3;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 5000;
      mouseY = (event.clientY - window.innerHeight / 2) / 5000;
    };
    
    document.addEventListener("mousemove", onDocumentMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0005;
      
      // Add mouse interaction
      particlesMesh.rotation.x += mouseY;
      particlesMesh.rotation.y += mouseX;
      
      renderer.render(scene, camera);
    };
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener("resize", handleResize);
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={mountRef} 
      className={`fixed top-0 left-0 w-full h-full z-[-1] ${className || ""}`}
    />
  );
};

export default ThreeScene;
