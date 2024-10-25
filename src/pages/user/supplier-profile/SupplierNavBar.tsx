/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Navbar.tsx
import { Logo } from "@/components/logo";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { SupplierDropDownProfile } from "./SupplierDropDownProfile";

const SupplierNavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-black">
              <Logo />
            </NavLink>

            <p className="text-2xl font-semibold pl-6">Supplier Center</p>
            <Link
              className="border  px-2 py-1 ml-6 rounded-full cursor-pointerbg-white text-main  border-main hover:bg-main hover:text-white transition duration-300 shadow-md hover:shadow-lg "
              to="/buyer-dashboard"
            >
              Switch to Buyer
            </Link>
          </div>
          <div className="relative flex justify-end items-center">
            <SupplierDropDownProfile />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SupplierNavBar;
