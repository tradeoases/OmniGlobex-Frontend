import { useRecoilValue } from "recoil";
import { userStore } from "@/store/user-store";
import moment from "moment";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/service/apis/user-services";
import { IProfile } from "@/service/apis/user-services";
import { HttpStatusCode } from "axios";

const SupplierProfile = () => {
  const {
    data: user,
    isSuccess: isUserSuccess,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["personal"],
    queryFn: async () => {
      const res = await getUserInfo();
      if (res.status === HttpStatusCode.Ok) {
        return res.data.data as IProfile;
      }
    },
  });
  const profile = useRecoilValue(userStore);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Company Profile
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                View and manage your company information
              </p>
            </div>
            <Link
              to="/supplier-dashboard/update-profile"
              className="inline-flex items-center gap-2 bg-main hover:bg-yellow-500 text-white px-6 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Update Info
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Company Overview */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              {/* Company Logo/Avatar */}
              <div className="w-20 h-20 ring-4 ring-white bg-white shadow-2xl rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">
                  {profile?.profileImages?.find(
                    (pi) => pi.image_for === "PROFILE"
                  )?.image_url && (
                    <img
                      src={
                        profile.profileImages.find(
                          (pi) => pi.image_for === "PROFILE"
                        )?.image_url
                      }
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {profile?.business_name}
                </h3>
                <p className="text-gray-500">
                  {profile?.profile.business_type}
                </p>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h4>
                <dl className="space-y-4">
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">
                      Location
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {profile?.profile.address || "Not specified"}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">
                      Year started
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {(() => {
                        return user?.profile.year_started &&
                          typeof user.profile.year_started === "string"
                          ? new Date(user.profile.year_started).getFullYear() ||
                              "N/A"
                          : "N/A";
                      })()}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">
                      Number of Employees
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user?.profile.number_of_employees || 0}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact Information
                </h4>
                <dl className="space-y-4">
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {profile?.email || "Not specified"}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {profile?.profile.phonenumber || "Not specified"}
                    </dd>
                  </div>
                  {/* <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">Website</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {profile?.profile?.website ? (
                        <a 
                          href={profile?.profile?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {profile?.profile?.website}
                        </a>
                      ) : 'Not specified'}
                    </dd>
                  </div> */}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
