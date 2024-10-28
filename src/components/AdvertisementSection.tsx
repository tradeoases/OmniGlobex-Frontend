import { LuChevronRight } from "react-icons/lu";

const AdvertisementSection = () => {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Advertisement</h2>
          <p className="text-gray-500">
            Check out our latest promotions and special offers
          </p>
        </div>
        <button
          onClick={() => alert("under implementation")}
          className="hidden md:inline-flex items-center text-main hover:text-main/90"
        >
          View All
          <LuChevronRight className="ml-1" />
        </button>
      </div>

      {/* Advertisement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* First Ad */}
        <div className="relative overflow-hidden rounded-lg group border border-gray-200">
          <div className="bg-gray-200 h-[250px] bg-[url('/images/ad1.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
            <span className="text-white text-sm font-medium bg-main/90 px-3 py-1 rounded-full w-fit mb-3">
              New Arrival
            </span>
            <h3 className="text-white text-2xl font-bold mb-2">
              New Collection
            </h3>
            <button
              onClick={() => alert("under implementation")}
              className="inline-flex items-center text-white hover:underline"
            >
              <span>Shop Now</span>
              <LuChevronRight className="ml-1" />
            </button>
          </div>
        </div>

        {/* Second Ad */}
        <div className="relative overflow-hidden rounded-lg group border border-gray-200">
          <div className="bg-gray-200 h-[250px] bg-[url('/images/ad2.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
            <span className="text-white text-sm font-medium bg-red-500/90 px-3 py-1 rounded-full w-fit mb-3">
              Limited Time
            </span>
            <h3 className="text-white text-2xl font-bold mb-2">
              Special Deals
            </h3>
            <button
              onClick={() => alert("under implementation")}
              className="inline-flex items-center text-white hover:underline"
            >
              <span>View Offers</span>
              <LuChevronRight className="ml-1" />
            </button>
          </div>
        </div>

        {/* Third Ad */}
        <div className="relative overflow-hidden rounded-lg group md:col-span-2 lg:col-span-1 border border-gray-200">
          <div className="bg-gray-200 h-[250px] bg-[url('/images/ad3.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-6 flex flex-col justify-end">
            <span className="text-white text-sm font-medium bg-green-500/90 px-3 py-1 rounded-full w-fit mb-3">
              Featured
            </span>
            <h3 className="text-white text-2xl font-bold mb-2">
              Featured Products
            </h3>
            <button
              onClick={() => alert("under implementation")}
              className="inline-flex items-center text-white hover:underline"
            >
              <span>Explore More</span>
              <LuChevronRight className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;
