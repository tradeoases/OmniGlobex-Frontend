/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosResponse, HttpStatusCode } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  getAllCountriesByContinent,
  ICountry,
} from "@/service/apis/countries-services";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createBusiness } from "@/service/apis/business-services";
import { getStripe } from "@/service/stripe";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Define the schema for validation using Zod
const createBusinessSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  countryId: z.string().min(1, "Country is required"),
  location: z.string().min(1, "Address is required"),
  city: z.string().min(1, "Address is required"),
  businessDescription: z
    .string()
    .min(80, "Description is required and must be atleast 80 characters long"),
});

type CreateBusinessForm = z.infer<typeof createBusinessSchema>;

const CreateBusiness = () => {
  const [continent, setContinent] = useState<
    | "NORTH AMERICA"
    | "SOUTH AMERICA"
    | "EUROPE"
    | "AFRICA"
    | "ASIA"
    | "AUSTRALIA"
  >("EUROPE");
  const {
    data: countries,
    isError: isCountryError,
    error: countryError,
    isLoading: countryLoading,
    isSuccess: countrySuccess,
  } = useQuery({
    queryKey: ["countries", continent],
    queryFn: async () => {
      const response: AxiosResponse<any, any> =
        await getAllCountriesByContinent(continent);
      if (response.status === HttpStatusCode.Ok) {
        return response.data.data as ICountry[];
      }
    },
  });
  const navigate = useNavigate()
  useEffect(() => {
    const data = localStorage.getItem("profile");
    if(!data) {
      return navigate('/signin')
    }
    const jData = JSON.parse(data)
    if(jData.businessNames.length > 0) {
      navigate('/supplier-dashboard')
    }
    console.log({ jData });
  }, []);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage] = useState<boolean>(false);
  const form = useForm<CreateBusinessForm>({
    resolver: zodResolver(createBusinessSchema),
    defaultValues: {
      businessName: "",
      countryId: "",
      city: "",
      location: "",
      businessDescription: "",
    },
  });

  const onSubmit = async (values: CreateBusinessForm) => {
    try {
      setLoading(true);
      console.log("Form Values: ", values);

      const response: AxiosResponse<any, any> = await createBusiness(values);

      if (response.status === HttpStatusCode.Created) {
        form.reset();
        const stripe = await getStripe();
        await stripe?.redirectToCheckout({
          sessionId: response.data?.data?.businessSubscription?.stripeSessionId,
        });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to create business");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8 mb-10">
      <div className="w-10/12 xl:w-8/12 mx-auto flex flex-col items-center px-7 py-10 bg-white">
        <p className="text-4xl font-extrabold text-center">Create Business</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-10 w-full"
          >
            <div className="w-full">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:outline-none"
                        placeholder="Business Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              {countryLoading && <div>Countries Loading...</div>}

              {isCountryError && (
                <div>
                  <h1>{countryError.name}</h1>
                  <p>{countryError.message}</p>
                </div>
              )}

              {countrySuccess && (
                <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormItem>
                      <FormLabel>Continent</FormLabel>
                      <Select
                        onValueChange={(
                          e:
                            | "NORTH AMERICA"
                            | "SOUTH AMERICA"
                            | "EUROPE"
                            | "AFRICA"
                            | "ASIA"
                            | "AUSTRALIA"
                        ) => {
                          setContinent(e);
                          form.setValue("countryId", "");
                        }}
                        defaultValue={continent}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="NORTH AMERICA">
                              NORTH AMERICA
                            </SelectItem>
                            <SelectItem value="SOUTH AMERICA">
                              SOUTH AMERICA
                            </SelectItem>
                            <SelectItem value="EUROPE">EUROPE</SelectItem>
                            <SelectItem value="AFRICA">AFRICA</SelectItem>
                            <SelectItem value="ASIA">ASIA</SelectItem>
                            <SelectItem value="AUSTRALIA" disabled>
                              AUSTRALIA
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name="countryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {countries &&
                                  countries.map((country: ICountry) => (
                                    <SelectItem
                                      key={country.country_id}
                                      value={country.country_id}
                                    >
                                      {country.name}
                                    </SelectItem>
                                  ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:outline-none"
                        placeholder="Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address *</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="focus:outline-none"
                        placeholder="Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <textarea
                        className="focus:outline-none w-full h-24 p-2 border border-gray-300 rounded-md"
                        placeholder="Business Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {errorMessage && (
              <p className="text-base text-center font-semibold text-red-600">
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className="text-base text-center font-semibold text-green-600">
                Business created successfully!
              </p>
            )}
            <Button disabled={loading} type="submit" className="w-full h-12">
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <span>Create Business</span>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBusiness;
