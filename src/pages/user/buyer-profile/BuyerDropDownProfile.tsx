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
        className="flex items-center px-4 py-2 rounded-md focus:outline-none"
      >
        <FaUserCircle size={25} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 text-sm bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="py-1">
            <div className="relative">
              <button
                onClick={toggleAccountDropdown}
                className="flex items-center text-sm gap-14 px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                My Account
                <ChevronRightIcon size={20} />
              </button>

              {isAccountOpen && (
                <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link
                    to="/buyer-dashboard/myAccount/preferences"
                    onClick={handleItemClick}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    My Favorites
                  </Link>
                  <Link
                    to="/buyer-dashboard/myAccount/preferences"
                    onClick={handleItemClick}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Sourcing Preferences
                  </Link>
                  <Link
                    to="/buyer-dashboard/myAccount/profile"
                    onClick={handleItemClick}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    User Profile
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/buyer-dashboard/messages"
              onClick={handleItemClick}
              className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100"
            >
              Messages
            </Link>

            <span
              onClick={handleLogout}
              className="block px-4 py-2 text-gray-700 text-sm cursor-pointer hover:bg-gray-100"
            >
              Logout
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
