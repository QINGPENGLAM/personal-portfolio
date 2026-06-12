function DefaultPanel({ activeId, onSelect, projects }) {
  return (
    <aside className="project-panel" aria-live="polite">
      <p className="eyebrow">Project Directory</p>
      <h2>Explore the room.</h2>
      <p className="panel-summary">
        Walk with the keyboard, move close to a piece of furniture, and open the project that lives there. Quick Open
        is here if you want a faster scan.
      </p>

      <section className="panel-section">
        <h3>Zones</h3>
        <ul className="panel-list">
          <li>Left side holds the more personal projects around the bed, lamp, wall art, and window.</li>
          <li>Center uses the terrarium cabinets and bookshelf as the visual anchor for system-heavy work.</li>
          <li>Right side is the study zone: desk, monitor, chair, gallery wall, and smaller interactive pieces.</li>
        </ul>
      </section>

      <section className="panel-section">
        <h3>Quick Open</h3>
        <div className="panel-quick-grid">
          {projects.map((project) => (
            <button
              key={project.id}
              className={`panel-quick-card${project.id === activeId ? ' is-active' : ''}`}
              onClick={() => onSelect(project.id)}
              type="button"
            >
              <strong>{project.roomLabel}</strong>
              <span>{project.shortLabel}</span>
            </button>
          ))}
        </div>
      </section>
    </aside>
  )
}

export default function ProjectPanel({ activeId, onClose, onSelect, project, projects }) {
  if (!project) {
    return <DefaultPanel activeId={activeId} onSelect={onSelect} projects={projects} />
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
