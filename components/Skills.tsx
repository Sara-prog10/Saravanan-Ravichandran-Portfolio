import React from 'react';
import { Skill } from '../types';

const SkillChip: React.FC<{ name: string }> = ({ name }) => (
  <div className="bg-primary-light/20 dark:bg-dark-primary/20 text-primary dark:text-dark-primary py-1.5 px-4 rounded-full text-sm font-medium">
    {name}
  </div>
);

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section id="skills" className="py-20 sm:py-24 bg-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text dark:text-dark-text sm:text-4xl">
            Skills & Expertise
          </h2>
          <p className="mt-4 text-lg text-text-muted dark:text-dark-text-muted">
            The tools and technologies I use to bring ideas to life.
          </p>
        </div>
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <SkillChip key={skill.name} name={skill.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};