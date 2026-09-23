import React from 'react';
import { Logo } from './Logo';
import { Mail, Phone, Linkedin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate?: (hash: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(hash);
    } else {
      window.location.hash = hash;
    }
  };

  const navLinks = [
    { label: 'Home', hash: '#/' },
    { label: 'Product', hash: '#/product' },
    { label: 'Media', hash: '#/media' },
    { label: 'Founder', hash: '#/founder' },
    { label: 'Contact', hash: '#/contact' },
    { label: 'Privacy Policy', hash: '#/privacy' },
  ];

  return (
    <footer className="w-full relative overflow-hidden bg-gradient-to-b from-[#0B0F28] via-[#0E1232] to-[#080B1E] border-t border-pink/20 mt-12 sm:mt-16 pt-8 sm:pt-10 pb-5 px-4 sm:px-6 lg:px-10">
      {/* Top ambient glowing line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-pink/60 to-transparent pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-0 right-10 w-[280px] h-[280px] bg-[radial-gradient(ellipse_at_center,rgba(238,79,127,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[280px] h-[280px] bg-[radial-gradient(ellipse_at_center,rgba(45,60,130,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1100px] mx-auto relative z-10 flex flex-col gap-8">
        {/* Main Grid: Left Links + Brand | Right Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Side: Brand Header & Page Links */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <Logo size={32} />
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm sm:text-base text-white tracking-wider">
                  CEREBROCURE
                </span>
                <span className="text-[10px] text-pink/90 tracking-wide font-medium">
                  Technologies Pvt Ltd
                </span>
              </div>
            </div>

            <p className="text-xs text-muted/80 max-w-sm leading-relaxed">
              Pioneering AI-driven neurological diagnostics and precision clinical imaging solutions for early stroke detection and therapy monitoring.
            </p>

            {/* Quick Navigation Links */}
            <div className="pt-1">
              <h4 className="text-[11px] font-semibold text-white/90 uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink"></span>
                Navigation
              </h4>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-1.5 gap-x-3 text-xs">
                {navLinks.map((link) => (
                  <li key={link.hash}>
                    <a
                      href={link.hash}
                      onClick={(e) => handleLinkClick(e, link.hash)}
                      className="group inline-flex items-center gap-1.5 text-muted hover:text-white transition-colors py-0.5"
                    >
                      <span className="w-1 h-1 rounded-full bg-pink/40 group-hover:bg-pink group-hover:scale-125 transition-all" />
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Email, LinkedIn, Phone */}
          <div className="flex flex-col gap-4 md:items-end">
            <div className="w-full md:max-w-xs sm:max-w-sm flex flex-col gap-2.5">
              <h4 className="text-[11px] font-semibold text-white/90 uppercase tracking-widest mb-0.5 flex items-center gap-2 md:justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-pink"></span>
                Connect With Us
              </h4>

              {/* Email Card */}
              <a
                href="mailto:contact@cerebrocure.ai"
                className="group p-2.5 rounded-lg bg-bg/40 hover:bg-bg/80 border border-line/60 hover:border-pink/50 transition-all duration-300 flex items-center justify-between backdrop-blur-sm shadow-sm hover:shadow-pink/10"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7.5 h-7.5 rounded-md bg-pink/10 border border-pink/20 flex items-center justify-center text-pink group-hover:bg-pink group-hover:text-[#0A1033] transition-all duration-300 shrink-0">
                    <Mail size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-semibold text-muted tracking-wider">
                      Direct Email
                    </span>
                    <span className="text-xs font-semibold text-text group-hover:text-pink transition-colors">
                      contact@cerebrocure.ai
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-muted group-hover:text-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>

              {/* Phone Card */}
              <a
                href="tel:+923224774095"
                className="group p-2.5 rounded-lg bg-bg/40 hover:bg-bg/80 border border-line/60 hover:border-pink/50 transition-all duration-300 flex items-center justify-between backdrop-blur-sm shadow-sm hover:shadow-pink/10"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7.5 h-7.5 rounded-md bg-pink/10 border border-pink/20 flex items-center justify-center text-pink group-hover:bg-pink group-hover:text-[#0A1033] transition-all duration-300 shrink-0">
                    <Phone size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-semibold text-muted tracking-wider">
                      Phone Number
                    </span>
                    <span className="text-xs font-semibold text-text group-hover:text-pink transition-colors">
                      +92 322 4774095
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-muted group-hover:text-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/company/cerebrocure-technologies-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-lg bg-bg/40 hover:bg-bg/80 border border-line/60 hover:border-pink/50 transition-all duration-300 flex items-center justify-between backdrop-blur-sm shadow-sm hover:shadow-pink/10"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7.5 h-7.5 rounded-md bg-pink/10 border border-pink/20 flex items-center justify-center text-pink group-hover:bg-pink group-hover:text-[#0A1033] transition-all duration-300 shrink-0">
                    <Linkedin size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-semibold text-muted tracking-wider">
                      Official LinkedIn
                    </span>
                    <span className="text-xs font-semibold text-text group-hover:text-pink transition-colors">
                      Cerebrocure Technologies
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-muted group-hover:text-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="pt-4 border-t border-line/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-muted">
          <p className="text-center sm:text-left">
            Copyright © {new Date().getFullYear()} <span className="text-text font-medium">Cerebrocure Technologies Pvt Ltd</span>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Lahore, Pakistan</span>
            <span className="w-1 h-1 rounded-full bg-pink/40" />
            <a
              href="#/privacy"
              onClick={(e) => handleLinkClick(e, '#/privacy')}
              className="hover:text-pink transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
