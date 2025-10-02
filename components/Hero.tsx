import React, { forwardRef } from 'react';
import { PersonalInfo } from '../types';
import { ArrowRightIcon, DownloadIcon } from './icons/Icons';

interface HeroProps {
    personalInfo: PersonalInfo;
    onNavigateProjects: () => void;
    onNavigateContact: () => void;
}

export const Hero = forwardRef<HTMLElement, HeroProps>(({ personalInfo, onNavigateProjects, onNavigateContact }, ref) => {
  return (
    <section ref={ref} id="home" className="min-h-[calc(100vh-5rem)] flex items-center py-20 sm:py-24 bg-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          
          <img
            src={personalInfo.profileImageUrl}
            alt={personalInfo.name}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-8 border-4 border-primary/20 dark:border-dark-primary/20 shadow-lg object-cover"
          />

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text dark:text-dark-text">
            {personalInfo.name}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-primary dark:text-dark-primary font-semibold">
            {personalInfo.title}
          </p>
          <p className="mt-6 text-lg text-text-muted dark:text-dark-text-muted">
            {personalInfo.bio}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onNavigateProjects} className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 dark:text-dark-surface transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-dark-surface">
              View Projects
            </button>
            <a
              href={personalInfo.resumeUrl}
              download="Saravanan_Ravi_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border border-primary dark:border-dark-primary text-base font-medium rounded-md text-primary dark:text-dark-primary bg-transparent hover:bg-surface-subtle dark:hover:bg-dark-surface-subtle transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-dark-surface"
            >
              <DownloadIcon className="mr-2 w-5 h-5" />
              Download Resume
            </a>
            <button onClick={onNavigateContact} className="w-full sm:w-auto group inline-flex items-center justify-center px-8 py-3 border border-primary dark:border-dark-primary text-base font-medium rounded-md text-primary dark:text-dark-primary bg-transparent hover:bg-surface-subtle dark:hover:bg-dark-surface-subtle transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-dark-surface">
              Contact Me
              <ArrowRightIcon className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
          
      </div>
    </section>
  );
});