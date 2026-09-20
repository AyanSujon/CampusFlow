export interface UserRegistrationPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;

  studentProfile?: {
    programId?: string;
    dateOfBirth?: string;
    gender?: "MALE" | "FEMALE" | "OTHER";
    phone?: string;
    address?: string;
    bloodGroup?: string;
    guardianName?: string;
    guardianPhone?: string;
  };
}