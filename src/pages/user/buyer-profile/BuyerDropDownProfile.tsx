import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { ChevronRightIcon } from "lucide-react";

export function BuyerDropDownProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleAccountDropdown = () => setIsAccountOpen(!isAccountOpen);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/");
    navigate(0);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    setIsAccountOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FaUserCircle className="text-gray-600 hover:text-gray-800" size={25} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
          <div className="py-1">
            <div className="relative">
              <button
                onClick={toggleAccountDropdown}
                className="w-full flex items-center justify-between px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
              >
                <span className="font-medium">My Account</span>
                <ChevronRightIcon size={18} className={`transform transition-transform duration-200 ${isAccountOpen ? 'rotate-90' : ''}`} />
              </button>

              {isAccountOpen && (
                <div className="bg-gray-50 border-t border-b border-gray-100">
                  <Link
                    to="/buyer-dashboard/myAccount/favorites"
                    onClick={handleItemClick}
                    className="block px-8 py-2.5 text-gray-600 hover:bg-gray-100 transition-colors duration-150"
                  >
                    My Favorites
                  </Link>
                  <Link
                    to="/buyer-dashboard/myAccount/preferences"
                    onClick={handleItemClick}
                    className="block px-8 py-2.5 text-gray-600 hover:bg-gray-100 transition-colors duration-150"
                  >
                    Sourcing Preferences
                  </Link>
                  <Link
                    to="/buyer-dashboard/myAccount/profile"
                    onClick={handleItemClick}
                    className="block px-8 py-2.5 text-gray-600 hover:bg-gray-100 transition-colors duration-150"
                  >
                    User Profile
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/buyer-dashboard/messages"
              onClick={handleItemClick}
              className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-150"
            >
              Messages
            </Link>

            <span
              onClick={handleLogout}
              className="block px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
            >
              Logout
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
