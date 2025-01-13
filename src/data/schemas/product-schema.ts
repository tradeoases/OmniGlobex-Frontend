import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "The description is required"),
  categoryId: z.string().min(1, "The category is required"),
  productPrice: z.string().min(1, "Price is required"),
  priceCurrency: z.string().min(1, "The currency is required"),
  deliveryTerms: z
    .string()
    .min(1, "You are required to enter the delivery terms"),
  tags: z.string().min(0, "Tags required").optional(),
  unit: z.string().min(0, "Unit required").optional(),
  units: z.string().min(0, "Quantity required").optional(),
  // showRooms: z.array(z.string().uuid("Must be a valid UUID")).optional(),
  // brandId: z.string().uuid().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  productPrice: z.number().optional(),
  priceCurrency: z.string().uuid().optional(),
  tags: z.string().optional(),
  deliveryTerms: z.string().optional(),
  inStock: z.number().optional(),
  coverImage: z.string().uuid().optional(),
  units: z.string().optional(),
  productImages: z.array(z.string().uuid()).optional(),
});
