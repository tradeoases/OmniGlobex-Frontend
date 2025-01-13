import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Import the PointElement
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { UnderConstruction } from "@/components/under-construction";

// Register all required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Register PointElement
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsAndReporting = () => {
  const analyticsData = {
    productViews: {
      total: 3400,
      byCountry: {
        USA: 1200,
        UK: 800,
        Germany: 500,
        Uganda: 300,
        India: 600,
      },
    },
    buyerInterest: {
      inquiries: 180,
      trends: {
        increasingInquiries: ["USA", "Germany"],
        decreasingInquiries: ["UK", "Uganda"],
      },
    },
    topPerformingShowrooms: ["USA", "Germany"],
    showroomsNeedingImprovement: ["UK", "Uganda"],
  };

  const [viewType, setViewType] = useState("overview");

  const productViewsData = {
    labels: Object.keys(analyticsData.productViews.byCountry),
    datasets: [
      {
        label: "Product Views",
        data: Object.values(analyticsData.productViews.byCountry),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const buyerInterestData = {
    labels: ["USA", "Germany", "UK", "Uganda"],
    datasets: [
      {
        label: "Inquiries Trends",
        data: [50, 40, 30, 60],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.4)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const showroomPerformanceData = {
    labels: ["USA", "Germany", "UK", "Uganda"],
    datasets: [
      {
        label: "Showroom Performance",
        data: [30, 25, 20, 15],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics and Reporting</h2>

        <section className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="text-xl font-semibold text-gray-800">Product Performance</h3>
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setViewType(viewType === "overview" ? "detailed" : "overview")}
              >
                {viewType === "overview" ? "View Detailed Reports" : "View Overview"}
              </button>
            </div>
          </div>

          {viewType === "overview" && (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="col-span-1 lg:col-span-2">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Product Views</h4>
                  <div className="aspect-w-16 aspect-h-9">
                    <Bar
                      data={productViewsData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { 
                          legend: { position: "top" },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Buyer Interest Trends</h4>
                  <div className="aspect-w-16 aspect-h-9">
                    <Line
                      data={buyerInterestData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { 
                          legend: { position: "top" },
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Showroom Performance</h4>
                  <div className="aspect-w-16 aspect-h-9">
                    <Pie
                      data={showroomPerformanceData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { 
                          legend: { position: "top" },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewType === "detailed" && (
            <div className="p-4 sm:p-6">
              {/* Detailed report content */}
              <UnderConstruction/>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AnalyticsAndReporting;
