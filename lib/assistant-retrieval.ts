import { assistantCorpus, type AssistantSource } from '../data/assistant-corpus'
import type { AssistantRequest } from './assistant-protocol'

const aliases: [RegExp, string][] = [
  [/你是谁|他是谁|who|背景|介绍/gi, 'qingpeng lam'],
  [/gpa|成绩|学分/gi, 'education gpa'],
  [/email|contact|邮箱|邮件地址|联系/gi, 'contact email'],
  [/编程语言|语言/gi, 'skill language'],
  [/\bp2\b/gi, 'modular weapon arena'],
  [/\bp1\b/gi, 'zelda'],
  [/hrs|publication|论文|文献/gi, 'hrs publication pipeline'],
  [/数据库|database|重复|dedup/gi, 'database postgresql deduplication'],
  [/后端|backend|服务器/gi, 'backend api server python'],
  [/测试|testing|reliability|可靠|稳定/gi, 'testing tests reliability'],
  [/教育|学历|大学/gi, 'education university degree'],
  [/技能|技术|technologies|stack/gi, 'technologies skill'],
  [/经验|工作|实习/gi, 'experience role internship'],
  [/projects?|项目|作品/gi, 'selected project'], [/游戏|塞尔达/gi, 'game unity zelda'],
  [/部署|云端/gi, 'deployment cloud'], [/agentic|代理|智能体/gi, 'agentic'],
]
const stop = new Set('what is are the a an about its his her do does how can you me tell of in for to and with portfolio'.split(' '))
function terms(text: string) {
  let expanded = text.toLowerCase()
  for (const [pattern, replacement] of aliases) expanded = expanded.replace(pattern, match => `${match} ${replacement}`)
  return [...new Set(expanded.match(/[a-z0-9+#.]{2,}/g) ?? [])].filter(t => !stop.has(t))
}
export function retrieveSources(question: string, history: AssistantRequest['history'] = []): AssistantSource[] {
  const tokens = terms(question)
  const current = tokens.some(t => !['qingpeng', 'lam'].includes(t)) ? tokens.filter(t => !['qingpeng', 'lam'].includes(t)) : tokens
  const prior = terms(history.filter(h => h.role === 'user').slice(-2).map(h => h.content).join(' '))
  const ranked = assistantCorpus.map((s, index) => {
    const title = s.title.toLowerCase(), body = s.text.toLowerCase()
    const score = (tokens: string[]) => tokens.reduce((n, t) => n + (title.includes(t) ? 5 : body.includes(t) ? 1 : 0), 0)
    return { s, index, score: score(current) * 4 + score(prior) }
  }).filter(v => v.score >= 4).sort((a, b) => b.score - a.score || a.index - b.index)
  const result: AssistantSource[] = []
  let chars = 0
  for (const { s } of ranked) if (result.length < 6 && chars + s.text.length <= 8000) { result.push(s); chars += s.text.length }
  return result
}
