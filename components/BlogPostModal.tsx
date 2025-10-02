import React from 'react';
import { Post } from '../types';
import { XIcon } from './icons/Icons';

interface BlogPostModalProps {
  post: Post;
  onClose: () => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose }) => {
  // Prevent body scroll when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-surface dark:bg-dark-surface rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] max-h-[800px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-text dark:text-dark-text">{post.title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-subtle dark:hover:bg-dark-surface-subtle transition-colors">
            <XIcon className="w-6 h-6 text-text-muted dark:text-dark-text-muted" />
          </button>
        </div>
        <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
          <p className="text-sm font-mono text-text-muted dark:text-dark-text-muted mb-4">
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="prose dark:prose-invert max-w-none text-text-muted dark:text-dark-text-muted whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
        .prose {
            line-height: 1.7;
            color: #475569; /* slate-600 */
        }
        .dark .prose {
             color: #94a3b8; /* slate-400 */
        }
        .prose h1, .prose h2, .prose h3 {
            color: #0f172a; /* slate-900 */
            margin-bottom: 1em;
        }
        .dark .prose h1, .dark .prose h2, .dark .prose h3 {
             color: #e2e8f0; /* slate-200 */
        }
        .prose p {
            margin-bottom: 1.25em;
        }
        .prose strong {
            color: #0f172a;
        }
        .dark .prose strong {
            color: #e2e8f0;
        }
      `}</style>
    </div>
  );
};
