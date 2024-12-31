import Advertisements from "./Advertisement";
import Trends from "./Trends";
import SupplierList from "./SupplierList";
import LocalPromotions from "./LocalPromotions";
import CountryNews from "./CountryNews";
import AIRecommendations from "./AIRecommendations";
import CountryHeader from "./CountryHeader";
import { useSearchParams } from "react-router-dom";
import AllProductsPage from "../products/all-products-page";

const CountryShowroom = () => {
  const [searchParams] = useSearchParams();
  const country_id =
    searchParams.get("country") || searchParams.get("countryId") || "";

  return (
    <div className=" w-full px-4 lg:px-12 py-4 bg-gray-50">
      <CountryHeader country_id={country_id} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <div className="lg:col-span-1">
          <h1 className="text-3xl font-bold mt-4">Promotions</h1>
          <LocalPromotions />
        </div>
      </div>

      <div className="my-8">
        <Advertisements country_id={country_id} />
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Trending Products
        </h2>
        <Trends />
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Suppliers</h2>
        <SupplierList country={country_id} />
      </div>
      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Products</h2>
        <AllProductsPage />
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Country News & Updates
        </h2>
        <CountryNews />
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recommended for You
        </h2>
        <AIRecommendations />
      </div>
    </div>
  );
};

export default CountryShowroom;
