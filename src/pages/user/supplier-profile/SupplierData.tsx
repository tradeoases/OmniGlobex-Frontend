import { BsFillCartCheckFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { IoBagHandle, IoLogOut } from "react-icons/io5";
import { MdReviews } from "react-icons/md";
import { TbSubscript } from "react-icons/tb";
import NotificationsIcon from "../buyer-profile/NotificationsIcon";
import { HiLockClosed } from "react-icons/hi2";

export const SupplierSideMenuItems = [
    {
      icon: <MdReviews />,
      title: "Storefront Preview",
      path: "",
    },
    { icon: <FaUser />, title: "Messages", path: "messages" },
    { icon: <IoBagHandle />, title: "Products", path: "products" },
    {
      icon: <BsFillCartCheckFill />,
      title: "Sales Performance",
      path: "sales-performance",
    },
    { icon: <TbSubscript />, title: "Subscription", path: "subscription" },
    {
      icon: <NotificationsIcon />,
      title: "Notifications",
      path: "notifications",
    },
  
    {
      icon: <HiLockClosed />,
      title: "Start Buying Now",
      path: "/buyer-dashboard",
    },
    { icon: <MdReviews />, title: "Analytics", path: "analytics" },
  
    { icon: <MdReviews />, title: "Rating", path: "ratings" },
  
    // Settings with Submenu
    {
      icon: <MdReviews />,
      title: "Settings",
      path: "", // No direct link for Settings
      submenu: [
        {
          title: "Security Settings",
          path: "security-settings",
        },
        {
          title: "Change Password",
          path: "change-password",
        },
      ],
    },
  
    { icon: <IoLogOut />, title: "Logout", path: "logout" },
  ];
  