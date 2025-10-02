import React from 'react';
import { PERSONAL_INFO } from '../constants';

interface FooterProps {
    onNavigateToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin }) => {
  return (
    <footer className="bg-surface-subtle dark:bg-dark-surface-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-text-muted dark:text-dark-text-muted">
        <p>&copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All Rights Reserved.</p>
        <div className="mt-2">
            <button onClick={onNavigateToAdmin} className="text-xs hover:text-primary dark:hover:text-dark-primary transition-colors bg-transparent border-none p-0 cursor-pointer">
                Admin Login
            </button>
        </div>
      </div>
    </footer>
  );
};
