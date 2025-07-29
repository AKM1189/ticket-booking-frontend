import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email is not valid" }),
  password: z
    .string({ message: "Password is required" })
    .min(1, { message: "Password is required" }),
});

export const signupSchema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(3, { message: "Name must be minimum 3 letters." }),
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Email is not valid" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z.string({ message: "Confirm Password is required" }),
    //   .min(1, { message: "Password must be at least 6 characters long" }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export const forgotPasswordSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email is not valid" }),
});

export const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP is required" }),
});

export const changePasswordSchema = z
  .object({
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(/\d/, "Password must contain at least one number"),
    confirmPassword: z.string({ message: "Confirm Password is required" }),
    //   .min(1, { message: "Password must be at least 6 characters long" }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export const profileSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be minimum 3 letters." }),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Email is not valid" }),
});
