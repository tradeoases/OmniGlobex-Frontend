/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AxiosResponse, HttpStatusCode } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  getAllCountriesByContinent,
  ICountry,
} from "@/service/apis/countries-services";
import { signupSchema } from "@/data/schemas/users-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IUserSignup, signup } from "@/service/apis/user-services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { EmailStore } from "@/store/user-store";
import { useState } from "react";
import RegisterDashboard from "./RegisterDashboard";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const IntegratedSignup = () => {
  const [continent, setContinent] = useState<
    | "NORTH AMERICA"
    | "SOUTH AMERICA"
    | "EUROPE"
    | "AFRICA"
    | "ASIA"
    | "AUSTRALIA"
  >("EUROPE");

  const location = useLocation();
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
        return response.data.data;
      }
    },
  });

  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get("redirect") || "/";
  const previousPath = searchParams.get("previous") || "/";

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      business_name: "",
      address: "",
      email: "",
      password: "",
      phonenumber: "",
      city: "",
      country_id: "",
      confirmPassword: "",
    },
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const toggleOldPasswordVisibility = () => setShowOldPassword((prev) => !prev);
  const [, setEmail] = useRecoilState(EmailStore);
  const navigate = useNavigate();
  const {
    mutate: onSubmit,
    error: mutationError,
    isError: isMutationError,
    isSuccess: mutationSuccess,
  } = useMutation({
    mutationKey: ["countries"],
    mutationFn: async (values: z.infer<typeof signupSchema>) => {
      const {
        address,
        email,
        business_name,
        city,
        password,
        phonenumber,
        country_id,
        role,
        acceptTerms,
      } = values;

      const data: IUserSignup = {
        address,
        business_name,
        email,
        password,
        phoneNumber: phonenumber,
        city,
        countryId: country_id,
        role,
        acceptTerms,
      };

      const response: AxiosResponse<any, any> = await signup(data);

      if (response.status === HttpStatusCode.Created) {
        return response.data;
      }
    },
    onSuccess: (data) => {
      setEmail({
        email: form.getValues("email"),
        id: data.data.id,
      });
      form.reset();
      setTimeout(() => {
        form.reset();
      }, 2000);
      navigate(
        `/verify-email?${redirectPath ? `redirect=${redirectPath}&` : ""}${
          previousPath ? `previous=${previousPath}` : ""
        }`
      );
    },
    onError: (e: any) => {
      console.log(e);
      return new Error(e.response?.data?.message || e.message);
    },
  });

  return (
    <div className="w-full space-y-8 mb-10">
      <RegisterDashboard />
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold text-center">Register Now</p>
        <div className="-mt-2">
          <svg
            className="w-80"
            width="354"
            height="30"
            viewBox="0 0 354 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
              stroke="#FFBB38"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
      </div>
      <div className="w-full lg:w-8/12 mx-auto flex flex-col-reverse lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-7 px-7 bg-white">
        <div className="col-span-2 mt-14 lg:m-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((e) => onSubmit(e))}
              className="space-y-8"
            >
              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="business_name"
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
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="focus:outline-none"
                            id="email"
                            placeholder="Email Address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="phonenumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="focus:outline-none"
                            id="phonenumber"
                            placeholder="Phone Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role *</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="Buyer">Buyer</SelectItem>
                                <SelectItem value="Supplier">
                                  Supplier
                                </SelectItem>
                                <SelectItem value="Both">Both</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showOldPassword ? "text" : "password"}
                              className="focus-visible:outline-none focus:outline-none w-full pr-10"
                              placeholder="Password"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-3"
                              onClick={toggleOldPasswordVisibility}
                            >
                              {showOldPassword ? (
                                <EyeIcon className="h-4 w-4 text-gray-500" />
                              ) : (
                                <EyeOffIcon className="h-4 w-4 text-gray-500" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password *</FormLabel>
                        <FormControl>
                        <div className="relative">
                            <Input
                              type={showOldPassword ? "text" : "password"}
                              className="focus-visible:outline-none focus:outline-none w-full pr-10"
                              placeholder="Confirm password"
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-3"
                              onClick={toggleOldPasswordVisibility}
                            >
                              {showOldPassword ? (
                                <EyeIcon className="h-4 w-4 text-gray-500" />
                              ) : (
                                <EyeOffIcon className="h-4 w-4 text-gray-500" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                            form.setValue("country_id", "");
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
                        name="country_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full focus:outline-none">
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

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="address"
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
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City *</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="focus:outline-none"
                            placeholder="City"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            onClick={() => field.onChange(!field.value)}
                            checked={field.value}
                            id="terms"
                          />
                          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Accept terms and conditions *
                          </FormLabel>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="w-full">
                  {isMutationError && (
                    <p className="text-base text-center font-semibold text-red-600">
                      {mutationError.response?.data?.message ||
                        mutationError.message}
                    </p>
                  )}
                  {mutationSuccess && (
                    <p className="text-base text-center font-semibold text-green-600">
                      success
                    </p>
                  )}
                  <Button type="submit" className="w-full h-12">
                    {/* {loading ? (
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    ) :  */}
                    {/* ( */}
                    <span>Create Account</span>
                    {/* )} */}
                  </Button>
                  <p className="text-sm mt-4 font-semibold text-gray-500 text-center">
                    Already have an Account?
                    <Link className="underline" to="/login">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default IntegratedSignup;
