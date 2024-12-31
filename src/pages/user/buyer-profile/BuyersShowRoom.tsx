/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAllProducts, IProduct } from "@/service/apis/product-services";
import { useQuery } from "@tanstack/react-query";
import { ProductSkeleton } from "@/components/product-skeleton";
import { getUserPreferences } from "@/service/apis/user-services";
import { AxiosResponse, HttpStatusCode } from "axios";
import { ProductCard } from "@/components/product-card";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {}

const BuyersShowRoom: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: preferences, isSuccess } = useQuery({
    queryKey: ["userpreference"],
    queryFn: async () => {
      const response = await getUserPreferences();
      if (response.status === 200) {
        return response.data.data as {
          country_id: string;
          currency: string;
          language: string;
        };
      }
    },
  });

  const {
    data: products,
    isLoading: productIsLoading,
    isSuccess: productSuccess,
    isError: productIsError,
    error: productError,
  } = useQuery({
    queryKey: [
      "products",
      searchParams.get("country"),
      searchParams.get("userCurrency"),
      searchParams.get("pageSize"),
      searchParams.get("page"),
      searchParams.get("search"),
      searchParams.get("category"),
    ],
    queryFn: async () => {
      const params = `?page=${page}&pageSize=${pageSize}&userCurrency=${
        preferences?.currency
      }&countryId=${
        searchParams.get("country")
          ? searchParams.get("country")
          : preferences?.country_id
      }`;

      const response: AxiosResponse<any, any> = await getAllProducts(
        `${params}${
          searchParams.get("search")
            ? `&search=${searchParams.get("search")}`
            : ""
        }${
          searchParams.get("category")
            ? `&category=${searchParams.get("category")}`
            : ""
        }`
      );

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as {
          products: IProduct[];
          pageSize: number;
          page: number;
          showRoom: string;
        };
      }
    },
    enabled: isSuccess,
  });
  useEffect(() => {
    const countryParam = searchParams.get("country");
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize");

    if (!countryParam) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        country: countryParam || preferences?.country_id || "",
        page: page || "1",
        pageSize: pageSize || "15",
      });
    }
  }, []);

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams), // Retain other params
      page: newPage.toString(),
    });
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchParams({
      ...Object.fromEntries(searchParams), // Retain other params
      pageSize: event.target.value,
      page: "1", // Reset to page 1 on pageSize change
    });
  };

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {productIsLoading && (
          <div className="bg-white py-12">
            <div className="no-scrollbars flex w-full items-center gap-x-2 overflow-x-scroll scroll-smooth p-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          </div>
        )}

        {productIsError && (
          <div>
            <h1>An error has occured while fetching the products</h1>
            <p>{productError.message}</p>
            <p>{(productError as any)?.data?.message}</p>
          </div>
        )}

        

        {productSuccess &&
          (products?.products.length === 0 ? (
            <div>No Products</div>
          ) : (
            products?.products.map((product) => (
              <ProductCard key={product.product_id} {...product} />
            ))
          ))}
      </div>
      <div className="paginator flex items-center justify-center mt-6 space-x-4">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </button>

        <span>Page {page}</span>

        <button onClick={() => handlePageChange(page + 1)}>Next</button>

        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default BuyersShowRoom;
