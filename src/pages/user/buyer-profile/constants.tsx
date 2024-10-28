import {
  FaUsers,
  FaEnvelope,
  FaStar,
  FaBookOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaGear } from "react-icons/fa6";


export const menuItems = [
  {
    title: "My RFQs",
    path: "rfq",
    icon: <FaUsers />,
  },
  {
    title: "Messages",
    path: "messages",
    icon: <FaEnvelope />,
  },
  {
    title: "Rating",
    path: "ratings",
    icon: <FaStar />,
  },
  {
    title: "Start Selling Now",
    path: "/supplier-dashboard",
    icon: <FaBookOpen />,
  },
  {
    title: "Settings",
    icon: <FaGear />,
    path: "",
    submenu: [
      {
        title: "Security Settings",
        path: "/buyer-dashboard/settings/security",
      },
      {
        title: "Change Password",
        path: "/buyer-dashboard/settings/change-password/",
      },
    ],
  },
  {
    title: "Logout",
    path: "logout",
    icon: <FaSignOutAlt />,
    className:
      "hover:text-red-300 mt-4 border-t border-gray-700 pt-4",
  },
];
