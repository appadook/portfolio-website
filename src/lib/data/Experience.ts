export interface Experience {
  id: number;
  title: string;
  company: string;
  duration: string;
  description: string[];
  technologies?: string[];
  Image?: string;
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Software Engineer Intern",
    company: "Scan Gloabl Shipping and Logistics US inc, Jamaica, NY",
    duration: "Novemeber 2024 - Present",
    description: [
      "Engineered a dynamic web platform using JavaScript, HTML, CSS, and the Google Maps API to visualize 1.5 million consignees on an interactive map. Optimized API calls to retrieve unique data efficiently, minimizing redundancy and enhancing performance.",
      "Processed and cleaned large datasets using Python and R, ensuring data accuracy and readiness for web integration, while optimizing workflows to manage millions of shipping records.",
      "Deployed the application on Firebase, utilizing Firestore for scalable data storage and real-time querying, enabling multiple users to seamlessly access detailed consignee and shipment information."
    ],
    technologies: ["Next.js", "Typescript", "Google Maps API", "Firebase", "Firestore"],
    Image: "/experience/scan_global.png"
  },
  {
    id: 2,
    title: "Machine Learning Researcher – Predictive Arbitrage Modeling",
    company: "Union College – Computer Science Department, Schenectady, NY",
    duration: "March 2025 – June 2025",
    description: [
      "Developed a predictive ML pipeline using scikit-learn and statistical methods to train predictive models (Random Forest, SVM, Gradient Boosting) to forecast optimal arbitrage strategies with 86.04% accuracy and simulate $897K+ trading profit across 30K+ trades.",
      "Engineered a time-series dataset of 28M+ BTC/USD ticks using Pandas and NumPy for feature extraction and data cleaning across 4 exchanges via WebSocket ingestion, applying feature engineering on volatility, price spreads, and cross-market convergence metrics.",
      "Implemented a Python-based backtesting engine to evaluate latency-aware arbitrage trades with exchange fee modeling, achieving 99.87% trade success rate and $29.76 average profit per trade."
    ],
    technologies: ["Python", "scikit-learn", "SVM", "Gradient Boosting", "Backtesting", "Pandas", "NumPy"],
    Image: "/experience/uc_logo.png"
  },
  {
    id: 3,
    title: "Research Software Engineer – Crypto Arbitrage Systems",
    company: "Union College – Economics Department, Schenectady, NY",
    duration: "September 2024 – March 2025",
    description: [
      "Built a full-stack real-time crypto analytics platform using Flask, WebSocket and CoinAPI, streaming BTC/USD data from several exchanges with <200ms latency to detect and visualize arbitrage opportunities.",
      "Designed and deployed an end-to-end ETL pipeline to serve real-time price data via REST API and WebSocket, integrated into a React Native + Expo frontend.",
      "Processed and analyzed 800K+ trade records, generating profitability heatmaps, exchange-pair network graphs, and discovering 7 recurring arbitrage strategies."
    ],
    technologies: ["Flask", "WebSocket", "REST API", "React Native", "CoinAPI", "Data Analysis"],
    Image: "/experience/uc_logo.png"
  },
  {
    id: 4,
    title: "Undergraduate Student Researcher - Software Developer",
    company: "Union College CSC489, Schenectady, NY",
    duration: "September 2024 - December 2024",
    description: [
      "Led the creation of 1000+ tests to validate d-partite graph matching algorithms, improving reliability and identifying edge case errors.",
      "Applied advanced algorithm design techniques to improve performance and reliability of maximum matching in d-partite graphs, achieving 99% improvement in theoretical performance.",
      "Leveraged discrete mathematics and graph theory concepts to validate large-scale matching algorithms, improving edge case detection and correctness. Used communication skills to engage and collaborate among a team."
    ],
    technologies: ["Python", "Algorithms", "Graph Theory", "Testing"],
    Image: "/experience/uc_logo.png"
  },
  {
    id: 5,
    title: "Data Engineer Intern - BI and Analytics",
    company: "Foppiani Shipping and Logistics US inc, Jamaica, NY",
    duration: "July 2024 - September 2024",
    description: [
      "Built an interactive React + Google Maps app to visualize 1.5M+ consignees, optimizing API usage to reduce client data retrieval time. Implemented scale-able and re-usable front-end code.",
      "Implemented ETL pipelines in Python and R using Pandas and Numpy to clean and integrate large shipping datasets, ensuring smooth and reliable ingestion during back-end processing for Business intelligence reporting.",
      "Designed and deployed a full-stack, end-to-end microservices-based solution with Firebase & Firestore, streamlining data workflows and database integration; incorporated CI/CD pipelines to accelerate feature delivery and reduce deployment errors; solution reduced data silos and improved cross-functional team collaboration by 40%."
    ],
    technologies: ["JavaScript", "HTML/CSS", "Google Maps API", "Python", "R", "Firebase", "Firestore"],
    Image: "/experience/foppsl.webp"
  },
  {
    id: 6,
    title: "Software Engineer Intern",
    company: "Truefort Inc, Weehawken, NJ",
    duration: "October 2021 - December 2021",
    description: [
      "Developed and optimized Python scripts to automate data collection and processing workflows using Object-Oriented Programming (OOP) principles, resulting in a 30% reduction in manual processing time",
      "Collaborated with Senior programmers to build Python-based executables, applying OOP design patterns and adhering to best coding practices such as SOLID principles and DRY.",
      "Utilized Python libraries such as unittest to create comprehensive unit tests, ensuring code reliability and maintaining a 95% test coverage across multiple projects."
    ],
    technologies: ["Python", "OOP", "Unit Testing", "Automation"],
    Image: "/experience/truefort.webp"
  }
];