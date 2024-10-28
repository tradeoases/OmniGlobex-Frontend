import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuItems } from "./constants";
import { FaBars, FaSignOutAlt, FaTimes, FaChevronDown } from "react-icons/fa";
import { SelectShowroom } from "@/components/select-show-room";

const SideBar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      if (isOpen) toggleSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    navigate("/");
    navigate(0);
  };

  const handleMenuItemClick = (path: string) => {
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
    <div className="h-full">
      {/* Mobile Toggle Button */}
      <div className="flex justify-between items-center p-4 md:hidden">
        <button
          className="text-gray-600 focus:outline-none"
          onClick={toggleSidebar}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-gray-600 text-white z-50 transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 ease-in-out 
          md:translate-x-0 md:static md:h-full
          overflow-y-auto`}
        style={{
          top: "64px", // Adjust this value based on your navbar height
          height: "calc(100vh - 64px)",
        }}
      >
        <div className="p-4">
          <div className="text-gray-700 mb-4">
            <SelectShowroom />
          </div>

          <ul className="space-y-2">
            {menuItems.map(({ title, path, icon, submenu }) => {
              const isActive = location.pathname.startsWith(path || "");

              return (
                <li key={title} className="my-2">
                  <div
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors duration-200`}
                    onClick={() =>
                      submenu ? toggleSubmenu(title) : handleMenuItemClick(path || "")
                    }
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{icon}</span>
                      {/* Only render a Link if the path exists */}
                      {path ? (
                        <Link
                          to={path || ""}
                          className={`flex-grow text-white hover:text-main ${
                            isActive ? "text-main" : ""
                          }`}
                        >
                          {title}
                        </Link>
                      ) : (
                        <span
                          className={`flex-grow text-white ${
                            openSubmenu === title ? "text-main" : ""
                          }`}
                        >
                          {title}
                        </span>
                      )}
                    </div>
                    {/* If submenu exists, add a dropdown icon */}
                    {submenu && (
                      <FaChevronDown
                        className={`transition-transform ${
                          openSubmenu === title ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
                  
                  {/* Submenu */}
                  {submenu && openSubmenu === title && (
                    <ul className="pl-6">
                      {submenu.map((subItem) => (
                        <li
                          key={subItem.title}
                          className="my-1 cursor-pointer hover:text-main"
                          onClick={() => handleMenuItemClick(subItem.path)}
                        >
                          {subItem.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
            <div onClick={handleLogout} className="flex gap-2 cursor-pointer mt-4">
              <FaSignOutAlt className="ml-2 mt-2" />
              <span className="hover:text-main">Log out</span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
