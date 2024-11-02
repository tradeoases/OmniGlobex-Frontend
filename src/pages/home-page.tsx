/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse, HttpStatusCode } from "axios";

import AnnounceBanner from "@/components/AnnounceBanner";
import BestSeller from "@/components/BestSeller";
import GameWorldSection from "@/components/GameWorldSection";
import NewArrivalSection from "@/components/NewArrivalSection";
// import { OurServiceSection } from "@/components/our-service-section";
// import PopularSales from "@/components/PopularSales";
import ShopBrandSection from "@/components/ShopBrandSection";
import TopSellingProducts from "@/components/TopSellingProducts";
import AdvertisementSection from "@/components/AdvertisementSection";

import { HeaderSection } from "@/components/header-section";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts, IProduct } from "@/service/apis/product-services";
import RfqHomeSection from "@/components/RfqHomeSection";
import PopularSales from "@/components/PopularSales";

export default function HomePage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const {
    data: products,
    // isLoading: productIsLoading,
    // isSuccess: productSuccess,
    // isError: productIsError,
    // error: productError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const params = ``;

      const response: AxiosResponse<any, any> = await getAllProducts(
        `${params}
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

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className=" mx-8  py-8 space-y-10">
      <HeaderSection onScroll={() => scrollToSection()} />
      {/* <OurServiceSection sectionRef={sectionRef} /> */}
      <AdvertisementSection />
      <GameWorldSection name="Country showrooms" route="" />
      <ShopBrandSection />
      <AnnounceBanner />
      <RfqHomeSection />
      <TopSellingProducts products={products?.products} />
      <BestSeller />
      <PopularSales products={products?.products} />
      <NewArrivalSection products={products?.products} />
      {/* <PopularSales products={products?.products} /> */}
    </main>
  );
}
