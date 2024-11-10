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
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BuyersNavBar onMenuClick={toggleSidebar} />

      <div className="flex h-[calc(100vh-64px)] pt-16">
       
        <aside className="hidden lg:block w-64 xl:w-[280px] flex-shrink-0">
          <SideBar isOpen={false} toggleSidebar={toggleSidebar} />
        </aside>

        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
          >
            <div
              className="w-64 sm:w-[280px] h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
          </div>
        )}
        <main className="pt-[60px] lg:pt-0 w-full h-[calc(100vh-10)]">
          <div
            className={`
              transition-all duration-300 ease-in-out
              ${isSidebarOpen ? "lg:ml-0" : "lg:ml-0"}
            `}
          >
            <ProtectedRoute
              isAuthenticated={!!profile}
              userRole={profile?.roles || []}
              requiredRoles={["Buyer"]}
            >
              <Outlet />
            </ProtectedRoute>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
