import { useState } from "react";
import { FaGlobe, FaIndustry, FaBoxes, FaDollarSign, FaChevronDown, FaCheck } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, HttpStatusCode } from "axios";
import { getAllProductCategories } from "@/service/apis/product-services";
import { IProductCategory } from "@/service/apis/product-services";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

interface SourcingPreference {
  id: string;
  name: string;
  enabled: boolean;
}

interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

const SourcingPreferences = () => {
  const [preferences, setPreferences] = useState<SourcingPreference[]>([
    { id: "verified", name: "Verified Suppliers Only", enabled: true },
    { id: "trade", name: "Trade Assurance", enabled: false },
    { id: "certified", name: "Quality Certified", enabled: true },
    { id: "samples", name: "Samples Available", enabled: false },
    { id: "customization", name: "Customization Available", enabled: false },
    { id: "bulkOrders", name: "Bulk Orders", enabled: true },
  ]);

  const [regions] = useState<string[]>([
    "Asia", "North America", "Europe", "Africa", "South America", "Oceania"
  ]);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProductCategories();

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as IProductCategory[];
      }
    },
  });

  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: 50000,
    currency: "USD"
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleTogglePreference = (id: string) => {
    setPreferences(prev =>
      prev.map(pref =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: string) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: Number(value) || 0
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Sourcing Preferences
      </h1>
      
      {/* Categories Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaBoxes className="text-blue-600 text-lg sm:text-xl" />
            <h2 className="text-base sm:text-lg font-medium">Product Categories</h2>
          </div>
          <Listbox value={selectedCategories} onChange={setSelectedCategories} multiple>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2.5 pl-3 pr-10 text-left border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500">
                <span className="block truncate">
                  {selectedCategories.length === 0
                    ? "Select categories..."
                    : `${selectedCategories.length} categories selected`}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <FaChevronDown
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {categories?.map((category) => (
                    <Listbox.Option
                      key={category.category_id}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-50 text-blue-700' : 'text-gray-900'
                        }`
                      }
                      value={category.category_id}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {category.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <FaCheck className="h-4 w-4" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>

      {/* Price Range Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaDollarSign className="text-blue-600 text-lg sm:text-xl" />
            <h2 className="text-base sm:text-lg font-medium">Price Range (USD)</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => handlePriceRangeChange('min', e.target.value)}
              className="w-full sm:w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Min"
            />
            <span className="text-gray-500">to</span>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => handlePriceRangeChange('max', e.target.value)}
              className="w-full sm:w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Regions Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaGlobe className="text-blue-600 text-lg sm:text-xl" />
            <h2 className="text-base sm:text-lg font-medium">Preferred Regions</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <span
                key={region}
                className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Supplier Requirements Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaIndustry className="text-blue-600 text-lg sm:text-xl" />
            <h2 className="text-base sm:text-lg font-medium">Supplier Requirements</h2>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {preferences.map((pref) => (
              <div
                key={pref.id}
                className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded-lg transition-colors"
              >
                <span className="text-gray-700 text-sm sm:text-base">{pref.name}</span>
                <button
                  onClick={() => handleTogglePreference(pref.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    pref.enabled ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out shadow-sm ${
                      pref.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={()=> alert("Under implementation")} className="w-full sm:w-auto px-6 py-2.5 bg-main text-white rounded-lg hover:bg-yellow-500  transition-colors font-medium shadow-sm">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default SourcingPreferences;
