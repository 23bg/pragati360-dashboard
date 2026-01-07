import z from "zod";

export const resetPasswordFormSchema = z.object({

    password: z.string().min(6),
    confirmPassword: z.string().min(6),
});

export type ResetPasswordFormData = z.infer<typeof resetPasswordFormSchema>;