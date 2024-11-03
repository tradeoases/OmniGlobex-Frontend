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
    <div className=" w-full rounded-xl shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 bg-gray-900">
      {countrySuccess &&
        countries?.splice(0, 6).map((country: any) => (
          <div
            className="w-full p-2 m-2 flex flex-col-reverse items-between rounded-lg  justify-between gap-2 bg-white min-h-full"
            key={country.showroom_id}
            onClick={() =>
              navigate(`/show-room/?country=${country.showroom_id}`)
            }
          >
            <div className="flex flex-col overflow-hidden rounded-lg border-black border-2">
              {country?.flagColours?.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (flag: any, index: number) => (
                  <div
                    key={index}
                    className="w-full h-4 sm:h-6"
                    style={{ backgroundColor: flag.colour.toLowerCase() }}
                  />
                )
              )}
            </div>

            <Link
              to={`/show-room/?country=${country.showroom_id}`}
              className="text-black text-xl font-bold hover:underline block"
            >
              {country.showroom_name}
            </Link>
          </div>
        ))}
      {countryLoading && <div>Loading country showrooms...</div>}
      {isCountryError && (
        <div>
          <h1>An error occured while loading showrooms</h1>
          <h3>{countryError.message}</h3>
        </div>
      )}
    </div>
  );
};
