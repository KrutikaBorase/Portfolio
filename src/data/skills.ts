export type CategoryId = 'lang' | 'backend' | 'ml' | 'genai' | 'data' | 'db' | 'infra' | 'cs'

export interface Skill {
  name: string
  cat: CategoryId
  note: string
  icon?: string // simple-icons export key, see components/icons.ts
  related?: string[]
}

export const categories: { id: CategoryId; label: string; blurb: string }[] = [
  { id: 'lang', label: 'Languages', blurb: 'Core programming languages' },
  { id: 'backend', label: 'Backend', blurb: 'APIs and services' },
  { id: 'ml', label: 'AI / ML', blurb: 'Models and pipelines' },
  { id: 'genai', label: 'Generative AI', blurb: 'LLM-powered systems' },
  { id: 'data', label: 'Data & Viz', blurb: 'Analysis and reporting' },
  { id: 'db', label: 'Databases', blurb: 'Relational and document stores' },
  { id: 'infra', label: 'Dev & Infra', blurb: 'Tooling and delivery' },
  { id: 'cs', label: 'CS Core', blurb: 'Fundamentals' },
]

export const skills: Skill[] = [
  { name: 'Python', cat: 'lang', icon: 'python', note: 'Primary language for backend, ML and automation.', related: ['Flask', 'FastAPI', 'TensorFlow', 'Pandas'] },
  { name: 'Java', cat: 'lang', icon: 'java', note: 'Object-oriented programming and coursework.' },
  { name: 'SQL', cat: 'lang', note: 'Querying and modelling relational data.', related: ['MySQL', 'PostgreSQL'] },
  { name: 'JavaScript', cat: 'lang', icon: 'javascript', note: 'Front-end scripting.' },

  { name: 'Flask', cat: 'backend', icon: 'flask', note: 'Lightweight Python web framework for APIs.', related: ['Python', 'REST APIs'] },
  { name: 'Django', cat: 'backend', icon: 'django', note: 'Batteries-included Python web framework.', related: ['Python'] },
  { name: 'FastAPI', cat: 'backend', icon: 'fastapi', note: 'Async Python APIs with typed validation.', related: ['Python', 'REST APIs'] },
  { name: 'REST APIs', cat: 'backend', note: 'Designing and consuming resource-oriented HTTP APIs.', related: ['Postman', 'Flask'] },
  { name: 'Microservices', cat: 'backend', note: 'Service-oriented application structure.' },
  { name: 'API Integration', cat: 'backend', note: 'Integrated 5+ third-party REST APIs during internship.', related: ['REST APIs'] },

  { name: 'TensorFlow', cat: 'ml', icon: 'tensorflow', note: 'Deep learning framework used for LSTM models.', related: ['LSTM', 'Python'] },
  { name: 'Scikit-learn', cat: 'ml', icon: 'scikitlearn', note: 'Classical ML models and evaluation.', related: ['XGBoost', 'Pandas'] },
  { name: 'XGBoost', cat: 'ml', note: 'Gradient-boosted trees for tabular prediction.', related: ['Scikit-learn'] },
  { name: 'LSTM', cat: 'ml', note: 'Recurrent networks for sequence and traffic data.', related: ['TensorFlow'] },
  { name: 'ML Pipelines', cat: 'ml', note: 'Preprocessing, training, evaluation and inference.', related: ['Pandas', 'Scikit-learn'] },

  { name: 'LangChain', cat: 'genai', icon: 'langchain', note: 'Composable chains for LLM applications.', related: ['RAG', 'LLM Integration'] },
  { name: 'RAG', cat: 'genai', note: 'Retrieval-augmented generation over document corpora.', related: ['LangChain'] },
  { name: 'Ollama', cat: 'genai', icon: 'ollama', note: 'Run language models locally.', related: ['LLM Integration'] },
  { name: 'LLM Integration', cat: 'genai', note: 'Wiring language models into backend applications.', related: ['Ollama', 'LangChain'] },
  { name: 'Prompt Engineering', cat: 'genai', note: 'Structuring prompts for reliable outputs.' },

  { name: 'Pandas', cat: 'data', icon: 'pandas', note: 'Data cleaning and analysis.', related: ['NumPy'] },
  { name: 'NumPy', cat: 'data', icon: 'numpy', note: 'Numerical computing.', related: ['Pandas'] },
  { name: 'Power BI', cat: 'data', note: 'Dashboards and stakeholder reporting.' },
  { name: 'Tableau', cat: 'data', icon: 'tableau', note: 'Visual analytics.' },
  { name: 'Matplotlib', cat: 'data', note: 'Plotting in Python.', related: ['Pandas'] },

  { name: 'MySQL', cat: 'db', icon: 'mysql', note: 'Relational database.', related: ['SQL'] },
  { name: 'MongoDB', cat: 'db', icon: 'mongodb', note: 'Document database.' },
  { name: 'PostgreSQL', cat: 'db', icon: 'postgresql', note: 'Relational database.', related: ['SQL'] },

  { name: 'Git', cat: 'infra', icon: 'git', note: 'Branching and structured code review.' },
  { name: 'Docker', cat: 'infra', icon: 'docker', note: 'Containerised environments.' },
  { name: 'CI/CD', cat: 'infra', note: 'Pipeline configuration management.', related: ['pytest', 'Git'] },
  { name: 'pytest', cat: 'infra', icon: 'pytest', note: 'Unit testing for Python.', related: ['CI/CD'] },
  { name: 'Linux', cat: 'infra', icon: 'linux', note: 'Day-to-day development environment.' },
  { name: 'Agile/Scrum', cat: 'infra', note: 'Sprint-based delivery.' },
  { name: 'Postman', cat: 'infra', icon: 'postman', note: 'API exploration and testing.', related: ['REST APIs'] },
  { name: 'AWS (familiar)', cat: 'infra', note: 'Working familiarity, not expert-level.' },

  { name: 'DSA', cat: 'cs', note: 'Data structures & algorithms.' },
  { name: 'OOP', cat: 'cs', note: 'Object-oriented programming.' },
  { name: 'DBMS', cat: 'cs', note: 'Database management systems.' },
  { name: 'Operating Systems', cat: 'cs', note: 'Processes, memory, scheduling.' },
  { name: 'Computer Networks', cat: 'cs', note: 'Protocols and network fundamentals.' },
]
