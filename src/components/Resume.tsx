import React from 'react';
import { Button } from "@/components/ui/button"

const Resume: React.FC = () => {
  const handleDownload = () => {
    // The path starts from the public folder
    const resumeUrl = '/Kurtik Appadoo SWE Resume.pdf';
    window.open(resumeUrl, '_blank');
  };

  return (
    <div className="min-h-screen py-8 pr-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Resume</h1>
        <p className="text-white mb-4">Click below to download my resume</p>
        
        <Button
          onClick={handleDownload}
          variant="default"
          size="default"
        >
          Download Resume
        </Button>
      </div>
    </div>
  );
};

export default Resume;
