'use client'

import { useEffect, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

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
    title: "Data Analyst & Web Developer",
    company: "Foppiani Shipping and Logistics US inc, Jamaica, NY",
    period: "July 2024 - September 2024",
    description: [
        "Engineered a dynamic web platform using JavaScript, HTML, CSS, and the Google Maps API to visualize 1.5 million consignees on an interactive map. Optimized API calls to retrieve unique data efficiently, minimizing redundancy and enhancing performance.",
        "Processed and cleaned large datasets using Python and R, ensuring data accuracy and readiness for web integration, while optimizing workflows to manage millions of shipping records.",
        "Deployed the application on Firebase, utilizing Firestore for scalable data storage and real-time querying, enabling multiple users to seamlessly access detailed consignee and shipment information."
        
    ]
  },
]


export default function WorkExperience() {
  const jobRefs = useRef<(HTMLDivElement | null)[]>([])

  const setJobRef = (index: number) => (el: HTMLDivElement | null) => {
    jobRefs.current[index] = el;
    return undefined; // Explicitly return undefined to satisfy the type requirement
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          }
        })
      },
      { threshold: 0.1 }
    )

    jobRefs.current.forEach((job) => {
      if (job) observer.observe(job)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="w-screen py-12 backdrop-blur-sm">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Work Experience</h2>
      <div className="space-y-8 max-w-3xl mx-auto px-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            ref={setJobRef(index)}
            className="opacity-0 translate-y-10 transition-all duration-1000 ease-out"
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>
                  {job.company} • {job.period}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  {job.description.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  )
}