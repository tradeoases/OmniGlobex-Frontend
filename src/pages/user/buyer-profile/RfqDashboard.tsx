/* eslint-disable react-hooks/exhaustive-deps */
import { CiUser } from "react-icons/ci";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IUser, userStore } from "@/store/user-store";
// import { Button } from "./ui/button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTranslation } from "react-i18next";
import { FaUserCircle } from "react-icons/fa";
import { Logo } from "@/components/logo";

const RfqDashboard = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const isAuthenticating =
    location.pathname === "/signup" || location.pathname === "/signin";
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState<IUser | null>(userStore);

  return (
    <div className="hidden lg:block w-full border-b py-2 bg-white">
      <div className="w-10/12 xl:w-10/12 mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            to="/buyer-dashboard/rfq"
            className="text-gray-900 hover:text-blue-600 font-medium"
          >
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-x-6 font-semibold text-sm relative">
          <div className="hidden lg:flex items-center gap-6 xl:gap-10 relative -bottom-1 flex-1"></div>
        </div>

        <div className="flex items-center gap-x-8 text-xl">
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
                      onClick={() => navigate(`/buyer-dashboard/messages`)}
                    >
                      Buyer Dashboard
                    </DropdownMenuItem>
                  )}

                  {userData.roles.includes("Supplier") && (
                    <DropdownMenuItem
                      onClick={() => navigate(`/supplier-dashboard/messages`)}
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
    </div>
  );
};

export default RfqDashboard;
