// DashboardOverview.js
const DashboardOverview = () => (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded flex-1">Total RFQs: 12</div>
        <div className="bg-white p-4 shadow rounded flex-1">Messages: 5</div>
        <div className="bg-white p-4 shadow rounded flex-1">Orders in Progress: 3</div>
      </div>
    </div>
  );
  
  export default DashboardOverview;
  