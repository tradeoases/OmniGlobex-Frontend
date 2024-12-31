import React from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { LuChevronRight } from "react-icons/lu";

import { useRecoilState } from "recoil";
import {
  DashboardMenuStore,
  DashboardSideMenuStore,
} from "@/store/side-menu-store";
import { TActiveMenu, dashboardNavs } from "@/data/data";

export interface ICategory {
  name: string;
  icon: JSX.Element;
}

export const DashboardSideMenu = () => {
  const [sidemenu, setSidemenu] = useRecoilState<boolean>(
    DashboardSideMenuStore
  );
  const [activeMenu, setActiveMenu] =
    useRecoilState<TActiveMenu>(DashboardMenuStore);

  const onClose = () => {
    setSidemenu(false);
  };

  return (
    <div
      className={`lg:hidden overflow-hidden w-[100vw] h-full bg-black/45 fixed left-0 top-0 bottom-0 z-20 transition-transform duration-400 ease-in-out ${
        sidemenu ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className={`lg:hidden w-[70vw] md:w-[40vw] h-full fixed left-0 top-0 bottom-0 bg-white z-50 space-y-10 transition-transform duration-300 ${
          sidemenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 pb-0">
          <div className="flex items-center gap-4"></div>
          <span
            onClick={onClose}
            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
          >
            <HiOutlineXMark className="text-xl text-gray-300" />
          </span>
        </div>

        <SideMenuContents
          menu={activeMenu}
          setMenu={setActiveMenu}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

interface IMenuProps {
  setMenu?: (menu: TActiveMenu) => void;
  name: TActiveMenu;
  icon: JSX.Element;
  menu: TActiveMenu;
  onClose: () => void;
}
const MenuItem: React.FC<IMenuProps> = ({
  icon,
  name,
  setMenu = () => {},
  menu,
  onClose,
}) => {
  const handleClose = () => {
    setMenu(name);
    onClose();
  };

  return (
    <div
      onClick={handleClose}
      className={`flex items-center justify-between px-6 py-3 ${
        menu === name ? " hover:bg-main " : ""
      }`}
    >
      <div className="flex items-center gap-x-4">
        <span className="text-lg text-gray-700">{icon}</span>
        <span className="text-sm">{name}</span>
      </div>
      <LuChevronRight className="text-base" />
    </div>
  );
};

interface IContentProps {
  setMenu: (menu: TActiveMenu) => void;
  menu: TActiveMenu;
  onClose: () => void;
}
const SideMenuContents: React.FC<IContentProps> = ({
  setMenu,
  menu,
  onClose,
}) => {
  return (
    <div className="w-full">
      {dashboardNavs.map((nav, i) => (
        <MenuItem
          key={i}
          {...{ name: nav.title, icon: nav.icon }}
          setMenu={setMenu}
          menu={menu}
          onClose={onClose}
        />
      ))}
    </div>
  );
};
