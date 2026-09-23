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
    <section id="founder" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 w-full scroll-mt-24">
      <div className="w-full max-w-[1080px] mx-auto">
        {/* Section Header - Outside card and left-aligned */}
        <div
          ref={headerRef}
          className={`reveal-on-scroll text-left mb-6 sm:mb-8 ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 className="font-display font-extrabold text-[clamp(1.6rem,3.2vw,2.5rem)] text-text tracking-tight">
            About The Founder
          </h2>
        </div>

        {/* 2-Column Grid: Text Card Left, Founder Photo Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 items-stretch">
          
          {/* Left Column: Biography Card */}
          <div
            ref={bioCardRef}
            className={`reveal-on-scroll delay-1 rounded-3xl sm:rounded-4xl p-6 sm:p-8 lg:p-9 bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border border-pink/40 shadow-[0_15px_45px_rgba(238,79,127,0.18)] flex flex-col justify-center relative overflow-hidden h-full ${
              bioCardVisible ? 'is-visible' : ''
            }`}
          >
            {/* Radial Glow Effect */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(80%_120%_at_100%_0,var(--glow),transparent_60%)] pointer-events-none" />

            <div className="relative z-10">
              {/* Heading with LinkedIn Icon After */}
              <div className="flex items-center gap-3.5 mb-4">
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight flex items-center min-h-[40px]">
                  <span>{displayedTitle}</span>
                  {/* Blinking Typing Cursor - stays and keeps blinking */}
                  <span className="inline-block w-[3px] h-[0.9em] bg-pink ml-1 animate-pulse" />
                </h3>

                <a
                  href="http://www.linkedin.com/in/saira-osama"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Dr. Saira Osama on LinkedIn"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-pink/10 border border-pink/30 flex items-center justify-center text-pink hover:bg-pink hover:text-[#0A1033] hover:scale-110 hover:border-pink shadow-[0_0_15px_rgba(238,79,127,0.3)] transition-all duration-300 shrink-0"
                >
                  <Linkedin className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                </a>
              </div>

              {/* Paragraph 1 */}
              <p className="text-muted text-xs sm:text-sm lg:text-base leading-relaxed mb-4">
                is the Founder & CEO of Cerebrocure Technologies, winner of the Women in Tech® APAC Award 2024 (Malaysia) for Most Impactful Initiative. She is member steering committee AI for Good Impact Initiative, ITU, United Nations.
              </p>

              <p className="text-muted text-xs sm:text-sm lg:text-base leading-relaxed">
                She was also globally recognized as a finalist at the Women in Tech® Global Awards 2024 in France and Women’s Pitching Competition at AI for Good Global Summit 2025, United Nations, Geneva. She is a PhD in Computer Science from National University of Computer and Emerging Sciences (NUCES), Pakistan and was awarded a fellowship grant by the Foundation of Advancement of Science and Technology (FAST) at NUCES for her PhD research in stroke neuro-imaging and machine learning. She has more than 10 years of experience in academia and software industry as a machine-learning consultant.
              </p>
            </div>
          </div>

          {/* Right Column: Founder Photo */}
          <div
            ref={photoRef}
            className={`reveal-on-scroll delay-2 relative rounded-3xl sm:rounded-4xl overflow-hidden border border-pink/40 shadow-[0_15px_45px_rgba(238,79,127,0.18)] bg-[#0d1130] flex items-center justify-center min-h-[360px] lg:min-h-full group ${
              photoVisible ? 'is-visible' : ''
            }`}
          >
            <img
              src={drSairaImg}
              alt="Dr. Saira Osama - Founder & CEO of Cerebrocure Technologies"
              className="w-full h-full object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
              loading="eager"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1130]/60 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
};
