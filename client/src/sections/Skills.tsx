import SkillCard from "@/components/SkillCard";
import { skills } from "@/lib/data";

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My technical toolkit for creating immersive digital experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <div key={skill.id} className="reveal">
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
