import { UnderConstruction } from "@/components/under-construction";
import { getSingleShowrooms } from "@/service/apis/countries-services";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";

const Advertisements = ({ country_id }: { country_id: string }) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["fetchCountry", country_id],
    queryFn: async () => {
      const res = await getSingleShowrooms(country_id);
      if (res.status === HttpStatusCode.Ok) {
        return res.data.data;
      }
    },
  });
  return (
    <div className="ads bg-gray-200 p-4 mb-6">
      {isLoading && <h1>Loading...</h1>}
      {isError && <h1>Error while loading</h1>}
      {isSuccess && (
        <>
          <h2 className="font-semibold text-lg">
            Advertisements for {data.showroom_name}
          </h2>
          <UnderConstruction />
        </>
      )}
      {/* Dynamic ads can be inserted here */}
    </div>
  );
};

export default Advertisements;
