import * as z from "zod";

export const bookSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  price: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Enter a valid price",
    ),
  category: z.string().min(1, "Please select a category"),
  description: z
    .string()
    .min(20, "Provide a detailed description (min 20 chars)"),
});
