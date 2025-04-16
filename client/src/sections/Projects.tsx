import { useEffect, useState } from "react";
import ProjectCard, { Project } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/data";

const Projects = () => {
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>([]);
  const [showAll, setShowAll] = useState(false);
  
  useEffect(() => {
    // Initially show only the first 3 projects
    setDisplayedProjects(showAll ? projects : projects.slice(0, 3));
  }, [showAll]);
  
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my recent work showcasing interactive experiences and creative solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        {projects.length > 3 && (
          <div className="text-center mt-12 reveal">
            <Button 
              variant="link"
              className="text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center gap-2"
              onClick={toggleShowAll}
            >
              <span>{showAll ? "Show Less" : "View All Projects"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
