import { Award, Newspaper, MessageSquare, Download, Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

const FadeInSection = ({ children, delay = '0s', direction = 'up' }: { children: React.ReactNode, delay?: string, direction?: 'up' | 'left' | 'right' }) => {
  const [ref, isVisible] = useAnimationOnScreen({ threshold: 0.1 });

  const getTransform = () => {
    if (!isVisible) {
      if (direction === 'up') return 'translateY(20px)';
      if (direction === 'left') return 'translateX(-20px)';
      if (direction === 'right') return 'translateX(20px)';
    }
    return 'none';
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.8s ease-out ${delay}, transform 0.8s ease-out ${delay}`,
      }}
    >
      {children}
    </div>
  );
};

function useAnimationOnScreen(options: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isVisible] as const;
}

export default function PressPage() {
  const pressReleases = [
    {
      title: 'LuxeStay Launches Revolutionary Travel Experience Platform',
      date: 'December 2024',
      source: 'Press Release',
      excerpt: 'LuxeStay announces its new platform connecting travelers with hand-curated luxury properties across India.',
      icon: '🚀',
    },
    {
      title: 'LuxeStay Recognized as Best Travel Platform by TTF Awards',
      date: 'November 2024',
      source: 'Travel Awards',
      excerpt: 'LuxeStay wins prestigious award for innovation in travel technology and hospitality.',
      icon: '🏆',
    },
    {
      title: 'Expansion: LuxeStay Opens Operations in 25 Indian Destinations',
      date: 'October 2024',
      source: 'Company News',
      excerpt: 'Expanding our reach to provide luxury travel experiences across all major Indian destinations.',
      icon: '🌍',
    },
    {
      title: 'Featured in Forbes: The Future of Hospitality',
      date: 'September 2024',
      source: 'Forbes India',
      excerpt: 'Forbes features LuxeStay as a game-changer in the Indian travel and hospitality industry.',
      icon: '📰',
    },
  ];

  const mediaKit = [
    { name: 'Logo & Branding', size: '24 MB', icon: '🎨' },
    { name: 'Company Photography', size: '156 MB', icon: '📷' },
    { name: 'Founder Bios & Photos', size: '45 MB', icon: '👥' },
    { name: 'Company Fact Sheet', size: '2 MB', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <style>{`
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-animate { animation: slideDownFade 0.8s ease-out; }
      `}</style>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-600 dark:from-indigo-950 dark:via-blue-900 dark:to-indigo-950 text-slate-900 dark:text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-10 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="hero-animate text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>Press & Media</h1>
          <p className="hero-animate text-xl text-slate-700 dark:text-slate-300">Stay updated with the latest news from LuxeStay</p>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-24 px-4 bg-gradient-to-b from-white via-indigo-50 to-white dark:from-slate-950 dark:via-indigo-950/10 dark:to-slate-950">
        <div className="max-w-5xl mx-auto mb-16">
          <FadeInSection direction="up">
            <h2 className="text-4xl font-bold mb-12" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>Latest Press Releases</h2>
          </FadeInSection>
          <div className="space-y-6">
            {pressReleases.map((release, idx) => (
              <FadeInSection key={idx} delay={`${idx * 0.1}s`} direction="up">
                <div className="group border-l-4 border-indigo-600 bg-gradient-to-r from-white to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-400">
                  <div className="flex gap-6">
                    <div className="text-5xl group-hover:scale-125 transition-transform">{release.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="text-xs font-bold uppercase text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full">
                          {release.source}
                        </span>
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{release.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{release.title}</h3>
                      <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg">{release.excerpt}</p>
                      <Link to="/hotels">
                        <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                          Read Full Release <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-24 px-4 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/20 dark:to-slate-950">
        <div className="max-w-5xl mx-auto">
          <FadeInSection direction="up">
            <h2 className="text-4xl font-bold mb-12" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>Media Kit</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {mediaKit.map((item, idx) => (
              <FadeInSection key={idx} delay={`${idx * 0.1}s`} direction="up">
                <div className="group bg-gradient-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl p-8 flex items-center justify-between border-2 border-indigo-200 dark:border-indigo-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-lg">{item.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{item.size}</p>
                    </div>
                  </div>
                  <Link to="/hotels">
                    <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold transition-all duration-300 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                      <Download className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </FadeInSection>
            ))}
          </div>
          <FadeInSection direction="up" delay="0.6s">
            <Link to="/hotels" className="block">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(79,70,229,0.4)]">
                Download Complete Media Kit (300 MB) <Download className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* Press Contact */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-indigo-50 dark:from-slate-950 dark:to-indigo-950/20">
        <div className="max-w-5xl mx-auto">
          <FadeInSection direction="up">
            <div className="bg-gradient-to-br from-indigo-100 via-blue-100 to-indigo-100 dark:from-indigo-900/30 dark:via-blue-900/30 dark:to-indigo-900/30 rounded-3xl p-12 border-2 border-indigo-300 dark:border-indigo-700 shadow-2xl">
              <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>For Media Inquiries</h2>
              <p className="text-slate-700 dark:text-slate-300 mb-8 text-lg">
                Have a story about LuxeStay? We'd love to hear from you!
              </p>
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-semibold text-slate-900 dark:text-white">Email</span>
                  </div>
                  <a href="mailto:press@luxestay.com" className="text-indigo-600 dark:text-indigo-400 hover:underline text-lg font-semibold">
                    press@luxestay.com
                  </a>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-slate-900 dark:text-white">Phone</span>
                  </div>
                  <a href="tel:+1-555-123-4567" className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-semibold">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>
              <Link to="/hotels">
                <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3 text-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  Send Press Inquiry <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
