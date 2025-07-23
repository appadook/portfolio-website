import { useState, useEffect } from "react";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Aspiring Software Engineer & Data Scientist";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-electric-blue/10 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Profile Picture */}
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-accent p-1 glow-effect">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-muted to-card flex items-center justify-center overflow-hidden">
                  {/* Profile image */}
                  <img
                    src="/headhsot.jpg"
                    alt="Kurtik Appadoo - Profile Picture"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              {/* Online status indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-background animate-pulse"></div>
            </div>
          </div>

          {/* Main Heading */}
          <h1
            className="hero-text mb-6 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Kurtik Appadoo
          </h1>

          {/* Typing Animation Subtitle */}
          <div
            className="text-xl md:text-2xl text-muted-foreground mb-8 h-8 animate-slide-in-left"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="font-mono">
              {displayedText}
              <span className="animate-blink">|</span>
            </span>
          </div>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in"
            style={{ animationDelay: "1s" }}
          >
            Passionate about building innovative solutions at the intersection
            of technology and finance. Creating impactful software and
            data-driven insights.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-up"
            style={{ animationDelay: "1.5s" }}
          >
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white px-8 py-3 text-lg glow-effect transition-all duration-300 hover:scale-105"
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToContact}
              className="border-2 border-primary/50 hover:border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
            >
              Contact Me
            </Button>
          </div>

          {/* Social Links */}
          <div
            className="flex justify-center space-x-6 mb-16 animate-fade-in"
            style={{ animationDelay: "2s" }}
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary transition-all duration-300 hover:scale-110 hover:glow-effect group"
            >
              <Github className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-border hover:border-primary transition-all duration-300 hover:scale-110 hover:glow-effect group"
            >
              <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:kurtik.appadoo.2002@outlook.com"
              className="p-3 rounded-full border border-border hover:border-primary transition-all duration-300 hover:scale-110 hover:glow-effect group"
            >
              <Mail className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
