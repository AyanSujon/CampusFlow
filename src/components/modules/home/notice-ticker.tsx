// "use client";

// import * as React from "react";
// import Link from "next/link";
// import {
//   ArrowRight,
//   Bell,
//   ChevronRight,
//   Megaphone,
// } from "lucide-react";

// import { cn } from "@/lib/utils";

// export type Notice = {
//   id: string;
//   title: string;
//   slug?: string;
//   publishedAt: string;
//   scope: "UNIVERSITY" | "DEPARTMENT" | "PROGRAM";
//   isPublished: boolean;
// };

// interface NoticeTickerProps {
//   notices: Notice[];
// }

// export default function NoticeTicker({
//   notices,
// }: NoticeTickerProps) {
//   const universityNotices = notices
//     .filter(
//       (notice) =>
//         notice.scope === "UNIVERSITY" &&
//         notice.isPublished,
//     )
//     .slice(0, 5);

//   if (universityNotices.length === 0) {
//     return null;
//   }

//   return (
//     <section
//       aria-label="University announcements"
//       className="border-y bg-muted/40"
//     >
//       <div className="mx-auto flex max-w-7xl items-stretch px-4 sm:px-6 lg:px-8">
//         {/* =====================================================
//             LABEL
//         ===================================================== */}
//         <div className="flex shrink-0 items-center gap-2 border-r border-border pr-4 sm:pr-6">
//           <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
//             <Megaphone className="size-4" />
//           </div>

//           <div className="hidden sm:block">
//             <p className="text-xs font-bold uppercase tracking-wider text-foreground">
//               Announcements
//             </p>

//             <p className="text-[10px] text-muted-foreground">
//               University notices
//             </p>
//           </div>

//           <span className="sm:hidden text-xs font-semibold">
//             Notices
//           </span>
//         </div>

//         {/* =====================================================
//             NOTICE LIST
//         ===================================================== */}
//         <div className="min-w-0 flex-1">
//           <div className="flex h-16 items-center">
//             <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//               <div className="flex min-w-max items-center gap-6 px-4 sm:px-6">
//                 {universityNotices.map((notice, index) => (
//                   <React.Fragment key={notice.id}>
//                     <NoticeItem notice={notice} />

//                     {index < universityNotices.length - 1 && (
//                       <span
//                         aria-hidden="true"
//                         className="size-1 shrink-0 rounded-full bg-border"
//                       />
//                     )}
//                   </React.Fragment>
//                 ))}
//               </div>
//             </div>

//             {/* =================================================
//                 NEXT / VIEW ALL
//             ================================================= */}
//             <Link
//               href="/notices"
//               className={cn(
//                 "hidden shrink-0 items-center gap-1 border-l",
//                 "border-border pl-4 text-xs font-semibold text-primary",
//                 "transition-colors hover:text-primary/80",
//                 "sm:flex",
//               )}
//             >
//               View all
//               <ArrowRight className="size-3.5" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* =============================================================
//    NOTICE ITEM
// ============================================================= */

// function NoticeItem({
//   notice,
// }: {
//   notice: Notice;
// }) {
//   return (
//     <Link
//       href={
//         notice.slug
//           ? `/notices/${notice.slug}`
//           : `/notices/${notice.id}`
//       }
//       className="group flex max-w-md items-center gap-3 py-2 outline-none"
//     >
//       <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-background text-primary ring-1 ring-border">
//         <Bell className="size-3.5" />
//       </div>

//       <div className="min-w-0">
//         <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
//           {notice.title}
//         </p>

//         <p className="mt-0.5 text-[10px] text-muted-foreground">
//           {formatNoticeDate(notice.publishedAt)}
//         </p>
//       </div>

//       <ChevronRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
//     </Link>
//   );
// }

// /* =============================================================
//    DATE FORMATTER
// ============================================================= */

// function formatNoticeDate(date: string) {
//   const parsedDate = new Date(date);

//   if (Number.isNaN(parsedDate.getTime())) {
//     return "Recently published";
//   }

//   return new Intl.DateTimeFormat("en", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   }).format(parsedDate);
// }





















"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  Pause,
  Play,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type Notice = {
  id: string;
  title: string;
  slug?: string;
  publishedAt: string;
  scope: "UNIVERSITY" | "DEPARTMENT" | "PROGRAM";
  isPublished: boolean;
};

interface NoticeTickerProps {
  notices: Notice[];
  autoPlay?: boolean;
  interval?: number;
}

export default function NoticeTicker({
  notices,
  autoPlay = true,
  interval = 5000,
}: NoticeTickerProps) {
  const universityNotices = React.useMemo(
    () =>
      notices
        .filter(
          (notice) =>
            notice.scope === "UNIVERSITY" &&
            notice.isPublished,
        )
        .slice(0, 5),
    [notices],
  );

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  const totalNotices = universityNotices.length;

  /* ===========================================================
     NEXT / PREVIOUS
  =========================================================== */

  const goToNext = React.useCallback(() => {
    setCurrentIndex((current) =>
      current === totalNotices - 1 ? 0 : current + 1,
    );
  }, [totalNotices]);

  const goToPrevious = React.useCallback(() => {
    setCurrentIndex((current) =>
      current === 0 ? totalNotices - 1 : current - 1,
    );
  }, [totalNotices]);

  /* ===========================================================
     AUTO PLAY
  =========================================================== */

  React.useEffect(() => {
    if (!autoPlay || isPaused || totalNotices <= 1) {
      return;
    }

    const timer = window.setInterval(goToNext, interval);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    autoPlay,
    interval,
    isPaused,
    totalNotices,
    goToNext,
  ]);

  /* ===========================================================
     RESET INDEX WHEN DATA CHANGES
  =========================================================== */

  React.useEffect(() => {
    if (currentIndex >= totalNotices) {
      setCurrentIndex(0);
    }
  }, [currentIndex, totalNotices]);

  if (totalNotices === 0) {
    return null;
  }

  const currentNotice = universityNotices[currentIndex];

  return (
    <section
      aria-label="University announcements"
      className="border-y bg-muted/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto flex max-w-7xl items-stretch px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            LABEL
        ===================================================== */}

        <div className="flex shrink-0 items-center gap-2 border-r border-border pr-4 sm:pr-6">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Megaphone className="size-4" />
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-bold uppercase tracking-wider text-foreground">
              Announcements
            </p>

            <p className="text-[10px] text-muted-foreground">
              University notices
            </p>
          </div>

          <span className="text-xs font-semibold sm:hidden">
            Notices
          </span>
        </div>

        {/* =====================================================
            SLIDER
        ===================================================== */}

        <div className="min-w-0 flex-1">
          <div className="flex h-16 items-center">
            {/* Notice */}
            <div className="min-w-0 flex-1 overflow-hidden px-4 sm:px-6">
              <div
                key={currentNotice.id}
                className="animate-in fade-in slide-in-from-right-3 duration-300"
              >
                <NoticeItem notice={currentNotice} />
              </div>
            </div>

            {/* =================================================
                CONTROLS
            ================================================= */}

            <div className="flex shrink-0 items-center gap-1 border-l border-border pl-3">
              {/* Counter */}
              <span className="mr-1 hidden text-[10px] tabular-nums text-muted-foreground sm:block">
                {currentIndex + 1}/{totalNotices}
              </span>

              {/* Previous */}
              {totalNotices > 1 && (
                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label="Previous announcement"
                  className={cn(
                    "flex size-8 items-center justify-center rounded-md",
                    "text-muted-foreground transition-colors",
                    "hover:bg-background hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-ring",
                  )}
                >
                  <ChevronLeft className="size-4" />
                </button>
              )}

              {/* Pause / Play */}
              {totalNotices > 1 && (
                <button
                  type="button"
                  onClick={() => setIsPaused((paused) => !paused)}
                  aria-label={
                    isPaused
                      ? "Play announcements"
                      : "Pause announcements"
                  }
                  className={cn(
                    "hidden size-8 items-center justify-center rounded-md",
                    "text-muted-foreground transition-colors",
                    "hover:bg-background hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-ring",
                    "sm:flex",
                  )}
                >
                  {isPaused ? (
                    <Play className="size-3.5" />
                  ) : (
                    <Pause className="size-3.5" />
                  )}
                </button>
              )}

              {/* Next */}
              {totalNotices > 1 && (
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label="Next announcement"
                  className={cn(
                    "flex size-8 items-center justify-center rounded-md",
                    "text-muted-foreground transition-colors",
                    "hover:bg-background hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-ring",
                  )}
                >
                  <ChevronRight className="size-4" />
                </button>
              )}

              {/* View All */}
              <Link
                href="/notices"
                className={cn(
                  "hidden items-center gap-1 border-l border-border",
                  "ml-2 pl-3 text-xs font-semibold text-primary",
                  "transition-colors hover:text-primary/80",
                  "md:flex",
                )}
              >
                View all
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   NOTICE ITEM
============================================================= */

function NoticeItem({
  notice,
}: {
  notice: Notice;
}) {
  return (
    <Link
      href={
        notice.slug
          ? `/notices/${notice.slug}`
          : `/notices/${notice.id}`
      }
      className="group flex min-w-0 items-center gap-3 outline-none"
    >
      {/* Icon */}
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background text-primary ring-1 ring-border">
        <Bell className="size-3.5" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
          {notice.title}
        </p>

        <p className="mt-0.5 text-[10px] text-muted-foreground">
          Published {formatNoticeDate(notice.publishedAt)}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight
        className={cn(
          "size-4 shrink-0 text-muted-foreground",
          "transition-all",
          "group-hover:translate-x-0.5 group-hover:text-primary",
        )}
      />
    </Link>
  );
}

/* =============================================================
   DATE FORMATTER
============================================================= */

function formatNoticeDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Recently published";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}