import { z } from "zod";

// --- LOGIN SCHEMA ---
// Only validates what is necessary to sign in
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  // We keep 'role' bcz backend needs it to direct users to the right dashboard
  role: z.enum(["buyer", "seller"]),
});

// --- SIGNUP SCHEMA ---
// Comprehensive validation for creating a new account
export const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name is too short"),
    surname: z.string().min(2, "Surname is too short"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum(["buyer", "seller"]),
    shopName: z.string().optional(),
    agree: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })
  // Check if passwords match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  // Conditional validation: If role is 'seller', shopName is required
  .refine(
    (data) => {
      if (data.role === "seller") {
        return !!data.shopName && data.shopName.trim().length >= 3;
      }
      return true;
    },
    {
      message: "Shop name is required for sellers (min 3 chars)",
      path: ["shopName"],
    },
  );
