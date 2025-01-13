import { z } from "zod";

export const signupSchema = z
  .object({
    business_name: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),

    terms: z.boolean().default(false).optional(),

    country_id: z.string().uuid({ message: "Invalid country ID" }),

    address: z.string().min(2, {
      message: "Address must be at least 2 characters.",
    }),

    city: z.string().min(2, {
      message: "City must be at least 2 characters.",
    }),

    phonenumber: z.string().min(10, {
      message: "Phone number must be at least 10 characters.",
    }),

    email: z.string().email({ message: "Invalid email" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),

    role: z.enum(["Supplier", "Buyer", "Both"], {
      message: "Role must be one of Supplier, Buyer, or Both",
    }),

    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }), // enforce that acceptTerms must be true

    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  business_name: z
    .string()
    .min(2, { message: "Business name must be at least 2 characters." })
    .optional(),
  profile: z
    .object({
      phonenumber: z.string().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      country_id: z.string().optional(),
      slogan: z.string().optional(),
      business_type: z.string().optional(),
      number_of_employees: z.number().optional(),
      year_started: z.string().optional(),
    })
    .optional(),
  social_media: z
    .array(
      z.object({
        link_id: z.string().uuid().optional(),
        link_for: z.enum([
          "INSTAGRAM",
          "FACEBOOK",
          "TWITTER",
          "YOUTUBE",
          "SNAPCHAT",
          "TIKTOK",
          "PINTEREST",
          "LINKEDIN",
          "TUMBLR",
          "TELEGRAM",
        ]),
        link: z.string().url({ message: "Invalid URL format" }),
      })
    )
    .optional(),
  cover_id: z.string().uuid().optional(),
  profile_id: z.string().uuid().optional(),
  logo_id: z.string().uuid().optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(1, "Email required"),
  password: z.string().min(1, "Password is required"),
});

export const resetSchema = z.object({
  password: z.string().min(8, "Please enter password"),
  confirmPassword: z.string().min(8, "Please enter Confirm Password"),
  key: z.string().length(6, "Code is required"),
});

export const personalInfoSchema = z.object({
  fullname: z.string().min(10, {
    message: "Full name must be at least 10 characters.",
  }),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, {
    message: "phone number must be at least 10 characters.",
  }),
  location: z.string().min(2, {
    message: "address must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "town must be at least 2 characters.",
  }),
});

export const passwordResetSchema = z.object({
  oldPassword: z.string().min(1, "Old Password is required"),
  newPassword: z.string().min(1, "New Password is required"),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
});

export const addBusinessUser = z.object({
  username: z.string().min(1, "User name is required"),
  useremail: z.string().min(1, "User email is required"),
});
