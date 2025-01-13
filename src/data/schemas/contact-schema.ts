import { z } from "zod";

export const getInTouchSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: `Name required` })
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z
      .string()
      .min(1, { message: `Email required` })
      .email({ message: "Please enter a valid email address." }),
    subject: z.string().min(1, { message: `Subject is required` }),
    message: z
      .string()
      .min(1, { message: `Message is required` })
      .min(10, { message: "Message must be at least 10 characters long" }),
  })
  .required();
