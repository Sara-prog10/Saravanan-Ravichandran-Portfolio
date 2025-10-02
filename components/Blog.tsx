import React, { forwardRef } from 'react';
import { Post as PostType } from '../types';
import { ArrowRightIcon } from './icons/Icons';

interface BlogProps {
    posts: PostType[];
    onPostSelect: (post: PostType) => void;
}

const BlogPostPreview: React.FC<{ post: PostType, onPostSelect: (post: PostType) => void }> = ({ post, onPostSelect }) => (
    <div className="group flex flex-col p-6 rounded-lg bg-surface dark:bg-dark-surface shadow-md hover:shadow-xl transition-shadow duration-300">
        <p className="text-sm font-mono text-text-muted dark:text-dark-text-muted">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <h3 className="mt-2 text-xl font-bold text-text dark:text-dark-text group-hover:text-primary dark:group-hover:text-dark-primary transition-colors duration-300">{post.title}</h3>
        <p className="mt-3 text-base text-text-muted dark:text-dark-text-muted flex-grow">{post.excerpt}</p>
        <button onClick={() => onPostSelect(post)} className="mt-4 font-semibold text-primary dark:text-dark-primary inline-flex items-center self-start">
            Read more <ArrowRightIcon className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
    </div>
);

export const Blog = forwardRef<HTMLElement, BlogProps>(({ posts, onPostSelect }, ref) => {
  return (
    <section ref={ref} id="blog" className="py-20 sm:py-24 bg-surface dark:bg-dark-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text dark:text-dark-text sm:text-4xl">
            From the Blog
          </h2>
          <p className="mt-4 text-lg text-text-muted dark:text-dark-text-muted">
            Sharing insights and stories from my work in AI and tech.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => (
            <BlogPostPreview key={post.slug} post={post} onPostSelect={onPostSelect} />
          ))}
        </div>
      </div>
    </section>
  );
});
