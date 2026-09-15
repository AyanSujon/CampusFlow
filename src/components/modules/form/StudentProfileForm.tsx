



"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type Gender = "MALE" | "FEMALE" | "OTHER";

export interface StudentProfile {
  programId?: string;
  dateOfBirth?: string;
  gender?: Gender | "";
  phone?: string;
  address?: string;
  bloodGroup?: string;
  guardianName?: string;
  guardianPhone?: string;
}

interface StudentProfileFormProps {
  studentProfile: StudentProfile;

  updateProfileField: (
    field: keyof StudentProfile,
    value: string
  ) => void;

  handleSkip: () => void;
  handleRegister: () => void;
  handleBack: () => void;
}

export function StudentProfileForm({
  studentProfile,
  updateProfileField,
  handleSkip,
  handleRegister,
  handleBack,
}: StudentProfileFormProps) {
  const updateField = (
    field: keyof StudentProfile,
    value: string
  ) => {
    updateProfileField(field, value);
  };

  return (
    <FieldGroup>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          Complete Your Profile
        </h1>

        <p className="text-balance text-muted-foreground">
          Add your student information. You can skip this step and complete it
          later.
        </p>
      </div>

      {/* Program */}
      <Field>
        <FieldLabel htmlFor="programId">
          Program ID
        </FieldLabel>

        <Input
          id="programId"
          type="text"
          placeholder="Enter your program ID"
          value={studentProfile.programId ?? ""}
          onChange={(e) =>
            updateField("programId", e.target.value)
          }
        />

        <FieldDescription>
          You can select your program from the student dashboard later.
        </FieldDescription>
      </Field>

      {/* Date of Birth */}
      <Field>
        <FieldLabel htmlFor="dateOfBirth">
          Date of Birth
        </FieldLabel>

        <Input
          id="dateOfBirth"
          type="date"
          value={studentProfile.dateOfBirth ?? ""}
          onChange={(e) =>
            updateField("dateOfBirth", e.target.value)
          }
        />
      </Field>

      {/* Gender */}
      <Field>
        <FieldLabel htmlFor="gender">
          Gender
        </FieldLabel>

        <select
          id="gender"
          value={studentProfile.gender ?? ""}
          onChange={(e) =>
            updateField("gender", e.target.value)
          }
          className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          <option value="">Select gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      </Field>

      {/* Phone */}
      <Field>
        <FieldLabel htmlFor="phone">
          Phone
        </FieldLabel>

        <Input
          id="phone"
          type="tel"
          placeholder="+880 1XXXXXXXXX"
          value={studentProfile.phone ?? ""}
          onChange={(e) =>
            updateField("phone", e.target.value)
          }
        />
      </Field>

      {/* Address */}
      <Field>
        <FieldLabel htmlFor="address">
          Address
        </FieldLabel>

        <Input
          id="address"
          type="text"
          placeholder="Your current address"
          value={studentProfile.address ?? ""}
          onChange={(e) =>
            updateField("address", e.target.value)
          }
        />
      </Field>

      {/* Blood Group */}
      <Field>
        <FieldLabel htmlFor="bloodGroup">
          Blood Group
        </FieldLabel>

        <Input
          id="bloodGroup"
          type="text"
          placeholder="e.g. A+, B+, O+"
          value={studentProfile.bloodGroup ?? ""}
          onChange={(e) =>
            updateField("bloodGroup", e.target.value)
          }
        />
      </Field>

      {/* Guardian Name */}
      <Field>
        <FieldLabel htmlFor="guardianName">
          Guardian Name
        </FieldLabel>

        <Input
          id="guardianName"
          type="text"
          placeholder="Guardian's full name"
          value={studentProfile.guardianName ?? ""}
          onChange={(e) =>
            updateField("guardianName", e.target.value)
          }
        />
      </Field>

      {/* Guardian Phone */}
      <Field>
        <FieldLabel htmlFor="guardianPhone">
          Guardian Phone
        </FieldLabel>

        <Input
          id="guardianPhone"
          type="tel"
          placeholder="+880 1XXXXXXXXX"
          value={studentProfile.guardianPhone ?? ""}
          onChange={(e) =>
            updateField("guardianPhone", e.target.value)
          }
        />
      </Field>

      {/* Actions */}
      <Field className="gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
        >
          Back
        </Button>

        <Button
          type="button"
          onClick={handleRegister}
        >
          Complete Registration
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleSkip}
        >
          Skip for later
        </Button>
      </Field>
    </FieldGroup>
  );
}