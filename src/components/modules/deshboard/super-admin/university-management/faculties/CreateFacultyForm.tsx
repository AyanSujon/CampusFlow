







// "use client";

// import React from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "@tanstack/react-form";
// import { Loader2, Save, X } from "lucide-react";

// // shadcn/ui
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { CreateFacultyFormValues } from "./faculty.schema";
// import { useCreateFaculty } from "@/hooks/faculties.hook";
// import { toast } from "@/components/ui/toast";

// interface CreateFacultyFormProps {
//   deanUsers?: {
//     id: string;
//     name: string;
//     email: string;
//   }[];
// }

// export default function CreateFacultyForm({
//   deanUsers = [],
// }: CreateFacultyFormProps) {
//   const router = useRouter();

//   const { mutateAsync: createFaculty, isPending } = useCreateFaculty();

//   const form = useForm({
//     defaultValues: {
//       code: "",
//       name: "",
//       description: "",
//       deanUserId: "",
//       isActive: true,
//     } satisfies CreateFacultyFormValues,

//     onSubmit: async ({ value }) => {
//       const facultyData = {
//         code: value.code,
//         name: value.name,
//         description: value.description || undefined,
//         deanUserId: value.deanUserId || undefined,
//         isActive: value.isActive,
//       };

//       try {
//         await createFaculty(facultyData);

//         toast.add({
//           title: "Faculty Created Successfully",
//           description: "The faculty has been created successfully.",
//           type: "success",
//         });

//         router.push("/super-admin/faculties");
//       } catch (err) {
//         toast.add({
//           title: "Faculty Creation Failed",
//           description:
//             err instanceof Error
//               ? err.message
//               : "Something went wrong. Please try again.",
//           type: "error",
//         });
//       }
//     },
//   });

//   return (
//     <div className="mx-auto w-full max-w-4xl">
//       <Card className="border-border bg-card shadow-sm">
//         <CardHeader>
//           <CardTitle className="text-xl">Create Faculty</CardTitle>

//           <CardDescription>
//             Add a new top-level academic faculty to the university.
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               form.handleSubmit();
//             }}
//             className="space-y-6"
//           >
//             {/* Faculty Code + Name */}
//             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//               {/* Code */}
//               <form.Field name="code">
//                 {(field) => (
//                   <div className="space-y-2">
//                     <Label htmlFor={field.name}>
//                       Faculty Code
//                       <span className="ml-1 text-destructive">*</span>
//                     </Label>

//                     <Input
//                       id={field.name}
//                       name={field.name}
//                       value={field.state.value}
//                       onBlur={field.handleBlur}
//                       onChange={(e) =>
//                         field.handleChange(
//                           e.target.value.toUpperCase()
//                         )
//                       }
//                       placeholder="e.g. FET"
//                       maxLength={20}
//                     />

//                     <p className="text-xs text-muted-foreground">
//                       A unique short code for this faculty.
//                     </p>

//                     {field.state.meta.errors.length > 0 && (
//                       <p className="text-sm text-destructive">
//                         {field.state.meta.errors[0]}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </form.Field>

//               {/* Name */}
//               <form.Field name="name">
//                 {(field) => (
//                   <div className="space-y-2">
//                     <Label htmlFor={field.name}>
//                       Faculty Name
//                       <span className="ml-1 text-destructive">*</span>
//                     </Label>

//                     <Input
//                       id={field.name}
//                       name={field.name}
//                       value={field.state.value}
//                       onBlur={field.handleBlur}
//                       onChange={(e) =>
//                         field.handleChange(e.target.value)
//                       }
//                       placeholder="Faculty of Engineering"
//                     />

//                     {field.state.meta.errors.length > 0 && (
//                       <p className="text-sm text-destructive">
//                         {field.state.meta.errors[0]}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </form.Field>
//             </div>

//             {/* Description */}
//             <form.Field name="description">
//               {(field) => (
//                 <div className="space-y-2">
//                   <Label htmlFor={field.name}>Description</Label>

//                   <Textarea
//                     id={field.name}
//                     name={field.name}
//                     value={field.state.value}
//                     onBlur={field.handleBlur}
//                     onChange={(e) =>
//                       field.handleChange(e.target.value)
//                     }
//                     placeholder="Brief description about this faculty..."
//                     rows={5}
//                     maxLength={500}
//                   />

//                   <div className="flex justify-between">
//                     {field.state.meta.errors.length > 0 ? (
//                       <p className="text-sm text-destructive">
//                         {field.state.meta.errors[0]}
//                       </p>
//                     ) : (
//                       <span />
//                     )}

//                     <span className="text-xs text-muted-foreground">
//                       {field.state.value.length}/500
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </form.Field>

//             {/* Dean */}
//             <form.Field name="deanUserId">
//               {(field) => (
//                 <div className="space-y-2">
//                   <Label htmlFor={field.name}>Dean</Label>

//                   <select
//                     id={field.name}
//                     name={field.name}
//                     value={field.state.value}
//                     onBlur={field.handleBlur}
//                     onChange={(e) =>
//                       field.handleChange(e.target.value)
//                     }
//                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
//                   >
//                     <option value="">No dean assigned</option>

//                     {deanUsers.map((user) => (
//                       <option key={user.id} value={user.id}>
//                         {user.name} — {user.email}
//                       </option>
//                     ))}
//                   </select>

//                   <p className="text-xs text-muted-foreground">
//                     Optional. The dean is assigned to an existing user.
//                   </p>

//                   {field.state.meta.errors.length > 0 && (
//                     <p className="text-sm text-destructive">
//                       {field.state.meta.errors[0]}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </form.Field>

//             {/* Active Status */}
//             <form.Field name="isActive">
//               {(field) => (
//                 <div className="flex items-center justify-between rounded-lg border border-border p-4">
//                   <div className="space-y-1">
//                     <Label
//                       htmlFor="faculty-active"
//                       className="text-sm font-medium"
//                     >
//                       Active Faculty
//                     </Label>

//                     <p className="text-xs text-muted-foreground">
//                       Inactive faculties will not be available for
//                       normal academic operations.
//                     </p>
//                   </div>

//                   <Switch
//                     id="faculty-active"
//                     checked={field.state.value}
//                     onCheckedChange={(checked) =>
//                       field.handleChange(checked)
//                     }
//                   />
//                 </div>
//               )}
//             </form.Field>

//             {/* Actions */}
//             <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => router.back()}
//               >
//                 <X className="mr-2 h-4 w-4" />
//                 Cancel
//               </Button>

//               <form.Subscribe
//                 selector={(state) => [
//                   state.canSubmit,
//                   state.isSubmitting,
//                 ]}
//               >
//                 {([canSubmit, isSubmitting]) => (
//                   <Button
//                     type="submit"
//                     disabled={
//                       !canSubmit ||
//                       isSubmitting ||
//                       isPending
//                     }
//                   >
//                     {isSubmitting || isPending ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Creating...
//                       </>
//                     ) : (
//                       <>
//                         <Save className="mr-2 h-4 w-4" />
//                         Create Faculty
//                       </>
//                     )}
//                   </Button>
//                 )}
//               </form.Subscribe>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }














"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Loader2, Save, X } from "lucide-react";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { CreateFacultyFormValues } from "./faculty.schema";
import { useCreateFaculty } from "@/hooks/faculties.hook";
import { toast } from "@/components/ui/toast";

interface CreateFacultyFormProps {
  deanUsers?: {
    id: string;
    name: string;
    email: string;
  }[];
}

export default function CreateFacultyForm({
  deanUsers = [],
}: CreateFacultyFormProps) {
  const router = useRouter();

  const {
    mutateAsync: createFaculty,
    isPending,
  } = useCreateFaculty();

  const form = useForm({
    defaultValues: {
      code: "",
      name: "",
      description: "",
      deanUserId: "",
      // IMPORTANT:
      // Explicitly widen `true` to `boolean`
      isActive: true as boolean,
    },

    onSubmit: async ({ value }) => {
      const facultyData: CreateFacultyFormValues = {
        code: value.code,
        name: value.name,
        description: value.description || undefined,
        deanUserId: value.deanUserId || undefined,
        isActive: value.isActive,
      };

      try {
        await createFaculty(facultyData);

        toast.add({
          title: "Faculty Created Successfully",
          description:
            "The faculty has been created successfully.",
          type: "success",
        });

        router.push("/super-admin/faculties");
      } catch (err) {
        toast.add({
          title: "Faculty Creation Failed",
          description:
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again.",
          type: "error",
        });
      }
    },
  });

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Card className="border-border bg-card shadow-sm">
        {/* Header */}
        <CardHeader>
          <CardTitle className="text-xl">
            Create Faculty
          </CardTitle>

          <CardDescription>
            Add a new top-level academic faculty to the university.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();

              form.handleSubmit();
            }}
            className="space-y-6"
          >
            {/* =========================================
                Faculty Code + Name
            ========================================= */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Faculty Code */}
              <form.Field name="code">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>
                      Faculty Code
                      <span className="ml-1 text-destructive">
                        *
                      </span>
                    </Label>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value.toUpperCase()
                        )
                      }
                      placeholder="e.g. FET"
                      maxLength={20}
                    />

                    <p className="text-xs text-muted-foreground">
                      A unique short code for this faculty.
                    </p>

                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>

              {/* Faculty Name */}
              <form.Field name="name">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>
                      Faculty Name
                      <span className="ml-1 text-destructive">
                        *
                      </span>
                    </Label>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      placeholder="Faculty of Engineering"
                    />

                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* =========================================
                Description
            ========================================= */}
            <form.Field name="description">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>
                    Description
                  </Label>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    placeholder="Brief description about this faculty..."
                    rows={5}
                    maxLength={500}
                  />

                  <div className="flex justify-between">
                    {field.state.meta.errors.length > 0 ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    ) : (
                      <span />
                    )}

                    <span className="text-xs text-muted-foreground">
                      {(field.state.value ?? "").length}/500
                    </span>
                  </div>
                </div>
              )}
            </form.Field>

            {/* =========================================
                Dean
            ========================================= */}
            <form.Field name="deanUserId">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>
                    Dean
                  </Label>

                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">
                      No dean assigned
                    </option>

                    {deanUsers.map((user) => (
                      <option
                        key={user.id}
                        value={user.id}
                      >
                        {user.name} — {user.email}
                      </option>
                    ))}
                  </select>

                  <p className="text-xs text-muted-foreground">
                    Optional. The dean is assigned to an existing
                    user.
                  </p>

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* =========================================
                Active Status
            ========================================= */}
            <form.Field name="isActive">
              {(field) => (
                <div className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                  <div className="space-y-1">
                    <Label
                      htmlFor="faculty-active"
                      className="text-sm font-medium"
                    >
                      Active Faculty
                    </Label>

                    <p className="text-xs text-muted-foreground">
                      Inactive faculties will not be available
                      for normal academic operations.
                    </p>
                  </div>

                  <Switch
                    id="faculty-active"
                    checked={field.state.value}
                    onCheckedChange={(checked) => {
                      field.handleChange(checked);
                    }}
                  />
                </div>
              )}
            </form.Field>

            {/* =========================================
                Actions
            ========================================= */}
            <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
              {/* Cancel */}
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>

              {/* Submit */}
              <form.Subscribe
                selector={(state) => [
                  state.canSubmit,
                  state.isSubmitting,
                ]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={
                      !canSubmit ||
                      isSubmitting ||
                      isPending
                    }
                  >
                    {isSubmitting || isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Faculty
                      </>
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
