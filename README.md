# Pixel Room Portfolio MVP

This repository now contains a lightweight 2.5D pixel-room portfolio MVP for QingPeng Lam.

## Why this approach

The reference project, [Room Portfolio](https://github.com/AT010303/Room_Portfolio), is a polished React Three Fiber experience with custom 3D assets, emulator integration, audio, and post-processing. It is a strong reference, but it is larger than this MVP needs.

For a 3-7 day demo, the best scope is:

- a 2.5D room with a cute pixel / isometric feel
- keyboard movement
- clickable project objects
- project cards based on QingPeng's resume, recent internship update, and current GitHub project list
- mobile-friendly controls, accessible fallback navigation, and static-host deployment

## File structure

```text
.
├── index.html
├── package.json
├── vite.config.js
└── src
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── data
    │   └── projects.js
    └── components
        ├── ProjectPanel.jsx
        └── PixelRoom.jsx
```

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL, usually `http://localhost:5173` or the next free port.

## Current demo goals

- Move with `W A S D` or arrow keys
- Tap the on-screen pad on mobile
- Click any room object to open its project card
- Use the quick-select buttons if you want a keyboard- and screen-reader-friendly fallback

## Live-link friendly

This build is static-output-friendly, so it can be deployed to Vercel, GitHub Pages, or any host that serves the `dist` folder after `npm run build`.

This repo now also includes a GitHub Pages workflow at `.github/workflows/deploy.yml` for the current `master` branch and the `personal-portfolio` repository path.

For GitHub Pages:

1. Push this branch to GitHub
2. Open `Settings -> Pages`
3. Set `Build and deployment -> Source` to `GitHub Actions`
4. The workflow will build and publish the `dist` folder automatically
