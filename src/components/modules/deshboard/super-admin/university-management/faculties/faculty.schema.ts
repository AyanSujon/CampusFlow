import { z } from "zod";

export const createFacultySchema = z.object({
  code: z
    .string()
    .trim()
    .min(2, "Faculty code must be at least 2 characters")
    .max(20, "Faculty code must be less than 20 characters")
    .regex(
      /^[A-Z0-9-_]+$/,
      "Code can only contain uppercase letters, numbers, hyphens, and underscores",
    ),

  name: z
    .string()
    .trim()
    .min(3, "Faculty name must be at least 3 characters")
    .max(150, "Faculty name must be less than 150 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),

  deanUserId: z.string().optional(),

  isActive: z.boolean(),
});

export type CreateFacultyFormValues = z.infer<typeof createFacultySchema>;