import React, { useState } from 'react';
import { Logo } from './Logo';
import { RouteKey } from '../../hooks/useHashRoute';
import { Menu, X } from 'lucide-react';

interface NavProps {
  activeRoute: RouteKey;
  onNavigate: (hash: string) => void;
}

export const Nav: React.FC<NavProps> = ({ activeRoute, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (hash: string, isExternal = false) => {
    setMenuOpen(false);
    if (!isExternal) {
      onNavigate(hash);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[64px] bg-[#0F1330]/72 backdrop-blur-md border-b border-line">
      <div className="max-w-[1280px] mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <a
          href="#/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#/');
          }}
          className="flex items-center gap-3 group focus-visible:outline-none"
        >
          <Logo size={42} />
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
            <span className="font-display font-bold text-[1.15rem] tracking-tight text-text group-hover:text-pink transition-colors">
              CEREBROCURE
            </span>
            <span className="font-body text-[0.78rem] text-muted font-normal">
              Technologies
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1.5">
            <li>
              <a
                href="#/founder"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#/founder');
                }}
                className={`px-3.5 py-2 rounded-full text-[0.92rem] transition-all ${
                  activeRoute === 'founder'
                    ? 'bg-bg2 text-text shadow-[inset_0_-2px_0_var(--pink)] font-medium'
                    : 'text-muted hover:text-text hover:bg-bg2'
                }`}
              >
                Founder
              </a>
            </li>
            <li>
              <a
                href="#/media"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#/media');
                }}
                className={`px-3.5 py-2 rounded-full text-[0.92rem] transition-all ${
                  activeRoute === 'media'
                    ? 'bg-bg2 text-text shadow-[inset_0_-2px_0_var(--pink)] font-medium'
                    : 'text-muted hover:text-text hover:bg-bg2'
                }`}
              >
                Media
              </a>
            </li>
            <li>
              <a
                href="#/product"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#/product');
                }}
                className={`px-3.5 py-2 rounded-full text-[0.92rem] transition-all ${
                  activeRoute === 'product'
                    ? 'bg-bg2 text-text shadow-[inset_0_-2px_0_var(--pink)] font-medium'
                    : 'text-muted hover:text-text hover:bg-bg2'
                }`}
              >
                Product
              </a>
            </li>
            <li>
              <a
                href="#/contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#/contact');
                }}
                className="px-3.5 py-2 rounded-full text-[0.92rem] text-muted hover:text-text hover:bg-bg2 transition-all"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-list"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-line text-sm text-text bg-bg2/60 hover:border-pink transition-colors focus-visible:outline-none"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {/* Mobile Links Dropdown */}
      {menuOpen && (
        <nav
          id="mobile-nav-list"
          aria-label="Mobile Navigation"
          className="md:hidden absolute top-[64px] left-0 right-0 bg-[#0F1330] border-b border-line px-6 py-4 flex flex-col gap-2 shadow-2xl animate-swap"
        >
          <a
            href="#/founder"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#/founder');
            }}
            className={`px-4 py-2.5 rounded-lg transition-all text-base ${
              activeRoute === 'founder'
                ? 'bg-bg2 text-text font-medium border-l-2 border-pink'
                : 'text-muted hover:text-text hover:bg-bg2'
            }`}
          >
            Founder
          </a>
          <a
            href="#/media"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#/media');
            }}
            className={`px-4 py-2.5 rounded-lg transition-all text-base ${
              activeRoute === 'media'
                ? 'bg-bg2 text-text font-medium border-l-2 border-pink'
                : 'text-muted hover:text-text hover:bg-bg2'
            }`}
          >
            Media
          </a>
          <a
            href="#/product"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#/product');
            }}
            className={`px-4 py-2.5 rounded-lg transition-all text-base ${
              activeRoute === 'product'
                ? 'bg-bg2 text-text font-medium border-l-2 border-pink'
                : 'text-muted hover:text-text hover:bg-bg2'
            }`}
          >
            Product
          </a>
          <a
            href="#/contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#/contact');
            }}
            className="px-4 py-2.5 rounded-lg text-muted hover:text-text hover:bg-bg2 transition-all text-base"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
};
