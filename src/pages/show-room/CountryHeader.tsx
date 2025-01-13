
import { getSingleShowrooms } from "@/service/apis/countries-services";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";

const CountryHeader = ({ country_id }: { country_id: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["single-showroom", country_id],
    queryFn: async () => {
      const res = await getSingleShowrooms(country_id);
      if (res.status === HttpStatusCode.Ok) {
        return res.data.data;
      }
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-6 text-gray-600">
        Loading country details...
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-6 text-red-600">
        Failed to load country details
      </div>
    );

  // Map over flag colors and render them as blocks (vertically stacked)
  return (
    <div className="px-4 lg:px-12 py-8 bg-gray-100 rounded-md shadow-lg">
      {/* Flag colors as vertical strips */}
      <div className="flex flex-col overflow-hidden rounded-t-lg">
        {data?.flagColours?.map(
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

      <div className="mt-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Welcome to the{" "}
          <span className="text-blue-600">{data?.showroom_name}</span> Showroom
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Discover the latest products and services in{" "}
          <strong>{data?.showroom_name}</strong>.
        </p>
      </div>

      <div className="mt-8 text-center">
        <button className="  text-main rounded-md ">Explore More</button>
      </div>
    </div>
  );
};

export default CountryHeader;
