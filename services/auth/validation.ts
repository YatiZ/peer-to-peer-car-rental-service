import { z } from "zod";

export const LoginValidation = z.object({
    email: z
      .string()
      .min(4, { message: "Must be a valid email or phone number" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });