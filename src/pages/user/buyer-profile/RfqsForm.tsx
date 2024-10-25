import React, { useState } from "react";
import RfqDashboard from "./RfqDashboard";
import { RFQCategories } from "./RfqCategories";
import RfqUnits from "./RfqUnits";
import RfqCurrencies from "./RfqCurrencies";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

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

  return (
    <div>
      <div className="block sm:hidden text-center my-4">
        <Link
          to="/buyer-dashboard/rfq"
          className="text-main font-bold cursor-pointer hover:underline"
        >
          My RFQs
        </Link>
      </div>
      <RfqDashboard />
      <div className="max-w-4xl mx-auto my-8">
        <div className="flex justify-between border py-4 px-4 items-start space-x-6">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute transform -translate-x-1/2 w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div className="ml-5 text-center">
                <h3 className="text-sm font-medium">
                  Submit a RFQ in just 1 minute.
                </h3>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative">
              <div className="absolute  transform -translate-x-1/2 w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div className="ml-5 text-center">
                <h3 className="text-sm font-medium">
                  Get multiple quotations from verified suppliers.
                </h3>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative">
              <div className="absolute transform -translate-x-1/2 w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div className="ml-5 text-center">
                <h3 className="text-sm font-medium">
                  Compare and choose the best quotation!
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6">Request for Quotations- RFQ</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              placeholder="Enter a specific product name"
              value={formData.productName}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
            />
            {formErrors.productName && (
              <p className="text-red-500 text-sm">{formErrors.productName}</p>
            )}
          </div>

          <RFQCategories />

          <div>
            <label className="block font-medium text-gray-700">
              About Your Product
            </label>
            <textarea
              name="aboutProduct"
              value={formData.aboutProduct}
              placeholder="Please indicate your detailed requirements to ensure fast and efficient response from suppliers.You may include: Size/Dimension,Packaging requirements and/ or others."
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              rows={4}
            />
            {formErrors.aboutProduct && (
              <p className="text-red-500 text-sm">{formErrors.aboutProduct}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Upload Product Image
            </label>
            <input
              type="file"
              name="productImage"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {formErrors.productImage && (
              <p className="text-red-500 text-sm">{formErrors.productImage}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Sourcing Type
            </label>
            <select
              name="sourcingType"
              value={formData.sourcingType}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
            {formErrors.sourcingType && (
              <p className="text-red-500 text-sm">{formErrors.sourcingType}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5 focus:outline-none">
              <Label htmlFor="eoq">Estimated Order Quantity</Label>
              <Input
                type="text"
                id="eoq"
                name="estimatedQuantity"
                value={formData.estimatedQuantity}
                onChange={handleInputChange}
                placeholder="e.g. 1000"
              />
              {formErrors.estimatedQuantity && (
                <p className="text-red-500 text-sm">
                  {formErrors.estimatedQuantity}
                </p>
              )}
            </div>

            {/* Units */}
            <RfqUnits />

            {/* Currency */}
            <RfqCurrencies />

            {/* Price */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g. 60"
                className=" mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              />
              {formErrors.price && (
                <p className="text-red-500 text-sm">{formErrors.price}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-sm text-gray-600">
              I'd like to send this RFQ to more suppliers, if I have not
              received 20 quotations within the next 48 hours.
            </label>
          </div>
          <div>
            <button
              onClick={() => alert("Under implementation")}
              type="submit"
              className=" bg-main text-white py-2 px-4 rounded-full hover:bg-yellow-500"
            >
              Submit RFQ
            </button>
          </div>

          {successMessage && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 border border-green-400 rounded-md">
              {successMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RFQForm;
