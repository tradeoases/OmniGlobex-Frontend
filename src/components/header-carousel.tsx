import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import { ProductSkeleton } from "./product-skeleton";
import { HiOutlineChevronRight } from "react-icons/hi2";

export const HeaderCarousel = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState<number>(5);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setProducts((prod) => prod + 4);
  }, []);

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
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
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
          containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
        } else {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="space-y-8 rounded-xl bg-white p-8 md:px-12">
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
          className="no-scrollbars mx-auto flex w-full items-center space-x-4 overflow-x-scroll scroll-smooth p-4"
        >
          {Array.from({ length: products }).map((_, i) => (
            <ProductSkeleton key={i} />
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
  );
};
