// "use client";

// import Link from "next/link";
// import {
//     ArrowRight,
//     Building2,
//     Dumbbell,
//     Home,
//     UsersRound,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// type CampusLifeItem = {
//     title: string;
//     description: string;
//     icon: React.ElementType;
//     href: string;
// };

// const campusLifeItems: CampusLifeItem[] = [
//     {
//         title: "Campus Facilities",
//         description:
//             "Explore learning spaces, libraries, laboratories, common areas, and other facilities designed to support student life.",
//         icon: Building2,
//         href: "/campus-life/facilities",
//     },
//     {
//         title: "Clubs & Communities",
//         description:
//             "Take part in student clubs, cultural activities, academic communities, and events that help build connections beyond the classroom.",
//         icon: UsersRound,
//         href: "/campus-life/clubs",
//     },
//     {
//         title: "Student Housing",
//         description:
//             "Learn about available accommodation options, residential life, and the services designed to support students on campus.",
//         icon: Home,
//         href: "/campus-life/housing",
//     },
//     {
//         title: "Sports & Recreation",
//         description:
//             "Stay active through sports, recreation, fitness activities, and opportunities to participate in campus competitions.",
//         icon: Dumbbell,
//         href: "/campus-life/sports",
//     },
// ];

// export default function CampusLife() {
//     return (
//         <section className="border-t bg-muted/20">
//             <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
//                 {/* =========================================
//                     Section Header
//                 ========================================= */}
//                 <div className="mx-auto max-w-3xl text-center">
//                     <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground">
//                         <UsersRound className="size-4 text-primary" />
//                         Campus Life
//                     </div>

//                     <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
//                         Life beyond the classroom.
//                     </h2>

//                     <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
//                         University life is about more than lectures and
//                         examinations. Discover the spaces, communities,
//                         activities, and experiences that can make campus feel
//                         like home.
//                     </p>
//                 </div>

//                 {/* =========================================
//                     Static Content Notice
//                 ========================================= */}
//                 <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-dashed bg-background px-4 py-3 text-center">
//                     <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
//                         <span className="font-semibold text-foreground">
//                             Campus Life Information
//                         </span>{" "}
//                         — The content in this section is static university
//                         information for presentation purposes. It is not
//                         system-generated data from CampusFlow.
//                     </p>
//                 </div>

//                 {/* =========================================
//                     Campus Life Cards
//                 ========================================= */}
//                 <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
//                     {campusLifeItems.map((item) => {
//                         const Icon = item.icon;

//                         return (
//                             <article
//                                 key={item.title}
//                                 className="group flex h-full flex-col rounded-2xl border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
//                             >
//                                 {/* Icon */}
//                                 <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
//                                     <Icon className="size-6" />
//                                 </div>

//                                 {/* Content */}
//                                 <div className="mt-6 flex-1">
//                                     <h3 className="text-lg font-semibold tracking-tight">
//                                         {item.title}
//                                     </h3>

//                                     <p className="mt-3 text-sm leading-6 text-muted-foreground">
//                                         {item.description}
//                                     </p>
//                                 </div>

//                                 {/* Link */}
//                                 <Button
//                                     render={
//                                         <Link href={item.href}>
//                                             Explore
//                                             <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
//                                         </Link>
//                                     }
//                                     variant="ghost"
//                                     className="mt-6 w-fit px-0 text-primary hover:bg-transparent hover:text-primary"
//                                 />
//                             </article>
//                         );
//                     })}
//                 </div>

//                 {/* =========================================
//                     Bottom CTA
//                 ========================================= */}
//                 <div className="mx-auto mt-10 max-w-6xl rounded-2xl border bg-background p-6 sm:p-8">
//                     <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
//                         <div className="max-w-2xl">
//                             <p className="text-sm font-medium text-primary">
//                                 Find your place on campus
//                             </p>

//                             <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
//                                 Discover the experiences that make university
//                                 life memorable.
//                             </h3>

//                             <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
//                                 Explore campus facilities, student
//                                 communities, accommodation, sports, and other
//                                 opportunities available throughout university
//                                 life.
//                             </p>
//                         </div>

//                         <Button
//                             render={
//                                 <Link href="/campus-life">
//                                     Explore Campus Life
//                                     <ArrowRight className="size-4" />
//                                 </Link>
//                             }
//                             className="w-full shrink-0 sm:w-auto"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }































"use client";

import Link from "next/link";
import {
    ArrowRight,
    Building2,
    Dumbbell,
    Home,
    UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type CampusLifeItem = {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
    label: string;
};

const campusLifeItems: CampusLifeItem[] = [
    {
        title: "Campus Facilities",
        label: "Learn & Explore",
        description:
            "Discover learning spaces, libraries, laboratories, common areas, and other places that support everyday university life.",
        icon: Building2,
        href: "/campus-life/facilities",
    },
    {
        title: "Clubs & Communities",
        label: "Connect & Participate",
        description:
            "Meet people, join student communities, and take part in academic, cultural, and extracurricular activities.",
        icon: UsersRound,
        href: "/campus-life/clubs",
    },
    {
        title: "Student Housing",
        label: "Live & Belong",
        description:
            "Explore accommodation options and residential experiences designed to make campus living more comfortable.",
        icon: Home,
        href: "/campus-life/housing",
    },
    {
        title: "Sports & Recreation",
        label: "Move & Recharge",
        description:
            "Stay active through sports, fitness, recreation, and campus activities beyond the classroom.",
        icon: Dumbbell,
        href: "/campus-life/sports",
    },
];

function CampusLifeLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link href={href}
            className="group mt-5 w-fit px-0 text-primary hover:bg-transparent hover:text-primary">
            {children}
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
    );
}

export default function CampusLife() {
    return (
        <section className="border-t bg-background">
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                {/* =========================================
                    Header
                ========================================= */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 text-sm font-medium text-muted-foreground">
                            <UsersRound className="size-4 text-primary" />
                            Campus Life
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            More than a place to study.
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                            Discover the spaces, communities, activities, and
                            experiences that shape life beyond the classroom.
                        </p>
                    </div>

                    <Link href="/campus-life"
                        className="w-fit flex gap-1 items-center">
                        Explore Campus Life
                        <ArrowRight className="size-4" />
                    </Link>
                </div>


                {/* =========================================
                    Bento Layout
                ========================================= */}
                <div className="mt-10 grid gap-5 lg:grid-cols-12">
                    {/* =====================================
                        Main Feature
                    ===================================== */}
                    <div className="relative overflow-hidden rounded-3xl border bg-primary p-7 text-primary-foreground sm:p-9 lg:col-span-7 lg:min-h-105">
                        {/* Decorative shapes */}
                        <div
                            aria-hidden="true"
                            className="absolute -right-24 -top-24 size-72 rounded-full border border-primary-foreground/10"
                        />

                        <div
                            aria-hidden="true"
                            className="absolute -bottom-32 -right-10 size-80 rounded-full border border-primary-foreground/10"
                        />

                        <div className="relative flex h-full flex-col justify-between">
                            <div>
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-primary-foreground/10 backdrop-blur">
                                    <UsersRound className="size-7" />
                                </div>

                                <p className="mt-8 text-sm font-medium text-primary-foreground/70">
                                    CAMPUS EXPERIENCE
                                </p>

                                <h3 className="mt-2 max-w-lg text-3xl font-bold tracking-tight sm:text-4xl">
                                    Find your community, interests, and
                                    everyday campus experience.
                                </h3>

                                <p className="mt-5 max-w-xl text-sm leading-6 text-primary-foreground/75 sm:text-base">
                                    University life extends beyond academic
                                    programs. Take part in activities,
                                    communities, recreation, and spaces that
                                    give students opportunities to learn and
                                    connect in different ways.
                                </p>
                            </div>

                            <Link href="/campus-life"
                                className="mt-8 w-fit flex items-center gap-1">
                                Discover Campus Life
                                <ArrowRight className="size-4" />
                            </Link>
                        </div>
                    </div>

                    {/* =====================================
                        Facilities
                    ===================================== */}
                    <article className="group flex min-h-70 flex-col justify-between rounded-3xl border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-5">
                        <div>
                            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Building2 className="size-6" />
                            </div>

                            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {campusLifeItems[0].label}
                            </p>

                            <h3 className="mt-2 text-2xl font-bold tracking-tight">
                                {campusLifeItems[0].title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {campusLifeItems[0].description}
                            </p>
                        </div>

                        <CampusLifeLink href={campusLifeItems[0].href}>
                            Explore facilities
                        </CampusLifeLink>
                    </article>

                    {/* =====================================
                        Clubs
                    ===================================== */}
                    <article className="group flex min-h-70 flex-col justify-between rounded-3xl border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-5">
                        <div>
                            <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <UsersRound className="size-6" />
                            </div>

                            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {campusLifeItems[1].label}
                            </p>

                            <h3 className="mt-2 text-2xl font-bold tracking-tight">
                                {campusLifeItems[1].title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {campusLifeItems[1].description}
                            </p>
                        </div>

                        <CampusLifeLink href={campusLifeItems[1].href}>
                            Explore clubs
                        </CampusLifeLink>
                    </article>

                    {/* =====================================
                        Housing
                    ===================================== */}
                    <article className="group flex min-h-70 flex-col justify-between rounded-3xl border bg-muted/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-3">
                        <div>
                            <div className="flex size-12 items-center justify-center rounded-xl bg-background text-primary shadow-sm">
                                <Home className="size-6" />
                            </div>

                            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {campusLifeItems[2].label}
                            </p>

                            <h3 className="mt-2 text-xl font-bold tracking-tight">
                                {campusLifeItems[2].title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {campusLifeItems[2].description}
                            </p>
                        </div>

                        <CampusLifeLink href={campusLifeItems[2].href}>
                            Learn more
                        </CampusLifeLink>
                    </article>

                    {/* =====================================
                        Sports
                    ===================================== */}
                    <article className="group flex min-h-70 flex-col justify-between rounded-3xl border bg-muted/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg lg:col-span-4">
                        <div>
                            <div className="flex size-12 items-center justify-center rounded-xl bg-background text-primary shadow-sm">
                                <Dumbbell className="size-6" />
                            </div>

                            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {campusLifeItems[3].label}
                            </p>

                            <h3 className="mt-2 text-xl font-bold tracking-tight">
                                {campusLifeItems[3].title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                {campusLifeItems[3].description}
                            </p>
                        </div>

                        <CampusLifeLink href={campusLifeItems[3].href}>
                            Explore sports
                        </CampusLifeLink>
                    </article>
                </div>


            </div>
        </section>
    );
}