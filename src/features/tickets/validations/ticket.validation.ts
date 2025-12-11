import z from "zod";

// ------------------------------
// Zod Schema for Ticket Form
// ------------------------------
export const ticketFormSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title must not exceed 100 characters"),
    description: z
        .string()
        .min(5, "Description must be at least 5 characters long")
        .optional(),
    status: z.enum(["open", "in_progress", "closed"], {
        required_error: "Status is required",
    }),
    priority: z.enum(["low", "medium", "high"], {
        required_error: "Priority is required",
    }),
    assignedTo: z.string().optional(),
    createdBy: z.string().optional(),
});

// ------------------------------
// Inferred Type for TypeScript
// ------------------------------
export type TicketFormData = z.infer<typeof ticketFormSchema>;
