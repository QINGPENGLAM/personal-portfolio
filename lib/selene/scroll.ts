import Lenis from 'lenis';

/**
 * One rAF loop for the whole page. Lenis advances first, then every
 * scroll-driven component reads its own rect and writes styles directly —
 * nothing here goes through React state, so scrolling never re-renders.
 */

type Tick = (time: number) => void;

const subscribers = new Set<Tick>();
let lenis: Lenis | null = null;

export function startScroll(reducedMotion: boolean): () => void {
  if (!reducedMotion) {
    lenis = new Lenis({lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9});
  }

  let raf = 0;
  const loop = (time: number) => {
    lenis?.raf(time);
    subscribers.forEach((fn) => fn(time));
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    lenis?.destroy();
    lenis = null;
  };
}

export function onFrame(fn: Tick): () => void {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}

/** Navigate in-page without letting CSS smooth scrolling fight Lenis. */
export function scrollToHash(hash: string, {immediate = false, offset = 0}: {immediate?: boolean; offset?: number} = {}) {
  const target = hash === '#top' ? null : document.querySelector<HTMLElement>(hash);
  if (hash !== '#top' && !target) return;
  const top = target ? Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset) : 0;
  if (lenis) lenis.scrollTo(top, {immediate, duration: 1.6, force: true});
  else window.scrollTo({top, behavior: immediate ? 'instant' : 'smooth'});
  target?.focus({preventScroll: true});
  history.pushState(null, '', hash);
}
