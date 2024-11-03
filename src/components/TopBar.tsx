/* eslint-disable react-hooks/exhaustive-deps */
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "./logo";
import img from "../assets/omniGlobexlogo.png";
import { LuAlignLeft } from "react-icons/lu";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import { SidemenuStore } from "@/store/side-menu-store";
import { SearchBar } from "./search-bar";
import { Button } from "./ui/button";
import { IUser, userStore } from "@/store/user-store";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CiUser } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { SelectShowroom } from "./select-show-room";
import CurrencySelector from "./CurrencySelector";
import { useEffect, useRef } from "react";

const TopBar = () => {
  const setSidemenu: SetterOrUpdater<boolean> =
    useSetRecoilState<boolean>(SidemenuStore);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const onOpen = () => {
    setSidemenu(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !(sidebarRef.current as any).contains(event.target)
    ) {
      setSidemenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();

  const { t } = useTranslation();
  const location = useLocation();
  const isAuthenticating =
    location.pathname === "/signup" || location.pathname === "/signin";
  const [userData, setUserData] = useRecoilState<IUser | null>(userStore);

  return (
    <header className="w-full border-b py-4">
      {/* Mobile / Tablet View */}

      <div className="w-10/12 xl:w-8/12 mx-auto flex flex-col items-center lg:hidden mb-4">
        {" "}
        <div className="flex items-center justify-between w-full mb-2">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <div onClick={onOpen}>
              <LuAlignLeft className="text-2xl" />
            </div>
            <Link to="/" aria-label="Go to Home" className="flex-shrink-0">
              <Logo />
            </Link>
          </div>
          <div className="flex items-center">
            {" "}
            {!userData && !isAuthenticating && (
              <div
                className={`text-black py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-gradient-to-l hover:shadow-lg transition-transform hover:scale-105`}
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

                    {userData?.roles?.includes("Buyer") && (
                      <DropdownMenuItem
                        onClick={() => navigate(`/buyer-dashboard/messages`)}
                      >
                        Buyer Dashboard
                      </DropdownMenuItem>
                    )}

                    {userData?.roles?.includes("Supplier") && (
                      <DropdownMenuItem
                        onClick={() => navigate(`/supplier-dashboard/messages`)}
                      >
                        suppliers Dashboard
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
        <div className="w-full mx-2">
          {" "}
          <SelectShowroom />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex lg:items-center lg:justify-between gap-2  xl:w-10/12 mx-auto">
        <div className="flex items-center gap-x-4">
          <img
            src={img}
            alt="Omniglobex logo"
            onError={(e) => {
              e.currentTarget.src = "path-to-fallback-logo.png";
            }}
            className="h-12 w-auto cursor-pointer"
          />
          <Link to="/" aria-label="Go to Home">
            <Logo />
          </Link>
        </div>

        <SearchBar />

        <div className="flex items-center ml-14 justify-end gap-2">
          <CurrencySelector />
          <SelectShowroom />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
