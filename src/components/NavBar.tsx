import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import { CiUser } from "react-icons/ci";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { navs } from "@/data/data";
import { NavBarPagesItem } from "./navbar-page-item";
import { Button } from "./ui/button";
import { IoIosHeartEmpty } from "react-icons/io";
import { HeaderCartNav } from "./header-cart-nav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { IUser, userStore } from "@/store/user-store";

const NavBar = () => {
  const location = useLocation();
  const isAuthenticating =
    location.pathname === "/signup" || location.pathname === "/signin";
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState<IUser | null>(userStore);
  useEffect(() => {
    const unparsed = localStorage.getItem("profile");
    if (!unparsed) return;
    const profile = JSON.parse(unparsed);

    setUserData(profile);
  }, []);

  console.log({userData});

  return (
    <div className="hidden lg:block lg:min-h-12 w-full  border-b py-2 bg-main">
      <div className="hidden w-10/12 xl:w-8/12 mx-auto lg:flex items-center justify-between">
        <div className="flex gap-x-6 font-semibold text-sm items-center relative">
          <div className="flex  items-center gap-6 xl:gap-10 relative -bottom-1 flex-1">
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
                  <span className="whitespace-nowrap">{nav.title}</span>
                  {nav.icon && <LuChevronDown />}
                </NavLink>
              )
            )}
          </div>
        </div>
        <div className="flex items-center gap-x-6 text-xl">
          {userData && (
            <Link to="/wishlist" className="relative">
              <span className="bg-white w-5 h-5 rounded-full text-xs flex items-center justify-center absolute -top-2 -right-3">
                9
              </span>
              <IoIosHeartEmpty className="text-2xl text-white" />
            </Link>
          )}

          {userData && <HeaderCartNav />}
          {!userData && !isAuthenticating && (
            <Button
              asChild
              className={`bg-gradient-to-r from-yellow-200 to-yellow-700 text-black py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-gradient-to-l hover:shadow-lg transition-transform hover:scale-105 ${
                isAuthenticating ? "font-bold text-yellow-700" : ""
              }`}
            >
              <NavLink to="/signin">
                <span>SIGNIN/SIGNUP</span> <LuChevronRight />
              </NavLink>
            </Button>
          )}
          {userData && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="p-0 m-0">
                  <CiUser className="text-2xl" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate(`/profile`)}>
                   {userData.fullname}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setUserData(null);

                      localStorage.removeItem("token");
                      localStorage.removeItem("profile");
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
