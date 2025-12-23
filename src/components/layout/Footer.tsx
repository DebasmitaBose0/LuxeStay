import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">LuxeStay</h3>
            <p className="text-sm text-primary-foreground/80 font-light">
              Experience the art of hospitality. Curated stays for the discerning traveler.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/destinations" className="hover:text-white transition-colors duration-300 hover:drop-shadow-lg">Destinations</Link></li>
              <li><Link to="/experiences" className="hover:text-white transition-colors duration-300 hover:drop-shadow-lg">Experiences</Link></li>
              <li><Link to="/villas" className="hover:text-white transition-colors duration-300 hover:drop-shadow-lg">Villas</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/about" className="hover:text-white transition-colors duration-300 hover:drop-shadow-lg">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors duration-300 hover:drop-shadow-lg">Careers</Link></li>
              <li><Link to="/press" className="hover:text-white transition-colors duration-300 hover:drop-shadow-lg">Press</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="mailto:support@luxestay.com" className="hover:text-white transition-colors duration-300">support@luxestay.com</a></li>
              <li><a href="tel:+1-555-123-4567" className="hover:text-white transition-colors duration-300">+1 (555) 123-4567</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} LuxeStay Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
