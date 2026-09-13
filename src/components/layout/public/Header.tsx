import React from 'react'

const routes = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "About Us",
        url: "/about-us",
    },
    {
        name: "Academics",
        dropdown: [
            {
                name: "Faculties",
                url: "/faculties",
            },
            {
                name: "Departments",
                url: "/departments",
            },
            {
                name: "Programs",
                url: "/programs",
            },
            {
                name: "Courses",
                url: "/courses",
            },
            {
                name: "Subjects",
                url: "/subjects",
            },
        ],
    },
    {
        name: "Admissions",
        dropdown: [
            {
                name: "Admission Process",
                url: "/admissions/process",
            },
            {
                name: "Requirements",
                url: "/admissions/requirements",
            },
            {
                name: "Apply Now",
                url: "/admissions/apply",
            },
        ],
    },
    {
        name: "Campus Life",
        dropdown: [
            {
                name: "Events",
                url: "/events",
            },
            {
                name: "Clubs & Organizations",
                url: "/clubs",
            },
            {
                name: "Campus Facilities",
                url: "/facilities",
            },
        ],
    },
    {
        name: "Contact",
        url: "/contact",
    },
];


export default function HeaderPublic() {
    return (
        <div>HeaderPublic</div>
    )
}
