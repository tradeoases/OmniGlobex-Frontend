import { SearchBar } from "@/components/search-bar";
import { SelectShowroom } from "@/components/select-show-room";
import NotificationsIcon from "./NotificationsIcon";
import { FiMenu } from "react-icons/fi";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => (
  <header className="flex flex-col md:flex-row justify-between items-center p-4 shadow bg-white">
    <button
      onClick={toggleSidebar}
      className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
    >
      <FiMenu size={24} />
    </button>

    <strong className="text-lg md:text-xl mb-2 md:mb-0">
      Buyer's Dashboard
    </strong>

    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-2 md:mb-0">
      <SearchBar />
      <SelectShowroom />
    </div>

    <div className="relative items-center space-x-4">
      <NotificationsIcon />
      <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
        3
      </span>
    </div>
  </header>
);

export default Header;
