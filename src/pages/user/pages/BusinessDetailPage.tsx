/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBusinessById } from "@/service/apis/business-services";

const BusinessDetailPage = () => {
  const navigate = useNavigate();
  const { businessId } = useParams();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["businessDetail", businessId],
    queryFn: () => getBusinessById(businessId || ""),
    enabled: !!businessId,
  });
  console.log("single business info", data);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 w-screen">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center h-64 w-screen text-red-600">
        Error: {error.message}
      </div>
    );

  const business = data?.data?.data;

  const handleUserAdd = () => {
    navigate(`/business/${businessId}/add-user`);
  };

  const handleBusinessLocation = () => {
    navigate(`/business/${businessId}/add-location`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 pt-10">
      {" "}
      <h2 className="text-center text-3xl tracking-wider mb-6">
        {`Welcome To: ${
          business?.businessName || "Business Name Not Available"
        }`}
      </h2>
      <div className="bg-white shadow-md p-6 rounded-lg">
        <p>
          <strong>Business Name:</strong> {business?.businessName || "N/A"}
        </p>
        <p>
          <strong>Creator Name:</strong> {business?.creatorFullname || "N/A"}
        </p>
        <p>
          <strong>Verified:</strong> {business?.businessVerified ? "Yes" : "No"}
        </p>
        <p>
          <strong>Description:</strong> {business?.businessDescription || "N/A"}
        </p>

        <div className="mt-6">
          <div className="flex">
            <h3 className=" flex-1 max-w-sm text-xl font-semibold mb-4">
              Business Users
            </h3>
            <span
              onClick={handleUserAdd}
              className="ml-4 underline px-2 py-2 rounded-sm hover:text-main cursor-pointer"
            >
              Add User
            </span>
          </div>

          {business?.businessUsers.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300 table-auto">
              {" "}
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">#</th>{" "}
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {business.businessUsers.map((user: any, index: number) => (
                  <tr key={user.email}>
                    <td className="py-2 px-4 border-b text-left">
                      {index + 1}
                    </td>{" "}
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No users found for this business.</p>
          )}
        </div>

        <div className="mt-6">
          <div className="flex">
            <h3 className=" flex-1 max-w-sm text-xl font-semibold mb-4">
              Business Locations
            </h3>
            <span
              onClick={handleBusinessLocation}
              className="ml-4 underline px-2 py-2 rounded-sm hover:text-main cursor-pointer"
            >
              Add Location
            </span>
          </div>
          {business?.businessLocations.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300 table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">#</th>{" "}
                  <th className="py-2 px-4 border-b text-left">Country</th>
                  <th className="py-2 px-4 border-b text-left">City</th>
                  <th className="py-2 px-4 border-b text-left">Address</th>
                </tr>
              </thead>
              <tbody>
                {business.businessLocations.map(
                  (location: any, index: number) => (
                    <tr key={location.countryId}>
                      <td className="py-2 px-4 border-b text-left">
                        {index + 1}
                      </td>{" "}
                      <td className="py-2 px-4 border-b">
                        {location.country || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {location.city || "N/A"}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {location.location || "N/A"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <p>No locations found for this business.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailPage;
