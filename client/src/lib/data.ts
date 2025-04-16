import {
  Code,
  TerminalSquare,
  Layers,
  Palette,
  Laptop,
  LayoutGrid,
  Cpu,
  Boxes
} from "lucide-react";

import type { Project } from "@/components/ProjectCard";
import type { Skill } from "@/components/SkillCard";

export const projects: Project[] = [
  {
    id: 1,
    title: "3D Interactive Dashboard",
    description: "A data visualization dashboard with interactive 3D charts and real-time updates.",
    imageSrc: "https://images.unsplash.com/photo-1551522435-a13afa10f103",
    tags: ["Three.js", "React", "WebGL"],
    link: "https://github.com",
  },
  {
    id: 2,
    title: "Immersive VR Experience",
    description: "A browser-based virtual reality experience with interactive elements and spatial audio.",
    imageSrc: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    tags: ["WebXR", "Three.js", "JavaScript"],
    link: "https://github.com",
  },
  {
    id: 3,
    title: "3D Product Configurator",
    description: "An interactive 3D product customization tool for an e-commerce platform.",
    imageSrc: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
    tags: ["Three.js", "Next.js", "GLSL"],
    link: "https://github.com",
  },
];

export const skills: Skill[] = [
  {
    id: 1,
    name: "Three.js",
    icon: Code,
    category: "3D Library",
    color: "primary",
  },
  {
    id: 2,
    name: "React",
    icon: Layers,
    category: "Frontend Framework",
    color: "secondary",
  },
  {
    id: 3,
    name: "WebGL",
    icon: Palette,
    category: "Graphics API",
    color: "accent",
  },
  {
    id: 4,
    name: "JavaScript",
    icon: TerminalSquare,
    category: "Programming Language",
    color: "primary",
  },
  {
    id: 5,
    name: "GLSL",
    icon: Cpu,
    category: "Shader Language",
    color: "secondary",
  },
  {
    id: 6,
    name: "Node.js",
    icon: TerminalSquare,
    category: "Backend Runtime",
    color: "accent",
  },
  {
    id: 7,
    name: "WebXR",
    icon: Laptop,
    category: "VR/AR Development",
    color: "primary",
  },
  {
    id: 8,
    name: "Blender",
    icon: Boxes,
    category: "3D Modeling",
    color: "secondary",
  },
];
