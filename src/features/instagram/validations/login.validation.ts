import { z } from "zod";

// ✅ Schema for validation
export const loginFormSchema = z.object({
    email: z.string().email("Enter a valid email"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;