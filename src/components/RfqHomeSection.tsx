// Define an interface for RFQ data
interface RFQ {
  name: string;
  country: string;
  product: string;
  quotations: number;
}

// interface RFQCarouselProps {
//   rfqs: RFQ[];
// }

// const RFQCarousel: React.FC<RFQCarouselProps> = ({ rfqs }) => {
//   return (
//     <div className="rfq-carousel mb-4">
//       {rfqs.length === 0 ? (
//         <p className="text-center text-gray-700">
//           No RFQs available at the moment.
//         </p>
//       ) : (
//         <div className="carousel">
//           {rfqs.map((rfq, index) => (
//             <div
//               key={index}
//               className="rfq-item bg-gray-200 text-gray-400 p-4 rounded-md shadow mb-2"
//             >
//               <p className="rfq-text">
//                 <strong>{rfq.name}</strong> from <strong>{rfq.country}</strong>{" "}
//                 is looking for <strong>{rfq.product}</strong> and has received{" "}
//                 <strong>{rfq.quotations}</strong> quotation(s).
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

const RfqHomeSection: React.FC = () => {
  // Dummy data for RFQs
  const rfqs: RFQ[] = [
    {
      name: "John Doe",
      country: "USA",
      product: "Electronics",
      quotations: 5,
    },
    {
      name: "Jane Smith",
      country: "UK",
      product: "Clothing",
      quotations: 3,
    },
    {
      name: "Carlos Gonzalez",
      country: "Mexico",
      product: "Furniture",
      quotations: 2,
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="bg-gradient-to-r from-gray-700/80 to-gray-800/80 backdrop-blur-sm flex flex-col lg:flex-row justify-between items-center p-4 lg:p-8 rounded-xl shadow-2xl relative overflow-hidden">
          {/* Left Section (Content) */}
          <div className="w-full lg:w-1/2 z-10 mb-8 lg:mb-0 lg:pr-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Request for Quotations (RFQ)
            </h2>

            {/* Updated RFQCarousel styling */}
            <div className="rfq-carousel mb-6">
              {rfqs.length === 0 ? (
                <p className="text-center text-gray-300">
                  No RFQs available at the moment.
                </p>
              ) : (
                <div className="carousel space-y-3">
                  {rfqs.map((rfq, index) => (
                    <div
                      key={index}
                      className="rfq-item bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-all duration-300"
                    >
                      <p className="rfq-text text-gray-200">
                        <strong className="text-yellow-400">{rfq.name}</strong>{" "}
                        from{" "}
                        <strong className="text-yellow-400">
                          {rfq.country}
                        </strong>{" "}
                        is looking for{" "}
                        <strong className="text-yellow-400">
                          {rfq.product}
                        </strong>{" "}
                        and has received{" "}
                        <strong className="text-yellow-400">
                          {rfq.quotations}
                        </strong>{" "}
                        quotation(s).
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => alert("Under implementation")}
              className="w-full lg:w-auto py-3 px-8 text-sm bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mb-6"
            >
              View More
            </button>

            <ul className="text-sm lg:text-lg list-none space-y-3 mb-6 lg:mb-0 text-gray-300">
              {[
                "Submit an RFQ in just one minute.",
                "Get multiple quotations from Verified Suppliers.",
                "Compare and choose the best quotation!",
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-yellow-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section (Form) */}
          <form className="bg-white/10 backdrop-blur-md p-6 lg:p-8 rounded-xl shadow-2xl w-full lg:max-w-md z-20 border border-gray-700">
            <div className="text-center mb-6">
              <div className="flex justify-center items-center space-x-3 text-white mb-4">
                <i className="fas fa-file-alt text-2xl text-yellow-400"></i>
                <span className="text-2xl font-semibold">
                  Get Quotations Now
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                "Please enter a specific product name",
                "Quantity",
                "Units",
              ].map((placeholder, index) => (
                <div key={index}>
                  <input
                    type="text"
                    placeholder={placeholder}
                    className="w-full py-3 px-4 bg-gray-800/50 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 placeholder-gray-500 transition-all duration-300"
                  />
                </div>
              ))}

              <div className="text-center mt-4">
                <button
                  onClick={() => alert("under implementation")}
                  className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  rel="nofollow"
                >
                  Request for Quotations
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RfqHomeSection;
