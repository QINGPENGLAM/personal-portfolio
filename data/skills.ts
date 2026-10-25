import { skillGroupSchema } from './schemas'

export const skillGroups = skillGroupSchema.array().parse([
  { label: 'Languages', items: ['Python', 'C#', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'] },
  { label: 'Frameworks & libraries', items: ['FastAPI', 'React', 'Next.js', 'Node.js', 'Express', 'Ray Serve', 'MLflow', 'Transformers.js', 'PyTorch', 'TensorFlow', 'pandas', 'NumPy'] },
  { label: 'Data & AI', items: ['PostgreSQL', 'Vector Search', 'Embeddings', 'AI Agents', 'Model Serving', 'ETL', 'Tableau', 'MCP', 'Generative AI'] },
  { label: 'Tools & infrastructure', items: ['Unity', 'Docker', 'Podman', 'Git', 'GitHub', 'GitLab CI/CD', 'Linux', 'REST APIs', 'Unit Testing'] },
])
