import { Wifi, Waves, Users, Utensils, ArrowRight, Home, Badge } from 'lucide-react';
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

export default function VillasPage() {
  const villas = [
    {
      name: 'Mountain Retreat Villa',
      location: 'Kalka',
      bedrooms: 4,
      guests: 8,
      price: '₹45,000/night',
      features: ['Private Pool', 'Mountain View', 'Chef Service', 'Spa'],
      image: 'https://images.unsplash.com/photo-1512207736139-c57b9325b503?w=500&h=400&fit=crop',
      rating: 4.9,
      badge: 'Popular Choice',
    },
    {
      name: 'Himalayan Luxury Villa',
      location: 'Shimla',
      bedrooms: 6,
      guests: 12,
      price: '₹65,000/night',
      features: ['Private Tennis Court', 'Theatre Room', 'Wine Cellar', 'Helipad'],
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=400&fit=crop',
      rating: 5.0,
      badge: 'Premium',
    },
    {
      name: 'Valley View Villa',
      location: 'Manali',
      bedrooms: 5,
      guests: 10,
      price: '₹55,000/night',
      features: ['Infinity Pool', 'Gym', 'Sauna', 'Concierge'],
      image: 'https://images.unsplash.com/photo-1613395877303-13d7a578e36e?w=500&h=400&fit=crop',
      rating: 4.8,
      badge: 'Best View',
    },
    {
      name: 'Lakeside Paradise Villa',
      location: 'Nainital',
      bedrooms: 5,
      guests: 10,
      price: '₹50,000/night',
      features: ['Waterfront Access', 'Boat House', 'BBQ Area', 'Garden'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop',
      rating: 4.7,
      badge: 'Romantic Escape',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <style>{`
        @keyframes slideDownFade {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .hero-animate { animation: slideDownFade 0.8s ease-out; }
        .badge-shimmer { animation: shimmer 2s ease-in-out infinite; }
      `}</style>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 via-yellow-500 to-red-600 dark:from-orange-950 dark:via-yellow-900 dark:to-red-950 text-slate-900 dark:text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-red-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="hero-animate text-5xl md:text-7xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>Exclusive Villas</h1>
          <p className="hero-animate text-xl text-slate-700 dark:text-slate-300">Experience luxury living in India's most exclusive properties</p>
        </div>
      </section>

      {/* Villas Grid */}
      <section className="py-24 px-4 bg-gradient-to-b from-white via-orange-50 to-white dark:from-slate-950 dark:via-orange-950/10 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>Our Exclusive Villas</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {villas.map((villa, idx) => (
              <FadeInSection key={idx} delay={`${idx * 0.15}s`} direction="up">
                <div className="group h-full rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-orange-300 dark:border-orange-700 hover:scale-105 hover:-translate-y-3 bg-white dark:bg-slate-900">
                  {/* Image Section */}
                  <div className="relative overflow-hidden h-72">
                    <img 
                      src={villa.image} 
                      alt={villa.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="badge-shimmer bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                        <Badge className="w-4 h-4" />
                        {villa.badge}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-1">
                      <span className="text-orange-600 dark:text-orange-400">★</span>
                      {villa.rating}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 bg-gradient-to-br from-white to-orange-50 dark:from-slate-900 dark:to-slate-800">
                    <div className="mb-4">
                      <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{villa.name}</h3>
                      <p className="text-orange-600 dark:text-orange-400 font-semibold text-lg flex items-center gap-2">
                        <Home className="w-4 h-4" /> {villa.location}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-300 dark:border-slate-700">
                      <div className="text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Bedrooms</p>
                        <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{villa.bedrooms}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Max Guests</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{villa.guests}</p>
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6 pb-6 border-b border-gray-300 dark:border-slate-700">
                      {villa.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Price and Button */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Starting From</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">{villa.price}</p>
                      </div>
                    </div>

                    <Link to="/hotels" className="block">
                      <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                        Book Now <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Guarantee Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
        <div className="max-w-4xl mx-auto">
          <FadeInSection direction="up">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, color: '#ffffff' }}>Luxury Guarantee</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg">
                  <div className="text-4xl mb-3">🔒</div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Secure & Verified</h3>
                  <p className="text-slate-600 dark:text-slate-400">All properties verified & insured</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg">
                  <div className="text-4xl mb-3">24/7</div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">24/7 Support</h3>
                  <p className="text-slate-600 dark:text-slate-400">Round-the-clock customer service</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg">
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Best Value</h3>
                  <p className="text-slate-600 dark:text-slate-400">Transparent pricing, no hidden fees</p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
