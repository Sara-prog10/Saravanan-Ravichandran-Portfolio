import React, { forwardRef, useState } from 'react';
import { PERSONAL_INFO } from '../constants';
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon } from './icons/Icons';

export const Contact = forwardRef<HTMLElement>((props, ref) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // IMPORTANT: Replace this with your own Formspree endpoint.
      // 1. Go to https://formspree.io/
      // 2. Create a new form and point it to your email (sarvanrsd@gmail.com).
      // 3. Replace the URL below with your unique endpoint.
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
    }
  };


  return (
    <section ref={ref} id="contact" className="py-20 sm:py-24 bg-surface-subtle dark:bg-dark-surface-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight text-text dark:text-dark-text sm:text-4xl">
                Get In Touch
                </h2>
                <p className="mt-4 text-lg text-text-muted dark:text-dark-text-muted">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-12 bg-surface dark:bg-dark-surface p-8 rounded-lg shadow-md space-y-6">
                 <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-muted dark:text-dark-text-muted">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-surface-subtle border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-muted dark:text-dark-text-muted">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-surface-subtle border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
                 <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-muted dark:text-dark-text-muted">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white dark:bg-dark-surface-subtle border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    ></textarea>
                </div>
                <div>
                     <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 dark:text-dark-surface transition-transform transform hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-dark-surface disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
                {status === 'success' && <p className="text-center text-green-600 dark:text-green-400">Thank you! Your message has been sent successfully.</p>}
                {status === 'error' && <p className="text-center text-red-600 dark:text-red-400">Something went wrong. Please try again later.</p>}
            </form>

            <div className="mt-16 text-center">
                <p className="text-text-muted dark:text-dark-text-muted">You can also find me on:</p>
                <div className="mt-6 flex justify-center space-x-6">
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-300">
                        <GithubIcon className="w-8 h-8" />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted dark:text-dark-text-muted hover:text-primary dark:hover:text-dark-primary transition-colors duration-300">
                        <LinkedinIcon className="w-8 h-8" />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
});