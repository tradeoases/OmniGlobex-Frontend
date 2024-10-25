import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// const hasPaidForRFQ = () => {
//   return localStorage.getItem("rfq_paid") === "true";
// };

// const processPayment = () => {
//   localStorage.setItem("rfq_paid", "true");
//   return true;
// };

const RFQManagement = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // const [canCreateRFQ, setCanCreateRFQ] = useState(hasPaidForRFQ());

  // const navigate = useNavigate();

  // useEffect(() => {
  //   setCanCreateRFQ(hasPaidForRFQ());
  // }, []);
  // const handleUpgrade = () => {
  //   if (processPayment()) {
  //     setCanCreateRFQ(true);
  //     setShowUpgradeModal(false);
  //     navigate("/RFQForm");
  //   }
  // };

  // const handleCreateRFQClick = () => {
  //   if (!canCreateRFQ) {
  //     setShowUpgradeModal(true);
  //   } else {
  //     navigate("/RFQForm");
  //   }
  // };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
      {/* Header Section */}
      <div className="flex space-x-4">
        <h2 className="text-3xl font-bold mb-6">My Request</h2>
      </div>

      {/* Tabs Section */}
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <div className="p-4 rounded-md">
            <h3 className="text-lg font-semibold">All</h3>
          </div>
          <div className="p-4 rounded-md">
            <h3 className="text-lg font-semibold">Unread</h3>
          </div>
        </div>

        <div
          className="flex items-center cursor-pointer"
          title="This feature is still under implementation"
        >
          <span className="text-sm text-gray-600 font-semibold">
            All Sourcing Request
          </span>
          <ChevronRight size={20} className="text-gray-600" />
        </div>
      </div>

      {/* Search Input Field and RFQ Section */}
      <div className="mb-12">
        {/* Search Input */}
        <div className="flex justify-end mt-4 mb-6">
          <div className="w-full md:w-1/2 rounded-md">
            <input
              type="text"
              placeholder="Search request"
              className="w-full text-lg font-normal border rounded-md py-1 px-4 focus:outline-none "
            ></input>
          </div>
        </div>

        {/* Placeholder for Future RFQs */}
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <p className="text-gray-600">No RFQs available yet.</p>
        </div>
      </div>

      {/* Submit Sourcing Request Button */}
      <div className="mt-8 text-center">
        <Link
          to="/RFQForm"
          className="text-blue-600 py-2 px-4 rounded-md mb-4"
          // onClick={handleCreateRFQClick}
        >
          Submit sourcing request
        </Link>
        <span>to get multiple quotations!</span>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Upgrade Required</h3>
            <p className="mb-4">
              Creating new RFQs is a paid feature. Upgrade your account with a
              one-time payment to access it.
            </p>
            <Link
              to="/RFQForm"
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Upgrade for $50
            </Link>
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="ml-4 text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFQManagement;
