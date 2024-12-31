/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { useQuery } from "@tanstack/react-query";
import { getAllShowrooms } from "@/service/apis/countries-services";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SelectShowroom() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isFixed, setIsFixed] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: countries,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["showrooms"],
    queryFn: async () => {
      const response = await getAllShowrooms();
      if (response.status === 200) {
        return response.data.data as any;
      }
    },
  });

  React.useEffect(() => {
    if (!location.pathname.includes("/show-room")) {
      setValue("");
      setIsFixed(false);
    }
  }, [location.pathname]);

  // Handle selection of a country
  const handleSelectChange = (currentValue: string, showroomName: string) => {
    const country = countries?.find(
      (country: any) => country.showroom_id === currentValue
    );
    setValue(showroomName);
    setOpen(false);

    if (country) {
      setIsFixed(true);
      navigate(`/show-room?country=${country.showroom_id}`);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[170px] justify-between ${
            isFixed ? "top-10 left-10 z-10" : ""
          }`}
        >
          {value || "Select showroom..."}{" "}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search showroom..."
            className="text-gray-700"
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : isError ||
              !isSuccess ||
              !countries ||
              countries.length === 0 ? (
              <CommandEmpty>No showroom found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {countries.map((country: any) => (
                  <CommandItem
                    key={country.showroom_id}
                    value={country.showroom_name}
                    onSelect={() =>
                      handleSelectChange(
                        country.showroom_id,
                        country.showroom_name
                      )
                    }
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === country.showroom_name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {country.showroom_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
