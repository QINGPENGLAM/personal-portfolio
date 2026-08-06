import type { GitHubRepository } from '@/data/schemas'

function countBy(values: string[]) {
  return Array.from(values.reduce((counts, value) => counts.set(value, (counts.get(value) ?? 0) + 1), new Map<string, number>()))
    .map(([label, count]) => ({ label, count }))
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
}

export function buildRepositoryInsights(repositories: GitHubRepository[]) {
  const languages = countBy(repositories.map((repository) => repository.primaryLanguage ?? 'Not reported'))
  const pushYears = countBy(repositories.map((repository) => repository.pushedAt.slice(0, 4)))
    .sort((left, right) => Number(right.label) - Number(left.label))
  const sortedDates = repositories.map((repository) => repository.pushedAt).sort()

  return {
    total: repositories.length,
    pagesEnabled: repositories.filter((repository) => repository.hasPages).length,
    verifiedLive: repositories.filter((repository) => repository.liveStatus === 'verified').length,
    unavailableLive: repositories.filter((repository) => repository.liveStatus === 'unavailable').length,
    notConfigured: repositories.filter((repository) => repository.liveStatus === 'not-configured').length,
    languages,
    pushYears,
    firstRecordedPush: sortedDates.at(0) ?? null,
    latestRecordedPush: sortedDates.at(-1) ?? null,
  }
}
