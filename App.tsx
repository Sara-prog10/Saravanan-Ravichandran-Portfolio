import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CareerPath } from './components/CareerPath';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { BlogPostModal } from './components/BlogPostModal';
import { POSTS as initialPosts, PERSONAL_INFO as initialPersonalInfo, SKILLS as initialSkills, PROJECTS as initialProjects, CAREER_TIMELINE as initialTimeline } from './constants';
import { Post, PersonalInfo, Skill, Project, TimelineItem } from './types';
import { LoadingSpinnerIcon } from './components/icons/Icons';
import { Chatbot } from './components/Chatbot';

type Theme = 'light' | 'dark';
type View = 'portfolio' | 'login' | 'admin';

const FIREBASE_URL = 'https://saravanan-ravi-portfolio-default-rtdb.firebaseio.com/data.json';

const App: React.FC = () => {
  // UI State
  const [theme, setTheme] = useState<Theme>('light');
  const [view, setView] = useState<View>('portfolio');
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Data state, initialized with defaults
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [timeline, setTimeline] = useState<TimelineItem[]>(initialTimeline);
  
  const isInitialMount = useRef(true);

  // Refs for scrolling
  const heroRef = useRef<HTMLElement>(null);
  const careerPathRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // --- Data Fetching and Persistence ---

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(FIREBASE_URL);
        if (!response.ok && response.status !== 404) {
             throw new Error(`Firebase fetch failed with status: ${response.status}`);
        }
        const data = await response.json();

        if (data) {
          setPersonalInfo(data.personalInfo || initialPersonalInfo);
          setSkills(data.skills || initialSkills);
          setProjects(data.projects || initialProjects);
          setTimeline(data.timeline || initialTimeline);
          setPosts(data.posts || initialPosts);
        } else {
          const initialData = { personalInfo: initialPersonalInfo, skills: initialSkills, projects: initialProjects, timeline: initialTimeline, posts: initialPosts };
          await fetch(FIREBASE_URL, {
            method: 'PUT',
            body: JSON.stringify(initialData),
            headers: { 'Content-Type': 'application/json' },
          });
        }
      } catch (error) {
        console.error("Firebase Error: Could not fetch or seed data. Using default content.", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isInitialMount.current || loading) {
      isInitialMount.current = false;
      return;
    }
    const handler = setTimeout(async () => {
      const currentState = { personalInfo, skills, projects, timeline, posts };
      try {
        await fetch(FIREBASE_URL, {
          method: 'PUT',
          body: JSON.stringify(currentState),
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error("Firebase Error: Could not save data.", error);
      }
    }, 1000); 

    return () => {
      clearTimeout(handler);
    };
  }, [personalInfo, skills, projects, timeline, posts, loading]);

  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  
  useEffect(() => {
    const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash === '#/admin') {
            const loggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true';
            setIsAuthenticated(loggedIn);
            setView(loggedIn ? 'admin' : 'login');
        } else {
            setView('portfolio');
        }
    };

    const initialHash = window.location.hash;
    const loggedInOnLoad = sessionStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAuthenticated(loggedInOnLoad);

    if (initialHash === '#/admin' && loggedInOnLoad) {
      setView('admin');
    } else {
      setView('portfolio');
    }
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // --- Handlers ---
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const navigateTo = (path: 'portfolio' | 'admin') => {
    const newHash = path === 'admin' ? '#/admin' : '#';
    if (window.location.hash !== newHash) {
        window.location.hash = newHash;
    }
  };

  const handleNavigateToLogin = () => {
    setView('login');
    navigateTo('admin');
  };

  const handleLogin = (username, password) => {
    if (username === 'admin@511' && password === 'Pw@2000') {
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      setLoginError(null);
      setIsAuthenticated(true);
      setView('admin');
      navigateTo('admin');
    } else {
      setLoginError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminLoggedIn');
    navigateTo('portfolio');
  };

  const generateSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-') // remove consecutive hyphens
        .trim();
  };
  
  const handleUpdatePosts = {
    add: (postData: Omit<Post, 'slug'>) => {
        const newPost: Post = {
            ...postData,
            slug: `${generateSlug(postData.title)}-${Date.now()}`
        };
        setPosts(prev => [newPost, ...prev]);
    },
    update: (updatedPost: Post) => {
        setPosts(prev => prev.map(p => p.slug === updatedPost.slug ? updatedPost : p));
    },
    delete: (slug: string) => {
        setPosts(prev => prev.filter(p => p.slug !== slug));
    }
  };

  const handleUpdatePersonalInfo = (info: PersonalInfo) => setPersonalInfo(info);
  const handleUpdateSkills = (updatedSkills: Skill[]) => setSkills(updatedSkills);
  const handleUpdateProjects = (updatedProjects: Project[]) => setProjects(updatedProjects);
  const handleUpdateTimeline = (updatedTimeline: TimelineItem[]) => setTimeline(updatedTimeline);

  const handleSelectPost = (post: Post) => setSelectedPost(post);
  const handleClosePostModal = () => setSelectedPost(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-dark-surface">
        <LoadingSpinnerIcon className="w-12 h-12 text-primary dark:text-dark-primary" />
      </div>
    );
  }

  if (view === 'login') {
    return <AdminLogin onLogin={handleLogin} loginError={loginError} onNavigateToPortfolio={() => navigateTo('portfolio')} />;
  }

  if (view === 'admin') {
    return (
      <AdminDashboard
        posts={posts}
        onAddPost={handleUpdatePosts.add}
        onUpdatePost={handleUpdatePosts.update}
        onDeletePost={handleUpdatePosts.delete}
        personalInfo={personalInfo}
        onUpdatePersonalInfo={handleUpdatePersonalInfo}
        skills={skills}
        onUpdateSkills={handleUpdateSkills}
        projects={projects}
        onUpdateProjects={handleUpdateProjects}
        timeline={timeline}
        onUpdateTimeline={handleUpdateTimeline}
        onLogout={handleLogout}
        onNavigateToPortfolio={() => navigateTo('portfolio')}
      />
    );
  }

  return (
    <>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        onNavigate={{
          home: () => scrollTo(heroRef),
          about: () => scrollTo(careerPathRef),
          projects: () => scrollTo(projectsRef),
          blog: () => scrollTo(blogRef),
          contact: () => scrollTo(contactRef),
        }}
      />
      <main>
        <Hero ref={heroRef} personalInfo={personalInfo} onNavigateProjects={() => scrollTo(projectsRef)} onNavigateContact={() => scrollTo(contactRef)} />
        <CareerPath ref={careerPathRef} timeline={timeline} />
        <Skills skills={skills} />
        <Projects ref={projectsRef} projects={projects} />
        <Blog ref={blogRef} posts={posts} onPostSelect={handleSelectPost} />
        <Contact ref={contactRef} />
      </main>
      <Footer onNavigateToAdmin={handleNavigateToLogin} />
      <Chatbot />
      {selectedPost && <BlogPostModal post={selectedPost} onClose={handleClosePostModal} />}
    </>
  );
};

export default App;
