import { LuChevronRight } from "react-icons/lu";
import { Link } from "react-router-dom";

const AnnounceBanner = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 gap-x-0 space-y-8 lg:space-y-0">
      <div className="w-full bg-black mx-auto p-8 space-y-6 rounded-lg transition-transform hover:scale-[1.02]">
        <div className="space-y-2">
          <p className="text-white text-4xl font-bold leading-tight">
            Sales and Discounts
          </p>
          <p className="text-gray-400">Don't miss out on our special offers!</p>
        </div>

        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-white bg-main px-6 py-3 rounded-lg hover:bg-main/90 transition-colors"
        >
          <span className="font-medium">Shop Now</span>
          <LuChevronRight className="text-lg" />
        </Link>
      </div>

      <div className="bg-download-cover bg-cover bg-center rounded-lg h-[300px] lg:h-auto shadow-lg transition-transform hover:scale-[1.02]"></div>
    </div>
  );
};

export default AnnounceBanner;
