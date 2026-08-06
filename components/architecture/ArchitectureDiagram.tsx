'use client'

import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import type { Project } from '@/data/schemas'

export function ArchitectureDiagram({ project }: { project: Project }) {
  const { architectureEdges, architectureNodes, requestFlow } = project.caseStudy
  const [activeNodeId, setActiveNodeId] = useState(requestFlow[0])
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) return
    const timer = window.setInterval(() => {
      setActiveNodeId((current) => requestFlow[(requestFlow.indexOf(current) + 1) % requestFlow.length] ?? requestFlow[0])
    }, 1150)
    return () => window.clearInterval(timer)
  }, [paused, reducedMotion, requestFlow])

  const activeNode = useMemo(
    () => architectureNodes.find((node) => node.id === activeNodeId) ?? architectureNodes[0],
    [activeNodeId, architectureNodes],
  )

  const restart = () => {
    setActiveNodeId(requestFlow[0])
    setPaused(false)
  }

  return (
    <section className="architecture-diagram" style={{ '--diagram-accent': project.landmark.accent } as CSSProperties}>
      <div className="architecture-toolbar">
        <div><p className="eyebrow">Interactive system map</p><h2>Follow one request through the architecture.</h2></div>
        <div aria-label="Architecture animation controls" className="architecture-controls">
          <button aria-pressed={paused} onClick={() => setPaused((current) => !current)} type="button">{paused ? 'Resume flow' : 'Pause flow'}</button>
          <button onClick={restart} type="button">Restart</button>
        </div>
      </div>

      <div className="architecture-workspace">
        <div aria-label={`${project.title} architecture components`} className="architecture-node-grid">
          {architectureNodes.map((node) => (
            <button
              aria-pressed={activeNodeId === node.id}
              className={`architecture-node node-${node.kind}`}
              key={node.id}
              onClick={() => { setActiveNodeId(node.id); setPaused(true) }}
              onFocus={() => setActiveNodeId(node.id)}
              onMouseEnter={() => setActiveNodeId(node.id)}
              type="button"
            >
              <span>{node.kind}</span>
              <strong>{node.label}</strong>
            </button>
          ))}
        </div>

        <aside aria-live="polite" className="architecture-inspector">
          <span>Selected component</span>
          <h3>{activeNode.label}</h3>
          <p>{activeNode.responsibility}</p>
          <div className="architecture-route" aria-label="Request lifecycle">
            {requestFlow.map((nodeId, index) => {
              const node = architectureNodes.find((candidate) => candidate.id === nodeId)
              return node ? <span className={activeNodeId === nodeId ? 'is-active' : ''} key={nodeId}><i>{index + 1}</i>{node.label}</span> : null
            })}
          </div>
        </aside>
      </div>

      <div className="architecture-connections" aria-label="Component communication paths">
        {architectureEdges.map((edge) => {
          const source = architectureNodes.find((node) => node.id === edge.source)
          const target = architectureNodes.find((node) => node.id === edge.target)
          const active = activeNodeId === edge.source || activeNodeId === edge.target
          return source && target ? (
            <div className={active ? 'is-active' : ''} key={`${edge.source}-${edge.target}`}>
              <strong>{source.label}</strong><span aria-hidden="true">→</span><strong>{target.label}</strong><small>{edge.label}</small>
            </div>
          ) : null
        })}
      </div>
      {reducedMotion ? <p className="architecture-motion-note">Animation is paused to respect your reduced-motion preference. Every component remains interactive.</p> : null}
    </section>
  )
}
