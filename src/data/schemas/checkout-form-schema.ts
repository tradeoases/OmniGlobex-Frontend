import { z } from "zod";

export const CheckoutSchema = z.object({
  firstName: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  lastName: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  zip: z.string().min(5, {
    message: "Enter a valid zip code.",
  }),
  createAccount: z.boolean().refine((val) => val === true, {
    message: "Please check this box to create an account.",
  }),
  shipToDifferentAddress: z.boolean().default(false).optional(),
});

export type TCheckoutSchema = z.infer<typeof CheckoutSchema>;

export const PaymentMethodSchema = z.object({
  method: z.enum(
    [
      "Direct Bank Transfer",
      "Cash on Delivery",
      "Credit/Debit Cards or Paypal",
    ],
    {
      required_error: "You need to select a method",
    }
  ),
});

export type TPaymentMethodSchema = z.infer<typeof PaymentMethodSchema>;
