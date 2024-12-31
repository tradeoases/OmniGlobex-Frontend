// import { FaShippingFast } from "react-icons/fa";
// import { FaCartArrowDown, FaUserGear } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/service/apis/user-services";

export const Overview = () => {
  const {
    data: personalInfo,
    isLoading: personalInfoLoading,
    isSuccess: isSuccessPersonal,
    isError: personalInfoErrored,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await getUserInfo();
      if (response.status === 200) {
        const finalUserData = response.data.data;
        console.log({ finalUserData });
        const personalInfo = [
          { key: "Name", value: finalUserData?.fullname || "N/A" },
          { key: "Email", value: finalUserData?.email || "N/A" },
          { key: "Phone", value: finalUserData?.phonenumber || "N/A" },
          { key: "City", value: finalUserData?.city || "N/A" },
          { key: "Address", value: finalUserData?.address || "N/A" },
        ];
        return personalInfo;
      }
    },
  });

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <div>
        <p className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">
          Welcome to your Profile
        </p>
      </div>

      {/* Orders Section */}
      <div className="my-4">
        {/* Uncomment and add your NewOrderBoard component here */}
        {/* {newOrders.map((order, i) => (
          <NewOrderBoard key={i} {...order} />
        ))} */}
      </div>

      {/* Main Info Section */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-24">
        {/* Personal Information */}
        <div className="space-y-4 md:space-y-8 w-full md:w-1/2">
          <p className="text-lg md:text-xl lg:text-2xl font-semibold">
            Personal Information
          </p>

          <div className="space-y-4">
            {personalInfoLoading && (
              <div className="text-gray-500">
                Personal Information loading...
              </div>
            )}
            {personalInfoErrored && (
              <div className="text-red-500">
                Failed to load personal information
              </div>
            )}
            {isSuccessPersonal &&
              personalInfo?.map((info, i) => (
                <div
                  className="text-sm sm:text-base md:text-lg grid grid-cols-3 gap-2 md:grid-cols-4"
                  key={i}
                >
                  <span className="text-gray-400 col-span-1">{info.key}:</span>
                  <span className="col-span-2 md:col-span-3">{info.value}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Business Information */}
        <div className="space-y-4 md:space-y-8 w-full md:w-1/2">
          <p className="text-lg md:text-xl lg:text-2xl font-semibold">
            Business Information
          </p>

          <div className="space-y-4">
            {isSuccessPersonal &&
              personalInfo?.map((info, i) => (
                <div
                  className="text-sm sm:text-base md:text-lg grid grid-cols-3 gap-2 md:grid-cols-4"
                  key={i}
                >
                  <span className="text-gray-400 col-span-1">{info.key}:</span>
                  <span className="col-span-2 md:col-span-3">{info.value}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
