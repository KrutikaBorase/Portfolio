export type ProjectId = 'iot' | 'tutor' | 'ridewise'

export interface Project {
  id: ProjectId
  number: string
  title: string
  subtitle: string
  category: string
  period?: string
  description: string
  problem: string
  solution: string
  stack: string[]
  highlights: string[]
  results: { value: string; label: string }[]
  /** Verified public URLs only. Leave empty until a real link exists. */
  repoUrl: string
  demoUrl: string
  publicationUrl?: string
  badge?: string
  /** Shown in the detail modal when a link is not available yet. */
  linkNote?: string
}

export const projects: Project[] = [
  {
    id: 'iot',
    number: '01',
    title: 'Real-Time IoT Anomaly Detection System',
    subtitle: 'LSTM inference behind a Flask API with an alert dashboard',
    category: 'Artificial Intelligence · Machine Learning · IoT Security',
    period: 'Jul – Nov 2025',
    description:
      'An intelligent anomaly detection solution designed to identify unusual behavior in IoT network traffic using deep learning.',
    problem:
      'Connected devices generate constant network traffic, and malicious or abnormal behavior has to be flagged quickly enough to act on.',
    solution:
      'An end-to-end architecture that takes raw traffic through preprocessing and LSTM inference, serves predictions over Flask REST APIs, and surfaces alerts on a dashboard.',
    stack: ['Python', 'LSTM', 'TensorFlow', 'Flask', 'REST APIs'],
    highlights: [
      'Architecture covering preprocessing, LSTM inference, Flask APIs, and an alert dashboard.',
      'Worked with 115K+ N-BaIoT samples.',
      'Designed an end-to-end architecture connecting machine learning inference to a backend API.',
      'Published the research at IEEE ICTBIG 2025.',
    ],
    results: [
      { value: '94.6%', label: 'Detection accuracy' },
      { value: '115K+', label: 'N-BaIoT samples' },
      { value: 'IEEE', label: 'ICTBIG 2025' },
    ],
    repoUrl: '',
    demoUrl: '',
    badge: 'Published · IEEE ICTBIG 2025',
    linkNote: 'Repository and publication links are not public yet. Add them in src/data/projects.ts.',
  },
  {
    id: 'tutor',
    number: '02',
    title: 'AI Tutor — LLM-Based Adaptive Learning Assistant',
    subtitle: 'Local language models for explanations and quizzes',
    category: 'Generative AI · LLM · RAG',
    description:
      'An adaptive AI learning assistant that leverages retrieval-augmented generation and locally hosted language models to provide context-aware learning experiences.',
    problem:
      'Learners need explanations pitched at their level and subject, without sending their questions to a cloud service.',
    solution:
      'A tutor that adapts to education level and subject, offers explain and quiz modes, and runs its models locally through Ollama.',
    stack: ['Python', 'Flask', 'LangChain', 'Ollama', 'RAG', 'Prompt Engineering'],
    highlights: [
      'Modular Flask backend with LangChain chains and retrieval-augmented generation.',
      'Document retrieval over a 500-document corpus.',
      'Locally hosted LLM inference through Ollama, with multi-turn memory.',
      'Deployed to five beta users; zero cloud inference cost in the reported setup.',
      'Public repository: education levels from School to PG/PhD, six subjects, Explain and Quiz modes, Gemma 3 / DeepSeek Coder / Llama 3 via Ollama.',
    ],
    results: [
      { value: '<2s', label: 'Latency (reported setup)' },
      { value: '500', label: 'Document corpus' },
      { value: '5', label: 'Beta users' },
    ],
    repoUrl: 'https://github.com/KrutikaBorase/AI-Tutor',
    demoUrl: '',
  },
  {
    id: 'ridewise',
    number: '03',
    title: 'Ride Wise — Bike-Sharing Demand Prediction',
    subtitle: 'Ensemble forecasting with a three-dashboard Power BI report',
    category: 'Data Science · Predictive Analytics',
    description:
      'A predictive analytics solution designed to estimate bike-sharing demand and help stakeholders make better operational planning decisions.',
    problem:
      'Operators need to anticipate hourly demand to plan fleet availability and weekly operations.',
    solution:
      'An ensemble model trained on historical ride records, paired with Power BI dashboards that stakeholders use for weekly planning.',
    stack: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Power BI'],
    highlights: [
      'Trained an ensemble prediction model using 17K+ ride records.',
      'Created a three-dashboard Power BI reporting solution.',
      'Supported weekly stakeholder planning.',
    ],
    results: [
      { value: '0.91', label: 'R² score' },
      { value: '38.4', label: 'RMSE (trips/hour)' },
      { value: '17K+', label: 'Ride records' },
    ],
    repoUrl: '',
    demoUrl: '',
    linkNote: 'Repository link is not public yet. Add it in src/data/projects.ts.',
  },
]

/** Other public repositories, verified from github.com/KrutikaBorase. */
export interface RepoCard {
  name: string
  description: string
  stack: string[]
  url: string
  demo?: string
}

export const otherRepos: RepoCard[] = [
  {
    name: 'IoT-Anomaly-Detection',
    description:
      'Real-time IoT anomaly detection pipeline: phase-wise preprocessing and hybrid model training, ONNX export and quantization, MQTT edge inference with latency metrics, and a live Streamlit dashboard.',
    stack: ['Python', 'PyTorch', 'ONNX', 'MQTT', 'Streamlit'],
    url: 'https://github.com/KrutikaBorase/IoT-Anomaly-Detection',
  },
  {
    name: 'RideWise',
    description:
      'Full-stack ride-demand platform: React front end, Flask API with JWT auth, and scikit-learn models for demand, pricing, trip duration and route risk.',
    stack: ['React', 'Flask', 'scikit-learn', 'SQLite'],
    url: 'https://github.com/KrutikaBorase/RideWise',
  },
  {
    name: 'Rag_conversation_analyzer',
    description:
      'Local-first RAG system for chronological conversation analysis: topic checkpoints via embeddings, FAISS indices, grounded persona extraction and a Streamlit chatbot.',
    stack: ['Python', 'FAISS', 'Sentence Transformers', 'Streamlit'],
    url: 'https://github.com/KrutikaBorase/Rag_conversation_analyzer',
  },
  {
    name: 'hasamex-ai-case',
    description:
      'Streamlit app that analyzes expert-interview transcripts: sentence-transformer retrieval with FAISS, Gemini synthesis, and source-grounded evidence with timestamps.',
    stack: ['Python', 'Streamlit', 'Gemini', 'FAISS'],
    url: 'https://github.com/KrutikaBorase/hasamex-ai-case',
    demo: 'https://hasamex-ai-case-bwtrmxueq4ywt9vbyrhxbn.streamlit.app/',
  },
  {
    name: 'HRone',
    description:
      'Employee attendance and analytics API: punch in/out, audited corrections, monthly and department analytics, daily trend and an explain endpoint.',
    stack: ['FastAPI', 'MongoDB', 'Python'],
    url: 'https://github.com/KrutikaBorase/HRone',
  },
  {
    name: 'Trao — AI Interview Prep Kit',
    description:
      'Turns a job description and company site into a requirement-linked interview kit with flashcards and a study schedule.',
    stack: ['Next.js', 'TypeScript', 'MongoDB'],
    url: 'https://github.com/KrutikaBorase/traoo',
    demo: 'https://traoo-kappa.vercel.app',
  },
  {
    name: 'telecom-revenue-optimization',
    description:
      'BigQuery cleaning and star-schema modelling feeding a five-page Power BI executive dashboard on telecom revenue and subscribers.',
    stack: ['BigQuery SQL', 'Power BI'],
    url: 'https://github.com/KrutikaBorase/telecom-revenue-optimization',
  },
  {
    name: 'Insta-Web-Biz',
    description:
      'Responsive front-end recreation of a Dubai puppy-brand website built as a cloning assignment, deployed on Vercel.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    url: 'https://github.com/KrutikaBorase/Insta-Web-Biz',
    demo: 'https://insta-web-biz.vercel.app/',
  },
]
