import { z } from "zod";

export const GooglePostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    summary: z.string().optional(),
    postType: z.string().optional(),
    mediaUrls: z.array(z.string().url()).optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
});

export type GooglePostFormType = z.infer<typeof GooglePostSchema>;
