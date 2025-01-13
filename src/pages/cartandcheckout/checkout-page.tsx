import { AxiosResponse, HttpStatusCode } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  PaymentMethodSchema,
  TCheckoutSchema,
  TPaymentMethodSchema,
} from "@/data/schemas/checkout-form-schema";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PageHeader } from "@/components/PageHeader";
import { IOrder, OrdersStore } from "@/store/order-store";
import { getAllUserOrders } from "@/service/apis/order-service";
import { getAllCountries, ICountry } from "@/service/apis/countries-services";
import { AllCountriesStore } from "@/store/country-store";

import { AddShippingAddress } from "@/components/add-shipping-address-form";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useRecoilState<IOrder[] | null>(
    OrdersStore
  );
  const [countries, setCountries] = useRecoilState<ICountry[] | null>(
    AllCountriesStore
  );
  const [isEditAddress, setIsEditAddress] = useState<boolean>(false);
  const [openAddressForm, setOpenAddressForm] = useState<boolean>(false);

  useEffect(() => {
    !countries && fetchAllCountries();
    !cartItems && fetchOrdersByUser();
  }, []);

  const fetchOrdersByUser = async () => {
    try {
      const response: AxiosResponse = await getAllUserOrders();

      if (response.status === HttpStatusCode.Ok) {
        setCartItems(response.data.data);
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const fetchAllCountries = async () => {
    try {
      const response: AxiosResponse = await getAllCountries();
      if (response.status === HttpStatusCode.Ok) {
        setCountries(response.data.data);
      }
    } catch (error) {
      console.log("Error");
    }
  };

  const paymentMethodForm = useForm<TPaymentMethodSchema>({
    resolver: zodResolver(PaymentMethodSchema),
  });

  function onSubmit(values: TCheckoutSchema | TPaymentMethodSchema) {
    console.log(values);
  }

  return (
    <div className="w-full  pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageHeader name="checkout" route="/checkout" />
          <div className="w-10/12 xl:w-8/12 mx-auto mt-5">
            <div className="checkout-main-content w-full">
              <div className="container-x mx-auto">
                <div className="w-full sm:mb-10 mb-5 mx-auto">
                  <div className="sm:flex sm:space-x-[18px] s">
                    <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                        <span className="text-[15px] font-medium">
                          Log into your Account
                        </span>
                      </div>
                    </div>

                    <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                      <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                        <span className="text-[15px] font-medium">
                          Enter Coupon Code
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:flex lg:space-x-[30px]">
                  <div className="lg:w-1/2 w-full">
                    <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                      Billing Details
                    </h1>

                    {!openAddressForm && (
                      <div>
                        <h1 className="text-lg text-qblack font-medium mb-5">
                          Shipping Address
                        </h1>

                        <div className="w-full mb-4 grid grid-cols-4 gap-4">
                          <div className="col-span-3 rounded-lg border text-sm space-y-1 text-gray-500  p-4">
                            <p className="text-sm font-bold text-gray-800">
                              John Doe
                            </p>
                            <p>johndoe@example.com</p>
                            <p className="font-medium text-sm text-gray-700">
                              William Street, Kampala, Uganda.
                            </p>
                            <p className="">P.O.B 32142</p>
                          </div>

                          <div className="col-span-1 flex flex-col space-y-4 justify-evenly ">
                            <Button
                              onClick={() => {
                                setIsEditAddress(false);
                                setOpenAddressForm(true);
                              }}
                              variant="outline"
                              className="w-full rounded-lg border h-full flex items-center justify-center"
                            >
                              add
                            </Button>
                            <Button
                              onClick={() => {
                                setIsEditAddress(true);
                                setOpenAddressForm(true);
                              }}
                              className="w-full rounded-lg border h-full flex items-center justify-center bg-black text-white"
                            >
                              edit
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {openAddressForm && (
                      <AddShippingAddress
                        edit={isEditAddress}
                        countries={countries}
                        onClose={() => setOpenAddressForm(false)}
                      />
                    )}
                  </div>

                  <div className="md:w-1/2">
                    <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                      Order Summary
                    </h1>

                    <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                      <div className="sub-total mb-6">
                        <div className="flex justify-between mb-5">
                          <p className="text-[13px] font-medium text-qblack uppercase">
                            Product
                          </p>
                          <p className="text-[13px] font-medium text-qblack uppercase">
                            total
                          </p>
                        </div>
                        <div className="w-full h-[1px] bg-gray-100"></div>
                      </div>
                      <div className="product-list w-full mb-[30px]">
                        <ul className="flex flex-col space-y-5">
                          {cartItems ? (
                            cartItems.map((item, i) => (
                              <li key={i}>
                                <div className="flex justify-between space-y-3 items-center">
                                  <div>
                                    <h4 className="text-[15px] w-2/3 hover:text-blue-700">
                                      <Link
                                        to={`/single-product/?product_id=${item.product_id}`}
                                      >
                                        {item.Product.name}
                                      </Link>
                                      <sup className="text-[13px] text-qgray ">
                                        x{item.quantity}
                                      </sup>
                                    </h4>
                                    <p className="text-[13px] text-gray-400 w-2/3 line-clamp-1">
                                      {item.Product.description}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-[15px] text-qblack font-medium">
                                      $38
                                    </span>
                                  </div>
                                </div>
                              </li>
                            ))
                          ) : (
                            <div>loading..</div>
                          )}
                        </ul>
                      </div>
                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                      <div className="mt-[30px]">
                        <div className="flex justify-between mb-5">
                          <p className="text-[13px] font-medium text-qblack uppercase">
                            SUBTOTAL
                          </p>
                          <p className="text-[15px] font-medium text-qblack uppercase">
                            $365
                          </p>
                        </div>
                      </div>
                      <div className="w-full mt-[30px]">
                        <div className="sub-total mb-6">
                          <div className="flex justify-between mb-5">
                            <div>
                              <span className="text-xs text-qgraytwo mb-3 block">
                                SHIPPING
                              </span>
                              <p className="text-base font-medium text-qblack">
                                Free Shipping
                              </p>
                            </div>
                            <p className="text-[15px] font-medium text-qblack">
                              +$0
                            </p>
                          </div>
                          <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                        </div>
                      </div>
                      <div className="mt-[30px]">
                        <div className="flex justify-between mb-5">
                          <p className="text-2xl font-medium text-qblack">
                            Total
                          </p>
                          <p className="text-2xl font-medium text-qred">$365</p>
                        </div>
                      </div>
                      <div className="shipping mt-[30px]">
                        <Form {...paymentMethodForm}>
                          <form
                            onSubmit={paymentMethodForm.handleSubmit(onSubmit)}
                          >
                            <FormField
                              control={paymentMethodForm.control}
                              name="method"
                              render={({ field }) => (
                                <FormItem className="flex flex-col space-y-1">
                                  <FormControl>
                                    <RadioGroup onValueChange={field.onChange}>
                                      <FormItem className="class=flex space-x-2.5 items-center mb-4">
                                        <FormControl>
                                          <RadioGroupItem
                                            className="accent-pink-500"
                                            value="Direct Bank Transfer"
                                          />
                                        </FormControl>
                                        <FormLabel className="text-[18px] text-normal text-qblack">
                                          Direct Bank Transfer
                                        </FormLabel>
                                      </FormItem>

                                      <FormItem className="class=flex space-x-2.5 items-center mb-4">
                                        <FormControl>
                                          <RadioGroupItem
                                            className="accent-pink-500"
                                            value="Cash on Delivery"
                                          />
                                        </FormControl>
                                        <FormLabel className="text-[18px] text-normal text-qblack">
                                          Cash on Delivery
                                        </FormLabel>
                                      </FormItem>

                                      <FormItem className="class=flex space-x-2.5 items-center mb-4">
                                        <FormControl>
                                          <RadioGroupItem
                                            className="accent-pink-500"
                                            value="Credit/Debit Cards or Paypal"
                                          />
                                        </FormControl>
                                        <FormLabel className="text-[18px] text-normal text-qblack">
                                          Credit/Debit Cards or Paypal
                                        </FormLabel>
                                      </FormItem>
                                    </RadioGroup>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </form>
                        </Form>
                      </div>
                      <Button
                        asChild
                        className="w-full bg-black rounded-none h-[50px]"
                      >
                        <a href="#">
                          <span className="text-sm font-semibold">
                            Place Order Now
                          </span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
