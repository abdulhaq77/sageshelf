import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit for cover
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const bookSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  author: z.string().min(2, "Author name is required"),
  description: z
    .string()
    .min(20, "Description should be more detailed (20+ chars)"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  category: z.string(),
  format: z.string(),

  // File Validation: Zod checks the FileList object from react hook form
  coverImage: z
    .any()
    .refine((files) => files?.length == 1, "Cover image is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    ),

  bookFile: z
    .any()
    .refine((files) => files?.length == 1, "Digital book file is required"),
});
