export default function ProjectPanel({ dismissHint = 'Press Esc to close', onClose, project }) {
  if (!project) {
    return null
  }

  return (
    <div
      aria-live="polite"
      className="project-modal"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
      role="presentation"
    >
      <aside className="project-panel is-modal" aria-modal="true" role="dialog">
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

        {project.previewSrc ? (
          <div className="project-preview-frame">
            <img
              alt={project.previewAlt ?? `${project.title} preview`}
              className={`project-preview${project.previewFit === 'contain' ? ' is-contain' : ''}`}
              loading="lazy"
              src={project.previewSrc}
            />
          </div>
        ) : null}

        <p className="panel-summary">{project.summary}</p>

        <section className="panel-section">
          <h3>Station</h3>
          <div className="panel-status">
            <strong>{project.stationLabel}</strong>
            <span>{project.shortLabel}</span>
          </div>
        </section>

        <section className="panel-section">
          <h3>Highlights</h3>
          <ul className="panel-list">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="panel-section">
          <h3>Stack</h3>
          <div className="tag-row">
            {project.stack.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="panel-section panel-actions">
          <div className="panel-dismiss-hint">{dismissHint}</div>
          {project.repoUrl ? (
            <a className="panel-link" href={project.repoUrl} rel="noreferrer" target="_blank">
              {project.repoLabel ?? 'View Project'}
            </a>
          ) : null}
        </section>
      </aside>
    </div>
  )
}
