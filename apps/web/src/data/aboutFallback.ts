import type { AboutCategory, AboutItem } from '@/lib/portfolio.types';

export const fallbackAboutCategories: AboutCategory[] = [
  {
    _id: 'education',
    name: 'education',
    label: 'Academic Journey',
    color: '#3b82f6',
    icon: 'GraduationCap',
    order: 0,
  },
  {
    _id: 'awards',
    name: 'awards',
    label: 'Awards & Honors',
    color: '#f59e0b',
    icon: 'Trophy',
    order: 1,
  },
  {
    _id: 'hobbies',
    name: 'hobbies',
    label: 'Personal Interests',
    color: '#a855f7',
    icon: 'Heart',
    order: 2,
  },
];

const categoryMap = new Map(fallbackAboutCategories.map((category) => [category.name, category]));

export const fallbackAboutItems: AboutItem[] = [
  {
    _id: 'about-1',
    category: categoryMap.get('education')!,
    title: 'B.S in Computer Science & Economics Double',
    subtitle: 'Union College',
    date: '2021 - 2025',
    details: [
      'GPA: 3.6/4.0',
      'Computer Science & Economics Honor Student',
      'Thesis: "Arbitrage in the Crypto Currency Market"',
      'Cum Laude',
      "Dean's List student-athlete",
    ],
    icon: 'GraduationCap',
    order: 0,
  },
  {
    _id: 'about-2',
    category: categoryMap.get('education')!,
    title: 'A-level CIE',
    subtitle: 'Northfields International High School',
    date: '2016 - 2020',
    details: [
      'Grades: A+ in Physics, A+ in Mathematics, A in Economics and A in French',
      'Ranked 3rd Overall in class',
      'Ranked best in Math for A-level',
    ],
    icon: 'GraduationCap',
    order: 1,
  },
  {
    _id: 'about-3',
    category: categoryMap.get('awards')!,
    title: 'Presenter at the PIERS 2025 Conference',
    subtitle: 'Williams College',
    description:
      'Recognized for my senior thesis project on cryptocurrency arbitrage and invited to share my work',
    date: '2025',
    details: [
      'Presented my work at the PIERS 2025 conference',
      'Shared my work and insight with other great minds in Economics, developing connections and critical thinking',
      'Gathered insight that led into further machine learning implementations to my research',
    ],
    icon: 'Trophy',
    order: 2,
  },
  {
    _id: 'about-4',
    category: categoryMap.get('awards')!,
    title: 'SparkLab - Entrepreneurship Program',
    subtitle: 'Union College',
    description:
      "Selected participant in Union College's premier entrepreneurship incubator program, developing innovative business solutions and startup concepts.",
    date: '2024 - 2025',
    details: [
      "Secured second place with my team's startup concept, earning $12,500 in startup capital",
      'Completed an intensive 20-week program focused on entrepreneurship fundamentals and business launch strategies',
      'Created a professional pitch deck and presented to potential investors and judges in the final competition',
    ],
    icon: 'Trophy',
    order: 3,
  },
  {
    _id: 'about-5',
    category: categoryMap.get('hobbies')!,
    title: 'Tennis',
    description:
      'Division III collegiate tennis player with a lifelong passion for the sport. Compete at the varsity level while balancing academic commitments, developing discipline and time management skills.',
    details: [
      'Varsity tennis player at Union College',
      'Nationally ranked Player U18 in Mauritius',
      'Competed in NCAA Division III tournaments',
      'Maintain rigorous training schedule year-round',
      'Ranked player in both the U.S and France',
    ],
    icon: 'Heart',
    order: 7,
  },
  {
    _id: 'about-6',
    category: categoryMap.get('hobbies')!,
    title: 'Fitness',
    description:
      'Dedicated fitness enthusiast with a structured approach to strength training and athletic performance. Apply data-driven methods to track progress and optimize training protocols.',
    details: [
      'Implement periodized training programs for strength and conditioning',
      'Track metrics and analyze performance data for continuous improvement',
      'Practice evidence-based nutrition strategies to support training goals',
      'Mentor fellow students in effective training methodologies',
    ],
    icon: 'Heart',
    order: 8,
  },
];
