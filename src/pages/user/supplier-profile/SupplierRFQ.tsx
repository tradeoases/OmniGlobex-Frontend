// RFQManagement.js
const SupplierRFQ = () => (
    <div className="p-4 md:max-w-2xl mx-auto">
      {" "}
      {/* Center the form and set max width for larger screens */}
      <h2 className="text-lg font-semibold">Request for Quotation (RFQ)</h2>
      <div className="mt-4">
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-main" // Added focus styles
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-main"
          />
          <textarea
            placeholder="Additional Details"
            className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-main"
            rows={4} // Set a default height for the textarea
          />
          <button className="bg-main text-white px-4 py-2 rounded hover:bg-opacity-90 transition duration-200">
            {" "}
            {/* Hover effect */}
            Submit RFQ
          </button>
        </form>
      </div>
    </div>
  );
  
  export default SupplierRFQ;
  