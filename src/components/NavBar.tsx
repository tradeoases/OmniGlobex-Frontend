/* eslint-disable react-hooks/exhaustive-deps */
import {  CiUser } from "react-icons/ci";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { SlHandbag } from "react-icons/sl";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { IUser, userStore } from "@/store/user-store";
import { Button } from "./ui/button";
import { Tooltip } from "react-tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { HeaderCartNav } from "./header-cart-nav";
import { navs } from "@/data/data";
import { NavBarPagesItem } from "./navbar-page-item";
import { useTranslation } from "react-i18next";
import { FaUserCircle } from "react-icons/fa";

const Badge = ({ count }: { count: number }) => (
  <span className="bg-white w-4 h-4 rounded-full text-xs hover:bg-yellow-700 flex items-center justify-center absolute -top-3 -right-2">
    {count}
  </span>
);

const NavBar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthenticating =
    location.pathname === "/signup" || location.pathname === "/signin";
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState<IUser | null>(userStore);

  

  

  return (
    <div className="hidden lg:block w-full border-b py-2 bg-main">
      <div className="w-10/12 xl:w-10/12 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-x-6 font-semibold text-sm relative">
          
         

          {/* Navigation Links for Desktop */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10 relative -bottom-1 flex-1">
            {navs.map((nav, i) =>
              nav.title === "Pages" ? (
                <NavBarPagesItem key={i} />
              ) : (
                <NavLink
                  to={nav.route}
                  key={i}
                  className={({ isActive }) =>
                    `flex cursor-pointer items-center gap-x-2 ${
                      isActive
                        ? "text-yellow-700 font-bold border-b-2 border-yellow-700"
                        : ""
                    }`
                  }
                >
                  <span className="whitespace-nowrap">{t(nav.title)}</span>{" "}
                  {/* Translate title */}
                  {nav.icon}
                </NavLink>
              )
            )}
          </div>
        </div>

        {/* User Icons, Cart, Notifications */}
        <div className="flex items-center gap-x-8 text-xl">
          {userData && (
            <Link to="/cart" aria-label={t("View Cart")} className="relative">
              <Badge count={0} />
              <SlHandbag
                className="text-sm text-white"
                data-tooltip-id="cartTooltip"
                data-tooltip-content={t("View Cart")}
              />
              <Tooltip id="cartTooltip" place="top" />
            </Link>
          )}
          {userData && (
            <Link to="/wishlist" className="relative">
              <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
                <Badge count={0} />
                <IoIosNotificationsOutline
                  className="text-3xl text-white"
                  data-tooltip-id="notificationTooltip"
                  data-tooltip-content={t("Notifications")}
                />
              </span>
              <Tooltip id="notificationTooltip" />
            </Link>
          )}

          {userData && <HeaderCartNav />}
          {!userData && !isAuthenticating && (
            <div
              className={` to-yellow-700 text-black py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-gradient-to-l hover:shadow-lg transition-transform hover:scale-105`}
            >
              <NavLink to="/signin">
                <FaUserCircle className="text-4xl text-gray-700 cursor-pointer transition duration-300" />
              </NavLink>
            </div>
          )}
          {userData && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="p-0 m-0">
                  <CiUser className="text-2xl" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-fit">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => navigate(`/buyer-dashboard`)}
                  >
                    {userData.business_name}
                  </DropdownMenuItem>

                  {userData.roles.includes("Buyer") && (
                    <DropdownMenuItem
                      onClick={() => navigate(`/buyer-dashboard/myAccount/profile`)}
                    >
                      Buyer Dashboard
                    </DropdownMenuItem>
                  )}

                  {userData.roles.includes("Supplier") && (
                    <DropdownMenuItem
                      onClick={() => navigate(`/supplier-dashboard/supplier-profile`)}
                    >
                      Manage supplies
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                    onClick={() => navigate(`/buyer-dashboard/messages`)}
                  >
                    Message
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      setUserData(null);
                      localStorage.removeItem("token");
                      localStorage.removeItem("profile");
                      // navigate('/')
                      navigate(0);
                    }}
                  >
                    {t("Logout")} {/* Translate logout */}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-main w-full px-6 py-4 flex flex-col gap-y-4">
          {navs.map((nav, i) =>
            nav.title === "Pages" ? (
              <NavBarPagesItem key={i} />
            ) : (
              <NavLink
                to={nav.route}
                key={i}
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-lg"
              >
                {t(nav.title)}
              </NavLink>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
