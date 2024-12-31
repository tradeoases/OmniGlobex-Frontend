import DiscountBanner from "./DiscountBanner";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Logo } from "./logo";
import { Link } from "react-router-dom";
import { useScrollToTop } from '../hooks/useScrollToTop';

const Footer = () => {
  useScrollToTop();

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-gray-800">
      <DiscountBanner />
      
      <div className="w-full">
        <button
          className="w-full bg-gray-700 text-gray-200 py-4 hover:bg-gray-600 transition-all duration-300 font-medium"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top
        </button>
      </div>

      <div className="flex items-center justify-center h-24 lg:h-32 my-6">
        <Logo />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 py-12 border-t border-b border-gray-600">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-100">Company</h3>
            <nav className="flex flex-col space-y-4 text-gray-400">
              <Link 
                to="about" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                About Us
              </Link>
              <Link 
                to="contact" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                Contact Us
              </Link>
              <Link 
                to="#" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                Careers
              </Link>
              <Link 
                to="#" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                Partners
              </Link>
            </nav>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-100">Legal</h3>
            <nav className="flex flex-col space-y-4 text-gray-400">
              <Link 
                to="terms-condition" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                Terms & Conditions
              </Link>
              <Link 
                to="privacy-policy" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/cookie-policy" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-100">Terms</h3>
            <nav className="flex flex-col space-y-4 text-gray-400">
              <Link 
                to="track-order" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                Tracking Order
              </Link>
              <Link 
                to="signup" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                Become Seller
              </Link>
              <Link 
                to="/" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                Best Products
              </Link>
              <Link 
                to="blogs" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                Blog
              </Link>
              <Link 
                to="contact" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                Support
              </Link>
              <Link 
                to="faq" 
                onClick={handleLinkClick}
                className="hover:text-main hover:translate-x-2 transition-all duration-300"
              >
                FAQ
              </Link>
            </nav>
          </div>
        </div>

        <div className="py-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6 text-2xl text-gray-400">
              <Link 
                to="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-300"
              >
                <FaInstagram className="hover:text-pink-500 transition duration-300" />
              </Link>
              <Link to="#" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="hover:text-blue-500 transition duration-300" />
              </Link>
              <Link to="" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="hover:text-red-500 transition duration-300" />
              </Link>
            </div>

            <p className="text-gray-400">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-medium">
                Omni<span className="text-main">Globex</span>
              </span>
              <span className="text-gray-500"> · All rights reserved</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
