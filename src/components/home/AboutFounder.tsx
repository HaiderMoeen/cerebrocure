import React, { useState, useEffect } from 'react';
import { Linkedin } from 'lucide-react';
import { useIntersectionReveal } from '../../hooks/useIntersectionReveal';
import drSairaImg from '../../assets/Dr Saira.jpg';

export const AboutFounder: React.FC = () => {
  const [headerRef, headerVisible] = useIntersectionReveal<HTMLDivElement>();
  const [bioCardRef, bioCardVisible] = useIntersectionReveal<HTMLDivElement>();
  const [photoRef, photoVisible] = useIntersectionReveal<HTMLDivElement>();

  const fullTitle = 'Dr. Saira Osama';
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedTitle('');
    setIsTypingComplete(false);
    const timer = setInterval(() => {
      if (index < fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 90);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="founder" className="py-8 sm:py-12 px-4 sm:px-6 lg:px-10 w-full scroll-mt-24">
      <div className="w-full max-w-[1040px] mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`reveal-on-scroll text-left mb-5 sm:mb-6 ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 className="font-display font-extrabold text-[clamp(1.6rem,3.2vw,2.5rem)] text-text tracking-tight">
            About The Founder
          </h2>
        </div>

        {/* Single Unified Card Component: Text Left, Resized Photo Right */}
        <div
          ref={bioCardRef}
          className={`reveal-on-scroll delay-1 rounded-3xl p-6 sm:p-8 lg:p-9 bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border border-pink/40 shadow-[0_15px_45px_rgba(238,79,127,0.18)] relative overflow-hidden grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 lg:gap-8 items-center ${
            bioCardVisible ? 'is-visible' : ''
          }`}
        >
          {/* Radial Glow Effect */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(80%_120%_at_100%_0,var(--glow),transparent_60%)] pointer-events-none" />

          {/* Left Column: Biography Text */}
          <div className="relative z-10 flex flex-col justify-center">
            {/* Heading with LinkedIn Icon */}
            <div className="flex items-center gap-3 mb-3.5">
              <h3 className="font-display font-extrabold text-lg sm:text-xl lg:text-2xl text-white tracking-tight flex items-center min-h-[36px]">
                <span>{displayedTitle}</span>
                {/* Blinking Typing Cursor */}
                <span className="inline-block w-[3px] h-[0.9em] bg-pink ml-1 animate-pulse" />
              </h3>

              <a
                href="http://www.linkedin.com/in/saira-osama"
                target="_blank"
                rel="noopener noreferrer"
                title="Dr. Saira Osama on LinkedIn"
                className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-xl bg-pink/10 border border-pink/30 flex items-center justify-center text-pink hover:bg-pink hover:text-[#0A1033] hover:border-pink shadow-[0_0_15px_rgba(238,79,127,0.3)] transition-all duration-300 shrink-0"
              >
                <Linkedin className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </a>
            </div>

            {/* Paragraph 1 */}
            <p className="text-muted text-[0.8rem] sm:text-[0.86rem] lg:text-[0.92rem] leading-relaxed mb-3.5">
              is the Founder & CEO of Cerebrocure Technologies, winner of the Women in Tech<sup>®</sup> APAC Award 2024 (Malaysia) for Most Impactful Initiative. She is member steering committee AI for Good Impact Initiative, ITU, United Nations.
            </p>

            {/* Paragraph 2 */}
            <p className="text-muted text-[0.8rem] sm:text-[0.86rem] lg:text-[0.92rem] leading-relaxed">
              She was also globally recognized as a finalist at the Women in Tech<sup>®</sup> Global Awards 2024 in France and Women’s Pitching Competition at AI for Good Global Summit 2025, United Nations, Geneva. She is a PhD in Computer Science from National University of Computer and Emerging Sciences (NUCES), Pakistan and was awarded a fellowship grant by the Foundation of Advancement of Science and Technology (FAST) at NUCES for her PhD research in stroke neuro-imaging and machine learning. She has more than 10 years of experience in academia and software industry as a machine-learning consultant.
            </p>
          </div>

          {/* Right Column: Resized Smaller Founder Photo inside same component */}
          <div className="relative z-10 justify-self-center lg:justify-self-end w-full max-w-[220px] sm:max-w-[250px] aspect-[4/5] rounded-2xl overflow-hidden border border-pink/30 shadow-lg bg-[#0d1130]">
            <img
              src={drSairaImg}
              alt="Dr. Saira Osama - Founder & CEO of Cerebrocure Technologies"
              className="w-full h-full object-cover object-top select-none"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1130]/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
