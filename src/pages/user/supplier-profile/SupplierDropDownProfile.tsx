import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

interface SupplierDropDownProfileProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function SupplierDropDownProfile(props: SupplierDropDownProfileProps) {
  const [openSubmenu, setOpenSubmenu] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => props.setIsOpen(!props.isOpen);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    props.setIsOpen(false);
    navigate("/");
    navigate(0);
  };

  const handleItemClick = () => {
    props.setIsOpen(false);
    setOpenSubmenu("");
  };

  const toggleSubmenu = (submenu: string) => {
    setOpenSubmenu(openSubmenu === submenu ? "" : submenu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        props.setIsOpen(false);
        setOpenSubmenu("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const DropdownItem = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <Link
      to={to}
      onClick={handleItemClick}
      className="block px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors duration-150"
    >
      {children}
    </Link>
  );

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FaUserCircle className="text-gray-600 hover:text-gray-800" size={25} />
      </button>

      {props.isOpen && (
        <div className="absolute right-0 mt-2 w-56 text-sm bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
          <div className="py-1">
            <button
              onClick={() => toggleSubmenu("account")}
              className="flex items-center justify-between w-full px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-50"
            >
              <span className="font-medium">My Account</span>
              <ChevronRightIcon className={`transform transition-transform duration-200 ${openSubmenu === "account" ? "rotate-90" : ""}`} />
            </button>
            {openSubmenu === "account" && (
              <div className="py-1 mx-2 my-1 bg-gray-50 rounded-md">
                <DropdownItem to="users">Users</DropdownItem>
                <DropdownItem to="supplier-profile">My Profile</DropdownItem>
              </div>
            )}

            <button
              onClick={() => toggleSubmenu("settings")}
              className="flex items-center justify-between w-full px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-50"
            >
              <span className="font-medium">Settings</span>
              <ChevronRightIcon className={`transform transition-transform duration-200 ${openSubmenu === "settings" ? "rotate-90" : ""}`} />
            </button>
            {openSubmenu === "settings" && (
              <div className="py-1 mx-2 my-1 bg-gray-50 rounded-md">
                <DropdownItem to="security-settings">Security Settings</DropdownItem>
                <DropdownItem to="change-password">Change Password</DropdownItem>
              </div>
            )}

            <DropdownItem to="/supplier-dashboard/messages">Messages</DropdownItem>

            <div className="border-t border-gray-200 mt-1">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 hover:bg-gray-50  transition-colors duration-150"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
