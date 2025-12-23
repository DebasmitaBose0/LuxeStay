import { Heart, Target, Leaf, Users, Award, Zap } from 'lucide-react';
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

export default function AboutUsPage() {
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
      <section className="bg-gradient-to-br from-orange-600 via-amber-500 to-yellow-600 dark:from-orange-950 dark:via-amber-900 dark:to-yellow-950 text-slate-900 dark:text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="hero-animate text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>About LuxeStay</h1>
          <p className="hero-animate text-xl text-slate-700 dark:text-slate-300">Redefining hospitality through authentic experiences</p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 px-4 bg-gradient-to-b from-white via-orange-50 to-white dark:from-slate-950 dark:via-orange-950/10 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Heart,
                title: 'Our Mission',
                color: 'from-orange-600 to-orange-500',
                description: 'To provide curated, authentic hospitality experiences that celebrate Indian culture and warmth while delivering world-class comfort.',
                delay: '0s',
              },
              {
                icon: Target,
                title: 'Our Vision',
                color: 'from-green-600 to-green-500',
                description: 'To be the leading platform for experiential luxury travel in India, connecting discerning travelers with exceptional properties.',
                delay: '0.1s',
              },
              {
                icon: Leaf,
                title: 'Our Values',
                color: 'from-emerald-600 to-emerald-500',
                description: 'Authenticity, sustainability, and excellence in every interaction. We believe in responsible tourism.',
                delay: '0.2s',
              },
            ].map((item, idx) => (
              <FadeInSection key={idx} delay={item.delay} direction="up">
                <div className="group text-center h-full rounded-3xl p-8 bg-gradient-to-br from-white to-orange-50 dark:from-slate-900 dark:to-slate-800 border-2 border-orange-200 dark:border-orange-700 hover:border-orange-400 dark:hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Story */}
          <FadeInSection direction="up" delay="0.3s">
            <div className="bg-gradient-to-r from-orange-100 via-yellow-100 to-orange-100 dark:from-orange-900/30 dark:via-yellow-900/30 dark:to-orange-900/30 rounded-3xl p-8 md:p-12 mb-16 border-2 border-orange-300 dark:border-orange-700">
              <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>Our Story</h2>
              <div className="space-y-6">
                <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
                  Founded in 2020, LuxeStay emerged from a passion to reshape how travelers experience India. We realized that luxury doesn't mean losing authenticity, and comfort doesn't require compromising on cultural connection.
                </p>
                <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
                  Our team of hospitality experts, designers, and local enthusiasts handpick every property to ensure it meets our exacting standards. We believe in the Sanskrit philosophy <span className="font-semibold text-orange-700 dark:text-orange-400">"अतिथि देवो भवः"</span> (Your Guest is God) and it guides every decision we make.
                </p>
                <p className="text-lg text-slate-800 dark:text-slate-200 leading-relaxed">
                  Today, we're proud to connect thousands of travelers with hundreds of carefully selected properties across India, each offering a unique story and experience.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Stats */}
          <FadeInSection direction="up" delay="0.4s">
            <div className="grid md:grid-cols-4 gap-6 text-center mb-16">
              {[
                { value: '500+', label: 'Properties', icon: '🏠', color: 'from-orange-500 to-red-500' },
                { value: '50K+', label: 'Happy Travelers', icon: '👥', color: 'from-green-500 to-emerald-500' },
                { value: '25+', label: 'Destinations', icon: '🌍', color: 'from-blue-500 to-cyan-500' },
                { value: '4.8★', label: 'Average Rating', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
              ].map((stat, idx) => (
                <div key={idx} className="group p-8 bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl border-2 border-orange-200 dark:border-orange-700 hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-2">
                  <div className="text-5xl mb-3 group-hover:scale-125 transition-transform">{stat.icon}</div>
                  <p className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>{stat.value}</p>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeInSection>

          {/* Why Choose Us */}
          <FadeInSection direction="up" delay="0.5s">
            <div className="mt-16">
              <h2 className="text-4xl font-bold mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>Why Choose LuxeStay?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Award,
                    title: 'Curated Selection',
                    description: 'Every property is hand-picked and verified to meet our luxury standards',
                  },
                  {
                    icon: Users,
                    title: '24/7 Support',
                    description: 'Dedicated customer service team available round the clock to assist you',
                  },
                  {
                    icon: Zap,
                    title: 'Best Experiences',
                    description: 'Beyond accommodation - immersive experiences that create memories',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="group p-8 rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-slate-900 dark:to-slate-800 border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <item.icon className="w-12 h-12 text-green-600 dark:text-green-400 mb-4 group-hover:scale-125 transition-transform" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-slate-700 dark:text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
