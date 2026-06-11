function spriteClassForProject(project) {
  return `sprite-${project.model}`
}

function depthScaleForPosition(roomPosition) {
  return 0.64 + roomPosition.y / 240
}

export default function PixelRoom({ activeId, nearbyId, onHover, onSelect, playerPosition, projects, selectedId }) {
  return (
    <div
      className="pixel-room-shell"
      onClick={() => {
        onHover(null)
      }}
    >
      <svg
        aria-hidden="true"
        className="pixel-room-art"
        shapeRendering="crispEdges"
        viewBox="0 0 1000 760"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="#181325" height="760" width="1000" x="0" y="0" />

        <polygon fill="#bac8da" points="155,46 550,12 950,236 553,268" />
        <polygon fill="#e8eef7" points="553,268 950,236 950,560 553,612" />
        <polygon fill="#d6dde9" points="155,46 553,268 553,612 155,392" />
        <polygon fill="#f4f2ff" opacity="0.7" points="176,70 550,38 925,246 550,278" />

        <polygon fill="#8a9ab4" points="155,392 553,612 553,734 155,514" />
        <polygon fill="#6c7b95" points="553,612 950,560 950,684 553,734" />

        <polygon fill="#5c4f7d" points="240,448 630,396 878,532 492,585" />
        <polygon fill="#72648f" points="252,458 625,410 856,536 492,584" />
        <g opacity="0.35" stroke="#9385af" strokeWidth="3">
          <line x1="318" x2="544" y1="443" y2="573" />
          <line x1="390" x2="618" y1="433" y2="563" />
          <line x1="463" x2="691" y1="423" y2="553" />
          <line x1="536" x2="764" y1="414" y2="544" />
          <line x1="609" x2="837" y1="404" y2="534" />
        </g>
        <g opacity="0.28" stroke="#8f81ac" strokeWidth="2">
          <line x1="297" x2="690" y1="500" y2="447" />
          <line x1="282" x2="676" y1="531" y2="478" />
          <line x1="268" x2="662" y1="562" y2="509" />
        </g>

        <polygon fill="#b8bfd8" points="214,495 317,437 468,522 364,581" />
        <polygon fill="#d8def2" points="214,431 317,374 468,458 364,518" />
        <polygon fill="#4e455f" points="216,431 361,514 361,590 216,506" />
        <polygon fill="#2d2638" points="362,514 469,456 469,531 362,590" />
        <polygon fill="#40374e" points="235,447 360,519 360,573 235,501" />

        <polygon fill="#f1f2f8" points="666,438 803,420 891,468 755,487" />
        <polygon fill="#dbe1ef" points="666,438 755,487 755,592 666,543" />
        <polygon fill="#b9c3d8" points="755,487 891,468 891,572 755,592" />
        <polygon fill="#f5f6fb" points="783,414 887,401 924,422 818,436" />
        <polygon fill="#d3daeb" points="818,436 924,422 924,556 818,571" />
        <polygon fill="#b6c0d5" points="783,414 818,436 818,571 783,549" />

        <polygon fill="#eef2fa" points="490,267 618,257 618,494 490,510" />
        <polygon fill="#d8dfeb" points="618,257 734,323 734,481 618,494" />
        <polygon fill="#bec8da" points="490,267 618,257 734,323 608,334" />
        <rect fill="#b5f6de" height="48" opacity="0.38" width="88" x="513" y="305" />
        <rect fill="#b5f6de" height="52" opacity="0.38" width="88" x="513" y="366" />
        <rect fill="#b5f6de" height="52" opacity="0.38" width="88" x="513" y="430" />

        <polygon fill="#eef2fa" points="622,289 713,338 713,550 622,501" />
        <polygon fill="#d9e1ef" points="713,338 786,329 786,539 713,550" />
        <polygon fill="#bec8da" points="622,289 713,338 786,329 693,281" />
        <line stroke="#8c95a8" strokeWidth="4" x1="706" x2="706" y1="357" y2="530" />
        <line stroke="#8c95a8" strokeWidth="4" x1="744" x2="744" y1="348" y2="544" />

        <polygon fill="#f4f4fb" points="304,247 349,243 349,380 304,385" />
        <polygon fill="#d8deea" points="349,243 388,266 388,375 349,380" />
        <polygon fill="#a5b7d1" points="300,239 350,235 390,258 338,263" />
        <rect fill="#8e85a7" height="52" width="6" x="350" y="296" />

        <rect fill="#20223d" height="86" opacity="0.55" width="12" x="221" y="183" />
        <rect fill="#20223d" height="14" opacity="0.55" width="92" x="221" y="183" />
        <rect fill="#20223d" height="92" opacity="0.55" width="12" x="221" y="274" />
        <rect fill="#20223d" height="14" opacity="0.55" width="92" x="221" y="352" />

        <rect fill="#20223d" height="66" opacity="0.58" width="10" x="746" y="224" />
        <rect fill="#20223d" height="10" opacity="0.58" width="152" x="746" y="224" />
        <rect fill="#20223d" height="10" opacity="0.58" width="48" x="760" y="302" />
        <rect fill="#20223d" height="10" opacity="0.58" width="48" x="818" y="286" />
        <rect fill="#20223d" height="10" opacity="0.58" width="48" x="873" y="318" />
      </svg>

      <div className="ambient-glow ambient-glow-left" />
      <div className="ambient-glow ambient-glow-right" />

      {projects.map((project) => {
        const isActive = project.id === activeId
        const isNearby = project.id === nearbyId
        const isSelected = project.id === selectedId
        const scale = depthScaleForPosition(project.roomPosition)

        return (
          <button
            className={`room-object ${spriteClassForProject(project)}${isActive ? ' is-active' : ''}${isNearby ? ' is-nearby' : ''}${isSelected ? ' is-selected' : ''}`}
            key={project.id}
            onBlur={() => onHover(null)}
            onClick={(event) => {
              event.stopPropagation()
              onSelect(project.id)
            }}
            onMouseEnter={() => onHover(project.id)}
            onMouseLeave={() => onHover(null)}
            style={{
              '--object-scale': scale,
              '--project-color': project.color,
              left: `${project.roomPosition.x}%`,
              top: `${project.roomPosition.y}%`,
              zIndex: Math.round(project.roomPosition.y * 10),
            }}
            type="button"
          >
            <span className="sprite-shadow" />
            <span className="sprite-body">
              <span className="sprite-detail sprite-detail-a" />
              <span className="sprite-detail sprite-detail-b" />
              <span className="sprite-detail sprite-detail-c" />
            </span>
            <span className="object-label">
              <strong>{project.roomLabel}</strong>
              <small>{project.shortLabel}</small>
            </span>
          </button>
        )
      })}

      <div
        aria-hidden="true"
        className="player-avatar"
        style={{
          left: `${playerPosition.x}%`,
          top: `${playerPosition.y}%`,
          zIndex: Math.round(playerPosition.y * 10 + 8),
        }}
      >
        <span className="avatar-shadow" />
        <span className="avatar-sprite">
          <span className="avatar-hair" />
          <span className="avatar-face" />
          <span className="avatar-body" />
          <span className="avatar-laptop" />
        </span>
      </div>
    </div>
  )
}
