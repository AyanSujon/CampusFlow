// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";

// export interface StudentProfileData {
//   programId?: string;
//   dateOfBirth?: string;
//   gender?: "MALE" | "FEMALE" | "OTHER";
//   phone?: string;
//   address?: string;
//   bloodGroup?: string;
//   guardianName?: string;
//   guardianPhone?: string;
// }

// interface StudentProfileFormProps {
//   data: StudentProfileData;
//   onChange: (data: StudentProfileData) => void;
//   onSkip: () => void;
//   onSubmit: () => void;
// }

// export function StudentProfileForm({
//   data,
//   onChange,
//   onSkip,
//   onSubmit,
// }: StudentProfileFormProps) {
//   const updateField = (
//     field: keyof StudentProfileData,
//     value: string
//   ) => {
//     onChange({
//       ...data,
//       [field]: value,
//     });
//   };

//   return (
//     <FieldGroup>
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl font-bold">Complete Your Profile</h1>

//         <p className="text-balance text-muted-foreground">
//           Add your student information. You can skip this step and complete it
//           later.
//         </p>
//       </div>

//       {/* Program */}
//       <Field>
//         <FieldLabel htmlFor="programId">Program ID</FieldLabel>

//         <Input
//           id="programId"
//           type="text"
//           placeholder="Enter your program ID"
//           value={data.programId ?? ""}
//           onChange={(e) => updateField("programId", e.target.value)}
//         />

//         <FieldDescription>
//           You can select your program from the student dashboard later.
//         </FieldDescription>
//       </Field>

//       {/* Date of Birth */}
//       <Field>
//         <FieldLabel htmlFor="dateOfBirth">Date of Birth</FieldLabel>

//         <Input
//           id="dateOfBirth"
//           type="date"
//           value={data.dateOfBirth ?? ""}
//           onChange={(e) => updateField("dateOfBirth", e.target.value)}
//         />
//       </Field>

//       {/* Gender */}
//       <Field>
//         <FieldLabel htmlFor="gender">Gender</FieldLabel>

//         <select
//           id="gender"
//           value={data.gender ?? ""}
//           onChange={(e) =>
//             updateField(
//               "gender",
//               e.target.value as StudentProfileData["gender"]
//             )
//           }
//           className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
//         >
//           <option value="">Select gender</option>
//           <option value="MALE">Male</option>
//           <option value="FEMALE">Female</option>
//           <option value="OTHER">Other</option>
//         </select>
//       </Field>

//       {/* Phone */}
//       <Field>
//         <FieldLabel htmlFor="phone">Phone</FieldLabel>

//         <Input
//           id="phone"
//           type="tel"
//           placeholder="+880 1XXXXXXXXX"
//           value={data.phone ?? ""}
//           onChange={(e) => updateField("phone", e.target.value)}
//         />
//       </Field>

//       {/* Address */}
//       <Field>
//         <FieldLabel htmlFor="address">Address</FieldLabel>

//         <Input
//           id="address"
//           type="text"
//           placeholder="Your current address"
//           value={data.address ?? ""}
//           onChange={(e) => updateField("address", e.target.value)}
//         />
//       </Field>

//       {/* Blood Group */}
//       <Field>
//         <FieldLabel htmlFor="bloodGroup">Blood Group</FieldLabel>

//         <Input
//           id="bloodGroup"
//           type="text"
//           placeholder="e.g. A+, B+, O+"
//           value={data.bloodGroup ?? ""}
//           onChange={(e) => updateField("bloodGroup", e.target.value)}
//         />
//       </Field>

//       {/* Guardian Name */}
//       <Field>
//         <FieldLabel htmlFor="guardianName">Guardian Name</FieldLabel>

//         <Input
//           id="guardianName"
//           type="text"
//           placeholder="Guardian's full name"
//           value={data.guardianName ?? ""}
//           onChange={(e) => updateField("guardianName", e.target.value)}
//         />
//       </Field>

//       {/* Guardian Phone */}
//       <Field>
//         <FieldLabel htmlFor="guardianPhone">
//           Guardian Phone
//         </FieldLabel>

//         <Input
//           id="guardianPhone"
//           type="tel"
//           placeholder="+880 1XXXXXXXXX"
//           value={data.guardianPhone ?? ""}
//           onChange={(e) => updateField("guardianPhone", e.target.value)}
//         />
//       </Field>

//       {/* Actions */}
//       <Field className="gap-3">
//         <Button type="button" onClick={onSubmit}>
//           Complete Registration
//         </Button>

//         <Button
//           type="button"
//           variant="outline"
//           onClick={onSkip}
//         >
//           Skip for later
//         </Button>
//       </Field>
//     </FieldGroup>
//   );
// }