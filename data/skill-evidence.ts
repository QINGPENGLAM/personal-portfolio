import { z } from 'zod'
import languageSnapshot from './skill-repositories.json'
import manifests from './skill-manifests.json'
import unitySources from './skill-unity-sources.json'

export const skillRepositorySnapshot = z.object({
  checkedAt: z.iso.date(),
  repositories: z.array(z.object({ name: z.string(), languages: z.record(z.string(), z.number().int().positive()) })),
}).parse(languageSnapshot)

const dependencySkills: Record<string, string> = {
  react: 'React', next: 'Next.js', express: 'Express',
  '@huggingface/transformers': 'Transformers.js', vitest: 'Unit Testing',
}

export const repositoryTechnologyEvidence = manifests.flatMap(manifest =>
  Object.keys({ ...manifest.dependencies, ...manifest.devDependencies })
    .filter(dependency => dependency in dependencySkills)
    .map(dependency => ({
      repository: manifest.name,
      skill: dependencySkills[dependency],
      reason: `The dependency manifest declares ${dependency}.`,
      sourceUrl: manifest.sourceUrl,
      sourceLabel: 'Dependency manifest',
    })),
)

// Explicit mappings cite the already-published case study rather than inferring
// a framework or concept from a repository's programming language.
export const projectSkillNotes: Record<string, Record<string, string>> = {
  devdoctor: {
    'AI Agents': 'Diagnoses failures and prepares candidate patches in a sandbox with human approval.',
    'Generative AI': 'Generates candidate remediation patches behind validation and human approval gates.',
    'Model Serving': 'Uses Ray Serve for monitored model inference, separate from MLflow lifecycle tracking.',
    'Unit Testing': 'The published case study records 260+ automated tests across platform workflows.',
  },
  'immich-ai-photo-search': {
    Embeddings: 'Generates semantic embeddings and combines them with keywords and capture metadata.',
  },
}

export const unityRepositoryEvidence = unitySources.filter(source => source.usesUnityEngine)
