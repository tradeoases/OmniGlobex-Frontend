import { useRecoilValue } from "recoil";
import { userStore } from "@/store/user-store";
import moment from "moment";

const BuyersProfile = () => {
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
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Company Overview */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-4 mb-6">
              {/* Company Logo/Avatar */}
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-400">
                  {profile?.business_name?.[0]?.toUpperCase()}
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
                      Years in Business
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {profile?.profile.year_started
                        ? moment().from(
                            moment(profile.profile.year_started),
                            true
                          )
                        : "Not specified"}
                    </dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-500">
                      Number of Employees
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {profile?.profile.number_of_employees || "Not specified"}
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
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyersProfile;
