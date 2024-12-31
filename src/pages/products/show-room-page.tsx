/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import { useSearchParams } from "react-router-dom";
// import Autoplay from "embla-carousel-autoplay";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

import AllProductsPage from "./all-products-page";
import { PageHeader } from "@/components/PageHeader";
import { getAllProducts, IProduct } from "@/service/apis/product-services";
import axios, { AxiosResponse, HttpStatusCode } from "axios";
import { Header } from "@/components/header";
import { useQuery } from "@tanstack/react-query";
// import { ProductCard } from "@/components/product-card";
import SupplierArea from "./supplier-area";
import { getUserPreferences } from "@/service/apis/user-services";
import { useEffect } from "react";

const ShowRoomPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const country = searchParams.get(`country`);

  const catParams: string[] = [];
  searchParams.forEach((value, key) => {
    if (key.match(/^cat\d+$/)) {
      catParams.push(value);
    }
  });

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

  if (isSuccess) {
    console.log({ preferences });
  }

  const page = searchParams.get("page") || 1;
  const pageSize = searchParams.get("pageSize") || 15;

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
      ...catParams,
    ],
    queryFn: async () => {
      const params = `?page=${page}&pageSize=${pageSize}&countryId=${
        searchParams.get("country") ? searchParams.get("country") : ""
      }`;

      if (searchParams.get("category"))
        catParams.push(searchParams.get("category") || "");
      const response: AxiosResponse<any, any> = await getAllProducts(
        `${params}${
          searchParams.get("search")
            ? `&search=${searchParams.get("search")}`
            : ""
        }${catParams.length > 0 ? `&categories=${catParams.join(",")}` : ""}
        `
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
  });

  useEffect(() => {
    const fetchIp = async () => {
      try {
        if (!searchParams.get("country")) {
          const response = await axios.get("https://api.ipify.org?format=json");
          const data = await axios.get(
            `https://api.hackertarget.com/geoip/?q=${response.data.ip}`
          );
          setSearchParams({
            ...Object.fromEntries(searchParams),
            country: data.data.Country,
          });
        }
        // setIp(response.data.ip);
      } catch (error) {
        console.error("Error fetching the IP address", error);
      }
    };

    fetchIp();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <PageHeader
        name={`show room: ${country || ``}`}
        route={`/ ${country || ``}`}
      />
      <div className="w-10/12 mt-8 xl:w-8/12 mx-auto">
        {productSuccess && <Header products={products?.products || null} />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {productIsLoading && <div>Loading...</div>}
        {productIsError && (
          <div>
            <h1>An error occured while loading products</h1>
            <h2>{productError.message}</h2>
          </div>
        )}
      </div>
      <AllProductsPage />
      <SupplierArea />
    </div>
  );
};

export default ShowRoomPage;

// eslint-disable-next-line react-refresh/only-export-components
export const categories = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Health" },
  { id: 3, name: "Finance" },
  { id: 4, name: "Education" },
  { id: 5, name: "Travel" },
  { id: 6, name: "Food" },
  { id: 7, name: "Lifestyle" },
  { id: 8, name: "Entertainment" },
  { id: 9, name: "Sports" },
  { id: 10, name: "Science" },
  { id: 11, name: "Fashion" },
  { id: 9, name: "Sports" },
  { id: 10, name: "Science" },
  { id: 11, name: "Fashion" },
  { id: 9, name: "Sports" },
  { id: 10, name: "Science" },
  { id: 11, name: "Fashion" },
  { id: 12, name: "Business" },
];

// export function CarouselPlugin() {
//   const plugin = React.useRef(Autoplay({ delay: 2000 }));

//   const products = [
//     { id: 1, name: "Product 1", image: "https://via.placeholder.com/150" },
//     { id: 2, name: "Product 2", image: "https://via.placeholder.com/150" },
//     { id: 3, name: "Product 3", image: "https://via.placeholder.com/150" },
//     { id: 4, name: "Product 4", image: "https://via.placeholder.com/150" },
//     { id: 5, name: "Product 5", image: "https://via.placeholder.com/150" },
//   ];

//   return (
//     <Carousel
//       plugins={[plugin.current]}
//       className="w-10/12 xl:w-8/12 mx-auto"
//       onMouseEnter={plugin.current.stop}
//       onMouseLeave={plugin.current.reset}
//     >
//       <CarouselContent className="h-96">
//         {products.products.map((product) => (
//           <CarouselItem key={product.id}>
//             <div className="p-1 h-full">
//               <Card className="h-full">
//                 <CardContent className="flex aspect-square items-center justify-center p-6 h-full">
//                   <img src={product.image} alt={product.name} className="" />
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// }
