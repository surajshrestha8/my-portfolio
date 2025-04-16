import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface Skill {
  id: number;
  name: string;
  icon: LucideIcon;
  category: string;
  color: string;
}

interface SkillCardProps {
  skill: Skill;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const { name, icon: Icon, category, color } = skill;
  
  return (
    <div className="cube-wrapper w-full aspect-square mx-auto">
      <Card className={`cube bg-surface/50 rounded-xl p-6 flex flex-col items-center justify-center border border-${color}/20 hover:border-${color} transition-colors duration-300 h-full`}>
        <CardContent className="cube-face front p-0 flex flex-col items-center justify-center">
          <Icon className={`text-${color} h-16 w-16 mb-4`} />
          <h3 className="text-xl font-heading font-medium text-center">{name}</h3>
          <p className="text-center text-sm text-muted-foreground mt-2">{category}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillCard;
