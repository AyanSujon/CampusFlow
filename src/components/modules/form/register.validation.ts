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



export const StudentRegistrationZodSchema = z.object({
  name: z
    .string("Not A String!!!!!")
    .min(3, "Name must atleast 3 characters long!!!")
    .max(10),
  email: z.email("Not email!!"),
  password: z
    .string()
    .min(8, "Password Must Minimum 8 Characters Long.")
    .regex(/[a-z]/, "Password must contain atleast 1 Lowercase Letter")
    .regex(/[A-Z]/, "Password must contain atleast 1 Uppercase Letter")

    .regex(/[0-9]/, "Password must contain atleast 1 Number")
    .regex(/[^A-Za-z0-9]/, "Password must contain atleast 1 Special Character"),
  confirmPassword: z.string().min(8, "Confirm password is required"),


  studentProfile: z
    .object({
      programId: z.string().uuid("Invalid program ID.").optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
      bloodGroup: z.string().optional(),
      guardianName: z.string().optional(),
      guardianPhone: z.string().optional(),
    })
    .optional(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });



















// import { z } from "zod";

// export const AccountRegistrationSchema = z
//   .object({
//     name: z
//       .string()
//       .min(3, "Name must be at least 3 characters long.")
//       .max(50, "Name must be less than 50 characters."),

//     email: z
//       .email("Please enter a valid email address."),

//     password: z
//       .string()
//       .min(8, "Password must be at least 8 characters.")
//       .regex(/[a-z]/, "Password must contain a lowercase letter.")
//       .regex(/[A-Z]/, "Password must contain an uppercase letter.")
//       .regex(/[0-9]/, "Password must contain a number."),

//     confirmPassword: z
//       .string()
//       .min(8, "Please confirm your password."),
//   })
//   .refine(
//     (data) => data.password === data.confirmPassword,
//     {
//       message: "Passwords do not match.",
//       path: ["confirmPassword"],
//     }
//   );

// export const StudentProfileSchema = z.object({
//   programId: z.string().optional(),

//   dateOfBirth: z.string().optional(),

//   gender: z
//     .enum(["MALE", "FEMALE"])
//     .optional(),

//   phone: z.string().optional(),

//   address: z.string().optional(),

//   bloodGroup: z.string().optional(),

//   guardianName: z.string().optional(),

//   guardianPhone: z.string().optional(),
// });

// export const RegistrationSchema = AccountRegistrationSchema.extend({
//   studentProfile: StudentProfileSchema.optional(),
// });

// export type RegistrationFormValues = z.infer<
//   typeof RegistrationSchema
// >;