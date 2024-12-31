/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getBusinesses } from "@/service/apis/business-services";
import { Link, useNavigate } from "react-router-dom";

const BusinessPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["business"],
    queryFn: async () => {
      const response = await getBusinesses();
      if (response.status === 200) {
        return response.data.data;
      }
    },
  });

  console.log("businessino", data);

  const handleViewMore = (businessId: string) => {
    navigate(`/business/${businessId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const filteredBusinesses = data?.filter((business: any) =>
    business.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="col-span-3 no-scrollbars relative w-full overflow-x-auto">
      <h2 className="text-center text-3xl tracking-wider">Business List</h2>

      {/* Search and Create Business Button */}
      <div className="flex items-center justify-between px-3 my-3">
        <div className="flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search by business name"
            className="outline-none px-4 py-2 w-full border rounded-sm"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <Link to="/create-business" className="ml-4 bg-main text-white px-4 py-2 rounded-sm hover:bg-yellow-600">
          Create Business
        </Link>
      </div>

      {/* Business List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses && filteredBusinesses.length > 0 ? (
          filteredBusinesses.map((business: any) => (
            <div
              key={business.businessId}
              className="bg-white shadow-md p-6 rounded-lg"
            >
              <p className="text-sm text-gray-500">
                <strong>Name:</strong> {business.businessName}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                <strong>Creator Name:</strong> {business.creatorFullname}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                <strong>Description:</strong>{" "}
                {business.businessDescription.slice(0, 50)}...
              </p>
              <button
                className="underline mt-2 rounded hover:text-main"
                onClick={() => handleViewMore(business.businessId)}
              >
                View More
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No data found</div>
        )}
      </div>
    </div>
  );
};

export default BusinessPage;
