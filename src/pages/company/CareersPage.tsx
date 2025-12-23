import { Briefcase, MapPin, Users, ArrowRight, Globe, Rocket, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

export default function CareersPage() {
  const openings = [
    {
      position: 'Property Manager',
      location: 'Various Locations',
      type: 'Full-time',
      department: 'Operations',
      description: 'Manage and oversee partner properties, ensure quality standards.',
      icon: '🏢',
    },
    {
      position: 'Travel Experiences Designer',
      location: 'New Delhi',
      type: 'Full-time',
      department: 'Experience Team',
      description: 'Create and curate unique travel experiences for our guests.',
      icon: '🎨',
    },
    {
      position: 'Content & Marketing Specialist',
      location: 'Bangalore',
      type: 'Full-time',
      department: 'Marketing',
      description: 'Develop engaging content and marketing campaigns.',
      icon: '📝',
    },
    {
      position: 'Customer Success Manager',
      location: 'Mumbai',
      type: 'Full-time',
      department: 'Customer Service',
      description: 'Ensure exceptional customer experiences and satisfaction.',
      icon: '😊',
    },
    {
      position: 'Software Developer (Frontend)',
      location: 'Bangalore',
      type: 'Full-time',
      department: 'Engineering',
      description: 'Build beautiful and responsive user interfaces.',
      icon: '💻',
    },
    {
      position: 'Data Analyst',
      location: 'New Delhi',
      type: 'Full-time',
      department: 'Analytics',
      description: 'Analyze travel trends and guest behavior data.',
      icon: '📊',
    },
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Be part of transforming the travel industry in India',
    },
    {
      icon: Rocket,
      title: 'Growth Opportunity',
      description: 'Learn and grow with a fast-growing startup',
    },
    {
      icon: Heart,
      title: 'Passion Driven',
      description: 'Work with people who love what they do',
    },
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
      <section className="bg-gradient-to-br from-green-600 via-emerald-500 to-green-600 dark:from-green-950 dark:via-emerald-900 dark:to-green-950 text-slate-900 dark:text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="hero-animate text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>Careers at LuxeStay</h1>
          <p className="hero-animate text-xl text-slate-700 dark:text-slate-300">Join our mission to redefine luxury travel in India</p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-24 px-4 bg-gradient-to-b from-white via-green-50 to-white dark:from-slate-950 dark:via-green-950/10 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <FadeInSection direction="up">
            <h2 className="text-4xl font-bold mb-12" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#16a34a' }}>Why Join Us?</h2>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <FadeInSection key={idx} delay={`${idx * 0.1}s`} direction="up">
                <div className="group rounded-3xl p-8 bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-slate-800 border-2 border-green-300 dark:border-green-700 hover:border-green-500 dark:hover:border-green-500 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <benefit.icon className="w-16 h-16 text-green-600 dark:text-green-400 mb-4 group-hover:scale-125 transition-transform" />
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{benefit.title}</h3>
                  <p className="text-slate-700 dark:text-slate-300">{benefit.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-green-50 dark:from-slate-950 dark:to-green-950/20">
        <div className="max-w-5xl mx-auto">
          <FadeInSection direction="up">
            <h2 className="text-4xl font-bold mb-12" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#16a34a' }}>Open Positions</h2>
          </FadeInSection>
          <div className="space-y-6">
            {openings.map((job, idx) => (
              <FadeInSection key={idx} delay={`${idx * 0.08}s`} direction="up">
                <div className="group border-2 border-green-300 dark:border-green-700 rounded-3xl p-8 hover:border-green-500 dark:hover:border-green-500 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-slate-800 hover:-translate-y-2">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-4xl">{job.icon}</span>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{job.position}</h3>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 mb-4 text-lg">{job.description}</p>
                        <div className="flex flex-wrap gap-3 mb-4">
                          <span className="flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </span>
                          <span className="flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
                            <Briefcase className="w-4 h-4" /> {job.type}
                          </span>
                          <span className="text-sm font-semibold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30 px-4 py-2 rounded-full">
                            {job.department}
                          </span>
                        </div>
                      </div>
                      <Link to="/hotels">
                        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold whitespace-nowrap transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                          Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* CTA Section */}
          <FadeInSection direction="up" delay="0.6s">
            <div className="mt-12 p-12 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-3xl border-2 border-green-300 dark:border-green-700">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Don't see a perfect fit?</h3>
              <p className="text-slate-700 dark:text-slate-300 mb-6 text-lg">
                We're always looking for talented individuals to join our team. Send us your resume and tell us what role you'd like to create!
              </p>
              <Link to="/hotels">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg py-3 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                  Send Your Profile <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
