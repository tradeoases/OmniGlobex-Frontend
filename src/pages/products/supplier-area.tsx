import { getUserPreferences } from "@/service/apis/user-services";
import { useQuery } from "@tanstack/react-query";

const SupplierArea = () => {
  const { data: preferences, isSuccess } = useQuery({
    queryKey: ["userpreference"],
    queryFn: async () => {
      const response = await getUserPreferences();
      if (response.status === 200) {
        return response.data.data as {
          country_id: string;
          currency: string;
          language: string;
        };
      }
    },
  });

  if(isSuccess) {
    console.log(preferences)
  }

  return <div>SupplierArea</div>;
};

export default SupplierArea;
