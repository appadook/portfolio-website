
type Job = {
    title: string
    company: string
    period: string
    description: string[]
  }
  
  export const jobs: Job[] = [
    {
      title: "Python Intern",
      company: "Truefort Inc, Weehawken, NJ",
      period: "October 2021- December 2021",
      description: [
        "Developed and optimized Python scripts to automate data collection and processing workflows using Object-Oriented Programming (OOP) principles, resulting in a 30% reduction in manual processing time",
          "Collaborated with Senior programmers to build  Python-based executables, applying OOP design patterns and adhering to best coding practices such as SOLID principles and DRY.",
          "Utilized Python libraries such as unittest to create comprehensive unit tests, ensuring code reliability and maintaining a 95% test coverage across multiple projects."
  
      ]
    },
    {
      title: "Freelance Software Engineer & Data Analyst",
      company: "Foppiani Shipping and Logistics US inc, Jamaica, NY",
      period: "July 2024 - September 2024",
      description: [
          "Engineered a dynamic web platform using JavaScript, HTML, CSS, and the Google Maps API to visualize 1.5 million consignees on an interactive map. Optimized API calls to retrieve unique data efficiently, minimizing redundancy and enhancing performance.",
          "Processed and cleaned large datasets using Python and R, ensuring data accuracy and readiness for web integration, while optimizing workflows to manage millions of shipping records.",
          "Deployed the application on Firebase, utilizing Firestore for scalable data storage and real-time querying, enabling multiple users to seamlessly access detailed consignee and shipment information."
          
      ]
    },
    {
      title: "Guided Research Student",
      company: "Union College CSC489, Schenectady, NY",
      period: "September 2024 - December 2024",
      description: [
        "Directed comprehensive testing initiatives for a Python-driven research project, orchestrating the creation of thousands of tests to enhance algorithmic performance and precision.",
        "Pioneered the research and deployment of advanced algorithms for optimal matching in d-partite graphs, significantly contributing to both the coding and theoretical advancements.",
        "Co-authored a research publication, meticulously documenting methodologies and discoveries, while exemplifying leadership and proactive collaboration within the research team"
      ]
    },
  ]