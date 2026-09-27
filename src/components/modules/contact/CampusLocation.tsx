// import {
//   Clock3,
//   Mail,
//   MapPin,
//   Phone,
// } from "lucide-react";

// export default function CampusLocation() {
//   return (
//     <section>
//       <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
//         <div className="grid overflow-hidden rounded-3xl border bg-background lg:grid-cols-2">
//           {/* Map placeholder */}
//           <div className="relative min-h-80 bg-muted">
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-center">
//                 <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
//                   <MapPin className="h-6 w-6" />
//                 </div>

//                 <h3 className="mt-4 font-semibold">
//                   Campus Location
//                 </h3>

//                 <p className="mt-1 text-sm text-muted-foreground">
//                   Noakhali, Bangladesh
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Information */}
//           <div className="p-8 sm:p-10">
//             <span className="text-sm font-semibold uppercase tracking-wider text-primary">
//               Visit Us
//             </span>

//             <h2 className="mt-3 text-3xl font-bold">
//               Find Our Campus
//             </h2>

//             <p className="mt-5 leading-7 text-muted-foreground">
//               We welcome prospective students, parents, visitors,
//               faculty, and members of our university community.
//             </p>

//             <div className="mt-8 space-y-5">
//               <div className="flex gap-4">
//                 <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />

//                 <div>
//                   <h3 className="font-medium">
//                     Campus Address
//                   </h3>

//                   <p className="mt-1 text-sm leading-6 text-muted-foreground">
//                     CampusFlow University
//                     <br />
//                     University Avenue
//                     <br />
//                     Noakhali, Bangladesh
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />

//                 <div>
//                   <h3 className="font-medium">Phone</h3>

//                   <p className="mt-1 text-sm text-muted-foreground">
//                     +880 1234-567890
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />

//                 <div>
//                   <h3 className="font-medium">Email</h3>

//                   <p className="mt-1 text-sm text-muted-foreground">
//                     info@campusflow.edu
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-4">
//                 <Clock3 className="mt-1 h-5 w-5 shrink-0 text-primary" />

//                 <div>
//                   <h3 className="font-medium">Office Hours</h3>

//                   <p className="mt-1 text-sm text-muted-foreground">
//                     Saturday – Thursday, 9:00 AM – 5:00 PM
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <a
//               href="https://www.google.com/maps"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-8 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
//             >
//               Get Directions
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }




























import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

export default function CampusLocation() {
  return (
    <section>
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-3xl border bg-background lg:grid-cols-2">
          {/* =========================
              Google Map
          ========================= */}
          <div className="relative min-h-80 overflow-hidden bg-muted lg:min-h-full">
            <iframe
              title="CampusFlow University Location - Dhaka, Bangladesh"
              src="https://www.google.com/maps?q=Dhaka%2C%20Bangladesh&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Map overlay label */}
            <div className="absolute bottom-4 left-4 rounded-xl border bg-background/95 px-4 py-3 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MapPin className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    CampusFlow University
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================
              Information
          ========================= */}
          <div className="p-8 sm:p-10">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Visit Us
            </span>

            <h2 className="mt-3 text-3xl font-bold">
              Find Our Campus
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              We welcome prospective students, parents, visitors,
              faculty, and members of our university community.
            </p>

            <div className="mt-8 space-y-5">
              {/* Address */}
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <h3 className="font-medium">
                    Campus Address
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    CampusFlow University
                    <br />
                    University Avenue
                    <br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <h3 className="font-medium">Phone</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    +880 1234-567890
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <h3 className="font-medium">Email</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    info@campusflow.edu
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex gap-4">
                <Clock3 className="mt-1 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <h3 className="font-medium">Office Hours</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Saturday – Thursday, 9:00 AM – 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Get Directions */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Dhaka%2C%20Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}