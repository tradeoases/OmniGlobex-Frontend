// Define an interface for RFQ data
interface RFQ {
  name: string;
  country: string;
  product: string;
  quotations: number;
}

interface RFQCarouselProps {
  rfqs: RFQ[];
}

const RFQCarousel: React.FC<RFQCarouselProps> = ({ rfqs }) => {
  return (
    <div className="rfq-carousel mb-4">
      {rfqs.length === 0 ? (
        <p className="text-center text-gray-700">
          No RFQs available at the moment.
        </p>
      ) : (
        <div className="carousel">
          {rfqs.map((rfq, index) => (
            <div
              key={index}
              className="rfq-item bg-gray-200 text-gray-400 p-4 rounded-md shadow mb-2"
            >
              <p className="rfq-text">
                <strong>{rfq.name}</strong> from <strong>{rfq.country}</strong>{" "}
                is looking for <strong>{rfq.product}</strong> and has received{" "}
                <strong>{rfq.quotations}</strong> quotation(s).
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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
    <div className="w-full p-8 bg-gray-700 relative">
      <div
        className="bg-cover bg-center flex flex-col lg:flex-row justify-between items-start text-white p-8 rounded-md shadow-lg relative"
        // style={{
        //   backgroundImage:
        //     "url('https://s.globalsources.com/IMAGES/website/image/home/rfq_home.jpg')",
        // }}
      >
        {/* Left Section (Content) */}
        <div className="w-full lg:w-1/2 z-10 mb-8 lg:mb-0">
          <a href="/buyerCenter/RFQForm" className="block">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Request for Quotations (RFQ)
            </h2>
          </a>

          {/* RFQCarousel Component */}
          <RFQCarousel rfqs={rfqs} />

          <button
            onClick={() => alert("Under implementation")}
            className="py-2 px-6 text-small bg-main hover:bg-yellow-500 text-white rounded-full font-medium mb-4"
          >
            View More
          </button>

          <ul className="text-base lg:text-lg list-disc list-inside space-y-2">
            <li>Submit an RFQ in just one minute.</li>
            <li>Get multiple quotations from Verified Suppliers.</li>
            <li>Compare and choose the best quotation!</li>
          </ul>
        </div>

        {/* Right Section (Form) */}
        <form className="bg-white p-6 rounded-md shadow-md w-full max-w-md z-20">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center space-x-2 text-gray-700 mb-4">
              <i className="fas fa-file-alt text-xl"></i>
              <span className="text-xl font-semibold">Get Quotations Now</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <input
                type="text"
                placeholder="Please enter a specific product name"
                className="w-full py-3 px-4 text-gray-500 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Quantity"
                className="w-full py-3 px-4 text-gray-500 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Units"
                className="w-full py-3 px-4 border text-gray-500 border-gray-300 rounded-md focus:outline-none"
              />
            </div>

            <div className="text-center">
              <button
                onClick={() => alert("under implementation")}
                className="inline-block text-sm py-3 px-4 bg-main hover:bg-yellow-500 text-white rounded-full font-normal"
                rel="nofollow"
              >
                Request for Quotations
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Ensuring space at the bottom for other components */}
      <div className="mt-16 lg:mt-0"></div>
    </div>
  );
};

export default RfqHomeSection;
