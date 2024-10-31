// import { useState } from "react";

import { productNavs } from "@/data/data";
// import { AddProductModal } from "../components/add-product-modal";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

interface ProductProps {}

export const ProductManagement: React.FC<ProductProps> = () => {
  // const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  return (
    <div className="w-full col-span-3">
      {/* {openCreateModal && (
        <AddProductModal />
      )} */}
      <div className="w-full  space-y-6 lg:p-8 rounded-xl  border-black">
        <div className="border-b w-full">
          <div className="w-10/12 xl:w-8/12 mx-auto flex items-center">
            {productNavs.map((nav) => (
              <NavLink
                to={nav.route}
                end={nav.route === ""}
                key={nav.route}
                className={({ isActive }) =>
                  `py-3 text-xs px-2 whitespace-nowrap md:px-7 border-b cursor-pointer ${
                    isActive ? "border-main border-b-2" : "border-transparent"
                  }`
                }
              >
                {nav.name}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
