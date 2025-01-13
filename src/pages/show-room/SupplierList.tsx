
import { getAllUsersInCountry } from "@/service/apis/user-services";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import SupplierCard, { ISupplier } from "./componets/SupplierCard";


const SupplierList = ({ country }: { country: string }) => {
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["suppliers", country],
    queryFn: async () => {
      const res = await getAllUsersInCountry(country);
      if (
        res.status === HttpStatusCode.Ok ||
        res.status === HttpStatusCode.Created
      ) {
        return res.data.data;
      }
    },
  });

  return (
    <div className="supplier-list">
      <h2 className="font-semibold text-lg mb-4">Suppliers</h2>
      {isLoading && <div>Loading suppliers in country...</div>}
      {isError && <div>An error occurred while loading suppliers...</div>}
      {isSuccess && (
        <div>
          {data.map((supplier: ISupplier) => (
            <SupplierCard supplier={supplier} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SupplierList;
