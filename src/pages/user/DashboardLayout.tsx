import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className=" w-full">
      {/* Sticky navigation bar */}
      <div className="flex items-center w-full justify-center p-4 shadow-lg sticky top-0 z-50">
        <NavLink
          to="/dashboard"
          className="mx-4 transition-colors duration-300"
        >
          Personal Info
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
