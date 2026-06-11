function DefaultPanel() {
  return (
    <aside className="project-panel" aria-live="polite">
      <p className="eyebrow">Hire Me Mode</p>
      <h2>Walk the room and open whatever feels interesting.</h2>
      <p className="panel-summary">
        This version is meant to feel like a playable profile: lighter than a heavyweight full-3D build, more
        personal than a standard portfolio, and much easier to ship as one live link for applications.
      </p>

      <section className="panel-section">
        <h3>Why this version works</h3>
        <ul className="panel-list">
          <li>Isometric room layout feels memorable without needing heavyweight 3D rendering</li>
          <li>Keyboard movement and clickable furniture turn the profile into a small game loop</li>
          <li>Static React build makes deployment to a live URL much easier than a local-only demo</li>
        </ul>
      </section>

      <section className="panel-section">
        <h3>Interaction map</h3>
        <ul className="panel-list">
          <li>Desk PC: USAA workflow automation</li>
          <li>Synth Lamp and Terrarium: playful GitHub projects worth remembering</li>
          <li>Bookshelf, wall board, cabinet, and nightstand: the rest of the story</li>
        </ul>
      </section>
    </aside>
  )
}

export default function ProjectPanel({ onClose, project }) {
  if (!project) {
    return <DefaultPanel />
  }

  return (
    <aside className="project-panel" aria-live="polite">
      <div className="panel-top">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h2>{project.title}</h2>
          <p className="panel-meta">
            {project.period} · {project.location}
          </p>
        </div>
        <button className="close-button" onClick={onClose} type="button">
          Close
        </button>
      </div>

      <p className="panel-summary">{project.summary}</p>

      <section className="panel-section">
        <h3>Highlights</h3>
        <ul className="panel-list">
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="panel-section">
        <h3>Keywords</h3>
        <div className="tag-row">
          {project.stack.map((item) => (
            <span className="tag" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      {project.repoUrl ? (
        <section className="panel-section">
          <a className="panel-link" href={project.repoUrl} rel="noreferrer" target="_blank">
            {project.repoLabel ?? 'View Project'}
          </a>
        </section>
      ) : null}
    </aside>
  )
}
