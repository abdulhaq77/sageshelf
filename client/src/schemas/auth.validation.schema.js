import { z } from "zod";

export const authSchema = z
  .object({
    firstName: z.string().min(2, "Short").optional().or(z.literal("")),
    surname: z.string().min(2, "Short").optional().or(z.literal("")),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "8+ chars required"),
    confirmPassword: z.string().optional().or(z.literal("")),
    role: z.enum(["customer", "seller"]),
    shopName: z.string().optional().or(z.literal("")),
    agree: z.boolean().refine((v) => v === true, "Required"),
  })
  .refine(
    (data) => {
      // Only validate password match if it's a registration (confirmPassword exists)
      if (data.confirmPassword !== undefined && data.confirmPassword !== "") {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.role === "seller") {
        return !!data.shopName && data.shopName.length >= 3;
      }
      return true;
    },
    {
      message: "Shop name required",
      path: ["shopName"],
    },
  );
