import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "./constants";
import {  FaChevronDown } from "react-icons/fa";
import { SelectShowroom } from "@/components/select-show-room";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// ... existing code ...

const SideBar: React.FC<SideBarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      isOpen
    ) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    navigate("/");
    navigate(0);
  };

  const handleMenuItemClick = (path: string) => {
    if (path === "logout") {
      handleLogout();
      return;
    }
    navigate(path);
    toggleSidebar();
  };

  const toggleSubmenu = (title: string) => {
    if (openSubmenu === title) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(title);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div
        ref={sidebarRef}
        className={`
          fixed lg:sticky top-0 
          h-screen lg:h-[calc(100vh-64px)]
          w-[280px] lg:w-64
          z-50 lg:z-30
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          transition-transform duration-300 ease-in-out
          bg-gray-800
          shadow-xl lg:shadow-none
          pt-16 lg:pt-4
          flex flex-col
        `}
      >
        {/* ShowRoom Selector */}
        <div className="px-4 py-2">
          <SelectShowroom />
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <nav className="space-y-1 mb-16">
            <ul className="space-y-1">
              {menuItems.map(({ title, path, icon, submenu, className }) => (
                <li key={title}>
                  <div
                    className={`
                      flex items-center justify-between
                      p-3 rounded-lg
                      cursor-pointer
                      text-gray-300 hover:text-white
                      hover:bg-gray-700
                      transition-all duration-200
                      ${
                        location.pathname === path
                          ? "bg-gray-700 text-white"
                          : ""
                      }
                      ${className || ""}
                    `}
                    onClick={() =>
                      submenu
                        ? toggleSubmenu(title)
                        : handleMenuItemClick(path || "")
                    }
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{icon}</span>
                      <span className="font-medium">{title}</span>
                    </div>
                    {submenu && (
                      <FaChevronDown
                        className={`transition-transform duration-200 ${
                          openSubmenu === title ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>

                  {submenu && openSubmenu === title && (
                    <ul className="mt-1 ml-8 space-y-1">
                      {submenu.map((subItem) => (
                        <li
                          key={subItem.title}
                          onClick={() => handleMenuItemClick(subItem.path)}
                          className={`
                            py-2 px-3 rounded-md
                            text-gray-400 hover:text-white
                            hover:bg-gray-700
                            cursor-pointer
                            transition-colors duration-200
                            flex items-center gap-2
                            ${
                              subItem.path === "logout"
                                ? "text-gray-800 hover:text-red-300 hover:bg-gray-700/50"
                                : "text-gray-400 hover:text-white hover:bg-gray-700"
                            }
                            ${
                              location.pathname === subItem.path
                                ? "bg-gray-700 text-white"
                                : ""
                            }
                          `}
                        >
                          {/* Remove icon since it doesn't exist in the type */}
                          <span>{subItem.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;
