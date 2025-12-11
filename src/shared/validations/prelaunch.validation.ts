import { z } from "zod";

// ✅ Schema for validation
export const prelaunchFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Enter a valid phone number"),
});