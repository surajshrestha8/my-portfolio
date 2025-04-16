import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme, isAnimating } = useTheme();
  const roomRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!roomRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50, 
      roomRef.current.clientWidth / roomRef.current.clientHeight, 
      0.1, 
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    
    renderer.setSize(
      roomRef.current.clientWidth,
      roomRef.current.clientHeight
    );
    roomRef.current.appendChild(renderer.domElement);
    
    // Room elements
    const room = new THREE.Group();
    scene.add(room);
    
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(5, 5);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: theme === 'dark' ? 0x333333 : 0xEEEEEE,
      roughness: 0.8 
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    room.add(floor);
    
    // Walls
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: theme === 'dark' ? 0x222222 : 0xFFFFFF,
      roughness: 0.9 
    });
    
    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(5, 3);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.z = -2.5;
    backWall.position.y = 0.5;
    room.add(backWall);
    
    // Side wall
    const sideWallGeometry = new THREE.PlaneGeometry(5, 3);
    const sideWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    sideWall.rotation.y = Math.PI / 2;
    sideWall.position.x = -2.5;
    sideWall.position.y = 0.5;
    room.add(sideWall);
    
    // Desk
    const deskGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.8);
    const deskMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x964B00,
      roughness: 0.6 
    });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.position.set(-0.5, -0.45, -1.5);
    room.add(desk);
    
    // Desk legs
    const legGeometry = new THREE.BoxGeometry(0.1, 0.5, 0.1);
    
    const frontLeftLeg = new THREE.Mesh(legGeometry, deskMaterial);
    frontLeftLeg.position.set(-1.1, -0.75, -1.1);
    room.add(frontLeftLeg);
    
    const frontRightLeg = new THREE.Mesh(legGeometry, deskMaterial);
    frontRightLeg.position.set(0.1, -0.75, -1.1);
    room.add(frontRightLeg);
    
    const backLeftLeg = new THREE.Mesh(legGeometry, deskMaterial);
    backLeftLeg.position.set(-1.1, -0.75, -1.9);
    room.add(backLeftLeg);
    
    const backRightLeg = new THREE.Mesh(legGeometry, deskMaterial);
    backRightLeg.position.set(0.1, -0.75, -1.9);
    room.add(backRightLeg);
    
    // Chair
    const chairSeatGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.6);
    const chairMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x111111,
      roughness: 0.5 
    });
    const chairSeat = new THREE.Mesh(chairSeatGeometry, chairMaterial);
    chairSeat.position.set(-0.5, -0.2, -0.8);
    room.add(chairSeat);
    
    const chairBackGeometry = new THREE.BoxGeometry(0.6, 0.6, 0.1);
    const chairBack = new THREE.Mesh(chairBackGeometry, chairMaterial);
    chairBack.position.set(-0.5, 0.1, -1.1);
    room.add(chairBack);
    
    // Lamp
    const lampBaseGeometry = new THREE.CylinderGeometry(0.1, 0.15, 0.05, 16);
    const lampBaseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      roughness: 0.5 
    });
    const lampBase = new THREE.Mesh(lampBaseGeometry, lampBaseMaterial);
    lampBase.position.set(-1, -0.4, -1.5);
    room.add(lampBase);
    
    const lampPoleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
    const lampPoleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x777777,
      roughness: 0.5 
    });
    const lampPole = new THREE.Mesh(lampPoleGeometry, lampPoleMaterial);
    lampPole.position.set(-1, -0.15, -1.5);
    room.add(lampPole);
    
    const lampShadeGeometry = new THREE.ConeGeometry(0.2, 0.3, 16, 1, true);
    const lampShadeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFFF99,
      roughness: 0.5,
      side: THREE.DoubleSide
    });
    const lampShade = new THREE.Mesh(lampShadeGeometry, lampShadeMaterial);
    lampShade.position.set(-1, 0.1, -1.5);
    lampShade.rotation.x = Math.PI;
    room.add(lampShade);
    
    // Lamp light
    const lampLight = new THREE.PointLight(0xFFFF99, theme === 'dark' ? 1 : 0, 3);
    lampLight.position.set(-1, 0.1, -1.5);
    room.add(lampLight);
    
    // Light switch
    const switchBaseGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.05);
    const switchBaseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xDDDDDD,
      roughness: 0.5 
    });
    const switchBase = new THREE.Mesh(switchBaseGeometry, switchBaseMaterial);
    switchBase.position.set(-2.45, 0, -1);
    room.add(switchBase);
    
    const switchButtonGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.05);
    const switchButtonMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x999999,
      roughness: 0.5 
    });
    const switchButton = new THREE.Mesh(switchButtonGeometry, switchButtonMaterial);
    // Position the switch up or down based on theme
    switchButton.position.set(-2.45, theme === 'dark' ? -0.05 : 0.05, -0.95);
    room.add(switchButton);
    
    // Person (simple representation)
    const personGroup = new THREE.Group();
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const personMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xFFA07A,
      roughness: 0.7 
    });
    const head = new THREE.Mesh(headGeometry, personMaterial);
    head.position.y = 0.1;
    personGroup.add(head);
    
    // Body
    const bodyGeometry = new THREE.CylinderGeometry(0.07, 0.1, 0.35, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: theme === 'dark' ? 0x2244AA : 0x44AAFF,
      roughness: 0.7 
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = -0.15;
    personGroup.add(body);
    
    // Arms
    const armGeometry = new THREE.BoxGeometry(0.05, 0.2, 0.05);
    
    const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
    rightArm.position.set(0.13, -0.1, 0);
    rightArm.rotation.z = -0.3;
    personGroup.add(rightArm);
    
    const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
    leftArm.position.set(-0.13, -0.1, 0);
    leftArm.rotation.z = 0.3;
    personGroup.add(leftArm);
    
    // Legs
    const legGeom = new THREE.BoxGeometry(0.07, 0.2, 0.07);
    
    const rightLeg = new THREE.Mesh(legGeom, new THREE.MeshStandardMaterial({ 
      color: 0x222222,
      roughness: 0.7 
    }));
    rightLeg.position.set(0.05, -0.35, 0);
    personGroup.add(rightLeg);
    
    const leftLeg = new THREE.Mesh(legGeom, new THREE.MeshStandardMaterial({ 
      color: 0x222222,
      roughness: 0.7 
    }));
    leftLeg.position.set(-0.05, -0.35, 0);
    personGroup.add(leftLeg);
    
    // Position the person based on whether they're at the desk or walking to the switch
    if (isAnimating) {
      // Person is walking to switch when animating
      personGroup.position.set(-1.5, -0.5, -1);
      personGroup.rotation.y = -Math.PI / 2; // Facing the switch
    } else {
      // Person is at desk
      personGroup.position.set(-0.5, -0.5, -1);
      personGroup.rotation.y = Math.PI; // Facing the desk
    }
    
    room.add(personGroup);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(
      theme === 'dark' ? 0x333333 : 0xCCCCCC, 
      0.5
    );
    scene.add(ambientLight);
    
    // Add directional light (window light)
    const sunLight = new THREE.DirectionalLight(
      0xFFFFFF, 
      theme === 'dark' ? 0.1 : 1
    );
    sunLight.position.set(2, 2, 1);
    scene.add(sunLight);
    
    // Set camera position
    camera.position.set(2, 1.5, 2);
    camera.lookAt(new THREE.Vector3(0, 0, -1));
    
    // Animation state
    let walkProgress = 0;
    let walkDirection = 1; // 1 to switch, -1 to desk
    const initialPersonPosition = new THREE.Vector3(-0.5, -0.5, -1);
    const switchPosition = new THREE.Vector3(-2, -0.5, -1);
    
    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      // Animate person walking to/from switch when theme is toggling
      if (isAnimating) {
        walkProgress += 0.02 * walkDirection;
        
        // Control walking direction based on progress
        if (walkProgress >= 1) {
          // Reached the switch, start walking back
          walkProgress = 1;
          walkDirection = -1;
          
          // Toggle switch position
          switchButton.position.y = theme === 'light' ? -0.05 : 0.05;
          
          // Update light intensity of lamp
          lampLight.intensity = theme === 'light' ? 1 : 0;
          
          // Update ambient and directional light
          ambientLight.color.set(theme === 'light' ? 0x333333 : 0xCCCCCC);
          sunLight.intensity = theme === 'light' ? 0.1 : 1;
          
          // Update materials for walls and floor
          floorMaterial.color.set(theme === 'light' ? 0x333333 : 0xEEEEEE);
          wallMaterial.color.set(theme === 'light' ? 0x222222 : 0xFFFFFF);
          bodyMaterial.color.set(theme === 'light' ? 0x2244AA : 0x44AAFF);
        } else if (walkProgress <= 0) {
          // Back at desk, stop animation
          walkProgress = 0;
          walkDirection = 1;
        }
        
        // Interpolate position between desk and switch
        const targetPosition = new THREE.Vector3().lerpVectors(
          initialPersonPosition,
          switchPosition,
          walkProgress
        );
        
        personGroup.position.copy(targetPosition);
        
        // Rotate based on direction
        if (walkDirection === 1) {
          personGroup.rotation.y = -Math.PI / 2; // Facing the switch
        } else {
          personGroup.rotation.y = Math.PI / 2; // Facing back to desk
        }
        
        // Animate legs for walking effect
        const walkCycle = Math.sin(Date.now() * 0.01) * 0.2;
        rightLeg.rotation.x = walkCycle;
        leftLeg.rotation.x = -walkCycle;
        rightArm.rotation.x = -walkCycle;
        leftArm.rotation.x = walkCycle;
      } else {
        // Reset to idle position when not animating
        rightLeg.rotation.x = 0;
        leftLeg.rotation.x = 0;
        rightArm.rotation.x = 0;
        leftArm.rotation.x = 0;
        personGroup.position.copy(initialPersonPosition);
        personGroup.rotation.y = Math.PI; // Facing the desk
      }
      
      // Slight room rotation for better view
      room.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
      
      renderer.render(scene, camera);
    };
    
    const handleResize = () => {
      if (!roomRef.current) return;
      
      camera.aspect = roomRef.current.clientWidth / roomRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(roomRef.current.clientWidth, roomRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (roomRef.current) {
        roomRef.current.removeChild(renderer.domElement);
      }
    };
  }, [theme, isAnimating]);
  
  return (
    <div className="fixed top-20 right-5 z-50 flex flex-col items-center">
      <Button 
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="mb-2 bg-surface/80 backdrop-blur-sm"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-yellow-500" />
        ) : (
          <Moon className="h-5 w-5 text-indigo-500" />
        )}
      </Button>
      <div 
        ref={roomRef} 
        className="w-60 h-60 rounded-lg overflow-hidden border border-primary/20 shadow-lg bg-surface/30 backdrop-blur-sm"
      />
    </div>
  );
};

export default ThemeToggle;