import React, { forwardRef } from 'react';
import { BriefcaseIcon, GraduationCapIcon, CertificateIcon } from './icons/Icons';
import { TimelineItem } from '../types';

interface CareerPathProps {
    timeline: TimelineItem[];
}

const iconMap: { [key: string]: React.ReactNode } = {
    work: <BriefcaseIcon className="w-5 h-5 text-white" />,
    education: <GraduationCapIcon className="w-5 h-5 text-white" />,
    certification: <CertificateIcon className="w-5 h-5 text-white" />
};

export const CareerPath = forwardRef<HTMLElement, CareerPathProps>(({ timeline }, ref) => {
  return (
    <section ref={ref} id="about" className="py-20 sm:py-24 bg-surface-subtle dark:bg-dark-surface-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text dark:text-dark-text sm:text-4xl">
            Career Path
          </h2>
          <p className="mt-4 text-lg text-text-muted dark:text-dark-text-muted max-w-3xl mx-auto">
            A timeline of my professional growth, skills acquisition, and academic achievements.
          </p>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto">
            <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                 {timeline.map((item) => (
                    <div key={item.id} className="mb-10 last:mb-0">
                        <div className="absolute -left-[22px] mt-1.5 w-10 h-10 bg-primary dark:bg-dark-primary rounded-full flex items-center justify-center ring-8 ring-surface-subtle dark:ring-dark-surface-subtle">
                            {iconMap[item.type]}
                        </div>
                        <div className="bg-surface dark:bg-dark-surface p-6 rounded-lg shadow-md">
                            <p className="font-mono text-sm text-primary dark:text-dark-primary">{item.date}</p>
                            <h3 className="mt-1 text-lg font-bold text-text dark:text-dark-text">{item.title}</h3>
                            <p className="text-md font-medium text-text-muted dark:text-dark-text-muted">{item.organization}</p>
                            <p className="mt-2 text-sm text-text-muted dark:text-dark-text-muted">{item.description}</p>
                        </div>
                    </div>
                 ))}
            </div>
        </div>
      </div>
    </section>
  );
});
