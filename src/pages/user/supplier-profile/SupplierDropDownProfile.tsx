import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

export function SupplierDropDownProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    setIsOpen(false);
    navigate("/");
    navigate(0);
  };

  const handleItemClick = () => {
    setIsOpen(false);
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
        setIsOpen(false);
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
      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
    >
      {children}
    </Link>
  );

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
            <button
              onClick={() => toggleSubmenu("account")}
              className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              My Account
              <ChevronRightIcon />
            </button>
            {openSubmenu === "account" && (
              <div className="mt-1 ml-4 bg-white border border-gray-200 rounded-md shadow-lg">
                <DropdownItem to="users">Users</DropdownItem>
                <DropdownItem to="supplier-profile">My Profile</DropdownItem>
              </div>
            )}

            <button
              onClick={() => toggleSubmenu("settings")}
              className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              Settings
              <ChevronRightIcon />
            </button>
            {openSubmenu === "settings" && (
              <div className="mt-1 ml-4 bg-white border border-gray-200 rounded-md shadow-lg">
                <DropdownItem to="security-settings">
                  Security Settings
                </DropdownItem>
                <DropdownItem to="change-password">
                  Change Password
                </DropdownItem>
              </div>
            )}

            <DropdownItem to="/supplier-dashboard/messages">
              Messages
            </DropdownItem>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
