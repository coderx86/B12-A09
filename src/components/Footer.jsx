import { Link } from 'react-router-dom';
import { FaLeaf, FaInstagram, FaFacebook, FaPinterest} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 mt-auto">
      <div className="flex justify-between footer p-10 max-w-7xl mx-auto text-base-content">
        {/* Brand Section */}
        <aside>
          <div className="flex items-center gap-2 mb-4">
            <FaLeaf className="text-green-500 text-3xl" />
            <span className="text-2xl font-bold">
              <span className="text-green-600">Green</span>Nest
            </span>
          </div>
          <p className="max-w-xs text-base-content/70">
            Bringing nature indoors since 2020. We help you create a greener, 
            healthier living space with our curated collection of indoor plants.
          </p>
          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-2xl hover:text-pink-500 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl hover:text-blue-600 transition-colors">
              <FaFacebook />
            </a>
            <a href="#" className="text-2xl hover:text-red-600 transition-colors">
              <FaPinterest />
            </a>
          </div>
        </aside>

        {/* Quick Links */}
        <nav>
          <h6 className="footer-title text-green-600">Quick Links</h6>
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/plants" className="link link-hover">All Plants</Link>
          <a className="link link-hover">About Us</a>
          <a className="link link-hover">Contact</a>
        </nav>

        {/* Plant Categories */}
        <nav>
          <h6 className="footer-title text-green-600">Categories</h6>
          <a className="link link-hover">Air Purifiers</a>
          <a className="link link-hover">Tropical Plants</a>
          <a className="link link-hover">Flowering Plants</a>
          <a className="link link-hover">Low Light Plants</a>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="footer-title text-green-600">Legal</h6>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Cookie Policy</a>
          <a className="link link-hover">Returns Policy</a>
        </nav>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-base-300">
        <div className="footer footer-center p-4 max-w-7xl mx-auto text-base-content/70">
          <p className="flex items-center gap-1">
            © 2025 GreenNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
