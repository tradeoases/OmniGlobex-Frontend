import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ICountry } from "@/service/apis/countries-services";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  CheckoutSchema,
  TCheckoutSchema,
  TPaymentMethodSchema,
} from "@/data/schemas/checkout-form-schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";

interface Props {
  countries: ICountry[] | null;
  edit?: boolean;
  onClose: () => void;
}

export const AddShippingAddress: React.FC<Props> = ({
  countries,
  edit = false,
  onClose,
}) => {
  const form = useForm<TCheckoutSchema>({
    resolver: zodResolver(CheckoutSchema),
  });

  function onSubmit(values: TCheckoutSchema | TPaymentMethodSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <p className="text-lg font-medium">
          {edit ? "Edit Shipping Address" : "Create Shipping Address"}
        </p>
        <div className="sm:flex sm:space-x-5 items-center mb-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="sm:w-1/2 mb-5 sm:mb-0">
                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="First Name"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="sm:w-1/2 mb-5 sm:mb-0">
                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Last Name"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:flex sm:space-x-5 items-center mb-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="sm:w-1/2 mb-5 sm:mb-0">
                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email Address"
                    className="w-full"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="sm:w-1/2 mb-5 sm:mb-0">
                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Phone Number"
                    className="w-full"
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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Country
                </FormLabel>
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

        <div className="w-full">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="sm:w-full sm:mb-0">
                <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                  Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Address" className="w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sm:flex sm:space-x-5 items-center">
          <div className="w-full">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="sm:w-full mb-5 sm:mb-0">
                  <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                    City
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="City" className="w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                    Zip Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Zip Code"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-4">
          <Button onClick={onClose} className="w-full" variant="outline">
            Back
          </Button>
          <Button className="w-full">{edit ? "Update" : "Create"}</Button>
        </div>
      </form>
    </Form>
  );
};
