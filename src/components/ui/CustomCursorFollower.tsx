import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, MoveHorizontal } from 'lucide-react';

interface CustomCursorProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export const CustomCursorFollower: React.FC<CustomCursorProps> = ({ containerRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveringCard, setHoveringCard] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const posRef = useRef({
    tx: 0,
    ty: 0,
    cx: 0,
    cy: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check fine pointer capability
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isFinePointer) return;

    let rafId: number;

    const animate = () => {
      const pos = posRef.current;
      pos.cx += (pos.tx - pos.cx) * 0.22;
      pos.cy += (pos.ty - pos.cy) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.cx - 43}px, ${pos.cy - 43}px, 0) scale(${hoveringCard ? 1.15 : 1})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const onPointerMove = (e: PointerEvent) => {
      posRef.current.tx = e.clientX;
      posRef.current.ty = e.clientY;

      const target = e.target as HTMLElement;
      if (target && target.closest('.mcard')) {
        setHoveringCard(true);
      } else {
        setHoveringCard(false);
      }
    };

    const onPointerEnter = () => setIsVisible(true);
    const onPointerLeave = () => setIsVisible(false);

    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerenter', onPointerEnter);
    container.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerenter', onPointerEnter);
      container.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [containerRef, hoveringCard]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[80] w-[86px] h-[86px] rounded-full bg-pink/90 text-on-accent font-semibold text-xs flex flex-col items-center justify-center shadow-lg pointer-events-none transition-transform duration-150 ease-out select-none border border-soft/40 backdrop-blur-sm"
    >
      {hoveringCard ? (
        <>
          <ArrowUpRight size={18} strokeWidth={2.5} />
          <span className="mt-0.5 tracking-wide">Open</span>
        </>
      ) : (
        <>
          <MoveHorizontal size={18} strokeWidth={2.5} />
          <span className="mt-0.5 tracking-wide">Drag</span>
        </>
      )}
    </div>
  );
};
