import { IoMailOutline } from "react-icons/io5";

const DiscountBanner = () => {
  return (
    <div className="py-10 lg:py-20 w-full space-y-2 md:space-y-4 bg-gray-200">
      <p className="text-center text-2xl md:text-3xl font-extrabold">
        Get <span className="text-main">20%</span> off Discount Coupon
      </p>
      <p className="text-base md:text-lg font-bold text-center">
        by Subscribe our Newsletter
      </p>

      <div className="bg-white w-4/5 md:w-1/2 mx-auto flex pl-2 md:pl-6 items-center justify-between">
        <div className="flex items-center gap-x-2 mg:gap-x-6">
          <IoMailOutline className="text-xl text-main" />

          <input
            type="text"
            className="outline-none placeholder:text-black text-xs md:text-base w-full"
            placeholder="EMAIL ADDRESS"
          />
        </div>

        <button
          type="submit"
          className="bg-main whitespace-nowrap cursor-pointer  text-xs md:text-sm font-bold p-3 md:p-4"
        >
          Get the Coupon
        </button>
      </div>
    </div>
  );
};

export default DiscountBanner;
