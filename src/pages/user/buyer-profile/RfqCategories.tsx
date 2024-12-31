"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { getAllProductCategories } from "@/service/apis/product-services";
import { AxiosResponse, HttpStatusCode } from "axios";
import { useQuery } from "@tanstack/react-query";

interface Category {
  category_id: string;
  name: string;
}

interface RFQCategoriesProps {
  onDropdownChange: (isOpen: boolean) => void;
}

export function RFQCategories({ onDropdownChange }: RFQCategoriesProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllProductCategories();
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
      throw new Error("Failed to fetch categories.");
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories.</p>;

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onDropdownChange(newOpen);
  };

  return (
    <div className="relative w-full">
      <label className="block font-medium text-gray-700 mb-1 text-sm">
        Product Category
      </label>
      <div 
        onClick={() => handleOpenChange(!open)}
        className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md cursor-pointer bg-white text-sm"
      >
        {value || "Select category"}
      </div>
      
      {open && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden" 
            onClick={() => handleOpenChange(false)} 
          />
          
          <div 
            className="fixed inset-0 z-50 md:static"
            onClick={() => handleOpenChange(false)}
          >
            <div 
              className="fixed md:absolute w-[calc(100%-2rem)] md:w-full mx-4 md:mx-0 left-0 right-0 md:right-auto top-[20%] md:top-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <Command className="w-full">
                <CommandInput 
                  placeholder="Search category..." 
                  className="text-sm"
                />
                <CommandList className="max-h-[300px] overflow-y-auto">
                  <CommandEmpty className="py-2 text-sm text-gray-500">
                    No product category found.
                  </CommandEmpty>
                  <CommandGroup>
                    {categories?.map((category: Category) => (
                      <CommandItem
                        key={category.category_id}
                        value={category.name}
                        onSelect={() => {
                          setValue(category.name);
                          setOpen(false);
                        }}
                        className="text-sm cursor-pointer hover:bg-gray-100 py-2"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === category.name ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {category.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
