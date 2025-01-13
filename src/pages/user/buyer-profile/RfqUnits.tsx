"use client";
import React from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { getAllRFQUnits } from "@/service/apis/units-services";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, HttpStatusCode } from "axios";
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

interface Unit {
  unit_id: string;
  unit_name: string;
}

interface RfqUnitsProps {
  onDropdownChange: (isOpen: boolean) => void;
}

export const RfqUnits: React.FC<RfqUnitsProps> = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const {
    data: units,
    isLoading,
    error,
  } = useQuery<Unit[]>({
    queryKey: ["units"],
    queryFn: async () => {
      const response: AxiosResponse<any, any> = await getAllRFQUnits();
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data;
      }
      throw new Error("Failed to fetch units.");
    },
  });
  console.log("RFQ UNITS", units);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading categories.</p>;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full text-gray-500 justify-between"
        >
          {value || "Select Unit..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search unit..." />
          <CommandList>
            <CommandEmpty>No Units found.</CommandEmpty>
            <CommandGroup>
              {units?.map((unit: Unit) => (
                <CommandItem
                  key={unit.unit_id}
                  value={unit.unit_name}
                  onSelect={() => {
                    setValue(unit.unit_name);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === unit.unit_name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {unit.unit_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
