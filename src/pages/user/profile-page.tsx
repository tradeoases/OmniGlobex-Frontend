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
  const [settingsSubMenuOpen, setSettingsSubMenuOpen] =
    useState<boolean>(false);
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
    <div className="flex min-h-screen flex-col lg:flex-row w-full bg-gray-50 overflow-hidden">
      <SupplierNavBar />
      <div className="lg:flex flex-1 overflow-hidden">
        {/* Sidebar - Updated width and responsive classes */}
        <div
          ref={sidebarRef}
          className={`lg:block bg-gradient-to-b from-gray-800 to-gray-900 fixed lg:sticky top-0 left-0 z-40 w-[85%] sm:w-80 lg:w-72 h-screen lg:h-[100vh] transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          {/* Sidebar Content Wrapper */}
          <div className="h-full flex flex-col">
            {/* Close button - Always visible */}
            <div className="sticky top-0 right-4 pt-4 px-4 lg:hidden bg-gradient-to-b from-gray-800 to-gray-800/95 z-10">
              <button
                onClick={toggleSidebar}
                className="ml-auto block p-2 text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Showroom selector - Always visible */}
            {/* Profile section - Updated padding and spacing */}
            <div className="w-full px-4 sm:px-6 py-4 bg-gradient-to-b from-gray-800 to-gray-800/95">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
                  Dashboard
                </h2>
                <button 
                  onClick={toggleSidebar}
                  className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>
              <div className="mb-2 sm:mb-3 md:mb-4">
                <div className="h-[1px] sm:h-[2px] bg-gradient-to-r from-gray-700 to-transparent w-full"></div>
              </div>
              <div className="flex items-center gap-x-3 sm:gap-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700 flex-shrink-0">
                  {profile?.profileImages?.find(
                    (pi) => pi.image_for === "PROFILE"
                  )?.image_url && (
                    <img
                      src={
                        profile.profileImages.find(
                          (pi) => pi.image_for === "PROFILE"
                        )?.image_url
                      }
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-sm sm:text-base font-medium truncate">
                    {profile?.business_name || "Business Name"}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm truncate">
                    {profile?.email || "email@example.com"}
                  </p>
                </div>
              </div>
            </div>
            <div className="sticky top-14 w-full px-6 py-4 bg-gradient-to-b from-gray-800 to-gray-800/95 z-10">
              <SelectShowroom />
            </div>

            {/* Navigation Items - Updated padding and text sizes */}
            <div className="flex-1 overflow-y-auto">
              <div className="py-2 sm:py-4">
                {dashboardNavs.map((nav) => (
                  <div key={nav.path} className="px-2 sm:px-4 mb-1">
                    <NavLink
                      to={nav.path || "#"}
                      className={() =>
                        `flex items-center text-xs sm:text-sm gap-x-2 sm:gap-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 ease-in-out ${
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
                        <span
                          className={`ml-auto transition-transform duration-200 ${
                            settingsSubMenuOpen ? "rotate-180" : ""
                          }`}
                        >
                          <FaChevronDown />
                        </span>
                      )}
                    </NavLink>

                    {/* Submenu - Updated padding and spacing */}
                    {nav.title === "Settings" && settingsSubMenuOpen && nav.submenu && (
                      <div className="ml-3 sm:ml-4 mt-1 space-y-0.5 sm:space-y-1">
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
          </div>
        </div>

        {/* Main Content Area - Updated padding */}
        <div className="flex-1 relative h-screen overflow-y-auto">
          {/* Updated Mobile Header - Updated padding */}
          <div className="fixed lg:hidden top-0 px-2 py-2 sm:px-3 sm:py-2 md:px-4 bg-white left-0 w-full z-50 shadow-md">
            <div className="flex items-center justify-between max-w-[100vw] safe-area-inset-x">
              {/* Left side - Menu button */}
              <button
                onClick={toggleSidebar}
                className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors touch-manipulation"
                aria-label="Toggle menu"
              >
                <FaBars className="w-5 h-5" />
              </button>

              {/* Center - Logo */}
              <NavLink
                to="/"
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="h-8 w-auto">
                  <Logo />
                </div>
              </NavLink>

              {/* Right side - Profile */}
              <div ref={dropdownRef} className="relative">
                <SupplierDropDownProfile
                  isOpen={isProfileOpen}
                  setIsOpen={(open) => {
                    setIsProfileOpen(open);
                    if (open) setIsSidebarOpen(false);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Adjust content spacing below header */}
          <div className="pt-[56px] lg:pt-0">
            <div className="p-3 sm:p-4 md:p-6 lg:p-8">
              <ProtectedRoute
                isAuthenticated={!!profile}
                userRole={profile?.roles || []}
                requiredRoles={["Supplier"]}
              >
                <Outlet />
              </ProtectedRoute>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuppliersDashboard;
