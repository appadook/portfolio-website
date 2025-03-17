import React from 'react';
import { useInView } from '@/lib/animations';
import SectionHeader from '@/components/ui/SectionHeader';
import { about } from '@/lib/data';
import { FileDown } from 'lucide-react';


const About = () => {
  const [ref, isInView] = useInView<HTMLDivElement>();
  
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="About Me"
          subtitle="Background"
        />
        
        <div 
          ref={ref}
          className={`flex flex-col lg:flex-row gap-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Image */}
          <div className="lg:w-1/3 relative">
            <div className="bg-foreground/5 rounded-2xl p-8 h-full">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg mt-4">
                <img 
                  src="/headhsot.jpg"
                  alt="Kurtik Appadoo"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="mt-6 p-4 bg-card rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-1">Education</h3>
                <p className="text-muted-foreground mb-3">{about.education}</p>
                
                <a 
                  href={about.resumeLink} 
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <FileDown size={16} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:w-2/3">
            <h3 className="text-2xl font-bold mb-6">
              Economics & Computer Science Student
            </h3>
            
            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
              <p className="text-muted-foreground mb-4">
                {about.longDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h4 className="text-lg font-semibold mb-4">My Approach</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Data-driven problem solver</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Collaborative team player</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Continuous learner</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Detail-oriented developer</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card p-6 rounded-lg border border-border">
                  <h4 className="text-lg font-semibold mb-4">Interests</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Financial technology</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Data analytics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>UI/UX design</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                      <span>Open source development</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
