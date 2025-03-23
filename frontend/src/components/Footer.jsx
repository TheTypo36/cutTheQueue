import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-primary dark:text-primary-dark"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 dark:from-primary-dark dark:to-purple-400 text-transparent bg-clip-text">
                CutTheQueue
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
              Revolutionizing healthcare queuing systems for a seamless patient experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/token-generation" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                  Token Generation
                </Link>
              </li>
              <li>
                <Link to="/medical-history" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                  Medical History
                </Link>
              </li>
              <li>
                <Link to="/queue-management" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                  Queue Management
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors">
                  Appointments
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary dark:text-primary-dark flex-shrink-0 mt-1" />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Healthcare Ave,<br />
                  Medical District, MD 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary dark:text-primary-dark" />
                <span className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary dark:text-primary-dark" />
                <span className="text-gray-600 dark:text-gray-400">contact@cutthequeue.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} CutTheQueue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
