/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse, HttpStatusCode } from "axios";

import { getAllProductByUser, IProduct } from "@/service/apis/product-services";
import { useQuery } from "@tanstack/react-query";
import { ProductPageProductCard } from "./product-page-product-card";
import { NavLink } from "react-router-dom";

interface Props {}

export const ProductManagementProductTab: React.FC<Props> = () => {
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductError,
    isSuccess: isProductSuccess,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProductByUser();

      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
    },
  });

  return (
    <div className="space-y-10 w-full">
      <div className="w-full">
        <NavLink
          className="inline-flex items-center px-4 py-2 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90"
          to={"entry"}
        >
          New Product
        </NavLink>
      </div>

      <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {isProductSuccess && products.length > 0
          ? products?.map((product: IProduct) => (
              <ProductPageProductCard {...product} />
            ))
          : isProductSuccess && <div>no product added</div>}
        {isProductError && (
          <div>
            <h1>An error occured while loading your products</h1>
          </div>
        )}
        {isProductsLoading && <div>Your products are loading...</div>}
        
      </div>
    </div>
  );
};
