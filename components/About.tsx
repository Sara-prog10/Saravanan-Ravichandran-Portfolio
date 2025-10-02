
import React, { forwardRef } from 'react';
import { PERSONAL_INFO } from '../constants';

// A placeholder for experience timeline items
const experience = [
  {
    role: "AI Systems Development",
    description: "Building and deploying RAG agents and virtual assistants using LLMs, vector databases, and workflow automation tools.",
    year: "2022 - Present"
  },
  {
    role: "Data Analysis & Visualization",
    description: "Creating insightful dashboards with Power BI and Tableau, driven by robust SQL data pipelines.",
    year: "2020 - Present"
  },
  {
    role: "Embedded & IoT Solutions",
    description: "Designing and programming ESP32-based IoT devices for real-world data collection and monitoring.",
    year: "2019 - Present"
  },
];

export const About = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} id="about" className="py-20 sm:py-24 bg-surface-subtle dark:bg-dark-surface-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text dark:text-dark-text sm:text-4xl">
            About Me
          </h2>
          <p className="mt-4 text-lg text-text-muted dark:text-dark-text-muted max-w-3xl mx-auto">
            A brief look at my professional journey and what drives my passion for technology.
          </p>
        </div>
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="space-y-12">
            {experience.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start gap-x-8">
                <div className="md:w-1/4 mb-2 md:mb-0">
                  <p className="font-mono text-sm text-primary dark:text-dark-primary">{item.year}</p>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold text-text dark:text-dark-text">{item.role}</h3>
                  <p className="mt-2 text-base text-text-muted dark:text-dark-text-muted">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
