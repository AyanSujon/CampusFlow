// export interface Student {
//   id: string;

//   studentId: string;

//   academicStatus: "ACTIVE" | "INACTIVE" | "GRADUATED" | "SUSPENDED" | "DROPPED_OUT";

//   currentSemesterNo: number;

//   user: {
//     id: string;
//     name: string;
//     email: string;
//     isActive: boolean;
//   };

//   department?: {
//     id: string;
//     code: string;
//     name: string;
//   } | null;

//   program?: {
//     id: string;
//     code: string;
//     name: string;
//   } | null;
// }




















// export type AcademicStatus =
//   | "ACTIVE"
//   | "INACTIVE"
//   | "GRADUATED"
//   | "SUSPENDED"
//   | "DROPPED_OUT"
//   | "ON_LEAVE";

// export type Gender = "MALE" | "FEMALE" | "OTHER";

// export type AuthProvider = "CREDENTIAL" | "GOOGLE";

// export type UserRole =
//   | "SUPER_ADMIN"
//   | "ADMIN"
//   | "DEPARTMENT_HEAD"
//   | "INSTRUCTOR"
//   | "STUDENT"
//   | "ACCOUNTANT";

// export interface StudentUser {
//   id: string;
//   name: string | null;
//   email: string;
//   role: UserRole;
//   authProvider: AuthProvider;

//   emailVerified: boolean;
//   isActive: boolean;
//   isDeleted: boolean;

//   deletedAt: string | null;

//   googleId: string | null;
//   departmentId: string | null;
//   facultyId: string | null;

//   needPasswordChange: boolean;

//   permissions: string[];

//   createdAt: string;
//   updatedAt: string;
// }

// export interface StudentProgram {
//   id: string;
//   code: string;
//   name: string;
//   degreeType: string;
//   durationYears: number;
//   totalCredits: number;
// }

// export interface Student {
//   id: string;
//   userId: string;

//   studentId: string | null;
//   name: string | null;
//   email: string | null;

//   phone: string | null;
//   avatar: string | null;
//   address: string | null;

//   dateOfBirth: string | null;
//   gender: Gender | null;
//   bloodGroup: string | null;

//   guardianName: string | null;
//   guardianPhone: string | null;

//   admissionDate: string | null;

//   programId: string | null;
//   currentSemesterNo: number | null;

//   academicStatus: AcademicStatus;

//   program: StudentProgram | null;

//   user: StudentUser;

//   createdAt: string;
//   updatedAt: string;
// }

// export type Students = Student[];











// export interface StudentUser {
//   authProvider: string;
//   createdAt: string;
//   deletedAt: string | null;
//   departmentId: string | null;
//   email: string;
//   emailVerified: boolean;
//   facultyId: string | null;
//   googleId: string | null;
//   id: string;
//   isActive: boolean;
//   isDeleted: boolean;
//   name: string;
//   needPasswordChange: boolean;
//   permissions: string[];
//   role: string;
//   updatedAt: string;
// }

// export interface Student {
//   academicStatus: string;
//   address: string | null;
//   admissionDate: string | null;
//   avatar: string | null;
//   bloodGroup: string | null;
//   createdAt: string;
//   currentSemesterNo: number | null;
//   dateOfBirth: string | null;
//   email: string;
//   gender: string | null;
//   guardianName: string | null;
//   guardianPhone: string | null;
//   id: string;
//   name: string;
//   phone: string | null;
//   program: unknown | null;
//   programId: string | null;
//   studentId: string | null;
//   updatedAt: string;
//   user: StudentUser;
// }

// export type Students = Student[];













export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  isActive: boolean;

  department?: {
    id: string;
    name: string;
  } | null;

  program?: {
    id: string;
    name: string;
  } | null;
}