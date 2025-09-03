import { z } from "zod";

export const theatreSchema = z.object({
  name: z.string().min(3, { message: "Name is required." }),
  location: z.string().min(1, { message: "Location is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  city: z.string().min(1, { message: "City is required" }),
  phoneNo: z
    .string({ message: "Phone no is required" })
    .min(5, { message: "Phone no length must be longer 5 digits." })
    .max(15, { message: "Phone no length must not exceed 15 digits." }),
});
