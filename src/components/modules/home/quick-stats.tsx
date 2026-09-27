import {
    BookOpen,
    GraduationCap,
    School,
    Users,
    UserRoundCheck,
} from "lucide-react";

type Stat = {
    label: string;
    value: string;
    description: string;
    icon: React.ElementType;
};

const stats: Stat[] = [
    {
        label: "Students",
        value: "1,000+",
        description: "Enrolled students",
        icon: GraduationCap,
    },
    {
        label: "Faculty",
        value: "100+",
        description: "Academic instructors",
        icon: Users,
    },
    {
        label: "Programs",
        value: "25+",
        description: "Academic programs",
        icon: BookOpen,
    },
    {
        label: "Departments",
        value: "10+",
        description: "Academic departments",
        icon: School,
    },
    {
        label: "Acceptance Rate",
        value: "78%",
        description: "Admissions acceptance",
        icon: UserRoundCheck,
    },
];

export default function QuickStats() {
    return (
        <section
            aria-label="University statistics"
            className="border-b bg-muted/30"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">
                    {stats.map((stat) => (
                        <StatItem
                            key={stat.label}
                            stat={stat}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* =============================================================
   STAT ITEM
============================================================= */

function StatItem({
    stat,
}: {
    stat: Stat;
}) {
    const Icon = stat.icon;

    return (
        <div className="group flex items-center gap-4 px-4 py-6 sm:px-5 lg:flex-col lg:items-start lg:py-7">
            {/* Icon */}
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background text-primary shadow-sm transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
                <Icon className="size-5" />
            </div>

            {/* Content */}
            <div className="min-w-0">
                <p className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {stat.value}
                </p>

                <p className="mt-1 text-sm font-semibold text-foreground">
                    {stat.label}
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                    {stat.description}
                </p>
            </div>
        </div>
    );
}