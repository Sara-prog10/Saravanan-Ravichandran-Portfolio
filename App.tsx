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
import { POSTS as initialPosts, PERSONAL_INFO as initialPersonalInfo, SKILLS as initialSkills, PROJECTS as initialProjects, CAREER_TIMELINE as initialTimeline } from './constants';
import { Post, PersonalInfo, Skill, Project, TimelineItem } from './types';
import { LoadingSpinnerIcon } from './components/icons/Icons';

type Theme = 'light' | 'dark';
type View = 'portfolio' | 'login' | 'admin';

const FIREBASE_URL = 'https://saravanan-ravi-portfolio-default-rtdb.firebaseio.com/data.json';

const App: React.FC = () => {
  // UI State
  const [theme, setTheme] = useState<Theme>('light');
  const [view, setView] = useState<View>('portfolio');
  const [loading, setLoading] = useState<boolean>(true);

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

  // Effect to fetch initial data from Firebase on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(FIREBASE_URL);
        if (!response.ok && response.status !== 404) {
             throw new Error(`Firebase fetch failed with status: ${response.status}`);
        }
        const data = await response.json();

        if (data) {
          // If data exists, populate the state
          setPersonalInfo(data.personalInfo || initialPersonalInfo);
          setSkills(data.skills || initialSkills);
          setProjects(data.projects || initialProjects);
          setTimeline(data.timeline || initialTimeline);
          setPosts(data.posts || initialPosts);
        } else {
          // If database is empty, seed it with the initial data from constants
          const initialData = { personalInfo, skills, projects, timeline, posts };
          await fetch(FIREBASE_URL, {
            method: 'PUT',
            body: JSON.stringify(initialData),
            headers: { 'Content-Type': 'application/json' },
          });
        }
      } catch (error) {
        console.error("Firebase Error: Could not fetch or seed data. Using default content.", error);
        // State is already set to initial constants, serving as a graceful fallback.
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to save all data to Firebase when any piece of it changes
  useEffect(() => {
    // Prevent saving on the initial render cycle before data is loaded
    if (isInitialMount.current || loading) {
      isInitialMount.current = false;
      return;
    }

    // Debounce the save operation to avoid too many writes
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
    }, 1000); // Wait 1 second after the last change before saving

    return () => {
      clearTimeout(handler); // Clear the timeout if the component unmounts or state changes again
    };
  }, [personalInfo, skills, projects, timeline, posts, loading]);

  
  // Effect for theme initialization and management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (userPrefersDark ? 'dark' : 'light');
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
  
  // Effect for routing based on hash
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
  
  // Data update handlers now just update local state.
  // The useEffect hook will handle saving to Firebase automatically.
  const generateSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  const addPost = (postData: Omit<Post, 'slug'>) => setPosts(prev => [{ ...postData, slug: generateSlug(postData.title) + '-' + Date.now() }, ...prev]);
  const updatePost = (updatedPost: Post) => setPosts(prev => prev.map(p => p.slug === updatedPost.slug ? updatedPost : p));
  const deletePost = (slug: string) => setPosts(prev => prev.filter(p => p.slug !== slug));
  const handleUpdatePersonalInfo = (newInfo: PersonalInfo) => setPersonalInfo(newInfo);
  const handleUpdateSkills = (newSkills: Skill[]) => setSkills(newSkills);
  const handleUpdateProjects = (newProjects: Project[]) => setProjects(newProjects);
  const handleUpdateTimeline = (newTimeline: TimelineItem[]) => setTimeline(newTimeline);

  // --- Top-level Render Logic ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-dark-surface">
        <LoadingSpinnerIcon className="h-12 w-12 text-primary dark:text-dark-primary" />
      </div>
    );
  }

  if (view === 'login') {
    return <AdminLogin onLogin={handleLogin} loginError={loginError} onNavigateToPortfolio={() => navigateTo('portfolio')} />;
  }

  if (view === 'admin') {
    if (isAuthenticated) {
      return <AdminDashboard 
        posts={posts} 
        onAddPost={addPost} 
        onUpdatePost={updatePost} 
        onDeletePost={deletePost} 
        onLogout={handleLogout} 
        onNavigateToPortfolio={() => navigateTo('portfolio')}
        personalInfo={personalInfo}
        onUpdatePersonalInfo={handleUpdatePersonalInfo}
        skills={skills}
        onUpdateSkills={handleUpdateSkills}
        projects={projects}
        onUpdateProjects={handleUpdateProjects}
        timeline={timeline}
        onUpdateTimeline={handleUpdateTimeline}
      />;
    }
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface dark:bg-dark-surface">
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
      <main className="flex-grow pt-16 md:pt-20">
          <Hero 
            ref={heroRef} 
            personalInfo={personalInfo}
            onNavigateProjects={() => scrollTo(projectsRef)} 
            onNavigateContact={() => scrollTo(contactRef)} 
          />
          <CareerPath ref={careerPathRef} timeline={timeline} />
          <Skills skills={skills} />
          <Projects ref={projectsRef} projects={projects} />
          <Blog ref={blogRef} posts={posts} />
          <Contact ref={contactRef} />
      </main>
      <Footer onNavigateToAdmin={handleNavigateToLogin} />
    </div>
  );
};

export default App;
