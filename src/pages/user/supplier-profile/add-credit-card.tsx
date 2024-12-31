/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { HiOutlineXMark } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { createClientSecret } from "@/service/apis/business-services";
import { HttpStatusCode } from "axios";

const AddPaymentMethod = ({ onClose }: { onClose: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddPaymentMethod = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createClientSecret();
      if (response.status !== HttpStatusCode.Ok) {
        return setError("Failed to fetch the data");
      }
      const { clientSecret } = await response.data.data;
      console.log({ clientSecret });

      if (!stripe || !elements) {
        return;
      }
      const cardElement = elements.getElement(CardElement);
      const { error: stripeError } = await stripe.confirmCardSetup(
        clientSecret,
        {
          payment_method: {
            card: cardElement as any,
            billing_details: {
              name: "Customer Name", // Replace with real customer name
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || "");
        setLoading(false);
        return;
      }
      onClose();
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed cursor-pointer mt-11 top-0 left-0 w-full z-10 h-full bg-black/45 p-8">
      <div className="bg-white relative w-full lg:w-4/5 xl:w-2/5 mx-auto h-full rounded-xl p-4 py-8 md:p-8 ">
        <div className="flex justify-end">
          <span
            onClick={onClose}
            className="cursor-pointer hover:text-red-700 transition ease-in-out duration-200 text-lg"
          >
            <HiOutlineXMark />
          </span>
        </div>

        <p className="text-lg font-semibold">New Product</p>
        <form onSubmit={handleAddPaymentMethod}>
          <div>
            <CardElement className="p-6" />
          </div>

          {error && <div style={{ color: "red" }}>{error}</div>}

          <div className="scrollbar pl-1 pr-3 md:px-3 overflow-y-scroll h-[73vh] w-full">
            <Button type="submit" className="w-full">
              {loading ? "Saving..." : "Save Payment Method"}
            </Button>
          </div>
        </form>

        <div className="absolute bottom-0 left-0 right-0 py-4 w-full border-t px-8"></div>
      </div>
    </div>

    //
  );
};

export default AddPaymentMethod;
