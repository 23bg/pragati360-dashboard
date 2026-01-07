import { z } from "zod";

// ✅ Schema for validation
export const loginFormSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().regex(/^\+?[1-9]\d{9,14}$/, "Enter a valid phone number"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;