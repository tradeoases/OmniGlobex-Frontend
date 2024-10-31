/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import {
  HiMiniFlag,
  // HiMiniHeart,
  // HiOutlineMinusSmall,
  // HiOutlinePlusSmall,
} from "react-icons/hi2";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import {
  getAllProductCategories,
  getOneProduct,
  IProduct,
} from "@/service/apis/product-services";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AxiosResponse, HttpStatusCode } from "axios";
import { ProductSellerInfoTab } from "@/components/product-seller-info-tab";
import ProductDeliveryTermsTab from "@/components/product-delivery-tab";
import { ProductReviewTab } from "@/components/product-review-tab";
import { productDetailNavs } from "@/data/product-data";
import { useQuery } from "@tanstack/react-query";
import { UnderConstruction } from "@/components/under-construction";
import { Button } from "@/components/ui/button";
import { createConversation } from "@/service/apis/message-service";

const SingleProduct = () => {
  const [activeTab, setActiveTab] = useState<string>(productDetailNavs[0]);
  const [searchParams] = useSearchParams();
  const product_id = searchParams.get(`product_id`);
  const [productImage, setProductImages] = useState<
    {
      image_url?: string;
      thumbnail_url?: string;
      currentImage: boolean;
    }[]
  >();

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

  // Fetch the single product based on ID
  const {
    data: product,
    isSuccess: isProductSuccess,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
  } = useQuery({
    queryKey: ["product", product_id],
    queryFn: async () => {
      const response: AxiosResponse<{ data: IProduct }> = await getOneProduct(
        product_id || ""
      );
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
    enabled: !!product_id, // Ensure that the query only runs if there's an ID
  });
  console.log({ product });
  const navigate = useNavigate();
  const handleStartConversation = async (id: string, product_id: string) => {
    try {
      const res = await createConversation({
        id,
        type: "DIRECT",
      });
      if (
        res.status === HttpStatusCode.Created ||
        res.status === HttpStatusCode.Ok
      ) {
        const r = res.data.data;
        console.log({ r });
        navigate(`/buyer-dashboard/messages/${r.id}`, {
          state: {
            url: `https://www.omniglobex.com/single-product/?product_id=${product_id}`,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isProductSuccess && product) {
      setProductImages([
        { ...product.cover_image, currentImage: true },
        ...product.productImages.map((image) => ({
          ...image,
          currentImage: false,
        })),
      ]);
    }
  }, [isProductSuccess, product]);

  if (isProductLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-xl animate-pulse">
        Loading...
      </div>
    );
  }

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
                    src={
                      productImage?.find((image) => image.currentImage === true)
                        ?.thumbnail_url
                    }
                    alt={product?.name}
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {productImage?.map((productImage) => (
                  <div
                    key={productImage.thumbnail_url}
                    className="w-full p-0 border"
                    onClick={() => {
                      setProductImages((prev) => {
                        return prev?.map((image) => ({
                          ...image,
                          currentImage:
                            image.thumbnail_url === productImage.thumbnail_url,
                        }));
                      });
                    }}
                  >
                    <img
                      src={productImage?.thumbnail_url}
                      alt={product?.name}
                      className="object-cover h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-semibold text-2xl">{product?.name}</p>
              <p className="flex items-center gap-2">
                <span className="text-xl font-medium text-red-600">
                  {product?.price_currency} {product?.product_price}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  {/* {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="text-xl text-main">
                  ★
                </span>
              ))} */}
                </div>
                <h1>Reviews</h1>
                {/* <UnderConstruction /> */}
                <div className="col-span-3 flex items-center justify-center">
                  <p className=" text-gray-500 flex gap-4 items-center">
                    <span className="text-3xl text-gray-300">🚧</span>
                    <span className="animate-pulse font-semibold text-2xl">
                      under construction
                    </span>
                  </p>
                </div>
                {/* <p>4 reviews</p> */}
              </div>

              <p className="text-sm font-light">{product?.description}</p>

              <div className="w-full flex items-center gap-x-2 text-lg"></div>

              <div className="space-y-2">
                <div className="w-full text-md gap-8">
                  {/* <div className="w-full flex items-center gap-x-2 text-lg">
                    <div className="border w-32 bg-white flex items-center">
                      <Button
                        onClick={() => {}}
                        className="bg-white hover:bg-white rounded-none text-black shadow-none h-12 space-x-8"
                      >
                        <HiOutlineMinusSmall />
                      </Button>
                      <span className="w-10 text-center">{0}</span>

                      <Button
                        onClick={() => {}}
                        className="bg-white hover:bg-white rounded-none text-black shadow-none h-12 space-x-8"
                      >
                        <HiOutlinePlusSmall />
                      </Button>
                    </div>
                    <Button
                      className="bg-black w-24 rounded-none h-12 space-x-8"
                      size="icon"
                    >
                      <HiMiniHeart className="text-3xl" />
                    </Button>
                    <Button
                      className="bg-black w-full rounded-none h-12 space-x-8"
                      size="lg"
                      onClick={() => {}}
                    >
                      Add To Cart
                    </Button>{" "}
                    *
                  </div> */}

                  <div className="space-y-2">
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
                    {/* <p className="text-black text-sm font-light">
                      SKU : <span className="text-gray-400">KE-91039</span>
                    </p> */}
                  </div>

                  <div className="text-red-600 flex items-center gap-x-4 cursor-pointer">
                    <HiMiniFlag />
                    <span>Report This Item</span>
                  </div>

                  <div className="flex items-center gap-x-4">
                    <span>Share this </span>
                    <Button
                      onClick={() => {
                        handleStartConversation(
                          product?.business_id || "",
                          product?.product_id || ""
                        );
                      }}
                    >
                      Message Suppliers
                    </Button>
                    <FaFacebookF className="text-xl text-blue-800 cursor-pointer" />
                    <BiLogoInstagramAlt className="text-xl text-pink-600 cursor-pointer" />
                    <FaTwitter className="text-xl text-sky-600 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full space-y-20 pb-20 bg-zinc-100">
        <div className="border-b">
          <div className="w-10/12 xl:w-8/12 mx-auto flex items-center">
            {productDetailNavs.map((nav, i) => (
              <p
                onClick={() => setActiveTab(nav)}
                key={i}
                className={`py-3 px-7 border-b whitespace-nowrap cursor-pointer ${
                  activeTab === nav ? " border-main " : " border-zinc-100 "
                }`}
              >
                {nav}
              </p>
            ))}
          </div>
        </div>
        <div className=" w-10/12 xl:w-8/12 mx-auto space-y-8">
          {activeTab === "Delivery Terms" && (
            <ProductDeliveryTermsTab
              deliveryTerms={product?.delivery_terms || ""}
            />
          )}
          {activeTab === "Seller Info" && <ProductSellerInfoTab />}
          {activeTab === "Reviews" && <ProductReviewTab />}
        </div>
      </div>

      <div className="w-10/12 xl:w-8/12 mx-auto space-y-8">
        <p className="text-3xl font-bold">Related Products</p>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* {products ? (
            products
              .slice(0, 4)
              .map((product, i) => <ProductCard key={i} {...product} />)
          ) : (
            <div>loading...</div>
          )} */}
          <UnderConstruction />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
{
  /* <div className="w-10/12 xl:w-8/12 mx-auto lg:grid grid-cols-2 space-y-8 lg:space-y-0 gap-x-20">
        <div className="space-y-8">
          <div className="w-full border p-8">
            <div className="w-full h-96 flex items-center justify-center bg-gray-400">
              <img
                src={product.cover_image?.thumbnail_url}
                alt={product.name}
                className="object-cover h-full w-full"
              />
            </div>
          </div>

          
        </div>

        <div className="space-y-4">
          <p className="uppercase font-light text-sm text-gray-600">
            Mobile Phones
          </p>
          <p className="font-semibold">{product.name}</p>

          
          <p className="flex items-center gap-2">
            <span className="line-through text-gray-400 font-semibold">
              $99.09
            </span>
            <span className="text-2xl font-medium text-red-600">$99.09</span>
          </p>

          <p className="text-sm font-light">{product.description}</p>

          <div>
            <p>Color</p>
            <p className="flex items-center gap-x-4">
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-black">
                1
              </span>
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-pink-400">
                1
              </span>
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-yellow-400">
                1
              </span>
              <span className="w-6 h-6 rounded-full flex items-center justify-center bg-green-400">
                1
              </span>
            </p>
          </div>

          <div>
            <p className="font-light">SIZE</p>
            <Button
              className="bg-white w-full hover:bg-white flex items-center justify-between rounded-none text-black h-12 space-x-8"
              size="lg"
            >
              <span>small</span> <HiChevronDown />
            </Button>
          </div>

          
      </div> */
}
