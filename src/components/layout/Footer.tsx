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
    { label: 'Founder', hash: '#/founder' },
    { label: 'Media', hash: '#/media' },
    { label: 'Product', hash: '#/product' },
    { label: 'Contact', hash: '#/contact' },
    { label: 'Privacy Policy', hash: '#/privacy' },
  ];

  return (
    <footer className="w-full relative overflow-hidden bg-gradient-to-b from-[#0B0F28] via-[#0E1232] to-[#080B1E] border-t border-pink/20 mt-20 pt-14 pb-8 px-4 sm:px-6 lg:px-10">
      {/* Top ambient glowing line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-pink/60 to-transparent pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-0 right-10 w-[350px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(238,79,127,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(45,60,130,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1180px] mx-auto relative z-10 flex flex-col gap-12">
        {/* Main Grid: Left Links + Brand | Right Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Left Side: Brand Header & Page Links */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3.5">
              <Logo size={44} />
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white tracking-wider">
                  CEREBROCURE
                </span>
                <span className="text-xs text-pink/90 tracking-wide font-medium">
                  Technologies Pvt Ltd
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted/80 max-w-md leading-relaxed">
              Pioneering AI-driven neurological diagnostics and precision clinical imaging solutions for early stroke detection and therapy monitoring.
            </p>

            {/* Quick Navigation Links */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-white/90 uppercase tracking-widest mb-3.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink"></span>
                Navigation
              </h4>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-y-2.5 gap-x-4 text-xs sm:text-sm">
                {navLinks.map((link) => (
                  <li key={link.hash}>
                    <a
                      href={link.hash}
                      onClick={(e) => handleLinkClick(e, link.hash)}
                      className="group inline-flex items-center gap-1.5 text-muted hover:text-white transition-colors py-1"
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
          <div className="flex flex-col gap-5 md:items-end">
            <div className="w-full md:max-w-md flex flex-col gap-3">
              <h4 className="text-xs font-semibold text-white/90 uppercase tracking-widest mb-1 flex items-center gap-2 md:justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-pink"></span>
                Connect With Us
              </h4>

              {/* Email Card */}
              <a
                href="mailto:contact@cerebrocure.ai"
                className="group p-3.5 rounded-xl bg-bg/40 hover:bg-bg/80 border border-line/60 hover:border-pink/50 transition-all duration-300 flex items-center justify-between backdrop-blur-sm shadow-sm hover:shadow-pink/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-pink/10 border border-pink/20 flex items-center justify-center text-pink group-hover:bg-pink group-hover:text-[#0A1033] transition-all duration-300 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-semibold text-muted tracking-wider">
                      Direct Email
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-text group-hover:text-pink transition-colors">
                      contact@cerebrocure.ai
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-muted group-hover:text-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>

              {/* Phone Card */}
              <a
                href="tel:+923224774095"
                className="group p-3.5 rounded-xl bg-bg/40 hover:bg-bg/80 border border-line/60 hover:border-pink/50 transition-all duration-300 flex items-center justify-between backdrop-blur-sm shadow-sm hover:shadow-pink/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-pink/10 border border-pink/20 flex items-center justify-center text-pink group-hover:bg-pink group-hover:text-[#0A1033] transition-all duration-300 shrink-0">
                    <Phone size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-semibold text-muted tracking-wider">
                      Phone Number
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-text group-hover:text-pink transition-colors">
                      +92 322 4774095
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-muted group-hover:text-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>

              {/* LinkedIn Card */}
              <a
                href="https://www.linkedin.com/company/cerebrocure-technologies-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-xl bg-bg/40 hover:bg-bg/80 border border-line/60 hover:border-pink/50 transition-all duration-300 flex items-center justify-between backdrop-blur-sm shadow-sm hover:shadow-pink/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-pink/10 border border-pink/20 flex items-center justify-center text-pink group-hover:bg-pink group-hover:text-[#0A1033] transition-all duration-300 shrink-0">
                    <Linkedin size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-semibold text-muted tracking-wider">
                      Official LinkedIn
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-text group-hover:text-pink transition-colors">
                      Cerebrocure Technologies
                    </span>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-muted group-hover:text-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="pt-6 border-t border-line/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p className="text-center sm:text-left">
            Copyright © {new Date().getFullYear()} <span className="text-text font-medium">Cerebrocure Technologies Pvt Ltd</span>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-[0.78rem]">
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
