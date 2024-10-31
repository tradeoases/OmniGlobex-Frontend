import React, { useState, useEffect } from "react";
import RfqDashboard from "./RfqDashboard";
import { RFQCategories } from "./RfqCategories";
import { RfqUnits } from "./RfqUnits";
import { RfqCurrencies } from "./RfqCurrencies";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface FormData {
  productName: string;
  productCategory: string;
  aboutProduct: string;
  productImage: File | null;
  sourcingType: string;
  estimatedQuantity: string;
  units: string;
  preferredUnitPrice: string;
  price: string;
}

interface FormErrors {
  productName?: string;
  productCategory?: string;
  aboutProduct?: string;
  productImage?: string;
  sourcingType?: string;
  estimatedQuantity?: string;
  units?: string;
  preferredUnitPrice?: string;
  price?: string;
}

const RFQForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    productCategory: "",
    aboutProduct: "",
    productImage: null,
    sourcingType: "",
    estimatedQuantity: "",
    units: "",
    preferredUnitPrice: "",
    price: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAnyDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAnyDropdownOpen]);



  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, productImage: e.target.files[0] });
    }
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.productName) errors.productName = "Product name is required";
    if (!formData.productCategory)
      errors.productCategory = "Please select a product category";
    if (!formData.aboutProduct)
      errors.aboutProduct = "Please provide details about your product";
    if (!formData.productImage)
      errors.productImage = "Please upload an image of your product";
    if (!formData.estimatedQuantity)
      errors.estimatedQuantity = "Estimated quantity is required";
    if (!formData.sourcingType)
      errors.sourcingType = "Sourcing Type is required";
    if (!formData.units) errors.units = "Please select a unit";
    if (!formData.preferredUnitPrice)
      errors.preferredUnitPrice = "Please select a unit price";
    if (!formData.price) errors.price = "Please select a price";
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted:", formData);
      setSuccessMessage("Your RFQ has been submitted successfully!");
      setFormErrors({});
      setFormData({
        productName: "",
        productCategory: "",
        aboutProduct: "",
        productImage: null,
        sourcingType: "",
        estimatedQuantity: "",
        units: "",
        preferredUnitPrice: "",
        price: "",
      });
    } else {
      setFormErrors(errors);
      setSuccessMessage("");
    }
  };

  const handleClose = () => {
    navigate("/buyer-dashboard/rfq");
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className={`${isAnyDropdownOpen ? "md:pr-[17px]" : ""}`}>
        <RfqDashboard />

        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-lg my-8">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Request for Quotations
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 ease-in-out"
              aria-label="Close form"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                placeholder="Enter a specific product name"
                value={formData.productName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none"
              />
              {formErrors.productName && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.productName}
                </p>
              )}
            </div>

            {/* Categories component remains the same */}
            <RFQCategories
              onDropdownChange={(isOpen) => setIsAnyDropdownOpen(isOpen)}
            />

            {/* About Product */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                About Your Product
              </label>
              <textarea
                name="aboutProduct"
                value={formData.aboutProduct}
                placeholder="Please indicate your detailed requirements..."
                onChange={handleInputChange}
                className="w-full p-3  border focus:outline-none rounded-lg min-h-[120px]"
                rows={4}
              />
              {formErrors.aboutProduct && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.aboutProduct}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Upload Product Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200 ease-in-out">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="pt-1 text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                  </div>
                  <input
                    type="file"
                    name="productImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="opacity-0"
                  />
                </label>
              </div>
              {formErrors.productImage && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.productImage}
                </p>
              )}
            </div>

            {/* Sourcing Type */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Sourcing Type
              </label>
              <select
                name="sourcingType"
                value={formData.sourcingType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none"
              >
                <option value="">Select one</option>
                <option value="Business Service">Business Service</option>
                <option value="Customized Product">Customized Product</option>
                <option value="Non-customized Product">
                  Non-customized Product
                </option>
                <option value="Total Solution">Total Solution</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Existing grid components with updated styling */}
              <div className="space-y-2">
                <Label
                  htmlFor="eoq"
                  className="text-sm font-semibold text-gray-700"
                >
                  Estimated Order Quantity
                </Label>
                <Input
                  type="text"
                  id="eoq"
                  name="estimatedQuantity"
                  value={formData.estimatedQuantity}
                  onChange={handleInputChange}
                  placeholder="e.g. 1000"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none"
                />
              </div>

              <RfqUnits
                onDropdownChange={(isOpen) => setIsAnyDropdownOpen(isOpen)}
              />
              <RfqCurrencies
                // onDropdownChange={(isOpen) => setIsAnyDropdownOpen(isOpen)}
              />

              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-sm font-semibold text-gray-700"
                >
                  Price
                </Label>
                <Input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g. 60"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none"
                />
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-center space-x-3 py-4">
              <Checkbox id="remember" className="h-5 w-5" />
              <label htmlFor="remember" className="text-sm text-gray-600">
                I'd like to send this RFQ to more suppliers, if I have not
                received 20 quotations within the next 48 hours.
              </label>
            </div>

            {/* Submit Button */}
            <div>
              <button
              onClick={() => alert("under implementation")}
                type="submit"
                className="bg-main text-white py-3 px-8 rounded-lg hover:bg-yellow-500 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none "
              >
                Submit RFQ
              </button>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="mt-4 p-4 bg-green-50 text-green-700 border border-green-200 rounded-lg">
                {successMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RFQForm;
