export const PROFILE = {
  name: 'MOHAMED FARHAN P',
  role: 'Software Developer',
  location: 'Mayiladuthurai, Tamil Nadu',
  email: 'bajudeenfarhan@gmail.com',
  phone: '+91 98437 51085',
  github: 'https://github.com/',
  tagline: 'Building intelligent systems, scalable applications, and futuristic digital experiences.',
  intro:
    'Passionate and enthusiastic engineering student with a strong interest in IT, software development, artificial intelligence, cloud computing, databases, and web technologies. Skilled in Python, Java, SQL, database concepts, and web technologies, with a focus on building practical and intelligent software solutions.',
  languages: ['English', 'Tamil'],
}

export type NavItem = { id: string; label: string; code: string }

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'HOME', code: '00' },
  { id: 'about', label: 'ABOUT', code: '01' },
  { id: 'skills', label: 'SKILLS', code: '02' },
  { id: 'projects', label: 'PROJECTS', code: '03' },
  { id: 'certifications', label: 'CERTIFICATIONS', code: '04' },
  { id: 'experience', label: 'EXPERIENCE', code: '05' },
  { id: 'education', label: 'EDUCATION', code: '06' },
  { id: 'contact', label: 'CONTACT', code: '07' },
]

export const BOOT_LINES = [
  'INITIALIZING SYSTEM...',
  'LOADING DEVELOPER PROFILE...',
  'CONNECTING DATABASE...',
  'LOADING PROJECT MODULES...',
  'AI CORE ONLINE...',
  'SYSTEM READY.',
]

export const HERO_LABELS = [
  'SYSTEM ONLINE',
  'AI CORE: ACTIVE',
  'SOFTWARE ENGINEER',
  'DATABASE SYSTEMS',
  'CLOUD COMPUTING',
  'MACHINE LEARNING',
]

export const STATUS = [
  { label: 'STATUS', value: 'AVAILABLE' },
  { label: 'MODE', value: 'DEVELOPMENT' },
  { label: 'SPECIALIZATION', value: 'SOFTWARE + AI' },
  { label: 'SYSTEM INTEGRITY', value: '100%' },
]

export type SkillCategory = {
  title: string
  code: string
  skills: string[]
}

export const SKILLS: SkillCategory[] = [
  { title: 'PROGRAMMING', code: 'PRG', skills: ['Python', 'Java', 'C'] },
  { title: 'WEB DEVELOPMENT', code: 'WEB', skills: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'DATABASE', code: 'DB', skills: ['SQL', 'MySQL', 'MS Access', 'DBMS'] },
  {
    title: 'DATA & AI',
    code: 'AI',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Data Preprocessing', 'Classification'],
  },
  {
    title: 'CLOUD',
    code: 'CLD',
    skills: ['AWS Basics', 'AWS S3', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'IAM'],
  },
  { title: 'TOOLS', code: 'TLS', skills: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook'] },
  { title: 'CORE CONCEPTS', code: 'CORE', skills: ['OOP', 'Data Structures', 'Algorithms', 'SDLC'] },
  { title: 'SOFT SKILLS', code: 'SOFT', skills: ['Problem Solving', 'Communication', 'Teamwork', 'Quick Learning'] },
]

export type Project = {
  id: string
  number: string
  category: string
  title: string
  description: string
  objective: string
  technologies: string[]
  features: string[]
  implementation: string
  outcome: string
  flow: string[]
  hasSource: boolean
}

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    number: '01',
    category: 'Machine Learning',
    title: 'AI Powered Handwriting Recognition System',
    description:
      'Developed a deep learning and OCR-based handwriting recognition application capable of recognizing handwritten input and converting it into digital text.',
    objective:
      'Build an intelligent OCR pipeline that accurately converts handwritten characters into machine-readable digital text using deep learning.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Machine Learning', 'OCR'],
    features: [
      'Image preprocessing and noise reduction',
      'Feature extraction from handwritten samples',
      'Trained classification model for character recognition',
      'Real-time conversion to digital text',
    ],
    implementation:
      'Handwritten images are preprocessed and normalized, features are extracted, and a trained ML model predicts the characters which are assembled into digital text output.',
    outcome:
      'Achieved reliable recognition of handwritten input with a clean pipeline suitable for document digitization workflows.',
    flow: ['HANDWRITING IMAGE', 'IMAGE PREPROCESSING', 'FEATURE EXTRACTION', 'ML MODEL', 'PREDICTION', 'DIGITAL TEXT'],
    hasSource: true,
  },
  {
    id: 'p2',
    number: '02',
    category: 'Cloud Computing',
    title: 'Serverless Online Quiz Application',
    description:
      'A fully serverless quiz platform built on AWS, handling quiz delivery and scoring through cloud-native infrastructure.',
    objective:
      'Design a scalable, cost-efficient quiz application using serverless AWS infrastructure with zero server management.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'AWS Lambda', 'API Gateway', 'DynamoDB'],
    features: [
      'Serverless compute with AWS Lambda',
      'REST endpoints via API Gateway',
      'Persistent storage in DynamoDB',
      'Responsive front-end quiz interface',
    ],
    implementation:
      'The client sends requests to API Gateway, which triggers Lambda functions that read and write quiz data to DynamoDB, returning results to the user.',
    outcome:
      'A scalable quiz platform that runs entirely on serverless infrastructure with automatic scaling and minimal operating cost.',
    flow: ['USER', 'API GATEWAY', 'LAMBDA', 'DYNAMODB'],
    hasSource: true,
  },
  {
    id: 'p3',
    number: '03',
    category: 'Database Systems',
    title: 'Employee Management System',
    description:
      'Employee management application for handling employee-related information and operations with a relational database backend.',
    objective:
      'Create a robust CRUD system to manage employee records, roles, and operational data efficiently.',
    technologies: ['MySQL', 'SQL', 'Python'],
    features: [
      'Create, read, update and delete employee records',
      'Relational schema design with MySQL',
      'Query optimization for fast lookups',
      'Data integrity and validation',
    ],
    implementation:
      'A Python application layer performs parameterized SQL operations against a normalized MySQL schema managing employees and their attributes.',
    outcome:
      'A dependable management tool that streamlines employee data operations with a clean relational structure.',
    flow: ['INPUT', 'PYTHON LAYER', 'SQL QUERY', 'MYSQL DB', 'RESULT'],
    hasSource: true,
  },
  {
    id: 'p4',
    number: '04',
    category: 'Portfolio',
    title: 'Personal Developer Portfolio Website',
    description:
      'A responsive personal portfolio website showcasing projects, skills, and professional profile.',
    objective: 'Present professional identity and project work through a clean, responsive web experience.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Fully responsive layout',
      'Project showcase sections',
      'Smooth navigation',
      'Optimized front-end performance',
    ],
    implementation:
      'Built with semantic HTML, modern CSS layout techniques, and vanilla JavaScript for interactivity.',
    outcome: 'A polished portfolio presence that communicates skills and projects to recruiters and clients.',
    flow: ['DESIGN', 'BUILD', 'RESPONSIVE', 'DEPLOY'],
    hasSource: true,
  },
  {
    id: 'p5',
    number: '05',
    category: 'Python',
    title: 'Password Strength Checker',
    description:
      'A security utility that analyzes password strength and provides feedback using pattern matching.',
    objective: 'Evaluate password robustness against common weaknesses and guide users toward stronger credentials.',
    technologies: ['Python', 'Regular Expressions'],
    features: [
      'Length and complexity analysis',
      'Regex-based pattern detection',
      'Strength scoring and feedback',
      'Detection of common weak patterns',
    ],
    implementation:
      'Regular expressions inspect the password for character classes, patterns, and length to compute a strength score with actionable feedback.',
    outcome: 'A lightweight tool that improves credential hygiene by scoring and explaining password strength.',
    flow: ['PASSWORD INPUT', 'REGEX ANALYSIS', 'SCORING', 'FEEDBACK'],
    hasSource: true,
  },
]

export type Certification = {
  title: string
  provider: string
}

export const CERTIFICATIONS: Certification[] = [
  { title: 'Java for Beginners', provider: 'Infosys Springboard' },
  { title: 'Learning Full Stack Development', provider: 'Infosys Springboard' },
  { title: 'Power BI', provider: 'Infosys Springboard' },
  { title: 'Advance Diploma in Python Programming', provider: 'ADDP' },
  { title: 'Cloud Computing', provider: 'NPTEL' },
  { title: 'User Experience', provider: 'Infosys Springboard' },
]

export type Experience = {
  role: string
  company: string
  index: string
}

export const EXPERIENCE: Experience[] = [
  { role: 'Python Full Stack Development', company: 'VEL Technologies', index: 'LOG_01' },
  { role: 'Web Development', company: 'Infinix Wex Solutions', index: 'LOG_02' },
]

export const EDUCATION = {
  degree: 'B.TECH',
  field: 'INFORMATION TECHNOLOGY',
  institution: 'ADHIYAMAAN COLLEGE OF ENGINEERING',
  institutionSub: '(Autonomous)',
}

export const SYSTEM_READOUTS = [
  { label: 'SYSTEM STATUS', value: 'ONLINE' },
  { label: 'CORE TEMP', value: '32°C' },
  { label: 'NETWORK', value: 'SECURE' },
  { label: 'AI MODULE', value: 'ACTIVE' },
  { label: 'DATABASE', value: 'CONNECTED' },
  { label: 'CLOUD', value: 'ONLINE' },
  { label: 'UPTIME', value: '99.9%' },
]
