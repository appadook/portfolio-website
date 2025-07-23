import { Card } from '@/components/ui/card';
import { technologies } from '@/data/portfolio';

const TechnologiesSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Technologies I Use</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern tools and frameworks that power my development workflow
          </p>
        </div>

        {/* Animated Technology Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {technologies.map((tech, index) => (
            <Card
              key={tech.name}
              className="p-6 glass-effect hover:scale-110 hover:rotate-3 transition-all duration-500 cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {tech.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {tech.category}
                </p>
                <p className="text-xs text-muted-foreground">
                  {tech.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Floating Tech Logos Animation */}
        <div className="mt-16 relative h-32 overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="flex animate-marquee space-x-8 text-6xl opacity-20">
              {['⚛️', '🐍', '💚', '🐘', '☁️', '🐳', '🧠', '⚓', '🔴', '📊', '🔷', '🍃'].map((icon, index) => (
                <span key={index} className="flex-shrink-0">
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;