import React, { useState, useMemo, forwardRef } from 'react';
import { Project as ProjectType } from '../types';

const ProjectCard: React.FC<{ project: ProjectType }> = ({ project }) => (
    <div className="group relative flex flex-col rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-surface-subtle dark:bg-dark-surface-subtle overflow-hidden">
        <div className="aspect-w-16 aspect-h-9">
            <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-text dark:text-dark-text">{project.title}</h3>
            <p className="mt-2 text-sm text-text-muted dark:text-dark-text-muted flex-grow">{project.shortDescription}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map(t => (
                    <span key={t} className="text-xs font-mono bg-primary/10 dark:bg-dark-primary/10 text-primary dark:text-dark-primary px-2 py-1 rounded">
                        {t}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

interface ProjectsProps {
    projects: ProjectType[];
}

export const Projects = forwardRef<HTMLElement, ProjectsProps>(({ projects }, ref) => {
  const allTags = useMemo(() => ['All', ...new Set(projects.flatMap(p => p.tags))], [projects]);
  const [activeTag, setActiveTag] = useState('All');

  const filteredProjects = useMemo(() => {
    if (activeTag === 'All') return projects;
    return projects.filter(p => p.tags.includes(activeTag));
  }, [activeTag, projects]);

  return (
    <section ref={ref} id="projects" className="py-20 sm:py-24 bg-surface-subtle dark:bg-dark-surface-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text dark:text-dark-text sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-text-muted dark:text-dark-text-muted">
            A selection of my work across different domains.
          </p>
        </div>
        <div className="flex justify-center flex-wrap gap-2 mt-12">
            {allTags.map(tag => (
                <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                        activeTag === tag
                            ? 'bg-primary text-white dark:bg-dark-primary dark:text-dark-surface'
                            : 'bg-surface dark:bg-dark-surface hover:bg-surface-subtle dark:hover:bg-dark-surface-subtle text-text-muted dark:text-dark-text-muted'
                    }`}
                >
                    {tag}
                </button>
            ))}
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
});