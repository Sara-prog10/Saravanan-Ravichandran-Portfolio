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

type Theme = 'light' | 'dark';
type View = 'portfolio' | 'login' | 'admin';

const App: React.FC = () => {
  // Theme state
  const [theme, setTheme] = useState<Theme>('light');
  
  // View/Routing state
  const [view, setView] = useState<View>('portfolio');

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Data state
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const savedPosts = localStorage.getItem('blogPosts');
      return savedPosts ? JSON.parse(savedPosts) : initialPosts;
    } catch (error) {
      console.error("Could not parse blog posts from localStorage", error);
      return initialPosts;
    }
  });

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
        const savedInfo = localStorage.getItem('personalInfo');
        return savedInfo ? JSON.parse(savedInfo) : initialPersonalInfo;
    } catch (error) {
        console.error("Could not parse personal info from localStorage", error);
        return initialPersonalInfo;
    }
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    try {
        const savedSkills = localStorage.getItem('skills');
        return savedSkills ? JSON.parse(savedSkills) : initialSkills;
    } catch (error) {
        console.error("Could not parse skills from localStorage", error);
        return initialSkills;
    }
  });
  
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
        const savedProjects = localStorage.getItem('projects');
        return savedProjects ? JSON.parse(savedProjects) : initialProjects;
    } catch (error) {
        console.error("Could not parse projects from localStorage", error);
        return initialProjects;
    }
  });

  const [timeline, setTimeline] = useState<TimelineItem[]>(() => {
    try {
        const savedTimeline = localStorage.getItem('careerTimeline');
        return savedTimeline ? JSON.parse(savedTimeline) : initialTimeline;
    } catch (error) {
        console.error("Could not parse career timeline from localStorage", error);
        return initialTimeline;
    }
  });


  // Refs for scrolling
  const heroRef = useRef<HTMLElement>(null);
  const careerPathRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const blogRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Effect for theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (userPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  // Effect for applying theme
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
    // This function is for subsequent navigation after the initial load
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

    // --- Initial Load Logic ---
    // Check the hash only on the first load to decide the initial view.
    const initialHash = window.location.hash;
    const loggedInOnLoad = sessionStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAuthenticated(loggedInOnLoad);

    if (initialHash === '#/admin' && loggedInOnLoad) {
      // If the user is already logged in and at the admin URL, show the dashboard.
      setView('admin');
    } else {
      // In all other cases (not logged in, or not at the admin URL),
      // default to the portfolio view. This prevents showing the login page on first visit.
      setView('portfolio');
    }
    
    // Add listener for navigations that happen *after* the initial load.
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Effect for persisting data to localStorage
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('personalInfo', JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('careerTimeline', JSON.stringify(timeline));
  }, [timeline]);


  // Handlers
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
    navigateTo('admin'); // Sync URL for refresh/back-button support
  };

  const handleLogin = (username, password) => {
    if (username === 'admin@511' && password === 'Pw@2000') {
      sessionStorage.setItem('isAdminLoggedIn', 'true');
      setLoginError(null);
      // Directly update state for immediate UI response
      setIsAuthenticated(true);
      setView('admin');
      // Sync URL hash
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
  
  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  }

  const addPost = (postData: Omit<Post, 'slug'>) => {
    const newPost: Post = {
        ...postData,
        slug: generateSlug(postData.title) + '-' + Date.now()
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };
  
  const updatePost = (updatedPost: Post) => {
    setPosts(prevPosts => prevPosts.map(p => p.slug === updatedPost.slug ? updatedPost : p));
  };
  
  const deletePost = (slug: string) => {
    setPosts(prevPosts => prevPosts.filter(p => p.slug !== slug));
  };
  
  const handleUpdatePersonalInfo = (newInfo: PersonalInfo) => {
    setPersonalInfo(newInfo);
  };

  const handleUpdateSkills = (newSkills: Skill[]) => {
    setSkills(newSkills);
  };
  
  const handleUpdateProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
  };
  
  const handleUpdateTimeline = (newTimeline: TimelineItem[]) => {
    setTimeline(newTimeline);
  };

  // --- Top-level Render Logic ---

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

  // Default to portfolio view
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