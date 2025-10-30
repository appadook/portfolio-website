import React from 'react';

// Experience interface matching ExperienceSection component
interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  technologies: string[];
  logo?: string;
}

// Factory function to create experiences with auto-incrementing IDs
let experienceIdCounter = 1;
const createExperience = (data: Omit<Experience, 'id'>): Experience => ({
  id: experienceIdCounter++,
  ...data,
});

export const experiences: Experience[] = [
  createExperience({
    company: "Akuna Group",
    role: "Data Engineer Intern",
    duration: "August 2025 - Present",
    location: "Remote",
    description: "Incoming Internship Position",
    technologies: [
      "Databricks",
      "Apache Spark",
      "Delta Lake",
      "Python",
      "SQL",
      "ETL Pipelines",
      "Data Warehousing",
      "Cloud Computing",  
    ],
    logo: "/experience/akuna_logo.jpeg",
  }),
  createExperience({
    company: "Scan Global Shipping and Logistics US inc",
    role: "Software Engineer Intern",
    duration: "May 2025 - July 2025",
    location: "Remote",
    description: "Built serverless data pipeline using AWS Lambda, S3, and FastAPI that automates complex file merging workflows, reducing processing time by over 95% (1 hours to 3 minutes) and eliminating manual errors. Developed full-stack React TypeScript application with real-time polling and drag-and-drop interface, processing files up to 10GB while maintaining responsive UX and 99% success rate. Engineered ETL data transformations with Pandas to merge multi-format datasets (CSV/Excel), implementing business logic and aggregation algorithms that save 15+ hours weekly of manual work.",
    technologies: [
      "React",
      "FastAPI",
      "AWS Lambda",
      "AWS S3",
      "REST APIs",
      "Cloud Computing",
      "ETL Pipelines",
      "Async Programming",
      "Error Handling",
      "Pandas",
    ],
    logo: "/experience/scan_global.png",
  }),
  createExperience({
    company: "Union College – Computer Science Department",
    role: "Machine Learning Researcher – Predictive Arbitrage Modeling",
    duration: "March 2025 – June 2025",
    location: "Schenectady, NY",
    description:
      "Developed a predictive ML pipeline using scikit-learn and statistical methods to train predictive models (Random Forest, SVM, Gradient Boosting) to forecast optimal arbitrage strategies with 86.04% accuracy and simulate $897K+ trading profit across 30K+ trades. Engineered a time-series dataset of 28M+ BTC/USD ticks using Pandas and NumPy for feature extraction.",
    technologies: [
      "Python",
      "scikit-learn",
      "SVM",
      "Gradient Boosting",
      "Pandas",
      "NumPy",
      "TensorFlow",
    ],
    logo: "/experience/uc_logo.png",
  }),
  createExperience({
    company: "Union College – Economics Department",
    role: "Research Software Engineer – Crypto Arbitrage Systems",
    duration: "September 2024 – March 2025",
    location: "Schenectady, NY",
    description:
      "Built a full-stack real-time crypto analytics platform using Flask, WebSocket and CoinAPI, streaming BTC/USD data from several exchanges with <200ms latency to detect and visualize arbitrage opportunities. Designed and deployed an end-to-end ETL pipeline to serve real-time price data via REST API and WebSocket.",
    technologies: [
      "Flask",
      "WebSocket",
      "REST API",
      "React Native",
      "CoinAPI",
      "Python",
    ],
    logo: "/experience/uc_logo.png",
  }),
  createExperience({
    company: "Union College CSC489",
    role: "Undergraduate Student Researcher - Software Developer",
    duration: "September 2024 - December 2024",
    location: "Schenectady, NY",
    description:
      "Led the creation of 1000+ tests to validate d-partite graph matching algorithms, improving reliability and identifying edge case errors. Applied advanced algorithm design techniques to improve performance and reliability of maximum matching in d-partite graphs, achieving 99% improvement in theoretical performance.",
    technologies: ["Python", "Algorithms", "Graph Theory", "Testing", "NumPy"],
    logo: "/experience/uc_logo.png",
  }),
  createExperience({
    company: "Foppiani Shipping and Logistics US inc",
    role: "Data Engineer Intern - BI and Analytics",
    duration: "July 2024 - September 2024",
    location: "Jamaica, NY",
    description:
      "Engineered comprehensive ETL pipelines in Python and R using Pandas and NumPy to process and transform 1.5M+ shipping records for business intelligence reporting. Designed and implemented data warehousing solutions with Firebase and Firestore, creating scalable analytics infrastructure that reduced data processing time by 40%. Developed interactive BI dashboards and data visualization tools using React and Google Maps API to provide actionable insights for logistics operations.",
    technologies: [
      "Python",
      "R",
      "Pandas",
      "NumPy",
      "ETL",
      "Firebase",
      "Firestore",
      "React",
      "Google Maps API",
    ],
    logo: "/experience/foppsl.webp",
  }),
  createExperience({
    company: "Truefort Inc",
    role: "Software Engineer Intern",
    duration: "October 2021 - December 2021",
    location: "Weehawken, NJ",
    description:
      "Developed and optimized Python scripts to automate data collection and processing workflows using Object-Oriented Programming (OOP) principles, resulting in a 30% reduction in manual processing time. Collaborated with Senior programmers to build Python-based executables, applying OOP design patterns.",
    technologies: ["Python", "OOP", "Unit Testing", "Automation", "Docker"],
    logo: "/experience/truefort.webp",
  }),
];

// Project interface matching ProjectsSection component
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  categories: Array<
    | "AI/ML"
    | "Software Engineering"
    | "Web Dev"
    | "System Engineering"
    | "Quantitative Dev"
    | "Research"
  >;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  features?: string[];
  challenges?: string[];
  outcomes?: string[];
  timeline?: string;
  teamSize?: string;
}

// Factory function to create projects with auto-incrementing IDs
let projectIdCounter = 1;
const createProject = (data: Omit<Project, 'id'>): Project => ({
  id: projectIdCounter++,
  ...data,
});

export const projects: Project[] = [
  createProject({
  title: "Formula 1 Prediction Engine",
  description:
    "A comprehensive machine learning platform that predicts Formula 1 race outcomes using historical data, real-time statistics, and advanced ML algorithms with a modern web interface for interactive predictions.",
  longDescription:
    "An end-to-end Formula 1 prediction system that combines data engineering, machine learning, and web development to forecast race results. The platform processes 75+ years of F1 historical data, implements sophisticated feature engineering for driver/constructor performance metrics, and provides real-time predictions through an intuitive React dashboard. Built with modular ML pipelines supporting multiple prediction targets (podium finishes, points scoring, DNF risks) and comprehensive model evaluation frameworks.",
  categories: ["AI/ML"],
  techStack: [
    "Python",
    "scikit-learn", 
    "pandas",
    "React.js",
    "Flask",
    "PostgreSQL",
    "Jupyter",
    "Kaggle API",
  ],
  imageUrl: "/project_images/f1_pred_engine.jpg",
  timeline: "1 month",
  teamSize: "Solo Project", 
  features: [
    "Modular ML pipeline with Random Forest and ensemble models",
    "Advanced feature engineering with rolling statistics and temporal analysis",
    "Multi-target prediction system (Top 3, Top 10, DNF probability)",
    "Interactive web dashboard for race predictions and analysis",
    "Comprehensive model evaluation with accuracy metrics and backtesting",
    "Real-time data integration for current season results",
    "Driver performance analysis with historical trend visualization",
    "Automated data validation and preprocessing pipelines",
  ],
  challenges: [
    "Preventing data leakage in temporal ML models with proper train/test splits",
    "Engineering meaningful features from 75+ years of heterogeneous F1 data", 
    "Handling driver/team changes and ensuring consistent ID mapping across seasons",
    "Implementing robust overfitting detection and model validation frameworks",
  ],
  outcomes: [
    "Achieved 70%+ accuracy on podium finish predictions",
    "Successfully processed 26,000+ historical race results",
    "Built scalable ML pipeline supporting multiple prediction targets",
    "Delivered production-ready demo with CLI and web interfaces",
  ],
  githubUrl: "https://github.com/yourusername/f1-prediction-engine",
}),
  createProject({
    title: "Crypto-Arbitrage Tracker",
    description:
      "A full stack application that makes use of websockets through multiple APIs to showcase the arbitrage opportunities in the cryptocurrency market for certain coins.",
    longDescription:
      "A comprehensive real-time cryptocurrency arbitrage tracking platform that integrates with multiple exchange APIs via WebSocket connections. The system processes live market data to identify profitable arbitrage opportunities across different exchanges and currency pairs, providing traders with actionable insights for high-frequency trading strategies.",
    categories: ["Quantitative Dev", "Software Engineering"],
    techStack: [
      "Flask",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "WebSocket",
      "Firebase Auth",
    ],
    imageUrl: "/project_images/crypto-app.jpg",
    timeline: "7 months",
    teamSize: "Solo Project",
    features: [
      "Real-time WebSocket integration with multiple crypto exchanges",
      "Automated arbitrage opportunity detection algorithms",
      "Interactive dashboard with live price feeds",
      "Historical arbitrage data analysis and visualization",
      "Alert system for profitable trading opportunities",
      "Multi-currency pair support (BTC/USD, ETH/USD, etc.)",
    ],
    challenges: [
      "Managing high-frequency data streams with low latency",
      "Synchronizing data from multiple exchange APIs",
      "Implementing efficient arbitrage calculation algorithms",
    ],
    outcomes: [
      "Successfully identified 500+ arbitrage opportunities",
      "Achieved <200ms latency for real-time data processing",
      "Generated actionable insights for crypto trading strategies",
    ],
  }),
  {
    id: projectIdCounter++,
    title: "Maximum Matching Research",
    description:
      "A project that explores algorithms for finding maximum matching in d-partite graphs, implemented in Python with comprehensive testing.",
    longDescription:
      "An advanced research project focused on developing and optimizing algorithms for maximum matching in d-partite graphs. The project includes implementation of both classical and novel algorithms, extensive testing frameworks, and performance analysis across various graph structures.",
    categories: ["Research", "Software Engineering"],
    techStack: ["Python", "NumPy", "Matplotlib", "Jupyter"],
    imageUrl: "/project_images/max_matching.png",
    timeline: "12 weeks",
    teamSize: "14 researchers",
    features: [
      "Implementation of multiple d-partite graph matching algorithms",
      "Comprehensive test suite with 1000+ test cases",
      "Performance benchmarking and optimization",
      "Visualization tools for graph structures and matching results",
      "Research documentation and algorithm analysis",
    ],
    challenges: [
      "Optimizing algorithm performance for large graph structures",
      "Handling edge cases in d-partite graph matching",
      "Ensuring correctness across diverse graph topologies",
    ],
    outcomes: [
      "99% improvement in theoretical performance",
      "Published research findings in academic documentation",
      "Created reusable algorithm library for future research",
    ],
  },
  {
    id: projectIdCounter++,
    title: "Portfolio Website",
    description:
      "My personal portfolio website built using Next.js, Tailwind CSS, and TypeScript with a clean and responsive design.",
    longDescription:
      "A modern, responsive portfolio website showcasing my professional experience, projects, and skills. Built with performance and user experience in mind, featuring smooth animations, interactive components, and optimized loading times.",
    categories: ["Software Engineering", "Web Dev"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    imageUrl: "/project_images/portfolio-web.png",
    liveUrl: "https://your-portfolio.vercel.app",
    timeline: "2 months",
    teamSize: "Solo project",
    features: [
      "Responsive design optimized for all devices",
      "Interactive project showcases with detailed modals",
      "Smooth animations and transitions",
      "SEO optimized with meta tags and structured data",
      "Fast loading times with Next.js optimization",
      "Contact form with email integration",
    ],
    challenges: [
      "Creating engaging animations without impacting performance",
      "Ensuring cross-browser compatibility",
      "Optimizing for mobile-first responsive design",
    ],
    outcomes: [
      "Achieved 95+ Lighthouse performance score",
      "Successfully showcased professional experience",
      "Deployed with 99.9% uptime on Vercel",
    ],
  },
  {
    id: projectIdCounter++,
    title: "Forecasting Inflation",
    description:
      "A collaborative project using R to build economic models for predicting inflation rates using TSLM and ARIMA models.",
    longDescription:
      "An econometric analysis project focused on developing predictive models for inflation forecasting. Utilized advanced time series analysis techniques including TSLM and ARIMA models to analyze economic indicators and predict quarterly inflation rates.",
    categories: ["Quantitative Dev", "Research", "AI/ML"],
    techStack: ["R", "RStudio", "ggplot2", "forecast"],
    imageUrl: "/project_images/inflation.webp",
    timeline: "6 weeks",
    teamSize: "2 researchers",
    features: [
      "Time series analysis of economic indicators",
      "TSLM and ARIMA model implementation",
      "Statistical significance testing and validation",
      "Data visualization of economic trends",
      "Quarterly inflation rate predictions",
      "Model performance comparison and optimization",
    ],
    challenges: [
      "Handling non-stationary economic time series data",
      "Selecting appropriate predictors for inflation modeling",
      "Validating model accuracy against historical data",
    ],
    outcomes: [
      "Achieved 78% accuracy in quarterly inflation predictions",
      "Identified key economic indicators for inflation forecasting",
      "Presented findings to economics department faculty",
    ],
  },
  {
    id: projectIdCounter++,
    title: "Fitness Tracker Web App",
    description:
      "A comprehensive fitness tracker web application that enables users to plan workout routines and monitor their progress.",
    longDescription:
      "A full-stack fitness tracking application designed to help users manage their workout routines, track personal records, and monitor fitness progress over time. Features user authentication, data persistence, and interactive progress visualization.",
    categories: ["Software Engineering", "Web Dev"],
    techStack: [
      "Express.js",
      "PostgreSQL",
      "React.js",
      "Node.js",
      "Tailwind CSS",
      "Supabase",
    ],
    imageUrl: "/project_images/fitness_web_app.png",
    timeline: "3 months",
    teamSize: "Solo Project",
    features: [
      "User authentication and profile management",
      "Workout routine planning and scheduling",
      "Personal record tracking and history",
      "Progress visualization with charts and graphs",
      "Exercise database with detailed instructions",
      "Social features for sharing achievements",
    ],
    challenges: [
      "Designing efficient database schema for workout data",
      "Implementing real-time progress tracking",
      "Creating intuitive user interface for complex data entry",
    ],
    outcomes: [
      "200+ active users within first month",
      "Successfully tracked 5000+ workout sessions",
      "Positive user feedback on interface design",
    ],
  },
  {
    id: projectIdCounter++,
    title: "Z-manager Web App",
    description:
      "A user-friendly web application for efficient task and project management with drag-and-drop calendar interface.",
    longDescription:
      "A comprehensive project management web application featuring an intuitive drag-and-drop interface for task organization. Built with Spring Boot backend and Next.js frontend, providing users with powerful tools for planning and tracking their work efficiently.",
    categories: ["Software Engineering", "Web Dev"],
    techStack: [
      "Spring Boot",
      "PostgreSQL",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Supabase",
    ],
    imageUrl: "/project_images/z-logo.jpg",
    timeline: "2 months",
    teamSize: "Solo Project",
    features: [
      "Drag-and-drop task management interface",
      "Calendar view for project planning",
      "Team collaboration and task assignment",
      "Progress tracking and reporting",
      "File attachment and document management",
      "Real-time notifications and updates",
    ],
    challenges: [
      "Implementing complex drag-and-drop functionality",
      "Synchronizing real-time updates across multiple users",
      "Optimizing database queries for large datasets",
    ],
    outcomes: [
      "Improved team productivity by 40%",
      "Successfully managed 1000+ tasks across multiple projects",
      "Positive feedback from beta testing groups",
    ],
  },
  {
    id: projectIdCounter++,
    title: "Crypto Arbitrage Prediction Engine",
    description:
      "Built a predictive modeling system to forecast cryptocurrency arbitrage opportunities using machine learning models.",
    longDescription:
      "An advanced machine learning system designed to predict cryptocurrency arbitrage opportunities using historical BTC/USD trade data. Implemented sophisticated feature engineering, real-time ETL pipelines, and ensemble methods to achieve high-accuracy predictions for high-frequency trading strategies.",
    categories: ["AI/ML", "Quantitative Dev"],
    techStack: [
      "Python",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "TensorFlow",
      "Jupyter Notebooks",
    ],
    imageUrl: "/project_images/crypto-project.png",
    timeline: "10 weeks",
    teamSize: "Solo Project",
    features: [
      "Real-time ETL pipelines for crypto market data",
      "Advanced feature engineering with volatility metrics",
      "Ensemble ML models (Random Forest, SVM, Gradient Boosting)",
      "Backtesting framework for strategy validation",
      "High-frequency trading simulation environment",
      "Performance monitoring and model retraining",
    ],
    challenges: [
      "Processing 28M+ BTC/USD ticks efficiently",
      "Engineering features for volatile cryptocurrency markets",
      "Optimizing models for low-latency predictions",
    ],
    outcomes: [
      "86.04% prediction accuracy achieved",
      "Simulated $897K+ trading profit across 30K+ trades",
      "99.87% trade success rate with $29.76 average profit per trade",
    ],
  },
  {
    id: projectIdCounter++,
    title: "not-gradescope Web App",
    description:
      "An alternative to Gradescope with enhanced features for educational institutions and improved user experience.",
    longDescription:
      "A comprehensive educational platform designed as an alternative to Gradescope, featuring enhanced grading capabilities, student group management, and an intuitive user interface. Built to address specific needs of educational institutions with additional collaborative features.",
    categories: ["Software Engineering"],
    techStack: [
      "Supabase",
      "PostgreSQL",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Bootstrap CSS",
    ],
    imageUrl: "/project_images/not-gradescope.png",
    timeline: "3 months",
    teamSize: "8 developers",
    features: [
      "Advanced grading and rubric management",
      "Automated student group assignment",
      "Real-time collaboration tools for instructors",
      "Analytics dashboard for grade tracking",
      "Integration with popular LMS platforms",
      "Mobile-responsive design for accessibility",
    ],
    challenges: [
      "Implementing complex grading algorithms",
      "Ensuring data security for educational records",
      "Creating intuitive interface for diverse user groups",
    ],
    outcomes: [
      "Successfully tested with 100+ students",
      "Reduced grading time by 50% for instructors",
      "Positive feedback from educational beta testers",
    ],
  },
  {
    id: projectIdCounter++,
    title: "Loops Programming Language",
    description:
      "A custom programming language developed using OCaml with interpreter for basic programming language features.",
    longDescription:
      "A complete programming language implementation featuring lexical analysis, parsing, and interpretation capabilities. Built using OCaml with support for iterative statements, block statements, variable assignment, and return semantics.",
    categories: ["Software Engineering"],
    techStack: ["OCaml", "Dune", "Menhir", "OUnit", "OCamllex"],
    imageUrl: "/project_images/loops.webp",
    timeline: "6 weeks",
    teamSize: "Solo project",
    features: [
      "Complete lexical analyzer and parser",
      "Interpreter with variable scoping",
      "Support for iterative and conditional statements",
      "Function definition and calling mechanisms",
      "Comprehensive test suite with OUnit",
      "Error handling and debugging features",
    ],
    challenges: [
      "Implementing proper variable scoping rules",
      "Designing efficient parsing algorithms",
      "Handling complex language semantics",
    ],
    outcomes: [
      "Successfully implemented core language features",
      "Achieved 95% test coverage with comprehensive test suite",
      "Demonstrated understanding of compiler design principles",
    ],
  },
  {
    id: projectIdCounter++,
    title: "16-bit CPU Design",
    description:
      "Design and implementation of a 16-bit CPU using Logisim with support for arithmetic, branch, and jump instructions.",
    longDescription:
      "A complete 16-bit CPU architecture designed and implemented using Logisim digital logic simulator. The CPU supports a comprehensive instruction set including arithmetic operations, branching, jumping, and function calls.",
    categories: ["Software Engineering", "System Engineering"],
    techStack: ["Logisim", "MIPS Assembly", "Python"],
    imageUrl: "/project_images/16-bit-cpu.png",
    timeline: "10 weeks",
    teamSize: "Solo project",
    features: [
      "16-bit instruction set architecture",
      "Support for arithmetic and logical operations",
      "Branch and jump instruction implementation",
      "Function call and return mechanisms",
      "Register file and memory management",
      "Assembly language programming support",
    ],
    challenges: [
      "Designing efficient instruction encoding",
      "Implementing complex control unit logic",
      "Optimizing critical path timing",
    ],
    outcomes: [
      "Successfully executed complex assembly programs",
      "Demonstrated understanding of computer architecture",
      "Created comprehensive documentation and test programs",
    ],
  },
  {
    id: projectIdCounter++,
    title: "NLP for QA over Tabular Data",
    description:
      "Exploring different LLM prompting strategies for answering questions about tabular data using various evaluation approaches.",
    longDescription:
      "A research project investigating the effectiveness of different Large Language Model prompting strategies for question-answering tasks over tabular data. Evaluated multiple approaches including zero-shot learning, chain of thought, and code-based methods.",
    categories: ["AI/ML"],
    techStack: ["Python", "Transformers", "Pandas", "OpenAI API"],
    imageUrl: "/project_images/llm.jpg",
    timeline: "6 weeks",
    teamSize: "3 developers",
    features: [
      "Multiple LLM prompting strategy implementations",
      "Comprehensive evaluation framework",
      "Tabular data preprocessing and analysis",
      "Performance comparison across different approaches",
      "Integration with DataBench evaluation metrics",
      "Automated testing and validation pipeline",
    ],
    challenges: [
      "Designing effective prompting strategies for tabular data",
      "Handling diverse table structures and formats",
      "Evaluating model performance across different question types",
    ],
    outcomes: [
      "Identified most effective prompting strategies for tabular QA",
      "Achieved significant improvement over baseline methods",
      "Contributed to understanding of LLM capabilities for structured data",
    ],
  },
  {
    id: projectIdCounter++,
    title: "LLM Chatbot",
    description:
      "Developed a chatbot using LLM API with retrieval-augmented generation and advanced prompt engineering techniques.",
    longDescription:
      "An advanced conversational AI system built using Large Language Model APIs, featuring retrieval-augmented generation capabilities, sophisticated prompt engineering, and comprehensive model evaluation frameworks.",
    categories: ["AI/ML"],
    techStack: ["Python", "OpenAI API", "LangChain", "Vector Database"],
    imageUrl: "/project_images/chatbot.jpg",
    timeline: "1 Month",
    teamSize: "Solo project",
    features: [
      "Retrieval-augmented generation implementation",
      "Advanced prompt engineering techniques",
      "Context-aware conversation management",
      "Multi-turn dialogue capabilities",
      "Performance evaluation and monitoring",
      "Integration with external knowledge bases",
    ],
    challenges: [
      "Implementing effective retrieval mechanisms",
      "Managing conversation context and memory",
      "Optimizing response quality and relevance",
    ],
    outcomes: [
      "Achieved high user satisfaction scores",
      "Successfully handled complex multi-turn conversations",
      "Demonstrated effective use of RAG techniques",
    ],
  },

  {
    id: projectIdCounter++,
    title: "Text Classification Toolkit",
    description:
      "A comprehensive NLP toolkit for movie review sentiment analysis and complex word identification using multiple machine learning algorithms.",
    longDescription:
      "An advanced text classification system implementing multiple baseline and machine learning approaches for two distinct NLP tasks: movie review sentiment classification and complex word identification for language learners. Features sophisticated feature engineering, comprehensive evaluation metrics, and comparison of various classification algorithms including Naive Bayes, Logistic Regression, Random Forest, Decision Trees, and SVM.",
    categories: ["AI/ML"],
    techStack: ["Python", "scikit-learn", "NLTK", "NumPy", "SciPy"],
    imageUrl: "/project_images/text-classifier.jpg",
    timeline: "2 Months",
    teamSize: "Solo project",
    features: [
      "Binary sentiment classification for movie reviews",
      "Complex word identification for reading assistance",
      "Multi-feature engineering (word length, frequency, syllables, synonyms)",
      "Comprehensive evaluation metrics (accuracy, precision, recall, F-score)",
      "Multiple classification algorithms implementation",
      "Google N-gram frequency analysis integration",
      "WordNet semantic feature extraction",
      "Sophisticated syllable counting with 14-rule algorithm",
      "Feature normalization and preprocessing pipeline",
      "Cross-validation with proper train/dev/test splits",
    ],
    challenges: [
      "Implementing robust syllable counting algorithm with edge cases",
      "Handling large-scale Google N-gram frequency data (118MB)",
      "Feature engineering for optimal classification performance",
      "Balancing precision and recall across different models",
      "Managing diverse feature types and normalization strategies",
    ],
    outcomes: [
      "Achieved ~80% F-measure on movie review classification",
      "Successfully compared 5+ machine learning algorithms",
      "Implemented comprehensive evaluation framework",
      "Created reusable NLP feature extraction pipeline",
      "Generated predictions for 201 test samples",
      "Demonstrated effective baseline vs. ML model comparison",
    ],
}
];

// Programming Languages interface matching SkillsSection component
interface ProgrammingLanguage {
  name: string;
  level: "expert" | "advanced" | "intermediate";
  icon: string;
  description: string;
}

export const programmingLanguages: ProgrammingLanguage[] = [
  {
    name: "Python",
    level: "expert",
    icon: "🐍",
    description: "Data science, ML, backend APIs",
  },
  {
    name: "JavaScript",
    level: "expert",
    icon: "🟨",
    description: "Frontend, backend, full-stack",
  },
  {
    name: "TypeScript",
    level: "expert",
    icon: "🔷",
    description: "Type-safe development",
  },
  {
    name: "Java",
    level: "advanced",
    icon: "☕",
    description: "Enterprise applications",
  },
  {
    name: "R",
    level: "advanced",
    icon: "📊",
    description: "Statistical analysis & modeling",
  },
  {
    name: "SQL",
    level: "advanced",
    icon: "🗃️",
    description: "Database queries & optimization",
  },
  {
    name: "C++",
    level: "intermediate",
    icon: "⚡",
    description: "Performance-critical applications",
  },
  {
    name: "C",
    level: "intermediate",
    icon: "🔧",
    description: "Systems programming",
  },
  {
    name: "OCaml",
    level: "advanced",
    icon: "🐪",
    description: "Functional programming",
  },
  {
    name: "Assembly",
    level: "intermediate",
    icon: "🔩",
    description: "Low-level programming",
  },
];

// Technologies interface matching TechnologiesSection component
interface Technology {
  name: string;
  category: string;
  description: string;
  icon: string;
}

export const technologies: Technology[] = [
  // Programming Languages
  {
    name: "Python",
    category: "Programming Languages",
    description: "Data science, ML, backend APIs",
    icon: "🐍",
  },
  {
    name: "JavaScript",
    category: "Programming Languages",
    description: "Frontend, backend, full-stack",
    icon: "🟨",
  },
  {
    name: "Java",
    category: "Programming Languages",
    description: "Enterprise applications",
    icon: "☕",
  },
  {
    name: "TypeScript",
    category: "Programming Languages",
    description: "Type-safe development",
    icon: "🔷",
  },
  {
    name: "SQL",
    category: "Programming Languages",
    description: "Database queries & optimization",
    icon: "🗃️",
  },
  {
    name: "R",
    category: "Programming Languages",
    description: "Statistical analysis & modeling",
    icon: "📊",
  },
  {
    name: "OCaml",
    category: "Programming Languages",
    description: "Functional programming",
    icon: "🐪",
  },
  {
    name: "C",
    category: "Programming Languages",
    description: "Systems programming",
    icon: "🔧",
  },
  {
    name: "C++",
    category: "Programming Languages",
    description: "Performance-critical applications",
    icon: "⚡",
  },
  {
    name: "Assembly",
    category: "Programming Languages",
    description: "Low-level programming",
    icon: "🔩",
  },

  // Frameworks
  {
    name: "React.js",
    category: "Frameworks",
    description: "Modern UI development",
    icon: "⚛️",
  },
  {
    name: "Next.js",
    category: "Frameworks",
    description: "Full-stack React framework",
    icon: "▲",
  },
  {
    name: "Node.js",
    category: "Frameworks",
    description: "Server-side JavaScript",
    icon: "💚",
  },
  {
    name: "Flask",
    category: "Frameworks",
    description: "Python web framework",
    icon: "🌶️",
  },
  {
    name: "Express.js",
    category: "Frameworks",
    description: "Node.js web framework",
    icon: "🚀",
  },
  {
    name: "Spring Boot",
    category: "Frameworks",
    description: "Java enterprise framework",
    icon: "🍃",
  },
  {
    name: "Electron.js",
    category: "Frameworks",
    description: "Desktop app development",
    icon: "⚡",
  },
  {
    name: "TailwindCSS",
    category: "Frameworks",
    description: "Utility-first CSS framework",
    icon: "🎨",
  },
  {
    name: "Expo",
    category: "Frameworks",
    description: "React Native development platform",
    icon: "📱",
  },
  {
    name: "React Native",
    category: "Frameworks",
    description: "Cross-platform mobile development",
    icon: "📲",
  },

  // Databases
  {
    name: "PostgreSQL",
    category: "Databases",
    description: "Advanced relational database",
    icon: "🐘",
  },
  {
    name: "MySQL",
    category: "Databases",
    description: "Popular relational database",
    icon: "🗄️",
  },
  {
    name: "Supabase",
    category: "Databases",
    description: "Open source Firebase alternative",
    icon: "⚡",
  },
  {
    name: "Firebase",
    category: "Databases",
    description: "NoSQL & real-time database",
    icon: "🔥",
  },

  // Cloud Services
  {
    name: "Google Cloud",
    category: "Cloud Services",
    description: "Cloud infrastructure & services",
    icon: "☁️",
  },

  // Tools
  {
    name: "Git",
    category: "Tools",
    description: "Version control system",
    icon: "📝",
  },
  {
    name: "Postman",
    category: "Tools",
    description: "API development & testing",
    icon: "📮",
  },
  {
    name: "Tableau",
    category: "Tools",
    description: "Data visualization platform",
    icon: "📊",
  },
  {
    name: "Rstudio",
    category: "Tools",
    description: "R development environment",
    icon: "📈",
  },
  {
    name: "LateX",
    category: "Tools",
    description: "Document preparation system",
    icon: "📄",
  },
  {
    name: "GraphQL",
    category: "Tools",
    description: "Query language for APIs",
    icon: "🔗",
  },

  // Build Tools
  {
    name: "Gradle",
    category: "Build Tools",
    description: "Build automation tool",
    icon: "🔨",
  },
  {
    name: "Maven",
    category: "Build Tools",
    description: "Project management tool",
    icon: "📦",
  },
];

// Enhanced Technology interfaces for TechnologiesSectionV2
export interface Certificate {
  name: string;
  image: string;
  year: string;
  description?: string;
  issuer?: string;
  credentialId?: string;
  verificationUrl?: string;
  skills?: string[];
}

export interface TechWithIcon {
  name: string;
  icon: React.ElementType;
}

export interface CloudProvider {
  name: string;
  certifications: Certificate[];
}

export interface TechCategory {
  title: string;
  icon: React.ElementType;
  color: "primary" | "accent" | "warning" | "success";
  technologies: TechWithIcon[];
}

// Enhanced technology categories data for TechnologiesSectionV2
export const techCategories: Omit<TechCategory, 'icon' | 'technologies'>[] = [
  {
    title: "Frontend",
    color: "primary",
  },
  {
    title: "Backend", 
    color: "accent",
  },
  {
    title: "Database",
    color: "success",
  },
  {
    title: "Mobile",
    color: "warning",
  },
  {
    title: "Testing & QA",
    color: "accent",
  },
  {
    title: "DevOps",
    color: "primary",
  }
];

// Technology data by category for TechnologiesSectionV2
export const technologiesByCategory = {
  Frontend: [
    { name: "React.js" },
    { name: "Next.js" },
    { name: "TypeScript" },
    { name: "JavaScript" },
    { name: "Tailwind CSS" },
  ],
  Backend: [
    { name: "Node.js" },
    { name: "Python" },
    { name: "Flask" },
    { name: "Express.js" },
    { name: "Spring Boot" },
    { name: "Java" },
  ],
  Database: [
    { name: "PostgreSQL" },
    { name: "MySQL" },
    { name: "Supabase" },
    { name: "Firebase" },
    { name: "SQL" },
  ],
  Mobile: [
    { name: "React Native" },
    { name: "Expo" },
    // { name: "Kotlin" },
  ],
  "Testing & QA": [
    { name: "Jest" },
    { name: "Cypress" },
    { name: "Selenium" },
    { name: "Unit Testing" },
  ],
  DevOps: [
    { name: "Git" },
    { name: "Docker" },
    { name: "Gradle" },
    { name: "Maven" },
  ]
};

// Cloud providers data for TechnologiesSectionV2
export const cloudProviders: Omit<CloudProvider, 'certifications'>[] = [
  {
    name: "AWS",
  },
  {
    name: "Databricks",
  },
  {
    name: "Google Cloud",
  }
];

// Certifications data
export const certifications: { [provider: string]: Certificate[] } = {
  "AWS": [
    {
      name: "AWS Cloud Essentials",
      image: "/certifications/AWS/AWS-cloud-esentials-certificate.pdf",
      year: "2025",
      description: "Fundamental understanding of AWS cloud computing concepts, core services, and basic cloud architecture principles. This certification demonstrates knowledge of essential AWS services and their use cases.",
      issuer: "Amazon Web Services",
      credentialId: "AWS-CE-2024-001",
      verificationUrl: "https://aws.amazon.com/verification",
      skills: ["AWS Core Services", "Cloud Computing Fundamentals", "AWS Architecture", "Cost Management"]
    },
    {
      name: "Introduction to AWS WAF",
      image: "/certifications/AWS/AWS- introduction-to-aws-WAF.pdf",
      year: "2025",
      description: "Comprehensive understanding of AWS Web Application Firewall (WAF) for protecting web applications from common web exploits and attacks. Demonstrates ability to configure and manage WAF rules and policies.",
      issuer: "Amazon Web Services",
      credentialId: "AWS-WAF-2024-001",
      verificationUrl: "https://aws.amazon.com/verification",
      skills: ["AWS WAF", "Web Security", "Application Protection", "Security Rules Configuration"]
    },
    {
      name: "AWS Cloud for Small Businesses",
      image: "/certifications/AWS/AWS-cloud-for-small-businesses.pdf",
      year: "2025",
      description: "Specialized knowledge in implementing AWS cloud solutions tailored for small business environments. Focuses on cost-effective cloud strategies and scalable solutions for growing businesses.",
      issuer: "Amazon Web Services",
      credentialId: "AWS-SMB-2024-001",
      verificationUrl: "https://aws.amazon.com/verification",
      skills: ["Small Business Solutions", "Cost Optimization", "Scalable Architecture", "Business Cloud Strategy"]
    },
    {
      name: "AWS Cloud Economics for Banking",
      image: "/certifications/AWS/AWS Cloud Economics for Banking.pdf",
      year: "2025",
      description: "Advanced understanding of cloud economics specifically in the banking and financial services sector. Demonstrates knowledge of compliance requirements, risk management, and cost optimization in regulated environments.",
      issuer: "Amazon Web Services",
      credentialId: "AWS-BANK-2024-001",
      verificationUrl: "https://aws.amazon.com/verification",
      skills: ["Financial Services", "Cloud Economics", "Banking Compliance", "Risk Management", "Cost Analysis"]
    }
  ],
  "Databricks": [
    {
      name: "Databricks Fundamentals",
      image: "/certifications/Databricks/databricks fundamental badge.png",
      year: "2025",
      description: "Core understanding of Databricks unified analytics platform for big data and machine learning. Demonstrates proficiency in collaborative data science workflows and Apache Spark fundamentals.",
      issuer: "Databricks",
      credentialId: "DB-FUND-2024-001",
      verificationUrl: "https://academy.databricks.com/verification",
      skills: ["Apache Spark", "Data Analytics", "Machine Learning Workflows", "Collaborative Data Science", "Big Data Processing"]
    },
    {
      name: "Data Engineering for Databricks",
      image: "/certifications/Databricks/Data Engineering for Databricks.pdf",
      year: "2025",
      description: "Advanced data engineering skills using Databricks platform for building robust data pipelines and ETL processes. Covers Delta Lake, data ingestion, transformation, and optimization techniques.",
      issuer: "Databricks",
      credentialId: "DB-DE-2024-001",
      verificationUrl: "https://academy.databricks.com/verification",
      skills: ["Data Engineering", "ETL Pipelines", "Delta Lake", "Data Transformation", "Performance Optimization", "Data Lakehouse Architecture"]
    }
  ],
  "Apache": [
    {
      name: "Apache Kafka Fundamentals",
      image: "/certifications/Apache/apache-kafka-fundamentals.pdf",
      year: "2025",
      description: "Fundamental knowledge of Apache Kafka architecture and core concepts. Covers topics, partitions, producers, consumers, consumer groups, offset management, replication, retention, basic security and monitoring, and an introduction to Kafka Streams and Connect.",
      issuer: "Confluent Training",
      credentialId: "",
      verificationUrl: "",
      skills: [
        "Apache Kafka",
        "Stream Processing",
        "Producers & Consumers",
        "Topics & Partitions",
        "Consumer Groups & Offsets",
        "Replication & Fault Tolerance",
        "Kafka Streams",
        "Kafka Connect",
        "Basic Kafka Security & Monitoring"
      ]
    }
  ]
};
