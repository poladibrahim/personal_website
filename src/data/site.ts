// ---------------------------------------------------------------------------
// Single source of truth for everything on this site.
// Edit this file and the whole site updates. No other file needs to change.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Polad Ibrahimov',
  initials: 'PI',
  role: 'AI / Machine Learning Engineer',
  tagline: 'AI/ML Engineer · 2.5+ yrs building retrieval & search systems · MSc @ University of Bonn',
  location: 'Bonn, Germany',
  // Drop a square photo at `public/images/avatar.jpg` and set the path here.
  // Leave it as `null` to show the monogram badge instead.
  avatar: null as string | null,
  bio: 'Based in Bonn, Germany. I build retrieval-augmented search and embedding systems — most recently at Azerbaijan’s National AI Center, where I was a core contributor to eqanun.ai, a legal AI assistant for Azerbaijani law. Now doing my MSc in Computer Science at the University of Bonn and looking for a working student role (up to 20 h/week) in AI, ML or Data Science.',
  // Short version used for meta descriptions and social cards.
  summary:
    'AI/ML Engineer specialising in retrieval-augmented generation, semantic search and embedding models. MSc Computer Science student at the University of Bonn.',
  email: 'polad.ibrahimiv@gmail.com',
  // Your phone number is intentionally left off the public site. Add it here
  // only if you want it published.
  phone: null as string | null,
  available: 'Open to working student roles (up to 20 h/week) in AI, ML or Data Science.',
  resume: '/Polad_Ibrahimov_CV.pdf',
};

export const socials = [
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/poladibrahim', icon: 'linkedin' },
  { label: 'GitHub', href: 'https://github.com/poladibrahim', icon: 'github' },
] as const;

export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Experience', href: '/experience/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];

export type Role = {
  title: string;
  org: string;
  location?: string;
  note?: string;
  start: string;
  end: string;
  highlights: string[];
  stack?: string[];
};

export const experience: Role[] = [
  {
    title: 'Middle AI Engineer',
    org: 'National AI Center',
    location: 'Baku, Azerbaijan',
    start: 'Jan 2025',
    end: 'Mar 2026',
    highlights: [
      'Core contributor to **eqanun.ai**, a production legal AI assistant for Azerbaijani law.',
      'Designed hybrid retrieval and vector storage pipelines with FAISS, Elasticsearch and Vespa-style systems, combining dense and lexical search with cross-encoder reranking.',
      'Built robust OCR pipelines for complex legal PDFs — multi-column layouts, scans and tables.',
      'Cut latency and infrastructure cost via batching, caching and parallelisation; tuned quality through hyperparameter search and ablation studies.',
      'Deployed models as containerised microservices with Docker, Kubernetes and CI/CD.',
    ],
    stack: ['Python', 'PyTorch', 'FAISS', 'Elasticsearch', 'Vespa', 'Docker', 'Kubernetes'],
  },
  {
    title: 'AI Engineer (Intern → Junior)',
    org: 'National AI Center',
    location: 'Baku, Azerbaijan',
    start: 'Jun 2023',
    end: 'Jan 2025',
    highlights: [
      'Implemented semantic search and document ranking for low-resource (Azerbaijani) text, plus prototypes for document parsing and structured data extraction.',
      'Developed reusable Python pipelines to preprocess, clean and augment large-scale text corpora for training and evaluation.',
    ],
    stack: ['Python', 'Hugging Face', 'scikit-learn', 'Pandas'],
  },
];

export const research: Role[] = [
  {
    title: 'Research & Development of AI-Powered Legal Search',
    org: 'National AI Center',
    location: 'Baku, Azerbaijan',
    note: 'Supervised by the Head of AI',
    start: 'Apr 2024',
    end: 'Mar 2025',
    highlights: [
      'Trained domain-specific embedding and reranking models on transformer architectures for Azerbaijani legal text, targeting query understanding, ranking and low-resource adaptation.',
      'Results shipped into the E-qanun AI platform and were documented in a technical research paper.',
    ],
    stack: ['Transformers', 'Sentence embeddings', 'Cross-encoders', 'Low-resource NLP'],
  },
];

export type Education = {
  degree: string;
  school: string;
  location?: string;
  start: string;
  end: string;
  notes?: string[];
};

export const education: Education[] = [
  {
    degree: 'M.Sc. Computer Science',
    school: 'University of Bonn',
    location: 'Bonn, Germany',
    start: 'Sep 2025',
    end: 'Aug 2027 (expected)',
    notes: ['Admitted through a paper-based research contest on large language models.'],
  },
  {
    degree: 'B.Sc. Computer Science — GPA 98/100',
    school: 'French-Azerbaijani University (UFAZ)',
    location: 'Baku, Azerbaijan',
    start: 'Sep 2021',
    end: 'Jun 2025',
    notes: [
      'Dual degree with the University of Strasbourg (France) and Azerbaijan State Oil and Industry University.',
    ],
  },
];

export const skills = [
  { group: 'Programming', items: ['Python (advanced)', 'Java (advanced)', 'SQL', 'C (intermediate)'] },
  {
    group: 'ML & AI',
    items: [
      'PyTorch',
      'TensorFlow',
      'Hugging Face Transformers',
      'scikit-learn',
      'LLMs',
      'RAG',
      'Embeddings',
      'Reranking',
      'Semantic search',
      'OCR',
      'Reinforcement learning',
    ],
  },
  {
    group: 'Retrieval & Data',
    items: ['FAISS', 'Elasticsearch', 'Vespa', 'Pandas', 'NumPy', 'Distributed data processing'],
  },
  {
    group: 'Backend & MLOps',
    items: ['FastAPI', 'Django', 'REST APIs', 'Docker', 'Kubernetes', 'Git', 'CI/CD'],
  },
];

export const certifications = [
  'IELTS Academic 7.0 (2024)',
  'Neural Networks & Deep Learning — Andrew Ng, Coursera (2022)',
];

export const languages = [
  { name: 'Azerbaijani', level: 'Native' },
  { name: 'Turkish', level: 'Native' },
  { name: 'English', level: 'C1' },
  { name: 'Russian', level: 'B1' },
  { name: 'French', level: 'B1' },
  { name: 'German', level: 'A1 (learning)' },
];

export type Project = {
  title: string;
  blurb: string;
  period?: string;
  tags: string[];
  href?: string;
  repo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: 'eqanun.ai — AI legal search for Azerbaijani law',
    blurb:
      'A production legal AI assistant. I worked on hybrid dense + lexical retrieval with cross-encoder reranking, the OCR pipeline that turns scanned legislation into clean text, and the containerised services that serve it all.',
    period: '2023 — 2026',
    tags: ['RAG', 'FAISS', 'Elasticsearch', 'Vespa', 'Cross-encoders', 'OCR', 'Kubernetes'],
    href: 'https://eqanun.ai',
    featured: true,
  },
  {
    title: 'Domain-specific embeddings for legal Azerbaijani',
    blurb:
      'Research project: training embedding and reranking models for a low-resource language, with a focus on query understanding and ranking quality. Shipped into the E-qanun AI platform and written up as a technical paper.',
    period: '2024 — 2025',
    tags: ['Transformers', 'Sentence embeddings', 'Low-resource NLP', 'Research'],
    featured: true,
  },
  {
    title: 'Quantum-Inspired Reinforcement Learning for Finance',
    blurb:
      'A prototype RL agent that combines quantum state representations with classical reinforcement learning to improve exploration in financial decision-making, benchmarked on historical market data.',
    tags: ['Reinforcement learning', 'Quantum-inspired', 'Finance', 'Python'],
    // TODO: add the GitHub link for this project.
    repo: undefined,
    featured: true,
  },
];

export const awards = [
  {
    title: 'Erasmus Mundus Scholarship',
    detail: 'Selected for the highly competitive international programme. EU Grant Recipient.',
    year: 'Aug 2025',
  },
  {
    title: 'Visegrad Scholarship',
    detail: 'Awarded; declined in favour of studies in Germany.',
    year: '2025',
  },
  { title: '1st Place — SOCAR Hackathon', detail: '', year: '2023' },
  { title: 'Technest Scholarship', detail: '', year: '2023' },
  { title: '2nd Place — UFAZ Hackathon', detail: '', year: '2022' },
  { title: 'Winner — Lütfi Zadeh Logic Olympiad', detail: '', year: '2017' },
];
