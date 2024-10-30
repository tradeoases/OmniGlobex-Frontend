import { LuChevronRight } from "react-icons/lu";

const AdvertisementSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Featured Deals
          </h2>
          <p className="text-lg text-gray-600">
            Discover trending products and exclusive offers
          </p>
        </div>
        <button
          onClick={() => alert("under implementation")}
          className="hidden md:inline-flex items-center gap-2 text-main hover:text-main/90 font-medium transition-colors"
        >
          Browse All Deals
          <LuChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default AdvertisementSection;
