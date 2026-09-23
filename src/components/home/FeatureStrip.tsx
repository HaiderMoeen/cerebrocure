import React from 'react';
import { FEATURES } from '../../data/features';
import { useIntersectionReveal } from '../../hooks/useIntersectionReveal';
import rapidPng from '../../assets/Rapid.png';
import throughputPng from '../../assets/throughput.png';
import multimodalPng from '../../assets/multimodal.png';
import accuratePng from '../../assets/accurate.png';
import simplePng from '../../assets/simple.png';

export const FeatureStrip: React.FC = () => {
  const [headerRef, headerVisible] = useIntersectionReveal<HTMLDivElement>();
  const [stripRef, stripVisible] = useIntersectionReveal<HTMLDivElement>();

  const getIconSrc = (id: string, iconName: string) => {
    switch (id) {
      case 'rapid':
        return rapidPng;
      case 'throughput':
        return throughputPng;
      case 'multimodal':
        return multimodalPng;
      case 'accurate':
        return accuratePng;
      case 'simple':
        return simplePng;
      default:
        switch (iconName) {
          case 'clock':
            return rapidPng;
          case 'bars':
            return throughputPng;
          case 'circles':
            return multimodalPng;
          case 'target':
            return accuratePng;
          case 'check':
            return simplePng;
          default:
            return rapidPng;
        }
    }
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 w-full flex flex-col items-center">
      {/* Section Header */}
      <div
        ref={headerRef}
        className={`reveal-on-scroll w-full max-w-[1080px] mx-auto text-left mb-6 sm:mb-8 ${
          headerVisible ? 'is-visible' : ''
        }`}
      >
        <h2 className="font-display font-extrabold text-[clamp(1.6rem,3.2vw,2.5rem)] text-text tracking-tight">
          What Cerebrocure Offers
        </h2>
      </div>

      {/* Feature Strip Container: Single Strip Container matching Partner with us styling */}
      <div
        ref={stripRef}
        className={`reveal-on-scroll delay-1 w-full max-w-[1080px] mx-auto ${
          stripVisible ? 'is-visible' : ''
        }`}
      >
        {/* Mobile & Tablet: Single Strip matching website design system */}
        <div className="lg:hidden bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border border-pink/40 rounded-3xl p-4 sm:p-6 shadow-[0_15px_45px_rgba(238,79,127,0.18)] divide-y divide-line">
          {FEATURES.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-3.5 sm:gap-4 py-3.5 first:pt-1 last:pb-1 px-2 rounded-xl hover:bg-bg2/60 transition-all duration-300 cursor-pointer select-none"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-bg border border-line group-hover:border-pink group-hover:bg-bg2 group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(238,79,127,0.4)] transition-all duration-300 shrink-0 flex items-center justify-center p-2">
                <img
                  src={getIconSrc(item.id, item.icon)}
                  alt={`${item.title} icon`}
                  className="w-full h-full object-contain select-none"
                />
              </div>
              <div className="flex flex-col text-left">
                <h3 className="font-display font-bold text-base sm:text-lg text-text group-hover:text-pink tracking-tight mb-0.5 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted group-hover:text-text font-normal leading-relaxed transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Layout: Single 5-Column Strip Banner matching Partner with us styling */}
        <div className="hidden lg:grid lg:grid-cols-5 bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border border-pink/40 rounded-4xl p-6 lg:p-7 divide-x divide-line shadow-[0_15px_45px_rgba(238,79,127,0.18)]">
          {FEATURES.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl hover:bg-bg2/80 hover:scale-105 transition-all duration-300 ease-out z-10 hover:z-30 cursor-pointer select-none"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 lg:w-16 lg:h-16 mb-4 rounded-xl lg:rounded-2xl bg-bg border border-line group-hover:border-pink group-hover:bg-bg2 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(238,79,127,0.45)] transition-all duration-300 shrink-0 flex items-center justify-center p-2.5">
                <img
                  src={getIconSrc(item.id, item.icon)}
                  alt={`${item.title} icon`}
                  className="w-full h-full object-contain select-none"
                />
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-lg lg:text-xl text-text group-hover:text-pink tracking-tight mb-1.5 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs lg:text-sm text-muted group-hover:text-text font-normal leading-relaxed transition-colors duration-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
