import React, { useState, useEffect, useRef } from "react";
import { HiArrowPath, HiOutlineXMark } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { LuChevronRight } from "react-icons/lu";
import { RiSearchLine } from "react-icons/ri";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IMainMenu, mainMenu } from "@/data/data";
import { Link, NavLink } from "react-router-dom";
import { SidemenuStore } from "@/store/side-menu-store";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, HttpStatusCode } from "axios";
import {
  getAllProductCategories,
  IProductCategory,
} from "@/service/apis/product-services";

export interface ICategory {
  name: string;
  category_id: string;
}

const Sidemenu = () => {
  const [menu, setMenu] = useState<number>(1);
  const [sidemenu, setSidemenu] = useRecoilState<boolean>(SidemenuStore);

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const onClose = () => {
    setSidemenu(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    // Prevent body scroll when sidemenu is open
    if (sidemenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      // Reset body scroll on unmount
      document.body.style.overflow = 'unset';
    };
  }, [sidemenu]); // Add sidemenu to dependency array

  return (
    <div
      className={`lg:hidden overflow-hidden w-[100vw] h-[100vh] bg-black/45 fixed left-0 top-0 bottom-0 z-20 transition-transform duration-400 ease-in-out ${
        sidemenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        ref={sidebarRef}
        className={`lg:hidden w-[70vw] md:w-[40vw] h-full fixed left-0 top-0 bottom-0 bg-white z-50 flex flex-col transition-transform duration-300 ${
          sidemenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Fixed Header Section */}
        <div className="flex flex-col space-y-10">
          <div className="flex items-center justify-between p-6 pb-0">
            <div className="flex items-center gap-4">
              <p className="relative">
                <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
                  2
                </span>
                <HiArrowPath className="text-xl" />
              </p>

              <p className="relative">
                <span className="bg-main w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
                  9
                </span>
                <IoIosHeartEmpty className="text-xl" />
              </p>
            </div>
            <span
              onClick={onClose}
              className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
            >
              <HiOutlineXMark className="text-xl text-gray-300" />
            </span>
          </div>

          <div className="px-6 w-full">
            <div className="grid grid-cols-12 border">
              <div className="col-span-9">
                <input
                  type="text"
                  className="pl-2 py-2 text-xs outline-none"
                  placeholder="Search Product..."
                />
              </div>
              <div className="bg-main flex items-center justify-center col-span-3 py-2 px-3">
                <p className="font-bold text-sm">
                  <RiSearchLine />
                </p>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-center gap-x-2">
            <button
              onClick={() => setMenu(1)}
              type="button"
              className={`text-base font-medium ${
                menu === 1 ? "text-black" : "text-gray-500"
              }`}
            >
              Categories
            </button>
            <div className="h-4 w-[1.5px] bg-slate-800" />
            <button
              onClick={() => setMenu(2)}
              type="button"
              className={`text-base font-medium ${
                menu === 2 ? "text-black" : "text-gray-500"
              }`}
            >
              Main Menu
            </button>
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto">
          {menu === 1 && <SideMenuCategories />}
          {menu === 2 && <MainMenu />}
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;

const MenuItem: React.FC<ICategory> = ({ category_id, name }) => {
  const setSidemenu = useSetRecoilState<boolean>(SidemenuStore);

  const onClose = () => {
    setSidemenu(false);
  };
  return (
    <NavLink
      to={`products?category=${category_id}`}
      onClick={onClose}
      className="flex items-center justify-between px-6 py-3 hover:bg-main"
    >
      <div className="flex items-center gap-x-4">
        <span className="text-sm">{name}</span>
      </div>
      <LuChevronRight className="text-base" />
    </NavLink>
  );
};

const SideMenuCategories = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProductCategories();

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as IProductCategory[];
      }
    },
  });

  return (
    <div className="w-full">
      {categories?.map((cat, i) => (
        <MenuItem key={i} {...cat} />
      ))}
    </div>
  );
};

const MainMenuItem: React.FC<IMainMenu> = ({ name, route }) => {
  const setSidemenu = useSetRecoilState<boolean>(SidemenuStore);

  const onClose = () => {
    setSidemenu(false);
  };
  return (
    <Link
      to={route}
      onClick={onClose}
      className="flex items-center justify-between px-6 py-3 hover:bg-main"
    >
      <span className="text-sm">{name}</span>
      <LuChevronRight className="text-base" />
    </Link>
  );
};

const MainMenu = () => {
  return (
    <div className="w-full">
      {mainMenu.map((menu, i) => (
        <React.Fragment key={i}>
          <MainMenuItem {...menu} />
          {menu.subMenu && (
            <div className="ml-7">
              {menu.subMenu.map((nav, j) => (
                <MainMenuItem key={j} {...nav} />
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
