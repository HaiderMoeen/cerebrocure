import React, { useState, useEffect } from 'react';
import { CheckCircle2, Mail, Phone, Linkedin, ArrowUpRight } from 'lucide-react';
import { useIntersectionReveal } from '../../hooks/useIntersectionReveal';

interface ContactCardProps {
  flashKey?: number;
}

export const ContactCard: React.FC<ContactCardProps> = ({ flashKey }) => {
  const [headerRef, headerVisible] = useIntersectionReveal<HTMLDivElement>();
  const [cardRef, cardVisible] = useIntersectionReveal<HTMLDivElement>();

  const [isFlashing, setIsFlashing] = useState(false);
  const [hasBeenFlashed, setHasBeenFlashed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    institute: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!flashKey) return;

    setIsFlashing(true);
    setHasBeenFlashed(true);

    const timer = setTimeout(() => {
      setIsFlashing(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, [flashKey]);

  const isHeaderVisible = headerVisible || hasBeenFlashed || Boolean(flashKey);
  const isCardVisible = cardVisible || hasBeenFlashed || Boolean(flashKey);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', position: '', institute: '', message: '' });
      } else {
        // Fallback or error message
        const msg = data.error || 'Unable to send message directly. Opening email client fallback...';
        setErrorMessage(msg);
        
        // Mailto fallback if Vercel function key not configured yet
        const mailtoUrl = `mailto:contact@cerebrocure.ai?subject=${encodeURIComponent(
          `Inquiry from ${formData.name}`
        )}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nPosition: ${formData.position}\nInstitute: ${formData.institute}\n\nMessage:\n${formData.message}`
        )}`;
        window.location.href = mailtoUrl;
      }
    } catch (err) {
      // Network error or local dev fallback
      const mailtoUrl = `mailto:contact@cerebrocure.ai?subject=${encodeURIComponent(
        `Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPosition: ${formData.position}\nInstitute: ${formData.institute}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-10 w-full scroll-mt-24">
      <div className="w-full max-w-[1080px] mx-auto">
        {/* Section Header - Outside card and left-aligned */}
        <div
          ref={headerRef}
          className={`reveal-on-scroll text-left mb-6 sm:mb-8 ${isHeaderVisible ? 'is-visible' : ''}`}
        >
          <h2 className="font-display font-extrabold text-[clamp(1.6rem,3.2vw,2.5rem)] text-text tracking-tight">
            Contact Us
          </h2>
        </div>

        {/* Card Component */}
        <div
          ref={cardRef}
          id="contactCard"
          className={`reveal-on-scroll delay-1 rounded-3xl sm:rounded-4xl p-5 sm:p-8 lg:p-9 bg-gradient-to-br from-[#181f50] via-[#12173f] to-[#0d1130] border border-pink/40 shadow-[0_15px_45px_rgba(238,79,127,0.18)] relative overflow-hidden ${
            isCardVisible ? 'is-visible' : ''
          } ${isFlashing ? 'flash' : ''}`}
        >
          {/* Radial Corner Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(80%_120%_at_100%_0,var(--glow),transparent_60%)] pointer-events-none" />

          {/* Main Grid: Form Left, Contact Cards Right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-10 items-stretch relative z-10">
            
            {/* Left Column: Contact Form */}
            <div className="flex flex-col justify-between">
              {submitted ? (
                <div className="h-full min-h-[320px] flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl bg-bg/60 border border-pink/40 backdrop-blur-md">
                  <CheckCircle2 size={48} className="text-pink mb-3 animate-bounce" />
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2">Thank you!</h3>
                  <p className="text-muted text-xs sm:text-sm max-w-[36ch]">
                    Your message has been received. Our team will contact you within 2–3 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                        Name <span className="text-pink">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-line focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/30 text-text placeholder-muted/40 text-xs sm:text-sm transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                        Email <span className="text-pink">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-line focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/30 text-text placeholder-muted/40 text-xs sm:text-sm transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Row 2: Position & Institute */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label htmlFor="position" className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                        Position
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="e.g. Neurologist / Director"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-line focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/30 text-text placeholder-muted/40 text-xs sm:text-sm transition-all duration-200"
                      />
                    </div>

                    <div>
                      <label htmlFor="institute" className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                        Institute
                      </label>
                      <input
                        type="text"
                        id="institute"
                        name="institute"
                        value={formData.institute}
                        onChange={handleChange}
                        placeholder="Hospital / Research Center"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-line focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/30 text-text placeholder-muted/40 text-xs sm:text-sm transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-text mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-bg border border-line focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/30 text-text placeholder-muted/40 text-xs sm:text-sm transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Row 4: Send Button */}
                  <div className="flex justify-start mt-0.5">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-auto px-7 py-2.5 rounded-full bg-pink hover:bg-[#ff5d8f] disabled:opacity-60 text-[#0A1033] font-bold text-xs sm:text-sm shadow-[0_6px_18px_rgba(238,79,127,0.4)] hover:shadow-[0_10px_24px_rgba(238,79,127,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 inline-flex items-center justify-center select-none cursor-pointer disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Now'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Contact Information Cards (Email, Phone, LinkedIn) */}
            <div className="flex flex-col justify-between pt-[24px] pb-[56px] gap-3 sm:gap-4 h-full min-h-[300px]">
              {/* Card 1: Email (Top aligns with Name & Email input fields) */}
              <a
                href="mailto:contact@cerebrocure.ai"
                className="group p-3 sm:p-3.5 rounded-2xl bg-bg/60 hover:bg-bg border border-line hover:border-pink/60 transition-all duration-300 flex items-center justify-between shadow-md hover:shadow-pink/10 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 sm:gap-3.5">
                  <div className="w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-xl bg-pink/10 border border-pink/20 flex items-center justify-center text-pink group-hover:scale-105 group-hover:bg-pink/20 transition-all duration-300 shrink-0">
                    <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-muted font-semibold leading-none mb-1">
                      Email
                    </span>
                    <span className="text-text font-bold text-xs sm:text-sm group-hover:text-pink transition-colors">
                      contact@cerebrocure.ai
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
              </a>

              {/* Card 2: Phone (Aligns with Position & Institute fields) */}
              <a
                href="tel:+923224774095"
                className="group p-3 sm:p-3.5 rounded-2xl bg-bg/60 hover:bg-bg border border-line hover:border-pink/60 transition-all duration-300 flex items-center justify-between shadow-md hover:shadow-pink/10 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 sm:gap-3.5">
                  <div className="w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-xl bg-pink/10 border border-pink/20 flex items-center justify-center text-pink group-hover:scale-105 group-hover:bg-pink/20 transition-all duration-300 shrink-0">
                    <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-muted font-semibold leading-none mb-1">
                      Phone
                    </span>
                    <span className="text-text font-bold text-xs sm:text-sm group-hover:text-pink transition-colors">
                      +92 322 4774095
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
              </a>

              {/* Card 3: LinkedIn (Bottom aligns with Message textarea bottom edge) */}
              <a
                href="https://www.linkedin.com/company/cerebrocure-technologies-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 sm:p-3.5 rounded-2xl bg-bg/60 hover:bg-bg border border-line hover:border-pink/60 transition-all duration-300 flex items-center justify-between shadow-md hover:shadow-pink/10 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3 sm:gap-3.5">
                  <div className="w-8.5 h-8.5 sm:w-9.5 sm:h-9.5 rounded-xl bg-pink/10 border border-pink/20 flex items-center justify-center text-pink group-hover:scale-105 group-hover:bg-pink/20 transition-all duration-300 shrink-0">
                    <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-muted font-semibold leading-none mb-1">
                      LinkedIn
                    </span>
                    <span className="text-text font-bold text-xs sm:text-sm group-hover:text-pink transition-colors">
                      Cerebrocure Technologies
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-pink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
