/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCurrencies } from "@/service/apis/countries-services";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import React, { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select, { SingleValue } from "react-select";

const CurrencySelector: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const { data: currencies, isSuccess: isCurrenciesSuccess } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const res = await getAllCurrencies();
      if (res.status === HttpStatusCode.Ok) {
        return res.data.data;
      }
    },
  });
  const options = useMemo(() => {
    if (isCurrenciesSuccess) {
      return currencies.map((currency: any) => ({
        value: currency.currency,
        label: currency.currency_name,
      }));
    }
    return [];
  }, [isCurrenciesSuccess, currencies]);

  useEffect(() => {
    // Load the currency from URL or default to USD if not present
    const currencyFromURL = searchParams.get("currency");
    const currencyFromStorage = localStorage.getItem("selectedCurrency");

    if (currencyFromURL) {
      setSelectedCurrency(currencyFromURL);
    } else if (currencyFromStorage) {
      setSelectedCurrency(currencyFromStorage);
      searchParams.set("currency", currencyFromStorage);
      setSearchParams(searchParams);
    } else {
      // Default to USD
      setSelectedCurrency("USD");
      searchParams.set("currency", "USD");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const handleCurrencyChange = (
    newValue: SingleValue<{ value: string; label: string }>
  ) => {
    if (newValue) {
      const newCurrency = newValue.value;
      setSelectedCurrency(newCurrency);

      // Update the currency in searchParams without removing other parameters
      searchParams.set("currency", newCurrency);
      setSearchParams(searchParams);

      // Store the currency in localStorage
      localStorage.setItem("selectedCurrency", newCurrency);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Select
        options={options}
        value={
          options.find(
            (option: { value: string; label: string }) =>
              option.value === selectedCurrency
          ) || null
        }
        onChange={handleCurrencyChange}
        styles={{
          control: (base) => ({
            ...base,
            border: "1px solid #ccc",
            boxShadow: "none",
            "&:hover": {
              border: "1px solid #aaa",
            },
            minWidth: "120px",
            maxWidth: "250px",
            width: "100%",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 100,
          }),
        }}
      />
    </div>
  );
};

export default CurrencySelector;
