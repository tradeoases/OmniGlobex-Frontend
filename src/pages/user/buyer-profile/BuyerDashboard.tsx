import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
import BuyersNavBar from "./BuyersNavBar";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoutes";
import { useRecoilState } from "recoil";
import { userStore } from "@/store/user-store";

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

        <main className="flex-1 w-full overflow-y-auto bg-gray-50">
          <ProtectedRoute
            isAuthenticated={!!profile}
            userRole={profile?.roles || []}
            requiredRoles={["Buyer"]}
          >
            <div className="p-4">
              <Outlet />
            </div>
          </ProtectedRoute>
        </main>
      </div>
    </div>
  );
};

export default BuyerDashboard;
