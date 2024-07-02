/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

import { PageHeader } from "@/components/PageHeader";
import MultiSelect, { Option } from "@/components/multiple-select";
import { ICountry, getAllCountries } from "@/service/apis/countries-services";
import { AllCountriesStore } from "@/store/country-store";
import { createSellerSchema } from "@/data/schemas/users-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ISellerSignup,
  createSeller,
  getAllRoles,
} from "@/service/apis/user-services";
import { IRole, RoleStore } from "@/store/user-store";

const BecomeSellerPage = () => {
  const [showRooms, setShowRooms] = useState<Option[]>([]);
  const [userRoles, setUserRoles] = useState<Option[]>([]);
  const [countries, setCountries] = useRecoilState<ICountry[] | null>(
    AllCountriesStore
  );
  const [roles, setRoles] = useRecoilState<IRole[] | null>(RoleStore);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);

  const form = useForm<z.infer<typeof createSellerSchema>>({
    resolver: zodResolver(createSellerSchema),
    defaultValues: {
      firstname: "",
      address: "",
      email: "",
      lastname: "",
      password: "",
      phonenumber: "",
      shopAddress: "",
      shopName: "",
      confirmPassword: "",
      city: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createSellerSchema>) => {
    if (showRooms.length === 0) {
      setErrorMessage("select at least one show room");
      return;
    }

    if (userRoles.length === 0) {
      setErrorMessage("select at least one user role");
      return;
    }
    const {
      address,
      email,
      firstname,
      lastname,
      password,
      phonenumber,
      shopName,
      country_id,
    } = values;

    const data: ISellerSignup = {
      address,
      email,
      fullname: `${firstname} ${lastname}`,
      password,
      phonenumber,
      profileImages: {
        avatar_url: "something",
        avatar_id: "something",
        logo_url: "something",
        logo_id: "something",
        cover_url: "something",
        cover_id: "something",
      },
      roleIds: userRoles.map((role) => role.value),
      shopName,
      showRooms: showRooms.map((room) => room.value),
      country_id,
    };

    
    let timeoutKey: NodeJS.Timeout | undefined;
    try {
      setLoading(true);
      const response: AxiosResponse<any, any> = await createSeller(data);

      if (response.status === HttpStatusCode.Created) {
        form.reset();
        setLoading(false);
        setShowRooms([]);
        setUserRoles([]);
        setSuccessMessage(true);

        timeoutKey = setTimeout(() => {
          setSuccessMessage(false);
        }, 2000);

        return () => clearTimeout(timeoutKey);
      }
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    !countries && fetchAllCountries();
    !roles && fetchRoles();
  }, []);

  useEffect(() => {
    let timeoutKey: NodeJS.Timeout | undefined;

    if (errorMessage) {
      timeoutKey = setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }

    return () => clearTimeout(timeoutKey);
  }, [errorMessage]);

  const fetchAllCountries = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllCountries();
      if (response.status === HttpStatusCode.Ok) {
        setCountries(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response: AxiosResponse<any, any> = await getAllRoles();

      if (response.status === HttpStatusCode.Ok) {
        setRoles(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full space-y-8 mb-10">
      <PageHeader name="Seller Application" route=" / Become Seller" />

      <div className="w-10/12 xl:w-8/12 mx-auto flex flex-col-reverse lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-7 px-7 py-10 bg-white">
        <div className="col-span-2 mt-14 lg:m-0">
          <p className="text-xl font-extrabold">Seller Information</p>
          <p className="text-sm text-gray-400">
            Fill the form below or write us .We will help you as soon as
            possible.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-10"
            >
              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="focus:outline-none"
                            placeholder="First Name"
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
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input
                            className="w-full focus:outline-none"
                            placeholder="Last Name"
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
              </div>

              <div className="w-full">
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
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {countries &&
                              countries.map((country) => (
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

              <div className="w-full space-y-8 md:space-y-0 md:flex items-center justify-between gap-2">
                <div className="w-full">
                  <Label htmlFor="address">Select Role *</Label>
                  <MultiSelect
                    options={
                      roles?.map((role) => ({
                        value: role.role_id,
                        label: role.name,
                      })) || []
                    }
                    selectedOptions={userRoles}
                    onChange={setUserRoles}
                  />
                </div>

                <div className="w-full">
                  <Label htmlFor="address">Select show rooms *</Label>
                  <MultiSelect
                    options={
                      countries?.map((country) => ({
                        value: country.country_id,
                        label: country.name,
                      })) || []
                    }
                    selectedOptions={showRooms}
                    onChange={setShowRooms}
                  />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xl font-extrabold">Shop Information</p>
                <p className="text-sm text-gray-400">
                  Fill the form below or write us .We will help you as soon as
                  possible.
                </p>
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="shopName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shop Name *</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="focus:outline-none"
                          placeholder="Shop Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="shopAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shop Address *</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          className="focus:outline-none"
                          placeholder="Shop Address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          <Input
                            type="password"
                            className="focus:outline-none"
                            placeholder="Password"
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
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            className="focus:outline-none"
                            placeholder="Confirm Password"
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
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>

              <div className="lg:w-3/5 mx-auto">
                {errorMessage && (
                  <p className="text-base text-center font-semibold text-red-600">
                    {errorMessage}
                  </p>
                )}
                {successMessage && (
                  <p className="text-base text-center font-semibold text-green-600">
                    success
                  </p>
                )}
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full h-12"
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    <span>Create Account</span>
                  )}
                </Button>
                <p className="text-sm mt-4 font-semibold text-gray-500 text-center">
                  Already have an Account?
                  <Link className="underline" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>

        <div className="space-y-14">
          <div className="flex flex-col space-y-2 items-center">
            <div className="text-center">
              <p className="text-lg font-extrabold">Update Profile</p>
              <p className="text-gray-400">
                Profile of at least{" "}
                <span className="text-black">Size300x300.</span> <br /> Gifs
                work too. <span className="text-black">Max 5mb</span>.
              </p>
            </div>

            <div className="flex relative items-center justify-center text-lg font-bold w-40 h-40 rounded-full bg-gray-200">
              200X200
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-pink-700 flex items-center justify-center z-20 right-0 bottom-6 text-white text-lg absolute "
              >
                <FaPen />
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2 items-center">
            <div className="text-center">
              <p className="text-lg font-extrabold">Update Logo</p>
              <p className="text-gray-400">
                Profile of at least{" "}
                <span className="text-black">Size300x300.</span>
                <br /> Gifs work too.{" "}
                <span className="text-black">Max 5mb</span>.
              </p>
            </div>

            <div className="flex relative items-center justify-center text-lg font-bold w-40 h-40 rounded-full bg-gray-200">
              200X200
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-pink-700 flex items-center justify-center z-20 right-0 bottom-6 text-white text-lg absolute "
              >
                <FaPen />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <p className="text-lg font-extrabold">Update Cover</p>
            <p className="text-gray-400">
              Cover of at least Size{" "}
              <span className="text-black">1170x920.</span>
            </p>

            <div className="flex relative items-center justify-center text-lg font-bold w-full h-40 rounded-lg bg-gray-200">
              200X200
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-pink-700 flex items-center justify-center z-20 right-0 -bottom-4 text-white text-lg absolute "
              >
                <FaPen />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSellerPage;
