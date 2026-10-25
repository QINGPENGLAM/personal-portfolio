'use client';

import {useEffect, useRef} from 'react';
import Link from 'next/link';
import {QuickViewLink} from './QuickViewLink';
import {profile} from '@/data/profile';
import {withBasePath} from '@/lib/site';
import {sceneAt} from '@/lib/selene/scene';

const hero = {title: 'QINGPENG LAM', kicker: 'Software engineer · AI systems · Creative technology', site: 'University of Michigan · Computer Science + UX Design'};
import {useReducedMotion} from './useReducedMotion';
import {pinProgress, range} from '@/lib/selene/math';
import {onFrame, startScroll} from '@/lib/selene/scroll';

/**
 * The Earthrise. Six photographic layers cut from one render, stacked and
 * pinned; one scroll range moves each at its own rate:
 *
 *   0.00 – 0.18  a veil of cosmic dust drifts off the lens
 *   0.18 – 0.50  the Earth climbs out from behind the horizon
 *   0.10 – 0.50  the personal wordmark resolves between the plains and the crater
 *   0.28 – 0.60  the crater rim closes in around the view — you're inside
 *                it looking out — and the astronaut and ground rise
 *   0.70 – 1.00  everything tilts away upward and the ground swallows the
 *                frame to black, which is where the page continues
 *
 * A thin telemetry HUD rides on top: mission clock, the Earth's elevation
 * above the horizon, landing-site coordinates.
 */

const STAGE_VH = 440;

type LayerName = 'sky' | 'earth' | 'moonscape' | 'frame' | 'astronaut' | 'ground';
const ORDER: LayerName[] = ['sky', 'earth', 'moonscape', 'frame', 'astronaut', 'ground'];

/** All layers share one crop, so they stay registered at every viewport. */
const FIT = 'selene-layer-image';

type Mote = {x: number; y: number; r: number; s: number; a: number};

export function Earthrise() {
  const rootRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<Partial<Record<LayerName, HTMLDivElement>>>({});
  const veilRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLParagraphElement>(null);
  const elevRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  useEffect(() => { reducedRef.current = reduced; }, [reduced]);
  useEffect(() => {
    rootRef.current?.classList.add('selene-live');
    return startScroll(reduced);
  }, [reduced]);

  // Dust canvas size.
  useEffect(() => {
    const c = dustRef.current!;
    const sync = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = dustRef.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) { rootRef.current?.classList.remove('selene-live'); return; }
    let seed = 11;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const motes: Mote[] = Array.from({length: 140}, () => ({x: rand(), y: rand(), r: 0.4 + rand() * 1.6, s: 0.3 + rand(), a: 0.2 + rand() * 0.6}));
    let lastP = -1;
    let lastTime = 0;

    const set = (name: LayerName, y: number, scale = 1, opacity = 1) => {
      const el = layerRefs.current[name];
      if (!el) return;
      el.style.transform = `translate3d(0, ${y}vh, 0) scale(${scale})`;
      el.style.opacity = String(opacity);
    };

    return onFrame((time) => {
      const dt = lastTime ? Math.min(0.1, (time - lastTime) / 1000) : 1 / 60;
      lastTime = time;
      const root = rootRef.current;
      if (!root) return;
      const {p: scrollP, rect} = pinProgress(root);
      const p = reducedRef.current ? 0.34 : scrollP;
      if (rect.bottom < 0) return;

      // Dust drifts every frame while it's visible.
      const veil = reducedRef.current ? 0 : 1 - range(p, 0, 0.18);
      if (veil > 0.001) {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        const dpr = canvas.width / Math.max(1, w);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#dfe6f2';
        for (const m of motes) {
          if (!reducedRef.current) {
            m.x += 0.006 * m.s * dt;
            m.y -= 0.004 * m.s * dt;
            if (m.x > 1) m.x -= 1;
            if (m.y < 0) m.y += 1;
          }
          ctx.globalAlpha = m.a * veil;
          ctx.beginPath();
          ctx.arc(m.x * w, (m.y - p * 0.6) * h, m.r * (1 + p * 4), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      if (Math.abs(p - lastP) < 0.00005) return;
      lastP = p;

      const scene = sceneAt(p);
      veilRef.current!.style.opacity = String(reducedRef.current ? 0 : scene.veil);
      veilRef.current!.style.transform = `translate3d(0, ${-range(p, 0, 0.18) * 24}vh, 0) scale(${1 + range(p, 0, 0.18) * 0.25})`;
      canvas.style.opacity = String(reducedRef.current ? 0 : scene.veil);
      set('sky', scene.skyY, scene.skyScale);
      set('earth', scene.earthY, scene.earthScale);
      set('moonscape', scene.moonscapeY);
      set('frame', scene.frameY, scene.frameScale, scene.frameOpacity);
      set('astronaut', scene.astronautY, 1, scene.astronautOpacity);
      set('ground', scene.groundY);
      const title = titleRef.current!;
      title.style.opacity = String(scene.titleOpacity);
      title.querySelectorAll('a').forEach((link) => { link.tabIndex = scene.titleOpacity < 0.1 ? -1 : 0; });
      veilRef.current!.inert = reducedRef.current || scene.veil < 0.1;
      veilRef.current!.style.pointerEvents = !reducedRef.current && scene.veil >= 0.1 ? 'auto' : 'none';
      title.style.letterSpacing = `${scene.titleTracking}em`;
      title.style.transform = `translate3d(0, ${-p * 6}vh, 0)`;

      // Telemetry.
      hudRef.current!.style.opacity = String(scene.hudOpacity);
      const secs = p * 5400;
      clockRef.current!.textContent = `T+ ${String(Math.floor(secs / 3600)).padStart(2, '0')}:${String(Math.floor((secs % 3600) / 60)).padStart(2, '0')}:${String(Math.floor(secs % 60)).padStart(2, '0')}`;
      elevRef.current!.textContent = `${(scene.rise * 12.4).toFixed(1)}°`;
    });
  }, []);

  const layer = (name: LayerName, extra = '') => (
    <div
      key={name}
      ref={(el) => {
        if (el) layerRefs.current[name] = el;
      }}
      className={`selene-layer ${extra}`}
    >
      <picture>
        <source media="(max-width: 767px)" srcSet={withBasePath(`/layers/m/${name}.webp`)} />
        <img src={withBasePath(`/layers/d/${name}.webp`)} alt="" aria-hidden="true" className={FIT} decoding="async" fetchPriority={name === 'sky' ? 'high' : 'auto'} />
      </picture>
      {/* The ground carries a black apron below it, so when it climbs it
          fills the screen and hands straight over to the page below. */}
      {name === 'ground' && <div className="selene-ground-apron" />}
    </div>
  );

  return (
    <section id="top" ref={rootRef} aria-label="QingPeng Lam — Earthrise portfolio introduction" className="selene-hero" style={{height: `${STAGE_VH}svh`}}>
      <div className="selene-stage">
        {ORDER.slice(0, 3).map((n) => layer(n))}

        {/* Title sits between the plains and the crater. */}
        <div ref={titleRef} className="selene-title">
          <h1 className="selene-name">
            {hero.title}
          </h1>
          <p className="selene-kicker">{hero.kicker}</p>
          <p className="selene-description">{profile.headline}</p>
          <div className="selene-actions">
            <Link href="/world" className="selene-button">Explore My 3D World <span aria-hidden="true">↗</span></Link>
            <QuickViewLink className="selene-button selene-button-outline">Quick Portfolio View <span aria-hidden="true">↓</span></QuickViewLink>
          </div>
          <a className="selene-resume" download data-analytics-event="resume_downloaded" href={withBasePath(profile.resumePath)}>Download résumé ↓</a>
        </div>

        {ORDER.slice(3).map((n) => layer(n))}

        {/* Cosmic dust on the lens. */}
        <div
          ref={veilRef}
          className="selene-veil"
          style={{
            background:
              'radial-gradient(60% 50% at 30% 40%, rgba(170,184,210,0.55), transparent 70%), radial-gradient(50% 60% at 75% 60%, rgba(120,140,180,0.5), transparent 70%), radial-gradient(80% 80% at 50% 50%, rgba(20,26,40,0.85), rgba(5,7,12,0.95))',
          }}
        >
          <div className="selene-dust-copy">
            <p className="selene-kicker">{hero.kicker}</p>
            <strong className="selene-dust-name">{profile.name}</strong>
            <p className="selene-scroll-prompt">
              Scroll to clear the dust
            </p>
            <div className="selene-dust-actions">
              <Link className="selene-path selene-path-world" href="/world"><span className="selene-path-label">Interactive experience</span><strong>Explore my 3D world <span aria-hidden="true">↗</span></strong><span className="selene-path-detail">Walk through my work. Discover what I build.</span></Link>
              <QuickViewLink className="selene-path selene-path-quick"><span className="selene-path-label">Straight to the essentials</span><strong>Quick Portfolio View <span aria-hidden="true">↓</span></strong><span className="selene-path-detail">Experience, skills and résumé. No intro.</span></QuickViewLink>
            </div>
            <span aria-hidden="true" className="selene-scroll-arrow">
              ↓
            </span>
          </div>
        </div>
        <canvas ref={dustRef} aria-hidden="true" className="selene-dust" />

        {/* Telemetry HUD. */}
        <div ref={hudRef} aria-hidden="true" className="selene-hud">
          <div className="selene-brackets" />
          <div className="selene-clock">
            <p ref={clockRef}>T+ 00:00:00</p>
            <p className="selene-muted">Mission clock</p>
          </div>
          <div className="selene-elevation">
            <p>
              Earth elev <span ref={elevRef} className="selene-blue">0.0°</span>
            </p>
            <p className="selene-muted">Above horizon</p>
          </div>
          <div className="selene-site">{hero.site}</div>
          <div className="selene-hud-scroll">
            Scroll <span className="selene-scroll-arrow">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
