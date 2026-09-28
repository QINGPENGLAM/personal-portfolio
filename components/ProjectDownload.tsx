export function ProjectDownload({ url }: { url?: string }) {
  if (!url) return null

  if (url === 'GAME_DOWNLOAD_URL') {
    return <span className="project-download"><button className="button button-primary" disabled type="button">Download Game</button><small className="download-status">Download link coming soon</small></span>
  }

  return <a className="button button-primary" href={url} rel="noreferrer" target="_blank">Download Game <span aria-hidden="true">↗</span></a>
}
