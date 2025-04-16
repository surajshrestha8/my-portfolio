import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export interface Project {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  link: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, imageSrc, tags, link } = project;
  
  return (
    <Card className="project-card overflow-hidden bg-surface rounded-xl transition-all duration-300 hover:translate-y-[-10px] hover:shadow-[0_20px_25px_-5px_rgba(58,134,255,0.2),0_10px_10px_-5px_rgba(58,134,255,0.1)]">
      <div className="relative overflow-hidden group">
        <div className="w-full h-56 bg-gradient-to-br from-primary/30 to-accent/30 rounded-t-xl">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 mix-blend-overlay opacity-70"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <a 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white font-medium hover:text-primary transition-colors flex items-center gap-1"
          >
            View Project <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => {
            // Alternate badge styling based on index
            const variant = index % 3 === 0 
              ? "primary" 
              : index % 3 === 1 
                ? "secondary" 
                : "accent";
                
            return (
              <Badge 
                key={`${tag}-${index}`}
                variant="outline"
                className={`text-xs py-1 px-3 rounded-full bg-${variant}/20 text-${variant} border-${variant}/20`}
              >
                {tag}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
