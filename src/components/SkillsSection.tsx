import { Code2, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProgrammingLanguages } from '@/hooks/useSanityData';

const getSkillVariant = (level: string) => {
  switch (level) {
    case 'expert':
      return 'default';
    case 'advanced':
      return 'secondary';
    case 'intermediate':
      return 'outline';
    default:
      return 'outline';
  }
};

const getSkillStars = (level: string) => {
  const starCount = level === 'expert' ? 3 : level === 'advanced' ? 2 : 1;
  return Array.from({ length: 3 }, (_, i) => (
    <Star
      key={i}
      className={`w-3 h-3 ${
        i < starCount
          ? 'text-yellow-400 fill-yellow-400'
          : 'text-muted-foreground'
      }`}
    />
  ));
};

// Icon mapping for programming languages
const languageIcons: Record<string, string> = {
  Python: '🐍',
  TypeScript: '📘',
  JavaScript: '💛',
  Java: '☕',
  SQL: '🗄️',
  'C++': '⚙️',
  C: '🔧',
  R: '📊',
  Go: '🐹',
  Rust: '🦀',
};

const SkillsSection = () => {
  const { data: programmingLanguages, isLoading, error } = useProgrammingLanguages();

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Programming Languages</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The programming languages I use to build solutions
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading skills...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-destructive">Failed to load skills. Please try again later.</p>
          </div>
        )}

        {/* Programming Languages Card */}
        {programmingLanguages && programmingLanguages.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <Card className="glass-effect hover:scale-105 transition-all duration-500 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl justify-center">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 mr-4 text-white">
                    <Code2 className="w-6 h-6" />
                  </div>
                  Core Programming Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {programmingLanguages.map((language, index) => (
                  <div
                    key={language.name}
                    className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                          {languageIcons[language.name] || '💻'}
                        </span>
                        <div>
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {language.name}
                          </h4>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {getSkillStars(language.level)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {language.description}
                    </p>
                    <Badge 
                      variant={getSkillVariant(language.level)}
                      className="text-xs"
                    >
                      {language.level.charAt(0).toUpperCase() + language.level.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </div>
        )}

        {/* Proficiency Legend */}
        {programmingLanguages && programmingLanguages.length > 0 && (
          <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Proficiency Levels
          </h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {getSkillStars('expert')}
              </div>
              <span className="text-muted-foreground">Expert (3+ years, production experience)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {getSkillStars('advanced')}
              </div>
              <span className="text-muted-foreground">Advanced (1-3 years, project experience)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {getSkillStars('intermediate')}
              </div>
              <span className="text-muted-foreground">Intermediate (Learning, basic projects)</span>
            </div>
          </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;