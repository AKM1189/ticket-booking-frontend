import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png"];

export const movieSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(3, { message: "Description is required" }),
  duration: z.number({ message: "Duration is required" }),
  genres: z.array(z.string()).min(1, { message: "Genre is required" }),
  experience: z.array(z.string()).min(1, { message: "Experience is required" }),
  releaseDate: z.string().min(5, { message: "Release Date is required" }),
  language: z.array(z.string()).nonempty("Please select at least one language"),
  subtitle: z.array(z.string()).nonempty("Please select at least one subtitle"),
  poster: z
    .instanceof(File, { message: "Poster is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size exceeds 5MB")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Unsupported file type",
    ),
  trailerId: z.string().nullable(),
});
