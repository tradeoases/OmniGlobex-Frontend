import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import BuyersNavBar from "./BuyersNavBar";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { userStore } from "@/store/user-store";

const BuyerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profile = useRecoilValue(userStore);
  
  // Close sidebar when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BuyersNavBar onMenuClick={toggleSidebar} />
      
      <div className="flex h-[calc(100vh-64px)] pt-16">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 xl:w-[280px] flex-shrink-0">
          <SideBar isOpen={false} toggleSidebar={toggleSidebar} />
        </aside>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
          >
            <div 
              className="w-64 sm:w-[280px] h-full"
              onClick={e => e.stopPropagation()}
            >
              <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          <div 
            className={`
              h-full
              transition-all duration-300 ease-in-out
              ${isSidebarOpen ? 'lg:ml-0' : 'lg:ml-0'}
            `}
          >
            <div className="container mx-auto px-4 py-8 max-w-screen">
              <ProtectedRoute
                isAuthenticated={!!profile}
                userRole={profile?.roles || []}
                requiredRoles={["Buyer"]}
              >
                <div className="
                  bg-white 
                  rounded-xl 
                  shadow-sm 
                  p-6 
                  max-h-[calc(100vh-180px)]
                  border border-gray-100
                ">
                  <Outlet />
                </div>
              </ProtectedRoute>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
