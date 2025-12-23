import { Link } from 'react-router-dom';
import { Zap, Clock, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

export default function ExperiencesPage() {
  const experiences = [
    {
      title: 'Mountain Trekking',
      description: 'Challenge yourself with guided treks through pristine mountain trails with breathtaking vistas.',
      icon: '⛰️',
      duration: '3-5 days',
      groupSize: '6-12 people',
      difficulty: 'Moderate to Hard',
    },
    {
      title: 'Wellness & Yoga Retreat',
      description: 'Rejuvenate your mind and body with holistic yoga sessions and spa treatments in serene settings.',
      icon: '🧘',
      duration: '5-7 days',
      groupSize: '8-15 people',
      difficulty: 'Easy',
    },
    {
      title: 'Cultural Heritage Tours',
      description: 'Immerse yourself in the rich history and traditions of India with expert-guided cultural experiences.',
      icon: '🏛️',
      duration: '2-3 days',
      groupSize: '10-20 people',
      difficulty: 'Easy',
    },
    {
      title: 'Adventure Sports',
      description: 'Feel the adrenaline rush with paragliding, rock climbing, and water sports activities.',
      icon: '🚀',
      duration: '2-4 days',
      groupSize: '4-10 people',
      difficulty: 'Hard',
    },
    {
      title: 'Culinary Expeditions',
      description: 'Discover authentic Indian cuisine with cooking classes and gastronomic tours through local markets.',
      icon: '🍲',
      duration: '3-4 days',
      groupSize: '6-12 people',
      difficulty: 'Easy',
    },
    {
      title: 'Photography Tours',
      description: 'Capture stunning landscapes and local culture with professional photography guides and workshops.',
      icon: '📸',
      duration: '4-6 days',
      groupSize: '8-15 people',
      difficulty: 'Moderate',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Easy') return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (difficulty === 'Moderate') return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <style>{`
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .hero-animate { animation: slideDownFade 0.8s ease-out; }
        .float-icon { animation: float 3s ease-in-out infinite; }
      `}</style>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-emerald-500 to-white dark:from-green-950 dark:via-emerald-900 dark:to-slate-950 text-slate-900 dark:text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-20 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="hero-animate text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>Unforgettable Experiences</h1>
          <p className="hero-animate text-xl text-slate-700 dark:text-slate-300">Create lifelong memories with curated adventures across India</p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-24 px-4 bg-gradient-to-b from-white via-green-50 to-white dark:from-slate-950 dark:via-green-950/10 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp, idx) => (
              <FadeInSection key={idx} delay={`${idx * 0.1}s`} direction="up">
                <div className="group h-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-green-300 dark:border-green-700 hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-slate-800 hover:border-green-500 dark:hover:border-green-400">
                  <div className="p-8">
                    {/* Icon */}
                    <div className="text-6xl mb-4 float-icon">{exp.icon}</div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{exp.title}</h3>

                    {/* Description */}
                    <p className="text-slate-700 dark:text-slate-300 mb-6 line-clamp-3">{exp.description}</p>

                    {/* Details */}
                    <div className="space-y-3 mb-6 pb-6 border-b border-gray-300 dark:border-slate-700">
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{exp.groupSize}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Zap className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className={`px-3 py-1 rounded-full font-semibold text-xs ${getDifficultyColor(exp.difficulty)}`}>
                          {exp.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Button */}
                    <Link to="/hotels" className="block">
                      <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
