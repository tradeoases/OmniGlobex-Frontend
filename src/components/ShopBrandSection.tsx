import { HiOutlineArrowRight } from "react-icons/hi";

const ShopBrandSection = () => {
  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      
      <div className="bg-[#f7f7f7] p-2 sm:p-4 border-b">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Recommended Suppliers</h2>
          <button 
            onClick={() => alert("Coming Soon")} 
            className="text-main hover:text-yellow-500 text-base sm:text-lg flex items-center gap-1"
          >
            View all Suppliers
            <HiOutlineArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suppliers.map((supplier, index) => (
            <div 
              key={index}
              className="flex border rounded-lg hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* Company Logo */}
              <div className="w-[120px] h-[120px] flex-shrink-0 border-r p-2">
                <div className="relative w-full h-full">
                  <img
                    src={supplier.image}
                    alt={supplier.name}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              {/* Company Info */}
              <div className="flex-1 p-4">
                <h3 className="font-medium text-main hover:text-yellow-500 cursor-pointer mb-2 line-clamp-2">
                  {supplier.name}
                </h3>

                {/* Location & Verification */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500">{supplier.location}</span>
                  {supplier.verified && (
                    <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-sm">
                      Verified
                    </span>
                  )}
                </div>

                {/* Main Products */}
                <div className="text-xs text-gray-600 line-clamp-2">
                  <span className="font-medium">Main Products: </span>
                  {supplier.mainProducts}
                </div>

                {/* Business Metrics */}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {supplier.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs text-gray-500">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const suppliers = [
  {
    name: "Shenzhen TechPro Electronics Manufacturing Co., Ltd.",
    image: "/suppliers/saller-1.png",
    location: "Guangdong, China",
    verified: true,
    mainProducts: "Mobile Phones, Tablets, Smart Watches, Wireless Earbuds",
    metrics: [
      "Response: 24h",
      "≥1000 Employees",
      "10+ Years",
    ]
  },
  {
    name: "Guangzhou SmartHome Technology Co., Ltd.",
    image: "/suppliers/saller-2.png",
    location: "Guangdong, China",
    verified: true,
    mainProducts: "Smart Home Devices, Security Cameras, IoT Sensors",
    metrics: [
      "Response: 12h",
      "500-999 Employees",
      "5+ Years",
    ]
  },
  {
    name: "Shanghai Innovation Electronics Group",
    image: "/suppliers/saller-3.png",
    location: "Shanghai, China",
    verified: true,
    mainProducts: "LED Displays, Touch Panels, Electronic Components",
    metrics: [
      "Response: 24h",
      "≥2000 Employees",
      "15+ Years",
    ]
  },
  {
    name: "Dongguan Power Solutions Ltd.",
    image: "/suppliers/saller-4.png",
    location: "Guangdong, China",
    verified: true,
    mainProducts: "Power Banks, Chargers, Adapters, Solar Products",
    metrics: [
      "Response: 48h",
      "100-499 Employees",
      "8+ Years",
    ]
  },
  {
    name: "Xiamen Display Technology Co., Ltd.",
    image: "/suppliers/saller-5.png",
    location: "Fujian, China",
    verified: true,
    mainProducts: "LCD Modules, Display Screens, Touch Panels",
    metrics: [
      "Response: 24h",
      "≥500 Employees",
      "12+ Years",
    ]
  },
  {
    name: "Shenzhen Battery Tech Enterprise",
    image: "/suppliers/saller-6.png",
    location: "Guangdong, China",
    verified: true,
    mainProducts: "Lithium Batteries, Battery Packs, Power Solutions",
    metrics: [
      "Response: 12h",
      "≥1500 Employees",
      "7+ Years",
    ]
  }
];

export default ShopBrandSection;
