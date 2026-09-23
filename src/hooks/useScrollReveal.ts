import { useEffect, RefObject } from 'react';

interface ScrollRevealOptions {
  divisor?: number; // 0.52 for .rv, 0.62 for .rv-tilt
}

export function useScrollReveal(ref: RefObject<HTMLElement | null>, options: ScrollRevealOptions = {}) {
  const { divisor = 0.52 } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let rafId: number;

    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Calculate progress from 0 to 1
      const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight * divisor)));
      
      element.style.setProperty('--p', progress.toFixed(3));
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [ref, divisor]);
}
