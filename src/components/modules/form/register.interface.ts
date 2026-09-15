

export type Gender = "MALE" | "FEMALE" | "OTHER";

export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;

    studentProfile: {
        programId: string;
        dateOfBirth: string;
        gender: Gender | "";
        phone: string;
        address: string;
        bloodGroup: string;
        guardianName: string;
        guardianPhone: string;
    };
}