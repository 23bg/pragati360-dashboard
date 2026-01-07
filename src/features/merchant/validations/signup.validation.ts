import z from "zod";

export const signupFormSchema = z.object({
    name: z.string().min(2, "Name too short"),
    email: z.string().email(),
    password: z.string().min(6),
});

export type SignupFormData = z.infer<typeof signupFormSchema>;