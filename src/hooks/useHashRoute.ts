import { useState, useEffect, useCallback } from 'react';

export type RouteKey = 'home' | 'product' | 'media' | 'founder' | 'privacy';

export function useHashRoute() {
  const [route, setRoute] = useState<RouteKey>('home');
  const [flashContact, setFlashContact] = useState<number>(0);

  const triggerContactScroll = useCallback(() => {
    setRoute('home');
    setTimeout(() => {
      const contactElem = document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
        // Force elements visible in case intersection observer hasn't fired yet
        const elements = document.querySelectorAll('#contact .reveal-on-scroll, #contactCard');
        elements.forEach((el) => el.classList.add('is-visible'));
        setFlashContact(Date.now());
      }
    }, 80);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      
      if (hash.startsWith('#/product')) {
        setRoute('product');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash.startsWith('#/media')) {
        setRoute('media');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash.startsWith('#/founder')) {
        setRoute('founder');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash.startsWith('#/privacy')) {
        setRoute('privacy');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash.startsWith('#/contact')) {
        triggerContactScroll();
      } else {
        setRoute('home');
        if (!hash.includes('contact')) {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [triggerContactScroll]);

  const navigate = (newHash: string) => {
    if (newHash === '#/contact') {
      if (window.location.hash === '#/contact') {
        triggerContactScroll();
      } else {
        window.location.hash = '#/contact';
      }
    } else {
      window.location.hash = newHash;
    }
  };

  return { route, navigate, flashContact };
}
