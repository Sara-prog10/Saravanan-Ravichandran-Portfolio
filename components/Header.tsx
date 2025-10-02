import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';
import { SunIcon, MoonIcon, MenuIcon, XIcon } from './icons/Icons';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onNavigate: {
    home: () => void;
    about: () => void;
    projects: () => void;
    blog: () => void;
    contact: () => void;
  };
}

const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <button onClick={onClick} className="text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-300 text-md font-medium">
        {children}
    </button>
);

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (navigate: () => void) => {
    navigate();
    setIsMenuOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 dark:bg-dark-surface/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <button onClick={onNavigate.home} className="text-xl font-bold text-text dark:text-dark-text">
              {PERSONAL_INFO.name}
            </button>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <NavLink onClick={onNavigate.home}>Home</NavLink>
            <NavLink onClick={onNavigate.about}>About</NavLink>
            <NavLink onClick={onNavigate.projects}>Projects</NavLink>
            <NavLink onClick={onNavigate.blog}>Blog</NavLink>
            <NavLink onClick={onNavigate.contact}>Contact</NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full text-text-muted dark:text-dark-text-muted hover:bg-surface-subtle dark:hover:bg-dark-surface-subtle transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-text-muted dark:text-dark-text-muted hover:bg-surface-subtle dark:hover:bg-dark-surface-subtle"
                aria-label="Open menu"
              >
                {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface dark:bg-dark-surface absolute w-full shadow-lg">
          <nav className="flex flex-col items-center p-4 space-y-4">
            <NavLink onClick={() => handleLinkClick(onNavigate.home)}>Home</NavLink>
            <NavLink onClick={() => handleLinkClick(onNavigate.about)}>About</NavLink>
            <NavLink onClick={() => handleLinkClick(onNavigate.projects)}>Projects</NavLink>
            <NavLink onClick={() => handleLinkClick(onNavigate.blog)}>Blog</NavLink>
            <NavLink onClick={() => handleLinkClick(onNavigate.contact)}>Contact</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};