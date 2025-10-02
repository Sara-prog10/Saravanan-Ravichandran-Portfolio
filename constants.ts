import { Project, Skill, Post, TimelineItem } from './types';

export const PERSONAL_INFO = {
  name: "Saravanan Ravi",
  fullName: "Ravichandran Saravanan",
  title: "AI Engineer & Data Analyst",
  bio: "I build production-ready AI systems, data-driven dashboards, and embedded IoT solutions that turn sensor data into decisions. Experienced with RAG agents, Power BI, ESP32-based IoT, and prompt engineering.",
  email: "sarvanrsd@gmail.com",
  linkedin: "https://www.linkedin.com/in/saravananravi17/",
  github: "https://github.com/Sara-prog10",
  profileImageUrl: "https://picsum.photos/seed/saravanan-profile/300/300",
  resumeUrl: "/resume.pdf",
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI RAG Agent – Fault Reporting & Knowledge Assistant",
    shortDescription: "Designed and deployed a RAG agent for fault reporting and service queries; integrated n8n workflows, contextual search and Google Sheets for storage.",
    tech: ["LLMs", "Vector DB", "n8n", "Google Sheets", "FastAPI"],
    imageUrl: "https://picsum.photos/seed/rag-agent/400/300",
    tags: ["AI/ML", "Automation"],
  },
  {
    id: 2,
    title: "AI-Powered Virtual Assistant for On-Demand Home Services",
    shortDescription: "OpenAI API for NLU, STT/TTS integration, OpenCV for image recognition, automated ticketing and scheduling, SQL Server for storage.",
    tech: ["OpenAI API", "Web Speech", "FastAPI", "OpenCV", "SQL Server"],
    imageUrl: "https://picsum.photos/seed/virtual-assistant/400/300",
    tags: ["AI/ML", "Web"],
  },
  {
    id: 3,
    title: "Building Maintenance & Construction Tracking Dashboard",
    shortDescription: "Power BI dashboard with OneDrive data integration for maintenance & construction tracking.",
    tech: ["Power BI", "OneDrive", "SQL"],
    imageUrl: "https://picsum.photos/seed/powerbi-dashboard/400/300",
    tags: ["Data Viz", "BI"],
  },
  {
    id: 4,
    title: "Indoor Air Quality Monitor (ESP32)",
    shortDescription: "WiFi-based IAQ monitor using ESP32, CO2/PM/Temp/Humidity sensors, MQTT/HTTP, and Power BI visualisations.",
    tech: ["ESP32", "MQTT", "Python", "Power BI"],
    imageUrl: "https://picsum.photos/seed/iot-monitor/400/300",
    tags: ["IoT", "Data Viz"],
  },
  {
    id: 5,
    title: "Bike Trip Analysis (Tableau)",
    shortDescription: "SQL-based analysis and Tableau dashboard examining trip patterns and user behaviour.",
    tech: ["SQL", "Tableau", "Data Analysis"],
    imageUrl: "https://picsum.photos/seed/tableau-analysis/400/300",
    tags: ["Data Viz", "BI"],
  },
];

export const SKILLS: Skill[] = [
    { name: 'Python', category: 'Language' },
    { name: 'Pandas', category: 'Library' },
    { name: 'NumPy', category: 'Library' },
    { name: 'Scikit-learn', category: 'Library' },
    { name: 'Power BI', category: 'Tool' },
    { name: 'Prompt Engineering', category: 'Skill' },
    { name: 'AWS Bedrock', category: 'Cloud' },
    { name: 'SQL', category: 'Database' },
    { name: 'MySQL', category: 'Database' },
    { name: 'BigQuery', category: 'Database' },
    { name: 'ESP32/Arduino', category: 'Hardware' },
    { name: 'OpenCV', category: 'Library' },
    { name: 'Excel', category: 'Tool' },
];

export const POSTS: Post[] = [
    {
        slug: 'rag-agent-facility-reporting',
        title: 'How I built a RAG agent for facility fault reporting',
        excerpt: 'When we needed accurate, contextual answers for recurring facility faults, we built a RAG pipeline that combined a vector store with targeted prompts and workflow automation in n8n...',
        content: 'When we needed accurate, contextual answers for recurring facility faults, we built a RAG pipeline that combined a vector store with targeted prompts and workflow automation in n8n...',
        date: '2024-07-15'
    },
    {
        slug: 'ai-assistant-speech-vision',
        title: 'Bringing an AI assistant to life — speech + vision + LLMs',
        excerpt: 'Integrating speech-to-text, text-to-speech, and computer vision with large language models opens up a new frontier for interactive and intelligent applications. Here is a breakdown of the architecture...',
        content: 'Integrating speech-to-text, text-to-speech, and computer vision with large language models opens up a new frontier for interactive and intelligent applications. Here is a breakdown of the architecture...',
        date: '2024-06-28'
    },
    {
        slug: 'esp32-air-quality-monitor',
        title: 'Designing an indoor air quality monitor with ESP32',
        excerpt: 'The ESP32 is a powerful microcontroller perfect for IoT projects. This post details the journey of building a connected air quality monitor, from sensor selection to data visualization...',
        content: 'The ESP32 is a powerful microcontroller perfect for IoT projects. This post details the journey of building a connected air quality monitor, from sensor selection to data visualization...',
        date: '2024-05-10'
    }
];

export const CAREER_TIMELINE: TimelineItem[] = [
    {
      id: 1,
      type: 'work',
      title: 'AI Engineer',
      organization: 'The Intellect, Singapore (Remote)',
      date: 'May 2024 - Present',
      description: 'Developing and deploying AI-powered RAG agents and virtual assistants for various business needs.'
    },
    {
      id: 2,
      type: 'certification',
      title: 'Google Data Analytics Professional Certificate',
      organization: 'Coursera',
      date: 'April 2024',
      description: 'Gained practical skills in data analysis through interactive labs, covering the entire data lifecycle.'
    },
    {
      id: 3,
      type: 'work',
      title: 'Data Science Consultant',
      organization: 'Rubixe, Bangalore',
      date: 'Oct 2023 - Apr 2024',
      description: 'Developed ML models, created data pipelines, and built interactive dashboards using Power BI/Tableau.'
    },
    {
      id: 4,
      type: 'certification',
      title: 'Python Certification',
      organization: 'Guvi',
      date: 'March 2024',
      description: 'Completed a structured curriculum on Python, from fundamentals to advanced topics with hands-on projects.'
    },
    {
      id: 5,
      type: 'certification',
      title: 'Data Science Certification',
      organization: 'Datamites',
      date: 'February 2024',
      description: 'Demonstrated proficiency in data analysis, machine learning, and statistical modeling.'
    },
    {
      id: 6,
      type: 'work',
      title: 'IoT Trainer',
      organization: 'Skill Lync, Chennai',
      date: 'Aug 2023 - Oct 2023',
      description: 'Conducted training sessions on IoT, covering ESP32, Raspberry Pi, and microcontroller programming.'
    },
    {
      id: 7,
      type: 'education',
      title: 'B.E Information Technology',
      organization: 'Annamalai University, Tamilnadu',
      date: 'May 2023',
      description: 'Completed a comprehensive degree program focusing on core principles of information technology and software engineering.'
    },
    {
      id: 8,
      type: 'work',
      title: 'Firmware Development Intern',
      organization: 'Boodskap IoT, Chennai',
      date: 'Oct 2022 - Nov 2022',
      description: 'Developed and optimized firmware for ESP32 in C/C++, focusing on sensor interfacing and LoRa WAN communication.'
    }
];