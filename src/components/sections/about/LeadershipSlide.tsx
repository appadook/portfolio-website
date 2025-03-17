import React from 'react';
import { Trophy } from 'lucide-react';

const LeadershipSlide = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
        <div className="p-4 bg-primary/10 rounded-full hidden md:block">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <div className="flex md:hidden items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-white">Leadership & Achievements</h3>
        </div>
        <h3 className="text-3xl font-bold hidden md:block text-white">Leadership & Achievements</h3>
      </div>
      
      <div className="md:pl-4 md:ml-4 md:border-l border-border">
        <div className="space-y-5 text-white">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg text-white">Computer Science Society President</h4>
              <p>Led a team of 10 officers, organized 20+ technical workshops, and grew membership by 150%.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-white">Hackathon Winner</h4>
              <p>First place in University Hackathon 2023 for developing an AI-powered educational platform.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-white">Peer Mentorship Program</h4>
              <p>Mentored 15 freshman students in their academic and professional development.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-white">Research Publication</h4>
              <p>Co-authored paper on economic impacts of AI in the undergraduate research journal.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipSlide;