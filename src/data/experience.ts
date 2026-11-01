export interface Experience {
  role: string
  company: string
  period: string
  location: string
  kind: 'Internship' | 'Virtual internship'
  points: string[]
  tech: string[]
}

export const experience: Experience[] = [
  {
    role: 'AI/ML Python Intern',
    company: 'Thynk Tech India',
    period: 'Nov 2025 – Apr 2026',
    location: 'Pune, India',
    kind: 'Internship',
    points: [
      'Engineered Python backend modules, RESTful APIs, and automation pipelines across three production applications.',
      'Integrated 5+ third-party REST APIs, eliminating manual processing across two core data pipelines.',
      'Practiced unit testing with pytest and CI/CD configuration management in Linux environments.',
      'Worked in Agile/Scrum development environments.',
      'Applied Git branching and structured code review across four services.',
      'Contributed to systematic debugging, optimization, defect reduction, and module documentation.',
    ],
    tech: ['Python', 'REST APIs', 'pytest', 'Git', 'Linux', 'CI/CD', 'Agile/Scrum'],
  },
  {
    role: 'Data Science & AI Virtual Intern',
    company: 'Infosys Springboard 6.0',
    period: 'Sep 2025 – Nov 2025',
    location: 'Remote',
    kind: 'Virtual internship',
    points: [
      'Built Python-based data validation pipelines processing 50K+ records per run.',
      'Automated data quality checks across three sprint deliverables.',
      'Collaborated with an Agile team using Git version control.',
      'Contributed to system documentation.',
    ],
    tech: ['Python', 'Data Validation', 'Git', 'Agile', 'Data Science'],
  },
]
