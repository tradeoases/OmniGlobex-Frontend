import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { HeaderProductCard } from "./header-product-card";

import { IProduct } from "@/service/apis/product-services";
import { Button } from "./ui/button";
import { ProductSkeleton } from "./product-skeleton";

interface Props {
  products: IProduct[] | null;
}

export const Header: React.FC<Props> = ({ products }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [localProducts, setLocalProducts] = useState<IProduct[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (products) {
      setLocalProducts(products.slice(0, 5));
    }
  }, [products]);

  const loadMore = useCallback(() => {
    products &&
      localProducts &&
      setLocalProducts((prev) => {
        const updatedProducts = prev
          ? [...prev, ...products.slice(6, 20)]
          : products.slice(6, 20);
        return updatedProducts;
      });
  }, [localProducts]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 50) {
        loadMore();
      }
    }
  }, [loadMore]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  const updateScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -256, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 256, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", updateScrollButtons);
    }
    updateScrollButtons();
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", updateScrollButtons);
      }
    };
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        if (scrollLeft + clientWidth < scrollWidth) {
          containerRef.current.scrollBy({ left: 256, behavior: "smooth" });
        } else {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(scrollInterval);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    stopAutoScroll();
    scrollIntervalRef.current = window.setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        if (scrollLeft + clientWidth < scrollWidth) {
          containerRef.current.scrollBy({ left: 256, behavior: "smooth" });
        } else {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000); // Scroll every 3 seconds
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  if (!products) {
    return (
      <div className="bg-white py-12">
        <div className="no-scrollbars flex w-full items-center gap-x-2 overflow-x-scroll scroll-smooth p-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <div className="space-y-8 bg-white p-8 md:px-12">
        <div className="relative flex w-full items-center justify-center">
          <Button
            onClick={scrollLeft}
            size="icon"
            variant="outline"
            className="absolute left-0 z-10 rounded-full"
            disabled={!canScrollLeft}
          >
            <HiOutlineChevronLeft />
          </Button>
          <div
            ref={containerRef}
            onMouseEnter={stopAutoScroll}
            onMouseLeave={startAutoScroll}
            className="no-scrollbars flex w-full items-center space-x-4 overflow-x-scroll scroll-smooth p-4"
          >
            {localProducts &&
              localProducts.map((product, i) => (
                <HeaderProductCard {...product} key={i} />
              ))}
          </div>
          <Button
            onClick={scrollRight}
            size="icon"
            variant="outline"
            className="absolute right-0 z-10 rounded-full"
            disabled={!canScrollRight}
          >
            <HiOutlineChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
