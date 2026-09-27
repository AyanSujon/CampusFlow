export type MockEvent = {
    id: string;
    title: string;
    slug: string;
    description: string;
    startAt: string;
    endAt: string;
    location: string;
    scope: "UNIVERSITY" | "FACULTY";
    isPublished: boolean;
};

export const events: MockEvent[] = [
    {
        id: "event-001",
        title: "University Orientation Program",
        slug: "university-orientation-program",
        description:
            "An introductory session for newly admitted students covering academic life, campus resources, and university guidelines.",
        startAt: "2026-10-05T09:00:00.000Z",
        endAt: "2026-10-05T12:00:00.000Z",
        location: "University Auditorium",
        scope: "UNIVERSITY",
        isPublished: true,
    },
    {
        id: "event-002",
        title: "Annual Career & Internship Fair",
        slug: "annual-career-internship-fair",
        description:
            "Meet organizations, explore internship opportunities, and learn about different career paths.",
        startAt: "2026-10-12T10:00:00.000Z",
        endAt: "2026-10-12T16:00:00.000Z",
        location: "Central Campus Hall",
        scope: "UNIVERSITY",
        isPublished: true,
    },
    {
        id: "event-003",
        title: "Inter-University Programming Contest",
        slug: "inter-university-programming-contest",
        description:
            "A competitive programming event bringing together students to solve algorithmic and programming challenges.",
        startAt: "2026-10-18T09:30:00.000Z",
        endAt: "2026-10-18T15:30:00.000Z",
        location: "Faculty of Engineering",
        scope: "FACULTY",
        isPublished: true,
    },
    {
        id: "event-004",
        title: "Research & Innovation Showcase",
        slug: "research-innovation-showcase",
        description:
            "Students and faculty members present selected research projects, prototypes, and innovative ideas.",
        startAt: "2026-10-24T10:00:00.000Z",
        endAt: "2026-10-24T14:00:00.000Z",
        location: "Innovation Center",
        scope: "UNIVERSITY",
        isPublished: true,
    },
    {
        id: "event-005",
        title: "Business Leadership Seminar",
        slug: "business-leadership-seminar",
        description:
            "A faculty seminar focused on leadership, communication, entrepreneurship, and professional development.",
        startAt: "2026-10-30T14:00:00.000Z",
        endAt: "2026-10-30T17:00:00.000Z",
        location: "Business Faculty Conference Room",
        scope: "FACULTY",
        isPublished: true,
    },

    // Extra records for testing filtering
    {
        id: "event-006",
        title: "Past Academic Workshop",
        slug: "past-academic-workshop",
        description:
            "This event is intentionally in the past to test the upcoming-event filter.",
        startAt: "2026-09-10T10:00:00.000Z",
        endAt: "2026-09-10T13:00:00.000Z",
        location: "Academic Building",
        scope: "UNIVERSITY",
        isPublished: true,
    },
    {
        id: "event-007",
        title: "Draft Student Meetup",
        slug: "draft-student-meetup",
        description:
            "This event is intentionally unpublished to test the published filter.",
        startAt: "2026-11-05T10:00:00.000Z",
        endAt: "2026-11-05T12:00:00.000Z",
        location: "Student Center",
        scope: "UNIVERSITY",
        isPublished: false,
    },
];