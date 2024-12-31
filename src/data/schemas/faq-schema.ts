import { z } from "zod";

export const faqSchema = z
  .object({
    name: z.string().min(1, { message: "name required" }),
    email: z.string().min(1, { message: "email required" }),
    message: z.string().min(1, { message: "message required" }),
  })
  .required();
