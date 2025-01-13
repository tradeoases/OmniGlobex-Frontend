"use client";
import React from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
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
import { getAllCurrencies } from "@/service/apis/countries-services";
interface Currencies {
  currency: string;
  currency_id: string;
  currency_name: string;
}

export function RfqCurrencies() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(""); // Store the selected category name
  const {
    data: currencies,
    isError: isCurrencyError,
    isLoading: isCurrencyLoading,
  } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const res = await getAllCurrencies();
      if (
        res.status === HttpStatusCode.Ok ||
        res.status === HttpStatusCode.Created
      ) {
        console.log({ currencies: res.data.data });
        return res.data.data as {
          currency: string;
          currency_id: string;
          currency_name: string;
        }[];
      }
    },
  });
  if (isCurrencyLoading) return <p>Loading...</p>;
  if (isCurrencyError) return <p>Error loading currencies.</p>;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full text-gray-500 justify-between"
        >
          {value || "Select Currency..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Currency..." />
          <CommandList>
            <CommandEmpty>No Units found.</CommandEmpty>
            <CommandGroup>
              {currencies?.map((currency: Currencies) => (
                <CommandItem
                  key={currency.currency_id}
                  value={currency.currency_name}
                  onSelect={() => {
                    setValue(currency.currency_name);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === currency.currency_name
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {currency.currency_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
