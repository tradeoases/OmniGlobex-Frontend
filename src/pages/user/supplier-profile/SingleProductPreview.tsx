/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  IProduct,
  getAllProductCategories,
  getOneProductByUser,
} from "@/service/apis/product-services";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse, HttpStatusCode } from "axios";
import { ProductReviewTab } from "@/components/product-review-tab";
import { productDetailReviewNavs } from "@/data/product-data";
import { useQuery } from "@tanstack/react-query";
import ProductAnalytics from "./ProductAnalytics";
import ProductSellsAndInformation from "./ProductSellsAndInformation";
import { Button } from "@/components/ui/button";
import { getAllCurrencies } from "@/service/apis/countries-services";

const SinglePreviewProduct = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(
    productDetailReviewNavs[0]
  );
  const { id } = useParams();

  // Fetch product categories
  const {
    isLoading: categoryLoading,
    isError: categoryIsError,
    error: categoryError,
    data: categories,
    isSuccess: categorySuccess,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<{
        data: { category_id: string; name: string }[];
      }> = await getAllProductCategories();
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
  });

  const { data: currencies, isSuccess: isCurrenciesSuccess } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const res = await getAllCurrencies();
      if (res.status === HttpStatusCode.Ok) {
        return res.data.data as { currency: string; currency_id: string }[];
      }
    },
  });

  // Fetch the single product based on ID
  const {
    data: product,
    isSuccess: isProductSuccess,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["userProduct", id],
    queryFn: async () => {
      const response: AxiosResponse<{ data: IProduct }> =
        await getOneProductByUser(id || "");
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
    enabled: !!id, // Ensure that the query only runs if there's an ID
  });

  // Render loading state
  if (isProductLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-xl animate-pulse">
        Loading...
      </div>
    );
  }
  console.log({ product });

  return (
    <div className="my-20 w-full space-y-20">
      {isProductError && (
        <div>
          <h1>An error occurred while loading product</h1>
          <p>{productError.message}</p>
        </div>
      )}
      {isProductSuccess && (
        <div>
          <div className="w-10/12 xl:w-8/12 mx-auto lg:grid grid-cols-2 space-y-8 lg:space-y-0 gap-x-20">
            <div className="space-y-8">
              <div className="w-full border p-8">
                <div className="w-full h-96 flex items-center justify-center bg-gray-400">
                  <img
                    src={product?.cover_image?.thumbnail_url}
                    alt={product?.name}
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-semibold text-2xl">{product?.name}</p>
              <p className="flex items-center gap-2">
                <span className="text-xl font-medium text-red-600">
                  {isCurrenciesSuccess &&
                    currencies?.find(
                      (c) => c.currency_id === product?.price_currency
                    )?.currency}{" "}
                  {product?.product_price}
                </span>
              </p>
              <p className="text-sm font-light">{product?.description}</p>

              <div className="w-full flex items-center gap-x-2 text-lg">
                <Button
                  className="bg-black w-full rounded-none h-12 space-x-8"
                  size="lg"
                  onClick={() =>
                    navigate(`/supplier-dashboard/products/entry?edit=${id}`)
                  }
                >
                  Edit Product
                </Button>
              </div>

              <div className="space-y-2">
                <div className="w-full text-md gap-8">
                  {categoryIsError && (
                    <div>
                      Failed to load categories
                      <div>{categoryError.message}</div>
                    </div>
                  )}
                  {categoryLoading && <div>Loading categories...</div>}
                  {categorySuccess && (
                    <p className="text-black text-md font-light">
                      Category:{" "}
                      <span className="text-gray-400">
                        {categories?.find(
                          (category) =>
                            category.category_id === product?.category_id
                        )?.name || "Unknown"}
                      </span>
                    </p>
                  )}

                  <p className="text-black text-md font-light">
                    Tag:{" "}
                    <span className="text-gray-400">
                      {product?.tags && product?.tags !== ""
                        ? product?.tags
                        : "No tags"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full space-y-20 pb-20 bg-zinc-100">
            <div className="border-b">
              <div className="w-10/12 xl:w-8/12 mx-auto flex items-center">
                {productDetailReviewNavs.map((nav) => (
                  <p
                    onClick={() => setActiveTab(nav)}
                    key={nav}
                    className={`py-3 px-7 border-b whitespace-nowrap cursor-pointer ${
                      activeTab === nav ? " border-main " : " border-zinc-100 "
                    }`}
                  >
                    {nav}
                  </p>
                ))}
              </div>
            </div>
            <div className="w-10/12 xl:w-8/12 mx-auto space-y-8">
              {activeTab === "Analytics" && <ProductAnalytics />}
              {activeTab === "Sells and Information" && (
                <ProductSellsAndInformation />
              )}
              {activeTab === "Reviews" && <ProductReviewTab />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePreviewProduct;
