import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { dashboardNavs } from "@/data/data";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import SupplierNavBar from "./supplier-profile/SupplierNavBar";
import { Logo } from "@/components/logo";
import { useRecoilState } from "recoil";
import { userStore } from "@/store/user-store";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { SelectShowroom } from "@/components/select-show-room";
import { SupplierDropDownProfile } from "./supplier-profile/SupplierDropDownProfile";

const SuppliersDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [settingsSubMenuOpen, setSettingsSubMenuOpen] = useState<boolean>(false); 
  const [activeItem, setActiveItem] = useState<string | null>(null); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsProfileOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
      setSettingsSubMenuOpen(false);
      setIsProfileOpen(false);
    }
  };

  const [profile] = useRecoilState(userStore);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (navTitle: string, navPath: string) => {
    if (navTitle === "Settings") {
      setSettingsSubMenuOpen(!settingsSubMenuOpen); 
    } else {
      setSettingsSubMenuOpen(false); 
      setIsSidebarOpen(false); 
    }
    setActiveItem(navPath);
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row w-full bg-gray-50">
      <SupplierNavBar />
      <div className="lg:flex flex-1">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`lg:block bg-gradient-to-b from-gray-800 to-gray-900 overflow-y-auto flex flex-col justify-start items-start text-xl fixed lg:sticky top-0 left-0 z-40 w-72 h-screen shadow-xl transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          {/* Close button */}
          <div className="absolute top-4 right-4 lg:hidden">
            <button onClick={toggleSidebar} className="text-gray-400 hover:text-white transition-colors">
              <FaTimes />
            </button>
          </div>

          {/* Showroom selector */}
          <div className="w-full px-6 py-20 border-b border-gray-700">
            <SelectShowroom />
          </div>
          
          {/* Navigation Items */}
          <div className="w-full overflow-y-auto py-4">
            {dashboardNavs.map((nav) => (
              <div key={nav.path} className="px-4 mb-1">
                <NavLink
                  to={nav.path || "#"}
                  className={() =>
                    `flex items-center text-sm gap-x-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out ${
                      activeItem === nav.path
                        ? "bg-gray-700/50 text-white font-medium shadow-sm" 
                        : "text-gray-300 hover:bg-gray-700/30 hover:text-white"
                    }`
                  }
                  onClick={() => handleNavClick(nav.title, nav.path)} 
                >
                  <span className="text-lg">{nav.icon}</span>
                  <span>{nav.title}</span>
                  {nav.submenu && (
                    <span className={`ml-auto transition-transform duration-200 ${settingsSubMenuOpen ? 'rotate-180' : ''}`}>
                      <FaChevronDown />
                    </span>
                  )}
                </NavLink>

                {/* Submenu */}
                {nav.title === "Settings" && settingsSubMenuOpen && nav.submenu && (
                  <div className="ml-4 mt-1 space-y-1">
                    {nav.submenu.map((subItem) => (
                      <NavLink
                        to={subItem.path}
                        key={subItem.path}
                        className={() =>
                          `flex items-center gap-x-3 text-sm px-4 py-2.5 rounded-lg transition-all duration-200 ease-in-out ${
                            activeItem === subItem.path
                              ? "bg-gray-700/50 text-white font-medium"
                              : "text-gray-400 hover:bg-gray-700/30 hover:text-white"
                          }`
                        }
                        onClick={() => {
                          setIsSidebarOpen(false);
                          setActiveItem(subItem.path);
                        }}
                      >
                        <span>{subItem.title}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 relative pb-20">
          {/* Mobile Header */}
          <div className="fixed lg:hidden top-0 p-4 bg-white left-0 w-full z-50 shadow-md flex justify-between items-center">
            <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-900 transition-colors">
              <FaBars />
            </button>
            <NavLink to="/" className="text-2xl font-bold text-black">
              <Logo />
            </NavLink>
            <div ref={dropdownRef}>
              <SupplierDropDownProfile 
                isOpen={isProfileOpen}
                setIsOpen={(open) => {
                  setIsProfileOpen(open);
                  if (open) setIsSidebarOpen(false);
                }}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:p-8 p-4 mt-16 lg:mt-0">
            <ProtectedRoute
              isAuthenticated={!!profile}
              userRole={profile?.roles || []}
              requiredRoles={["Supplier"]}
            >
              <Outlet />
            </ProtectedRoute>
          </div>

          {/* Save Changes Button */}
          
        </div>
      </div>
    </div>
  );
};

export default SuppliersDashboard;
