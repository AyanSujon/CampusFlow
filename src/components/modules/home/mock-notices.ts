export type Notice = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  scope: "UNIVERSITY" | "DEPARTMENT" | "PROGRAM";
  isPublished: boolean;
};

export const notices: Notice[] = [
  {
    id: "notice-001",
    title: "Midterm Examination Schedule Published",
    slug: "midterm-examination-schedule-published",
    publishedAt: "2026-09-26T09:00:00.000Z",
    scope: "UNIVERSITY",
    isPublished: true,
  },
  {
    id: "notice-002",
    title: "Registration Deadline Extended for Fall Semester",
    slug: "registration-deadline-extended-fall-semester",
    publishedAt: "2026-09-24T11:30:00.000Z",
    scope: "UNIVERSITY",
    isPublished: true,
  },
  {
    id: "notice-003",
    title: "University Campus Will Remain Closed on October 1",
    slug: "campus-closed-october-1",
    publishedAt: "2026-09-22T08:15:00.000Z",
    scope: "UNIVERSITY",
    isPublished: true,
  },
  {
    id: "notice-004",
    title: "Student ID Card Collection Notice",
    slug: "student-id-card-collection-notice",
    publishedAt: "2026-09-20T10:00:00.000Z",
    scope: "UNIVERSITY",
    isPublished: true,
  },
  {
    id: "notice-005",
    title: "Scholarship Application Is Now Open",
    slug: "scholarship-application-open",
    publishedAt: "2026-09-18T07:45:00.000Z",
    scope: "UNIVERSITY",
    isPublished: true,
  },
];