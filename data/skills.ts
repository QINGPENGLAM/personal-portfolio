import { skillGroupSchema } from './schemas'

export const skillGroups = skillGroupSchema.array().parse([
  { label: 'Languages', items: ['Python', 'C#', 'Java', 'C++', 'JavaScript', 'SQL', 'HTML/CSS'] },
  { label: 'Frameworks & libraries', items: ['FastAPI', 'React', 'Node.js', 'Express', 'Ray Serve', 'MLflow', 'Transformers.js', 'PyTorch', 'TensorFlow', 'pandas', 'NumPy'] },
  { label: 'Data & AI', items: ['PostgreSQL', 'Vector Search', 'Embeddings', 'AI Agents', 'Model Serving', 'ETL', 'Tableau', 'MCP', 'Generative AI'] },
  { label: 'Tools & infrastructure', items: ['Docker', 'Podman', 'Git', 'GitHub', 'GitLab CI/CD', 'Linux', 'REST APIs', 'Unit Testing'] },
])
