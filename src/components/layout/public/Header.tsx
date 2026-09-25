



// "use client";

// import Link from "next/link";
// import React, { useState } from "react";
// import { usePathname } from "next/navigation";
// import {
//   ChevronDown,
//   Menu,
//   X,
// } from "lucide-react";
// import { useGetMe, useLogout } from "@/hooks/auth.hook";
// import { toast } from "@/components/ui/toast";
// import { Button } from "@/components/ui/button";
// import { useQueryClient } from "@tanstack/react-query";
// import Logo from "@/components/shared/logo/logo";


// const routes = [
//   {
//     name: "Home",
//     url: "/",
//   },
//   {
//     name: "About Us",
//     url: "/about-us",
//   },
//   {
//     name: "Academics",
//     dropdown: [
//       { name: "Faculties", url: "/faculties" },
//       { name: "Departments", url: "/departments" },
//       { name: "Programs", url: "/programs" },
//       { name: "Courses", url: "/courses" },
//       { name: "Subjects", url: "/subjects" },
//     ],
//   },
//   {
//     name: "Admissions",
//     dropdown: [
//       { name: "Admission Process", url: "/admissions/process" },
//       { name: "Requirements", url: "/admissions/requirements" },
//       { name: "Apply Now", url: "/admissions/apply" },
//     ],
//   },
//   {
//     name: "Campus Life",
//     dropdown: [
//       { name: "Events", url: "/events" },
//       { name: "Clubs & Organizations", url: "/clubs" },
//       { name: "Campus Facilities", url: "/facilities" },
//     ],
//   },
//   {
//     name: "Contact",
//     url: "/contact",
//   },
// ];





// export default function HeaderPublic() {
//   const pathname = usePathname();

//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);


//   const { data, isLoading } = useGetMe();
//   const { mutate: logout } = useLogout();
//   const queryClient = useQueryClient();

//   const handleLogout = () => {

//     logout(undefined, {
//       onSuccess: () => {
//         toast.add({
//           title: "Logout Success",
//           description: "logged out successfully",
//           type: "success"
//         });
//         queryClient.removeQueries({ queryKey: ["user"] });

//       },
//       onError: () => {
//         toast.add({
//           title: "Logout Failed",
//           description: "Something Went Wrong",
//           type: "error"
//         })
//       }

//     })

//   }

//   // console.log(data, "header data")
//   // ============================================================
//   // ACTIVE ROUTE
//   // ============================================================

//   const isRouteActive = (url: string) => {
//     if (url === "/") {
//       return pathname === "/";
//     }

//     return pathname === url || pathname.startsWith(`${url}/`);
//   };

//   const isDropdownActive = (
//     dropdown: { name: string; url: string }[]
//   ) => {
//     return dropdown.some((item) => isRouteActive(item.url));
//   };

//   // ============================================================
//   // MOBILE MENU
//   // ============================================================

//   const toggleMobileDropdown = (name: string) => {
//     setMobileDropdown((current) =>
//       current === name ? null : name
//     );
//   };

//   const closeMobileMenu = () => {
//     setMobileOpen(false);
//     setMobileDropdown(null);
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">

//         {/* =====================================================
//             MAIN NAVBAR
//             ===================================================== */}
//         <div className="flex h-16 items-center justify-between">

//           {/* =================================================
//               BRAND
//               ================================================= */}
//             <Logo/>
//           {/* <Link
//             href="/"
//             onClick={closeMobileMenu}
//             className="shrink-0 text-xl font-bold tracking-tight text-primary sm:text-2xl"
//           >
//             Campus
//             <span className="text-accent">Flow</span>
//           </Link> */}

//           {/* =================================================
//               DESKTOP NAVIGATION
//               ================================================= */}
//           <nav className="hidden items-center gap-1 lg:flex">
//             {routes.map((route) => {
//               const active = route.dropdown
//                 ? isDropdownActive(route.dropdown)
//                 : isRouteActive(route.url);

//               return (
//                 <div
//                   key={route.name}
//                   className="group relative"
//                 >
//                   {route.dropdown ? (
//                     <>
//                       {/* Dropdown Trigger */}
//                       <button
//                         type="button"
//                         className={`
//                           relative
//                           flex items-center gap-1
//                           rounded-md
//                           px-3 py-2
//                           text-sm font-medium
//                           transition-colors
//                           focus-visible:outline-none
//                           focus-visible:ring-2
//                           focus-visible:ring-ring

//                           ${active
//                             ? "text-primary"
//                             : "text-foreground hover:bg-primary/10 hover:text-primary"
//                           }
//                         `}
//                       >
//                         {route.name}

//                         <ChevronDown
//                           className="
//                             h-4 w-4
//                             transition-transform duration-200
//                             group-hover:rotate-180
//                           "
//                         />

//                         {/* Active Indicator */}
//                         {active && (
//                           <span
//                             className="
//                               absolute
//                               bottom-0
//                               left-3
//                               right-3
//                               h-0.5
//                               rounded-full
//                               bg-primary
//                             "
//                           />
//                         )}
//                       </button>

//                       {/* Desktop Dropdown */}
//                       <div
//                         className="
//                           invisible absolute left-0 top-full
//                           mt-2 w-56
//                           translate-y-2
//                           rounded-lg
//                           border border-border
//                           bg-popover
//                           p-2
//                           opacity-0
//                           shadow-lg
//                           transition-all duration-200

//                           group-hover:visible
//                           group-hover:translate-y-0
//                           group-hover:opacity-100
//                         "
//                       >
//                         {route.dropdown.map((item) => {
//                           const itemActive = isRouteActive(item.url);

//                           return (
//                             <Link
//                               key={item.name}
//                               href={item.url}
//                               className={`
//                                 relative
//                                 block rounded-md
//                                 px-3 py-2.5
//                                 text-sm
//                                 transition-colors

//                                 ${itemActive
//                                   ? "bg-primary/10 font-medium text-primary"
//                                   : "text-popover-foreground hover:bg-primary/10 hover:text-primary"
//                                 }
//                               `}
//                             >
//                               {item.name}

//                               {/* Dropdown Active Indicator */}
//                               {itemActive && (
//                                 <span
//                                   className="
//                                     absolute
//                                     left-0
//                                     top-1/2
//                                     h-5
//                                     w-0.5
//                                     -translate-y-1/2
//                                     rounded-full
//                                     bg-primary
//                                   "
//                                 />
//                               )}
//                             </Link>
//                           );
//                         })}
//                       </div>
//                     </>
//                   ) : (
//                     <Link
//                       href={route.url}
//                       className={`
//                         relative
//                         block rounded-md
//                         px-3 py-2
//                         text-sm font-medium
//                         transition-colors

//                         ${active
//                           ? "text-primary"
//                           : "text-foreground hover:bg-primary/10 hover:text-primary"
//                         }
//                       `}
//                     >
//                       {route.name}

//                       {/* Active Indicator */}
//                       {active && (
//                         <span
//                           className="
//                             absolute
//                             bottom-0
//                             left-3
//                             right-3
//                             h-0.5
//                             rounded-full
//                             bg-primary
//                           "
//                         />
//                       )}
//                     </Link>
//                   )}
//                 </div>
//               );
//             })}
//           </nav>

//           {/* =================================================
//               DESKTOP ACTIONS
//               ================================================= */}
//           <div className="hidden items-center gap-3 lg:flex">

//             {/* Login */}

//             {
//               !isLoading && !data && (
//                 <Link
//                   href="/login"
//                   className="
//                   rounded-md
//                   px-5 py-2.5
//                   text-sm font-medium
//                   text-foreground
//                   transition-colors
//                   hover:bg-secondary
//                   hover:text-primary
//                   "
//                 >
//                   Login
//                 </Link>
//               )
//             }

//             {
//               !isLoading && data && (
//                 <Button
//                   variant="ghost"
//                   type="button"
//                   onClick={handleLogout}
//                   className="
//                   rounded-md
//                   px-5 py-5
//                   text-sm font-medium
//                   text-foreground
//                   transition-colors
//                   hover:bg-secondary
//                   hover:text-primary
//                   "
//                 >
//                   Logout
//                 </Button>
//               )
//             }



//             {/* Apply */}
//             <Link
//               href="/admissions/apply"
//               className="
//                 rounded-md
//                 bg-primary
//                 px-5 py-2.5
//                 text-sm font-semibold
//                 text-primary-foreground
//                 shadow-sm
//                 transition-colors
//                 hover:bg-primary/90
//                 focus-visible:outline-none
//                 focus-visible:ring-2
//                 focus-visible:ring-ring
//                 focus-visible:ring-offset-2
//               "
//             >
//               Apply Now
//             </Link>
//           </div>

//           {/* =================================================
//               MOBILE / TABLET MENU BUTTON
//               ================================================= */}
//           <button
//             type="button"
//             aria-label={
//               mobileOpen
//                 ? "Close menu"
//                 : "Open menu"
//             }
//             aria-expanded={mobileOpen}
//             onClick={() =>
//               setMobileOpen(!mobileOpen)
//             }
//             className="
//               inline-flex
//               items-center
//               justify-center
//               rounded-md
//               p-2
//               text-foreground
//               transition-colors
//               hover:bg-primary/10
//               hover:text-primary
//               focus-visible:outline-none
//               focus-visible:ring-2
//               focus-visible:ring-ring
//               lg:hidden
//             "
//           >
//             {mobileOpen ? (
//               <X className="h-6 w-6" />
//             ) : (
//               <Menu className="h-6 w-6" />
//             )}
//           </button>
//         </div>

//         {/* =====================================================
//             MOBILE / TABLET NAVIGATION
//             ===================================================== */}
//         {mobileOpen && (
//           <div
//             className="
//               border-t
//               border-border
//               py-4
//               lg:hidden
//             "
//           >
//             <nav className="flex flex-col gap-1">

//               {routes.map((route) => {
//                 const active = route.dropdown
//                   ? isDropdownActive(route.dropdown)
//                   : isRouteActive(route.url);

//                 return (
//                   <div key={route.name}>

//                     {/* =================================================
//                         NORMAL MOBILE ROUTE
//                         ================================================= */}
//                     {!route.dropdown && (
//                       <Link
//                         href={route.url}
//                         onClick={closeMobileMenu}
//                         className={`
//                           relative
//                           flex items-center
//                           rounded-md
//                           px-3 py-3
//                           text-sm font-medium
//                           transition-colors

//                           ${active
//                             ? "bg-primary/10 text-primary"
//                             : "text-foreground hover:bg-primary/10 hover:text-primary"
//                           }
//                         `}
//                       >
//                         {/* Active Indicator */}
//                         {active && (
//                           <span
//                             className="
//                               absolute
//                               left-0
//                               top-1/2
//                               h-6
//                               w-1
//                               -translate-y-1/2
//                               rounded-r-full
//                               bg-primary
//                             "
//                           />
//                         )}

//                         {route.name}
//                       </Link>
//                     )}

//                     {/* =================================================
//                         MOBILE DROPDOWN
//                         ================================================= */}
//                     {route.dropdown && (
//                       <>
//                         <button
//                           type="button"
//                           onClick={() =>
//                             toggleMobileDropdown(
//                               route.name
//                             )
//                           }
//                           className={`
//                             relative
//                             flex w-full
//                             items-center
//                             justify-between
//                             rounded-md
//                             px-3 py-3
//                             text-left
//                             text-sm font-medium
//                             transition-colors

//                             ${active
//                               ? "bg-primary/10 text-primary"
//                               : "text-foreground hover:bg-primary/10 hover:text-primary"
//                             }
//                           `}
//                         >
//                           {/* Active Indicator */}
//                           {active && (
//                             <span
//                               className="
//                                 absolute
//                                 left-0
//                                 top-1/2
//                                 h-6
//                                 w-1
//                                 -translate-y-1/2
//                                 rounded-r-full
//                                 bg-primary
//                               "
//                             />
//                           )}

//                           <span>{route.name}</span>

//                           <ChevronDown
//                             className={`
//                               h-4 w-4
//                               transition-transform
//                               duration-200

//                               ${mobileDropdown ===
//                                 route.name
//                                 ? "rotate-180"
//                                 : ""
//                               }
//                             `}
//                           />
//                         </button>

//                         {/* Mobile Dropdown Items */}
//                         {mobileDropdown === route.name && (
//                           <div
//                             className="
//                               ml-3
//                               border-l-2
//                               border-primary/20
//                               pl-3
//                             "
//                           >
//                             {route.dropdown.map(
//                               (item) => {
//                                 const itemActive =
//                                   isRouteActive(
//                                     item.url
//                                   );

//                                 return (
//                                   <Link
//                                     key={item.name}
//                                     href={item.url}
//                                     onClick={
//                                       closeMobileMenu
//                                     }
//                                     className={`
//                                       relative
//                                       block rounded-md
//                                       px-3 py-2.5
//                                       text-sm
//                                       transition-colors

//                                       ${itemActive
//                                         ? "bg-primary/10 font-medium text-primary"
//                                         : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
//                                       }
//                                     `}
//                                   >
//                                     {/* Active Indicator */}
//                                     {itemActive && (
//                                       <span
//                                         className="
//                                           absolute
//                                           left-0
//                                           top-1/2
//                                           h-5
//                                           w-0.5
//                                           -translate-y-1/2
//                                           rounded-full
//                                           bg-primary
//                                         "
//                                       />
//                                     )}

//                                     {item.name}
//                                   </Link>
//                                 );
//                               }
//                             )}
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 );
//               })}

//               {/* =================================================
//                   MOBILE ACTIONS
//                   ================================================= */}
//               <div
//                 className="
//                   mt-3
//                   flex flex-col gap-2
//                   border-t
//                   border-border
//                   pt-4
//                 "
//               >
//                 <Link
//                   href="/login"
//                   onClick={closeMobileMenu}
//                   className="
//                     rounded-md
//                     px-3 py-3
//                     text-center
//                     text-sm font-medium
//                     text-foreground
//                     transition-colors
//                     hover:bg-secondary
//                     hover:text-primary
//                   "
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   href="/admissions/apply"
//                   onClick={closeMobileMenu}
//                   className="
//                     rounded-md
//                     bg-primary
//                     px-4 py-3
//                     text-center
//                     text-sm font-semibold
//                     text-primary-foreground
//                     shadow-sm
//                     transition-colors
//                     hover:bg-primary/90
//                   "
//                 >
//                   Apply Now
//                 </Link>
//               </div>
//             </nav>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }











































"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useGetMe, useLogout } from "@/hooks/auth.hook";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";
import Logo from "@/components/shared/logo/logo";
import UserMenu from "@/components/shared/user-menu";
import ThemeSwitcher from "@/components/shared/ThemeSwitcher";


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
      { name: "Faculties", url: "/faculties" },
      { name: "Departments", url: "/departments" },
      { name: "Programs", url: "/programs" },
      { name: "Courses", url: "/courses" },
      { name: "Subjects", url: "/subjects" },
    ],
  },
  {
    name: "Admissions",
    dropdown: [
      { name: "Admission Process", url: "/admissions/process" },
      { name: "Requirements", url: "/admissions/requirements" },
      { name: "Apply Now", url: "/admissions/apply" },
    ],
  },
  {
    name: "Campus Life",
    dropdown: [
      { name: "Events", url: "/events" },
      { name: "Clubs & Organizations", url: "/clubs" },
      { name: "Campus Facilities", url: "/facilities" },
    ],
  },
  {
    name: "Contact",
    url: "/contact",
  },
];






export default function HeaderPublic() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);


  const { data, isLoading } = useGetMe();
  const { mutate: logout } = useLogout();
  const queryClient = useQueryClient();



  const handleLogout = () => {

    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logout Success",
          description: "logged out successfully",
          type: "success"
        });
        queryClient.removeQueries({ queryKey: ["user"] });

      },
      onError: () => {
        toast.add({
          title: "Logout Failed",
          description: "Something Went Wrong",
          type: "error"
        })
      }

    })

  }

  // console.log(data, "header data")
  // ============================================================
  // ACTIVE ROUTE
  // ============================================================

  const isRouteActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }

    return pathname === url || pathname.startsWith(`${url}/`);
  };

  const isDropdownActive = (
    dropdown: { name: string; url: string }[]
  ) => {
    return dropdown.some((item) => isRouteActive(item.url));
  };

  // ============================================================
  // MOBILE MENU
  // ============================================================

  const toggleMobileDropdown = (name: string) => {
    setMobileDropdown((current) =>
      current === name ? null : name
    );
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            MAIN NAVBAR
            ===================================================== */}
        <div className="flex h-16 items-center justify-between">

          {/* =================================================
              BRAND
              ================================================= */}
          <Logo />
          {/* <Link
            href="/"
            onClick={closeMobileMenu}
            className="shrink-0 text-xl font-bold tracking-tight text-primary sm:text-2xl"
          >
            Campus
            <span className="text-accent">Flow</span>
          </Link> */}

          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}
          <nav className="hidden items-center gap-1 lg:flex">
            {routes.map((route) => {
              const active = route.dropdown
                ? isDropdownActive(route.dropdown)
                : isRouteActive(route.url);

              return (
                <div
                  key={route.name}
                  className="group relative"
                >
                  {route.dropdown ? (
                    <>
                      {/* Dropdown Trigger */}
                      <button
                        type="button"
                        className={`
                          relative
                          flex items-center gap-1
                          rounded-md
                          px-3 py-2
                          text-sm font-medium
                          transition-colors
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-ring

                          ${active
                            ? "text-primary"
                            : "text-foreground hover:bg-primary/10 hover:text-primary"
                          }
                        `}
                      >
                        {route.name}

                        <ChevronDown
                          className="
                            h-4 w-4
                            transition-transform duration-200
                            group-hover:rotate-180
                          "
                        />

                        {/* Active Indicator */}
                        {active && (
                          <span
                            className="
                              absolute
                              bottom-0
                              left-3
                              right-3
                              h-0.5
                              rounded-full
                              bg-primary
                            "
                          />
                        )}
                      </button>

                      {/* Desktop Dropdown */}
                      <div
                        className="
                          invisible absolute left-0 top-full
                          mt-2 w-56
                          translate-y-2
                          rounded-lg
                          border border-border
                          bg-popover
                          p-2
                          opacity-0
                          shadow-lg
                          transition-all duration-200

                          group-hover:visible
                          group-hover:translate-y-0
                          group-hover:opacity-100
                        "
                      >
                        {route.dropdown.map((item) => {
                          const itemActive = isRouteActive(item.url);

                          return (
                            <Link
                              key={item.name}
                              href={item.url}
                              className={`
                                relative
                                block rounded-md
                                px-3 py-2.5
                                text-sm
                                transition-colors

                                ${itemActive
                                  ? "bg-primary/10 font-medium text-primary"
                                  : "text-popover-foreground hover:bg-primary/10 hover:text-primary"
                                }
                              `}
                            >
                              {item.name}

                              {/* Dropdown Active Indicator */}
                              {itemActive && (
                                <span
                                  className="
                                    absolute
                                    left-0
                                    top-1/2
                                    h-5
                                    w-0.5
                                    -translate-y-1/2
                                    rounded-full
                                    bg-primary
                                  "
                                />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={route.url}
                      className={`
                        relative
                        block rounded-md
                        px-3 py-2
                        text-sm font-medium
                        transition-colors

                        ${active
                          ? "text-primary"
                          : "text-foreground hover:bg-primary/10 hover:text-primary"
                        }
                      `}
                    >
                      {route.name}

                      {/* Active Indicator */}
                      {active && (
                        <span
                          className="
                            absolute
                            bottom-0
                            left-3
                            right-3
                            h-0.5
                            rounded-full
                            bg-primary
                          "
                        />
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* =================================================
              DESKTOP ACTIONS
              ================================================= */}
          <div className="hidden items-center gap-3 lg:flex">

            {/* === Theme Switcher (Dropdown) === */}
            <ThemeSwitcher />

            {/* Login */}


            {
              !isLoading && !data && (
                <Link
                  href="/login"
                  className="
                  rounded-md
                  px-5 py-2.5
                  text-sm font-medium
                  text-foreground
                  transition-colors
                  hover:bg-secondary
                  hover:text-primary
                  "
                >
                  Login
                </Link>
              )
            }
            {!isLoading && data && <UserMenu
              onLogout={handleLogout}
            />}
            {
              // !isLoading && data && (
              //   <Button
              //     variant="ghost"
              //     type="button"
              //     onClick={handleLogout}
              //     className="
              //     rounded-md
              //     px-5 py-5
              //     text-sm font-medium
              //     text-foreground
              //     transition-colors
              //     hover:bg-secondary
              //     hover:text-primary
              //     "
              //   >
              //     Logout
              //   </Button>
              // )
            }




            {/* Apply */}
            <Link
              href="/admissions/apply"
              className="
                rounded-md
                bg-primary
                px-5 py-2.5
                text-sm font-semibold
                text-primary-foreground
                shadow-sm
                transition-colors
                hover:bg-primary/90
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
              "
            >
              Apply Now
            </Link>
          </div>

          {/* =================================================
              MOBILE / TABLET MENU BUTTON
              ================================================= */}
          {/* === Theme Switcher (Dropdown) === */}
          <div className="ml-auto lg:hidden"><ThemeSwitcher /></div>

          <button
            type="button"
            aria-label={
              mobileOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={mobileOpen}
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="
              inline-flex
              items-center
              justify-center
              rounded-md
              p-2
              text-foreground
              transition-colors
              hover:bg-primary/10
              hover:text-primary
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-ring
              lg:hidden
            "
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* =====================================================
            MOBILE / TABLET NAVIGATION
            ===================================================== */}
        {mobileOpen && (
          <div
            className="
              border-t
              border-border
              py-4
              lg:hidden
            "
          >
            <nav className="flex flex-col gap-1">

              {routes.map((route) => {
                const active = route.dropdown
                  ? isDropdownActive(route.dropdown)
                  : isRouteActive(route.url);

                return (
                  <div key={route.name}>

                    {/* =================================================
                        NORMAL MOBILE ROUTE
                        ================================================= */}
                    {!route.dropdown && (
                      <Link
                        href={route.url}
                        onClick={closeMobileMenu}
                        className={`
                          relative
                          flex items-center
                          rounded-md
                          px-3 py-3
                          text-sm font-medium
                          transition-colors

                          ${active
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-primary/10 hover:text-primary"
                          }
                        `}
                      >
                        {/* Active Indicator */}
                        {active && (
                          <span
                            className="
                              absolute
                              left-0
                              top-1/2
                              h-6
                              w-1
                              -translate-y-1/2
                              rounded-r-full
                              bg-primary
                            "
                          />
                        )}

                        {route.name}
                      </Link>
                    )}

                    {/* =================================================
                        MOBILE DROPDOWN
                        ================================================= */}
                    {route.dropdown && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            toggleMobileDropdown(
                              route.name
                            )
                          }
                          className={`
                            relative
                            flex w-full
                            items-center
                            justify-between
                            rounded-md
                            px-3 py-3
                            text-left
                            text-sm font-medium
                            transition-colors

                            ${active
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-primary/10 hover:text-primary"
                            }
                          `}
                        >
                          {/* Active Indicator */}
                          {active && (
                            <span
                              className="
                                absolute
                                left-0
                                top-1/2
                                h-6
                                w-1
                                -translate-y-1/2
                                rounded-r-full
                                bg-primary
                              "
                            />
                          )}

                          <span>{route.name}</span>

                          <ChevronDown
                            className={`
                              h-4 w-4
                              transition-transform
                              duration-200

                              ${mobileDropdown ===
                                route.name
                                ? "rotate-180"
                                : ""
                              }
                            `}
                          />
                        </button>

                        {/* Mobile Dropdown Items */}
                        {mobileDropdown === route.name && (
                          <div
                            className="
                              ml-3
                              border-l-2
                              border-primary/20
                              pl-3
                            "
                          >
                            {route.dropdown.map(
                              (item) => {
                                const itemActive =
                                  isRouteActive(
                                    item.url
                                  );

                                return (
                                  <Link
                                    key={item.name}
                                    href={item.url}
                                    onClick={
                                      closeMobileMenu
                                    }
                                    className={`
                                      relative
                                      block rounded-md
                                      px-3 py-2.5
                                      text-sm
                                      transition-colors

                                      ${itemActive
                                        ? "bg-primary/10 font-medium text-primary"
                                        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                      }
                                    `}
                                  >
                                    {/* Active Indicator */}
                                    {itemActive && (
                                      <span
                                        className="
                                          absolute
                                          left-0
                                          top-1/2
                                          h-5
                                          w-0.5
                                          -translate-y-1/2
                                          rounded-full
                                          bg-primary
                                        "
                                      />
                                    )}

                                    {item.name}
                                  </Link>
                                );
                              }
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}

              {/* =================================================
                  MOBILE ACTIONS
                  ================================================= */}
              <div
                className="
                  mt-3
                  flex flex-col gap-2
                  border-t
                  border-border
                  pt-4
                "
              >
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="
                    rounded-md
                    px-3 py-3
                    text-center
                    text-sm font-medium
                    text-foreground
                    transition-colors
                    hover:bg-secondary
                    hover:text-primary
                  "
                >
                  Login
                </Link>

                <Link
                  href="/admissions/apply"
                  onClick={closeMobileMenu}
                  className="
                    rounded-md
                    bg-primary
                    px-4 py-3
                    text-center
                    text-sm font-semibold
                    text-primary-foreground
                    shadow-sm
                    transition-colors
                    hover:bg-primary/90
                  "
                >
                  Apply Now
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}



