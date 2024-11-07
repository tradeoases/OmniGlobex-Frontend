import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/service/apis/user-services";
import { IProfile } from "@/service/apis/user-services";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import {
  getAllProductByUser,
  IProduct,
  getAllProductCategories,
} from "@/service/apis/product-services";
import { StoreFrontCardProducts } from "./StoreFrontCardProducts";
import { Outlet } from "react-router-dom";

const StoreFrontPreview = () => {
  const [previewMode] = useState<"edit" | "preview">("preview");
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const {
    data: user,
    isSuccess: isUserSuccess,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["personal"],
    queryFn: async () => {
      const res = await getUserInfo();
      if (res.status === HttpStatusCode.Ok) {
        return res.data.data as IProfile;
      }
    },
  });

  const { data: products, isSuccess: isProductSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await getAllProductByUser();
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
  });

  const {
    data: categories,
    isLoading: categoryLoading,
    isError: categoryIsError,
    isSuccess: categorySuccess,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await getAllProductCategories();
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
  });

  useEffect(() => {
    if (previewMode === "preview") {
      refetchUser();
    }
  }, [previewMode, refetchUser]);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="sticky top-0 mt-10 backdrop-blur-sm bg-white/80 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-main to-yellow-500 bg-clip-text text-transparent">
              Storefront Preview
            </h2>
          </div>
        </div>
      </div>

      {isUserSuccess && user && (
        <div className="pb-16">
          <div className="relative h-[96] w-full overflow-hidden">
            <img
              className="w-60 h-60 object-cover transform hover:scale-105 transition-transform duration-700"
              src={user.avatar_url || "/default-banner.jpg"}
              alt={`${user.business_name || "Business"} Banner`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
            <div className="absolute bottom-0 left-0 right-0 p-14 text-white">
              <h1 className="text-5xl font-bold mb-4 animate-fade-in">
                {user.business_name}
              </h1>
              <p className="text-xl opacity-90">{user.profile.city}</p>
              {user.profile.slogan && (
                <p className="text-xl opacity-90 mt-3 italic">
                  {user.profile.slogan}
                </p>
              )}
            </div>
          </div>

          <div className="relative -mt-24 mb-8 px-8">
            <div className="h-48 w-48 rounded-full ring-4 ring-white overflow-hidden bg-white shadow-2xl hover:shadow-3xl transition-shadow duration-300">
              <img
                src={user.avatar_url || "/default-avatar.jpg"}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                alt="Profile"
              />
            </div>
          </div>

          <Tabs
            defaultValue="overview"
            className="space-y-8 px-4 sm:px-6 lg:px-8"
          >
            <TabsList className="bg-white/80 backdrop-blur-sm p-1.5 rounded-xl shadow-lg">
              <TabsTrigger value="overview" className="text-sm font-medium">
                Overview
              </TabsTrigger>
              <TabsTrigger value="products" className="text-sm font-medium">
                Products
              </TabsTrigger>
              <TabsTrigger value="about" className="text-sm font-medium">
                About
              </TabsTrigger>
              <TabsTrigger value="contact" className="text-sm font-medium">
                Contact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
                    {user.profile.year_started
                      ? new Date().getFullYear() - user.profile.year_started
                      : 0}
                  </div>
                  <div className="text-sm text-gray-600">Years in Business</div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
                  <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-2">
                    {user.profile.number_of_employees || 0}
                  </div>
                  <div className="text-sm text-gray-600">Employees</div>
                </div>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-gray-100">
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent mb-2">
                    {user.profile.business_verified ? "Verified" : "Unverified"}
                  </div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>

              {/* Enhanced Business Description */}
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-10 mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
                  About Us
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {user.profile.description || "No description available"}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Our Products
                </h2>

                {selectedProduct ? (
                  <div className="my-10 w-full">
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="mb-6 flex items-center text-main hover:text-yellow-500 transition-colors duration-200 w-10/12 xl:w-8/12 mx-auto"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Back to Products
                    </button>

                    <div className="w-10/12 xl:w-8/12 mx-auto lg:grid grid-cols-2 space-y-8 lg:space-y-0 gap-x-20">
                      {/* Updated Image Section */}
                      <div className="space-y-8">
                        <div className="w-full border p-8 bg-white rounded-xl shadow-sm">
                          <div
                            className="w-full h-96 flex items-center justify-center overflow-hidden rounded-lg cursor-pointer group relative"
                            onClick={() => setIsImageModalOpen(true)}
                          >
                            <img
                              src={selectedProduct.cover_image?.thumbnail_url}
                              alt={selectedProduct.name}
                              className="object-cover h-full w-full hover:scale-105 transition-transform duration-300"
                            />
                            {/* Overlay with zoom icon */}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <svg
                                className="w-12 h-12 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="space-y-8 bg-white p-8 rounded-xl shadow-sm">
                        <div>
                          <h1 className="font-bold text-3xl text-gray-900 mb-3">
                            {selectedProduct.name}
                          </h1>
                          <div className="flex items-center gap-3 mb-4">
                            <Badge
                              variant="secondary"
                              className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                            >
                              In Stock
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="bg-green-50 text-green-700 hover:bg-green-100"
                            >
                              Verified Product
                            </Badge>
                          </div>
                        </div>

                        <div className="border-t border-b py-6">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-gray-900">
                              {selectedProduct.price_currency}{" "}
                              {selectedProduct.product_price}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-semibold text-gray-900">
                            Description
                          </h3>
                          <div className="relative">
                            <p className="text-gray-600 leading-relaxed text-base">
                              {showFullDescription
                                ? selectedProduct.description
                                : truncateText(
                                    selectedProduct.description,
                                    200
                                  )}
                            </p>
                            {selectedProduct.description.length > 200 && (
                              <button
                                onClick={() =>
                                  setShowFullDescription(!showFullDescription)
                                }
                                className="text-blue-600 hover:text-blue-700 font-medium mt-2 transition-colors duration-200"
                              >
                                {showFullDescription
                                  ? "Show Less"
                                  : "Read More"}
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-xl font-semibold text-gray-900 mb-6">
                            Product Details
                          </h3>
                          <div className="">
                            {/* Category Card */}
                            <div className="">
                              <div className="">
                                <div className=" items-center gap-4 mb-4">
                                  <div>
                                    <span className="text-sm font-medium text-gray-500">
                                      Category
                                    </span>
                                    {categorySuccess && (
                                      <p className="text-sm font-semibold text-gray-900 mt-1">
                                        {categories?.find(
                                          (category: any) =>
                                            category.category_id ===
                                            selectedProduct.category_id
                                        )?.name || "Unknown"}
                                      </p>
                                    )}
                                    {categoryLoading && (
                                      <div className="flex items-center gap-2 mt-1">
                                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-gray-600">
                                          Loading...
                                        </span>
                                      </div>
                                    )}
                                    {categoryIsError && (
                                      <p className="text-red-500 mt-1">
                                        Unable to load category
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Tags Card */}
                            {selectedProduct.tags && (
                              <div className="">
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-4 mb-4">
                                    <span className="text-sm font-medium text-gray-500">
                                      Tags
                                    </span>
                                  </div>

                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedProduct.tags
                                      .split(",")
                                      .map((tag, index) => (
                                        <span
                                          key={index}
                                          className="px-4 py-2 rounded-lg bg-purple-50 text-purple-600 text-sm font-medium hover:bg-purple-100 transition-colors duration-200"
                                        >
                                          {tag.trim()}
                                        </span>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Grid view of all products
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {isProductSuccess && products?.length > 0 ? (
                      products.map((product: IProduct) => (
                        <StoreFrontCardProducts
                          key={product.product_id}
                          {...product}
                          onPreview={() => setSelectedProduct(product)}
                        />
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No products available</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Outlet />
            </TabsContent>

            <TabsContent value="about">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Company Information
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Business Address
                    </h3>
                    <p className="text-gray-600">{user.business_name}</p>
                    <p className="text-gray-600">{user.profile.address}</p>
                    <p className="text-gray-600">{user.profile.city}</p>
                    {/* <p className="text-gray-600">{user.profile.country_id}</p> */}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {user.profile.phonenumber && (
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {user.profile.phonenumber}
                    </div>
                  )}
                  {user.email && (
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {user.email}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Updated image modal with better mobile styling */}
      {isImageModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsImageModalOpen(false);
              }}
              className="absolute -top-2 -right-2 md:top-4 md:right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white hover:text-gray-300 transition-all duration-200 z-50"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={selectedProduct.cover_image?.thumbnail_url}
              alt={selectedProduct.name}
              className="max-h-[90vh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreFrontPreview;
