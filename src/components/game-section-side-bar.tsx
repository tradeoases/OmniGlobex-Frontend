/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllShowrooms } from "@/service/apis/countries-services";

export const GameSectionSidebar = () => {
  const {
    data: countries,
    isSuccess: countrySuccess,
    isLoading: countryLoading,
    isError: isCountryError,
    error: countryError,
  } = useQuery({
    queryKey: ["showrooms"],
    queryFn: async () => {
      const response = await getAllShowrooms();
      if (response.status === 200) {
        return response.data.data as any;
      }
    },
  });

  console.log({
    data: countries,
    isSuccess: countrySuccess,
    isLoading: countryLoading,
    isError: isCountryError,
    error: countryError,
  });

  const navigate = useNavigate();

  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      

      {/* Showrooms Grid */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-4">
          {countrySuccess &&
            countries?.splice(0, 6).map((country: any) => (
              <div
                className="relative overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200"
                key={country.showroom_id}
                onClick={() =>
                  navigate(`/show-room/?country=${country.showroom_id}`)
                }
              >
                {/* Flag Background Section */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  {country?.flagColours?.map((flag: any, index: number) => (
                    <div
                      key={index}
                      className="w-full h-1/3"
                      style={{ backgroundColor: flag.colour.toLowerCase() }}
                    />
                  ))}
                </div>

                {/* Content Section */}
                <div className="relative p-3 sm:p-4 h-full flex flex-col justify-between min-h-[120px] sm:min-h-[160px]">
                  <div className="space-y-2">
                    <Link
                      to={`/show-room/?country=${country.showroom_id}`}
                      className="block text-gray-800 text-base sm:text-lg font-bold hover:text-main transition-colors duration-200"
                    >
                      {country.showroom_name}
                    </Link>

                    <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                      Click to explore
                    </p>
                  </div>

                  {/* Bottom Flag Stripes */}
                  <div className="mt-2 sm:mt-4 overflow-hidden rounded-md border border-gray-200">
                    <div className="flex h-3">
                      {country?.flagColours?.map((flag: any, index: number) => (
                        <div
                          key={index}
                          className="flex-1 h-full"
                          style={{ backgroundColor: flag.colour.toLowerCase() }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {countryLoading && (
            <div className="col-span-full flex items-center justify-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main mx-auto mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base">
                  Loading showrooms...
                </p>
              </div>
            </div>
          )}

          {isCountryError && (
            <div className="col-span-full text-center py-6 sm:py-8 px-4">
              <div className="bg-red-50 rounded-lg p-4">
                <h1 className="text-lg sm:text-xl font-bold mb-2 text-red-600">
                  Unable to load showrooms
                </h1>
                <p className="text-sm sm:text-base text-red-500">
                  {countryError?.message || "Please try again later"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
