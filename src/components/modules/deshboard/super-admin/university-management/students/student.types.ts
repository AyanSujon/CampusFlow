

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