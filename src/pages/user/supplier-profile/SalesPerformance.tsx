const SalesPerformance = () => {
  const metrics = {
    totalSales: "45,250",
    pendingOrders: 12,
    completedOrders: 156,
    growthRate: "+15%"
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Sales Performance
        <div className="h-1 w-20 bg-blue-500 mt-2 rounded-full"></div>
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Total Sales</span>
              <span className="p-2 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <span className="text-3xl font-bold text-gray-800">${metrics.totalSales}</span>
            <span className="text-sm text-green-500 font-medium">+2.5% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Pending Orders</span>
              <span className="p-2 bg-yellow-50 rounded-lg">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <span className="text-3xl font-bold text-gray-800">{metrics.pendingOrders}</span>
            <span className="text-sm text-yellow-500 font-medium">Needs attention</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Completed Orders</span>
              <span className="p-2 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <span className="text-3xl font-bold text-gray-800">{metrics.completedOrders}</span>
            <span className="text-sm text-green-500 font-medium">On track</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Growth Rate</span>
              <span className="p-2 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </span>
            </div>
            <span className="text-3xl font-bold text-gray-800">{metrics.growthRate}</span>
            <span className="text-sm text-purple-500 font-medium">Above target</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPerformance;
