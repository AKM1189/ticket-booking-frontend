import { Role } from "@/types/AuthType";
import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(3, { message: "Name is required." }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Email is not valid" }),
    phoneNo: z
      .string({ message: "Phone no is required" })
      .min(5, { message: "Phone no length must be longer 5 digits." })
      .max(15, { message: "Phone no length must not exceed 15 digits." }),
    role: z
      .string({ message: "Role is required." })
      .min(3, { message: "Role is required." }),
    theatreId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.role === Role.staff) {
        return data.theatreId !== undefined && data.theatreId !== null;
      }
      return true;
    },
    {
      message: "Staff must be assigned to a theatre.",
      path: ["theatreId"], // error points to theatreId
    },
  );
