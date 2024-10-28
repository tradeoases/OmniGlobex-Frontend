import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { IDashboardNav, dashboardNavs } from "@/data/data";
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
  const [navigations] = useState<IDashboardNav[]>(dashboardNavs);
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
    <div className="flex min-h-screen flex-col lg:flex-row w-full">
      <SupplierNavBar />
      <div>
        <div className="fixed lg:hidden top-0 p-4 bg-white left-0 w-full z-50 shadow flex justify-between">
          <button onClick={toggleSidebar} className="text-xl">
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

        <div
          ref={sidebarRef}
          className={`lg:block bg-gray-600 overflow-y-auto flex flex-col justify-start items-start text-xl lg:static fixed top-0 left-0 z-40 w-64 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 h-screen lg:h-screen pt-16`}
        >
          <div className="absolute top-4 right-4 lg:hidden">
            <button onClick={toggleSidebar} className="text-xl">
              <FaTimes />
            </button>
          </div>
          <div className="w-full px-4 py-4">
            <div>
              <SelectShowroom />
            </div>
          </div>
          {/* <SelectShowroom /> */}
          {navigations.map((nav) => (
            <div key={nav.path}>
              <NavLink
                to={nav.path || "#"}
                className={() =>
                  `flex items-center text-sm gap-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ease-in-out ${
                    activeItem === nav.path
                      ? "bg-gray-700 text-white" 
                      : "text-white hover:bg-gray-600 hover:text-main"
                  }`
                }
                onClick={() => handleNavClick(nav.title, nav.path)} 
              >
                <span>{nav.icon}</span>
                <span>{nav.title}</span>
                {nav.submenu && (
                  <span className="ml-auto">
                    <FaChevronDown />
                  </span>
                )}
              </NavLink>

              {nav.title === "Settings" && settingsSubMenuOpen && nav.submenu && (
                <div className="ml-4"> {/* Control the margin for submenu items */}
                  {nav.submenu.map((subItem) => (
                    <NavLink
                      to={subItem.path}
                      key={subItem.path}
                      className={() =>
                        `flex items-center text-white gap-x-3 text-sm px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out ${
                          activeItem === subItem.path
                            ? "bg-gray-700 text-white" // Active submenu item style
                            : "text-gray-400 hover:bg-gray-500 hover:text-white"
                        }`
                      }
                      onClick={() => {
                        setIsSidebarOpen(false); // Close sidebar when clicking submenu item
                        setActiveItem(subItem.path); // Set the active submenu item
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

      <div className="mt-14 w-full p-4">
        <ProtectedRoute
          isAuthenticated={!!profile}
          userRole={profile?.roles || []}
          requiredRoles={["Supplier"]}
        >
          <Outlet />
        </ProtectedRoute>
      </div>
    </div>
  );
};

export default SuppliersDashboard;
