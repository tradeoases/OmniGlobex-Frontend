import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import BuyersNavBar from "./BuyersNavBar";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { useRecoilState } from "recoil";
import { userStore } from "@/store/user-store";
import BuyersFooter from "./BuyersFooter";

const BuyerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profile] = useRecoilState(userStore);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen max-h-screen">
      <BuyersNavBar />

      <div className="relative flex flex-1 overflow-hidden">
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div
          className={`flex flex-col flex-1 transition-all duration-300 bg-white`}
        >
          <main className="flex-1 w-full overflow-y-auto">
            <ProtectedRoute
              isAuthenticated={!!profile}
              userRole={profile?.roles || []}
              requiredRoles={["Buyer", 'Supplier']}
            >
              <Outlet />
            </ProtectedRoute>
          </main>

          <div className="hidden md:block">
            <BuyersFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
