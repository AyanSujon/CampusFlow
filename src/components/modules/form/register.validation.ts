// import { z } from "zod";

// export const studentProfileSchema = z.object({
//   programId: z.string().optional(),
//   dateOfBirth: z.string().optional(),
//   gender: z
//     .enum(["MALE", "FEMALE", "OTHER"])
//     .optional(),
//   phone: z.string().optional(),
//   address: z.string().optional(),
//   bloodGroup: z.string().optional(),
//   guardianName: z.string().optional(),
//   guardianPhone: z.string().optional(),
// }).optional;

// export const registerSchema = z
//   .object({
//     name: z
//       .string()
//       .trim()
//       .min(1, "Please enter your name."),

//     email: z
//       .string()
//       .trim()
//       .email("Please enter a valid email address."),

//     password: z
//       .string()
//       .min(6, "Password must be at least 6 characters."),

//     confirmPassword: z
//       .string()
//       .min(1, "Please confirm your password."),

//     studentProfile: studentProfileSchema,
//   })
//   .refine(
//     (data) => data.password === data.confirmPassword,
//     {
//       message: "Passwords do not match.",
//       path: ["confirmPassword"],
//     }
//   );











import { z } from "zod";

export const studentProfileSchema = z.object({
  programId: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z
    .enum(["MALE", "FEMALE", "OTHER"])
    .optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  bloodGroup: z.string().optional(),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
});

export const accountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),

  confirmPassword: z
    .string()
    .min(1, "Please confirm your password."),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  }
);

export const registerSchema = z.object({
  ...accountSchema.shape,
  studentProfile: studentProfileSchema,
});