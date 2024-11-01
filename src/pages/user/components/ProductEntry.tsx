/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse, HttpStatusCode } from "axios";
import { createProductSchema } from "@/data/schemas/product-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  createProduct,
  getAllProductCategories,
  getOneProduct,
  updateProduct,
} from "@/service/apis/product-services";
import {
  getAllCurrencies,
  getAllProductUnits,
  getAllShowrooms,
} from "@/service/apis/countries-services";
// import { HiOutlineXMark } from "react-icons/hi2";
import { ICreateProduct } from "@/data/product-data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SingleImageUpload from "@/components/ui/SingleImageUploadArea";
import { uploadImages } from "@/service/apis/image-service";
import { useNavigate, useSearchParams } from "react-router-dom";
import MultipleImageUpload from "@/components/ui/MultipleImageUploadArea";

const ProductEntry = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const [images, setImages] = useState<{ [k: string]: string }>({});

  const { data: product, isSuccess: isProductSuccess } = useQuery({
    queryKey: ["product", editId],
    queryFn: async () => {
      const res = await getOneProduct(editId || "");
      if (
        res.status === HttpStatusCode.Ok ||
        res.status === HttpStatusCode.Created
      ) {
        return res.data.data;
      }
    },
    enabled: !!editId,
  });

  const {
    data: currencies,
    isSuccess: isCurrencySuccess,
    isError: isCurrencyError,
    isLoading: isCurrencyLoading,
  } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const res = await getAllCurrencies();
      if (
        res.status === HttpStatusCode.Ok ||
        res.status === HttpStatusCode.Created
      ) {
        console.log({ currencies: res.data.data });
        return res.data.data as {
          currency: string;
          currency_id: string;
          currency_name: string;
        }[];
      }
    },
  });

  const [showRooms, setShowRooms] = useState<
    {
      countryId: string;
      country: string;
      selected: boolean;
    }[]
  >([]);

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      categoryId: "",
      productPrice: "",
      priceCurrency: "",
    },
  });

  useEffect(() => {
    if (isProductSuccess) {
      const cur =
        currencies?.find((cur) => cur.currency === product.price_currency)
          ?.currency_id || "";
      console.log({ cur });
      console.log(product);
      form.setValue("name", product.name);
      form.setValue("categoryId", product?.category_id);
      form.setValue("deliveryTerms", product.delivery_terms);
      form.setValue("description", product.description);
      form.setValue("priceCurrency", cur);
      form.setValue("productPrice", product.product_price);
    }
  }, [isProductSuccess, product, form, currencies]);
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (values: z.infer<typeof createProductSchema>) => {
    try {
      const data: ICreateProduct = {
        ...values,
        showRooms: showRooms
          .filter((i) => i.selected)
          .map((item) => item.countryId),
      };

      if (image) {
        const imageResponse: AxiosResponse<any, any> = await uploadImages({
          images: [image],
        });

        if (
          imageResponse.status === HttpStatusCode.Ok ||
          imageResponse.status === HttpStatusCode.Created
        ) {
          data.coverImage = imageResponse.data.data[0].image_id;
        }
      }

      if (Object.values(images).length > 0) {
        const imagesResponse: AxiosResponse<any, any> = await uploadImages({
          images: Object.values(images),
        });

        if (
          imagesResponse.status === HttpStatusCode.Ok ||
          imagesResponse.status === HttpStatusCode.Created
        ) {
          data.productImages = imagesResponse.data.data.map(
            (image: { image_id: string }) => image.image_id
          );
        }
      }

      // If `editId` exists, update the product
      if (editId) {
        const response: AxiosResponse<any, any> = await updateProduct(
          editId,
          data
        );

        if (response.status === HttpStatusCode.Ok) {
          setSuccessMessage("Product updated successfully!");
          navigate("/supplier-dashboard/products");
        }
      } else {
        // Otherwise, create a new product
        const response: AxiosResponse<any, any> = await createProduct(data);
        if (response.status === HttpStatusCode.Ok) {
          form.reset();
          navigate("/supplier-dashboard/products");
          setSuccessMessage("Product added successfully!");
        }
      }

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    isLoading: categoryLoading,
    isError: categoryIsError,
    error: categoryError,
    data: categories,
    isSuccess: categorySuccess,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProductCategories();
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
  });

  const [image, setImage] = useState<string | null>(null);

  const {
    isLoading: countryLoading,
    data: countries,
    isError: countryIsError,
    error: countryError,
    isSuccess: countryIsSuccess,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllShowrooms();
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
  });

  const {
    isLoading: unitsLoading,
    data: units,
    isError: unitsIsError,
    error: unitsError,
    isSuccess: unitsIsSuccess,
  } = useQuery({
    queryKey: ["units"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProductUnits();
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as {
          unit_id: string;
          unit: string;
          unit_name: string;
        }[];
      }
    },
  });

  useEffect(() => {
    if (countryIsSuccess) {
      const showrooms = countries.map((country: any) => ({
        countryId: country.showroom_id,
        country: country.showroom_name,
        selected: product?.showRooms?.find(
          (psr: any) => country?.showroom_id === psr?.country_id
        )
          ? true
          : false,
      }));

      setShowRooms(showrooms);
    }
  }, [countryIsSuccess, countries, product, editId]);

  return (
    <div className="relative max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      {/* Close button - repositioned to account for nav tabs */}
      <div className="absolute right-3 top-[-30px] sm:top-[-45px] md:top-[-50px]">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100/80 transition-colors duration-200"
          aria-label="Close form"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {successMessage && (
        <div className="mt-4 text-green-500">{successMessage}</div>
      )}
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 sm:space-y-8 mt-8 sm:mt-10"
          >
            {/* Adjust form field spacing for mobile */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Product Name *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus-visible:outline-none focus-visible:ring-offset-0"
                        placeholder="Product Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8">
              {categoryIsError && (
                <div>
                  Faild to load categories
                  <div>{categoryError.message}</div>
                </div>
              )}
              {categoryLoading && <div>Loading categories...</div>}
              {categorySuccess && (
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={product?.category_id || field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {categories &&
                                  categories.map(
                                    (category: {
                                      category_id: string;
                                      name: string;
                                    }) => (
                                      <SelectItem
                                        key={category.category_id}
                                        value={category.category_id}
                                      >
                                        {category.name}
                                      </SelectItem>
                                    )
                                  )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              )}

              {countryIsError && (
                <div>
                  An error occured while loading showrooms
                  <div>{countryError.message}</div>
                </div>
              )}
              {countryLoading && <div>Loading showrooms...</div>}
              <Popover>
                <PopoverTrigger>
                  <div className="cursor-pointer border py-2 rounded text-gray-600 text-sm">
                    Select Showrooms
                  </div>
                </PopoverTrigger>
                <PopoverContent className="max-h-60 cursor-pointer w-64 overflow-y-auto bg-white shadow-lg rounded-md p-4 border border-gray-200">
                  {showRooms.map((room, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2"
                    >
                      <span>{room.country}</span>
                      <input
                        type="checkbox"
                        checked={room.selected}
                        onChange={() =>
                          setShowRooms((prev) =>
                            prev.map((r, i) =>
                              i === index ? { ...r, selected: !r.selected } : r
                            )
                          )
                        }
                      />
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
            <SingleImageUpload
              image={image}
              setImage={(image: string | null): void => setImage(image)}
              image_url={product?.cover_image.thumbnail_url}
              fieldName="coverImage" // Add this line
            />

            <div className="">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the product details"
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full space-y-4 ">
              <p className="text-base font-bold">Price</p>

              <div className=" grid-cols-1 md:grid-cols-2 grid gap-4 ">
                {isCurrencyError && (
                  <div>
                    <h1>An error occured while loading currencies</h1>
                  </div>
                )}
                {isCurrencyLoading && <div>Currencies is loading...</div>}
                {isCurrencySuccess &&
                  !isCurrencyLoading &&
                  !isCurrencyError && (
                    <FormField
                      control={form.control}
                      name="priceCurrency"
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={
                              currencies?.find(
                                (r) => r.currency === product?.price_currency
                              )?.currency_id ||
                              field.value ||
                              ""
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a currency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {currencies &&
                                  Array.isArray(currencies) &&
                                  currencies?.map(
                                    (currency: {
                                      currency_id: string;
                                      currency: string;
                                      currency_name: string;
                                    }) => (
                                      <SelectItem
                                        key={currency.currency_id}
                                        value={currency.currency_id}
                                      >
                                        {currency.currency_name}
                                      </SelectItem>
                                    )
                                  )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                {}
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="productPrice"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="text"
                            className="focus:outline-none"
                            placeholder="Current Price"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="deliveryTerms"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Textarea
                          placeholder="Enter the Payment & Delivery Terms"
                          className=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className=" grid-cols-1 md:grid-cols-2 grid gap-4 ">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder="Product Tags"
                          className=""
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {unitsLoading && <div>Loading units...</div>}
              {unitsIsError && (
                <div>
                  <h1>An error occured while loading units</h1>
                  <h2>{JSON.stringify(unitsError)}</h2>
                </div>
              )}
              {unitsIsSuccess && (
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={
                            units?.find((r) => r.unit_id === product?.unit_id)
                              ?.unit_id ||
                            field.value ||
                            ""
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {units &&
                                Array.isArray(units) &&
                                units?.map((unit) => (
                                  <SelectItem
                                    key={unit.unit_id}
                                    value={unit.unit_id}
                                  >
                                    {unit.unit_name} ({unit.unit})
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
            <MultipleImageUpload images={images} setImages={setImages} />

            <Button
              type="submit"
              className="w-full py-5 sm:py-6 text-base sm:text-lg"
            >
              {editId ? "Update" : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductEntry;
