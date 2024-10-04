import { Outlet } from "react-router-dom";
import SideBar from "./Sidebar";

const BuyerDashboard = () => {
  return (
    <div className="flex w-full">
      <SideBar />
      <div className="flex-grow p-4 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default BuyerDashboard;
