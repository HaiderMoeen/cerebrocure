import { useEffect, useRef } from 'react';

export function useMarquee(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const stateRef = useRef({
    off: 0,
    vel: 0,
    isDragging: false,
    isHovered: false,
    isIntersecting: true,
    startX: 0,
    lastX: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let animationFrameId: number;

    // IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver(([entry]) => {
      stateRef.current.isIntersecting = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    const update = () => {
      const state = stateRef.current;
      const setWidth = track.scrollWidth / 3; // Assuming 3 sets of cloned items

      if (setWidth > 0) {
        if (!state.isDragging) {
          if (Math.abs(state.vel) > 0.05) {
            state.off += state.vel;
            state.vel *= 0.94; // Momentum friction decay
          } else {
            state.vel = 0;
            if (!state.isHovered && state.isIntersecting) {
              state.off -= 0.7; // Ambient leftward drift
            }
          }
        }

        // Modulo loop wrapping
        if (state.off < -setWidth) {
          state.off += setWidth;
        } else if (state.off > 0) {
          state.off -= setWidth;
        }

        track.style.transform = `translate3d(${state.off}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    // Pointer events for drag
    const onPointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.startX = e.clientX;
      stateRef.current.lastX = e.clientX;
      stateRef.current.vel = 0;
      container.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return;
      const dx = e.clientX - stateRef.current.lastX;
      stateRef.current.off += dx;
      stateRef.current.vel = dx;
      stateRef.current.lastX = e.clientX;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return;
      stateRef.current.isDragging = false;
      container.releasePointerCapture(e.pointerId);
    };

    const onMouseEnter = () => {
      stateRef.current.isHovered = true;
    };

    const onMouseLeave = () => {
      stateRef.current.isHovered = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerUp);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerUp);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [itemCount]);

  return { containerRef, trackRef };
}
