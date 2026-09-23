import { useEffect, useState, useCallback, RefCallback } from 'react';

export function useIntersectionReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string } = {}
): [RefCallback<T>, boolean] {
  const [element, setElement] = useState<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = options;

  const refCallback = useCallback((node: T | null) => {
    if (node) {
      setElement(node);
    }
  }, []);

  useEffect(() => {
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(element);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, isVisible, threshold, rootMargin]);

  return [refCallback, isVisible];
}





