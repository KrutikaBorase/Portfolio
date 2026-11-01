export const profile = {
  name: 'Krutika Borase',
  initials: 'KB',
  email: 'krutikaborse111011@gmail.com',
  location: 'Pune, India',
  github: 'https://github.com/KrutikaBorase',
  githubUser: 'KrutikaBorase',
  linkedin: 'https://linkedin.com/in/krutika-borase',
  /**
   * Resume: drop the PDF into /public and set `resumeUrl` to its path (e.g. '/Krutika-Borase-CV.pdf').
   * While empty, the resume buttons are hidden so there is never a dead download link.
   */
  resumeUrl: '' as string,
  roles: ['Python Backend Developer', 'AI/ML Engineer', 'Generative AI Developer', 'Data Science Enthusiast'],
  headline: ['Building Intelligent Systems.', 'Engineering Meaningful Solutions.'],
  summary:
    'Software developer passionate about building intelligent applications, scalable backend systems, and AI-powered solutions. I combine Python engineering, machine learning, and modern GenAI technologies to solve practical problems.',
  about: [
    "I'm Krutika Borase, a Software Development Associate from the Class of 2026 with hands-on experience in Python backend development, REST API engineering, machine learning pipelines, and Generative AI integration.",
    'My work spans building backend modules, automating data workflows, developing intelligent applications, and integrating LLM-powered systems.',
    'I enjoy working across the development lifecycle, from problem understanding and system design to implementation, testing, optimization, and documentation.',
    "With experience in Agile environments and technologies including Python, Flask, TensorFlow, LangChain, and SQL, I'm continuously exploring how software engineering and AI can create meaningful real-world impact.",
  ],
  metrics: [
    { value: 8, suffix: '+', label: 'Months', caption: 'Internship experience' },
    { value: 3, suffix: '', label: 'Projects', caption: 'Featured technical projects' },
    { value: 94.6, suffix: '%', label: 'Accuracy', caption: 'IoT anomaly detection', decimals: 1 },
    { value: 2025, suffix: '', label: 'IEEE ICTBIG', caption: 'Research publication', plain: true },
  ],
  education: {
    degree: 'Bachelor of Technology — Data Science Engineering',
    institution: 'G.H. Raisoni College of Engineering and Management, Pune',
    years: '2022 – 2026',
    cgpa: '8.4 / 10.0',
    focus: ['Data Science', 'Software Development', 'AI/ML'],
  },
  certification: {
    name: 'SQL Certification',
    issuer: 'Simplilearn',
    url: '' as string, // add a verified certificate URL to enable the "View certificate" link
  },
  publication: {
    title: 'Real-Time IoT Anomaly Detection System',
    venue: 'IEEE ICTBIG 2025',
    year: '2025',
    domain: 'IoT Security · Deep Learning',
    tech: ['Python', 'LSTM', 'TensorFlow', 'Flask', 'REST APIs'],
    url: '' as string, // add the verified IEEE Xplore URL here to enable the link
  },
}
