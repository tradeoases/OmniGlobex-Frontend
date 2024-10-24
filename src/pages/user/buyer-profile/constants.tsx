import { FaUsers, FaEnvelope, FaStar, FaBookOpen, FaCog } from "react-icons/fa";

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
    path: "",
    icon: <FaCog />,
    submenu: [
      {
        title: "Security Settings",
        path: "settings/security",
      },
      {
        title: "Change Password",
        path: "settings/change-password",
      },
    ],
  },
];
