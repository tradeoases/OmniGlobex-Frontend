import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import img from "../../../assets/omniGlobexlogo.png";
import { BuyerDropDownProfile } from "./BuyerDropDownProfile";

interface BuyersNavBarProps {
  onMenuClick: () => void;
}

const BuyersNavBar: React.FC<BuyersNavBarProps> = ({ onMenuClick }) => {
  return (
    <nav className="bg-white shadow-lg z-50 fixed top-0 left-0 right-0 border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <Link to="/" className="flex items-center space-x-3">
              <img src={img} alt="Omniglobex logo" className="h-10 w-auto" />
              <Logo />
            </Link>

            <div className="hidden lg:block ml-6 text-xl font-semibold">
              Buyer Center
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/supplier-dashboard">
                <button className="text-sm bg-white text-main border-2 border-main px-4 py-2 rounded-full hover:bg-main hover:text-white transition-all duration-300">
                  Start Selling Now
                </button>
              </Link>

              <Link to="/buyer-dashboard/messages">
                <button className="text-sm text-gray-600 hover:text-main px-3 py-2 rounded-full transition-colors">
                  Messages
                </button>
              </Link>

              <Link to="/buyer-dashboard/rfq">
                <button className="text-sm text-gray-600 hover:text-main px-3 py-2 rounded-full transition-colors">
                  Request for Quotations
                </button>
              </Link>
            </div>

            <BuyerDropDownProfile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BuyersNavBar;
