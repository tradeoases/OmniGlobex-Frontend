/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useRef, useEffect } from "react";
import { LuFilter } from "react-icons/lu";
import { LiaTimesSolid } from "react-icons/lia";
import {
  getAllProductCategories,
  filteredProducts,
  IProduct,
} from "@/service/apis/product-services";
import { AxiosResponse, HttpStatusCode } from "axios";
import { ProductCard } from "@/components/product-card";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/components/Sidemenu";

const AllProductsPage = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // Get page and pageSize from search params
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "15", 10);

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
      searchParams.get("currency"),
      searchParams.get("pageSize"),
      searchParams.get("page"),
      searchParams.get("search"),
      searchParams.get("min"),
      searchParams.get("max"),
      searchParams.get("q"),
      searchParams.get("categories"),
    ],
    queryFn: async () => {
      let params = `?page=${page}&pageSize=${pageSize}`;

      if (searchParams.get("search")?.trim() !== "") {
        params = params.concat(`&search=${searchParams.get("search")}`);
      }

      if (searchParams.get("categories")?.trim() !== "") {
        params = params.concat(`&categories=${searchParams.get("categories")}`);
      }

      if (searchParams.get("currency")?.trim() !== "") {
        params = params.concat(`&currency=${searchParams.get("currency")}`);
      }

      if (searchParams.get("country")?.trim() !== "") {
        params = params.concat(`&countryId=${searchParams.get("country")}`);
      }

      if (searchParams.get("q")?.trim() !== "") {
        params = params.concat(`&q=${searchParams.get("q")}`);
      }

      if (searchParams.get("min")?.trim() !== "") {
        params = params.concat(`&min=${searchParams.get("min")}`);
      }

      if (searchParams.get("max")?.trim() !== "") {
        params = params.concat(`&max=${searchParams.get("max")}`);
      }

      const response: AxiosResponse<any, any> = await filteredProducts(params);
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as {
          products: IProduct[];
          pageSize: number;
          page: number;
        };
      }
    },
  });

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-x-8">
      <SideBar onOpen={() => setOpenMenu(false)} open={openMenu} />
      <div className="lg:col-span-3 w-full space-y-8">
        <div className="bg-white border rounded-xl px-6 py-6 w-full space-y-8 md:space-y-0 md:flex items-center justify-between">
          <p>
            <span className="text-gray-400">Showing</span>{" "}
            {products && products.products.length > 0 ? (
              <>
                {pageSize * (page - 1) + 1}-{pageSize * page} Products
              </>
            ) : (
              "0 results"
            )}
          </p>
          <button
            onClick={() => setOpenMenu(true)}
            type="button"
            className="lg:hidden text-3xl text-main border border-main rounded p-2"
          >
            <LuFilter />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Loading State */}
          {productIsLoading && (
            <div className="flex justify-center items-center w-full h-64">
              <p>Loading...</p>
            </div>
          )}

          {/* Error State */}
          {productIsError && (
            <div className="flex flex-col items-center justify-center w-full h-64 text-center">
              <h1>An error occurred while loading products</h1>
              <h2>{productError.message}</h2>
            </div>
          )}

          {productSuccess &&
            products &&
            products.products.length > 0 &&
            products.products.map((product) => (
              <ProductCard key={product.product_id} {...product} />
            ))}
        </div>
        <div>
          {productSuccess && products?.products.length === 0 && (
            <div className="flex flex-col w-full items-center justify-center min-h-[60vh] text-center space-y-4 px-4">
              <div className="text-3xl font-bold text-gray-800">
                No products found
              </div>
              <p className="text-lg text-gray-500">
                Try adjusting your filters to find more products.
              </p>
              <button
                onClick={() => {
                  const newSearchParams = new URLSearchParams(searchParams);
                  newSearchParams.delete("max");
                  newSearchParams.delete("min");
                  newSearchParams.delete("q");
                  newSearchParams.delete("categories");
                  setSearchParams(newSearchParams);
                }}
                className="mt-4 bg-main hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;

interface ISideBarProps {
  open: boolean;
  onOpen: () => void;
}

const SideBar: React.FC<ISideBarProps> = ({ onOpen, open }) => {
  const [minPrice, setMinPrice] = useState<string>(""); // State for minimum price
  const [maxPrice, setMaxPrice] = useState<string>(""); // State for maximum price
  const [search, setSearch] = useState<string>("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [localSelectedCategories, setLocalSelectedCategories] = useState<
    string[]
  >([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle category selection
  const handleCategoryToggle = (categoryId: string) => {
    setLocalSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId]
    );
  };

  useEffect(() => {
    const max = searchParams.get("max") || "";
    const min = searchParams.get("min") || "";
    const q = searchParams.get("q") || "";
    const categories = searchParams.get("categories")?.split(",") || [];

    setMaxPrice(max);
    setMinPrice(min);
    setSearch(q);
    setLocalSelectedCategories(categories);
  }, [searchParams]); // Only track changes to `searchParams`

  const { data: categories, isSuccess } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProductCategories();
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as ICategory[];
      }
    },
  });

  const handleSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (maxPrice.trim() !== "") {
      newSearchParams.set("max", maxPrice.trim());
    } else if (maxPrice.trim() === "" && newSearchParams.get("max")) {
      newSearchParams.delete("max");
    }
    if (minPrice.trim() !== "") {
      newSearchParams.set("min", minPrice.trim());
    } else if (minPrice.trim() === "" && newSearchParams.get("min")) {
      newSearchParams.delete("min");
    }
    if (search.trim() !== "") {
      newSearchParams.set("q", search.trim());
    } else if (search.trim() === "" && newSearchParams.get("q")) {
      newSearchParams.delete("q");
    }
    if (localSelectedCategories.length > 0) {
      newSearchParams.set("categories", localSelectedCategories.join(","));
    } else if (
      newSearchParams.get("categories") &&
      localSelectedCategories.length === 0
    ) {
      newSearchParams.delete("categories");
    }

    setSearchParams(newSearchParams);
  };

  const isCategorySelected = (categoryId: string) =>
    localSelectedCategories.includes(categoryId);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const resetFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    setLocalSelectedCategories([]);
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    newSearchParams.delete("max");
    newSearchParams.delete("min");
    newSearchParams.delete("q");
    newSearchParams.delete("categories");
    setSearchParams(newSearchParams);
  };

  return (
    <div
      className={`fixed w-full z-10 overflow-x-scroll min-h-full top-0 left-0 right-0 rounded-xl lg:static lg:block bg-white lg:bg-gray-100 border max-h-fit py-2 px-2 lg:px-2 space-y-10 ${
        open ? "block" : "hidden"
      }`}
    >
      <div onClick={onOpen} className="flex justify-end">
        <button
          type="button"
          className="p-2 lg:hidden rounded-lg text-red-500 text-xl"
        >
          <LiaTimesSolid />
        </button>
      </div>

      <div className="space-y-6 border-b">
        <p className="text-lg font-bold">Product Filters</p>

        {/* Dropdown for Categories */}
        <div ref={dropdownRef} className="w-full p-2 border rounded-lg">
          <button
            onClick={toggleDropdown}
            className="w-full text-left flex justify-between items-center p-2 border rounded-md"
          >
            <span>Select Categories</span>
            <span>{isDropdownOpen ? "▲" : "▼"}</span>
          </button>

          {isDropdownOpen && isSuccess && (
            <div className="mt-2 max-h-48 overflow-auto space-y-2">
              {categories?.map((cat: ICategory) => (
                <div key={cat.category_id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={cat.category_id}
                    checked={isCategorySelected(cat.category_id)}
                    onChange={() => handleCategoryToggle(cat.category_id)}
                    className="mr-2"
                  />
                  <label htmlFor={cat.category_id} className="cursor-pointer">
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 border-b w-full">
        <div className="pb-8 gap-x-4 flex">
          <Label className="w-full">
            Min{" "}
            <Input
              placeholder="min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </Label>
          <Label className="w-full">
            Max{" "}
            <Input
              className="focus:outline-none"
              placeholder="max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </Label>
        </div>
        <div className="pb-8 gap-x-4 w-full flex">
          <Label className="w-full">
            Search Country, product name or description
            <Input
              className="w-full"
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Label>
        </div>

        <div className="flex gap-x-4">
          <Button
            onClick={resetFilters}
            className="border text-main py-2 w-full px-6 rounded-lg"
          >
            Reset Filters
          </Button>
          <Button
            onClick={handleSearch}
            className="border bg-main text-white py-2 w-full px-6 rounded-lg"
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  );
};
