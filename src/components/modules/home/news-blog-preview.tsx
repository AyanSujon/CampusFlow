// import Link from "next/link";
// import {
//     ArrowRight,
//     CalendarDays,
//     Newspaper,
//     Sparkles,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// type NewsPost = {
//     id: string;
//     title: string;
//     excerpt: string;
//     category: string;
//     publishedAt: string;
//     slug: string;
// };

// const newsPosts: NewsPost[] = [
//     {
//         id: "news-001",
//         title: "University Launches New Academic Initiative",
//         excerpt:
//             "A new academic initiative is being introduced to support students through expanded learning opportunities and academic resources.",
//         category: "University News",
//         publishedAt: "2026-09-25",
//         slug: "new-academic-initiative",
//     },
//     {
//         id: "news-002",
//         title: "Students Showcase Innovation Projects",
//         excerpt:
//             "Students present selected projects highlighting creativity, problem-solving, research, and practical learning.",
//         category: "Campus Life",
//         publishedAt: "2026-09-20",
//         slug: "students-showcase-innovation-projects",
//     },
//     {
//         id: "news-003",
//         title: "Faculty Research and Academic Activities",
//         excerpt:
//             "An overview of selected academic activities, research initiatives, and knowledge-sharing events across the university.",
//         category: "Research",
//         publishedAt: "2026-09-15",
//         slug: "faculty-research-academic-activities",
//     },
// ];

// function formatDate(date: string) {
//     return new Intl.DateTimeFormat("en-US", {
//         month: "short",
//         day: "numeric",
//         year: "numeric",
//     }).format(new Date(date));
// }

// export default function NewsBlogPreview() {
//     return (
//         <section className="border-t bg-background">
//             <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
//                 {/* Section Header */}
//                 <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
//                     <div className="max-w-2xl">
//                         <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-sm font-medium text-muted-foreground">
//                             <Newspaper className="size-4 text-primary" />
//                             News & Stories
//                         </div>

//                         <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
//                             Stories from across the university.
//                         </h2>

//                         <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
//                             Discover university stories, academic activities,
//                             research highlights, student achievements, and
//                             important campus updates.
//                         </p>
//                     </div>

//                     <Button
//                         variant="outline"
//                         render={
//                             <Link href="/news">
//                                 View All News
//                                 <ArrowRight className="size-4" />
//                             </Link>
//                         }
//                     />
//                 </div>

//                 {/* News Cards */}
//                 <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                     {newsPosts.map((post) => (
//                         <article
//                             key={post.id}
//                             className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-md"
//                         >
//                             {/* Image Placeholder */}
//                             <div className="relative aspect-[16/9] overflow-hidden bg-muted">
//                                 <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
//                                     <Newspaper className="size-8" />

//                                     <span className="text-xs font-medium">
//                                         News Image Placeholder
//                                     </span>
//                                 </div>

//                                 <div className="absolute left-4 top-4 rounded-full border bg-background/95 px-2.5 py-1 text-xs font-medium">
//                                     {post.category}
//                                 </div>
//                             </div>

//                             {/* Content */}
//                             <div className="flex flex-1 flex-col p-6">
//                                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                                     <CalendarDays className="size-3.5" />
//                                     <time dateTime={post.publishedAt}>
//                                         {formatDate(post.publishedAt)}
//                                     </time>
//                                 </div>

//                                 <h3 className="mt-4 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
//                                     {post.title}
//                                 </h3>

//                                 <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
//                                     {post.excerpt}
//                                 </p>

//                                 <div className="mt-auto pt-6">
//                                     <Button
//                                         variant="ghost"
//                                         size="sm"
//                                         className="px-0 hover:bg-transparent hover:text-primary"
//                                         render={
//                                             <Link
//                                                 href={`/news/${post.slug}`}
//                                             >
//                                                 Read Story
//                                                 <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
//                                             </Link>
//                                         }
//                                     />
//                                 </div>
//                             </div>
//                         </article>
//                     ))}
//                 </div>

//             </div>
//         </section>
//     );
// }
























import Link from "next/link";
import {
    ArrowRight,
    CalendarDays,
    Newspaper,
    Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

type NewsPost = {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    slug: string;
    image: string; // added
};

const newsPosts: NewsPost[] = [
    {
        id: "news-001",
        title: "University Launches New Academic Initiative",
        excerpt:
            "A new academic initiative is being introduced to support students through expanded learning opportunities and academic resources.",
        category: "University News",
        publishedAt: "2026-09-25",
        slug: "new-academic-initiative",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop", // university campus / academic building
    },
    {
        id: "news-002",
        title: "Students Showcase Innovation Projects",
        excerpt:
            "Students present selected projects highlighting creativity, problem-solving, research, and practical learning.",
        category: "Campus Life",
        publishedAt: "2026-09-20",
        slug: "students-showcase-innovation-projects",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop", // students collaborating
    },
    {
        id: "news-003",
        title: "Faculty Research and Academic Activities",
        excerpt:
            "An overview of selected academic activities, research initiatives, and knowledge-sharing events across the university.",
        category: "Research",
        publishedAt: "2026-09-15",
        slug: "faculty-research-academic-activities",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop", // research / lab
    },
];

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

export default function NewsBlogPreview() {
    return (
        <section className="border-t bg-background">
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                {/* Section Header */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-sm font-medium text-muted-foreground">
                            <Newspaper className="size-4 text-primary" />
                            News & Stories
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            Stories from across the university.
                        </h2>

                        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                            Discover university stories, academic activities,
                            research highlights, student achievements, and
                            important campus updates.
                        </p>
                    </div>

                    <Link href="/news">
                        View All News
                        <ArrowRight className="size-4 outline" />
                    </Link>
                </div>

                {/* News Cards */}
                <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {newsPosts.map((post) => (
                        <article
                            key={post.id}
                            className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-md"
                        >
                            {/* Image */}
                            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <div className="absolute left-4 top-4 rounded-full border bg-background/95 px-2.5 py-1 text-xs font-medium">
                                    {post.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-6">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <CalendarDays className="size-3.5" />
                                    <time dateTime={post.publishedAt}>
                                        {formatDate(post.publishedAt)}
                                    </time>
                                </div>

                                <h3 className="mt-4 text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                                    {post.title}
                                </h3>

                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto pt-6">
                                    <Link
                                        className="px-0 hover:bg-transparent hover:text-primary"
                                        href={`/news/${post.slug}`}
                                    >
                                        Read Story
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}