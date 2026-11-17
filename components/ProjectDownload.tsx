export function ProjectDownload({ url }: { url?: string }) {
  if (!url) return null

  if (url === 'GAME_DOWNLOAD_URL' || url === 'P2_GAME_DOWNLOAD_URL') {
    return null
  }

  return <a className="button button-primary" href={url} rel="noreferrer" target="_blank">Download Game <span aria-hidden="true">↗</span></a>
}
