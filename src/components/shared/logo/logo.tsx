// import Image from "next/image";

// export default function Logo() {
//   return (
//     <div className="flex items-center gap-2">
//       <Image
//         src="/logo/logo.png"
//         alt="CampusFlow"
//         width={36}
//         height={36}
//         priority
//         className="h-8 w-8 object-contain sm:h-9 sm:w-9"
//       />

//       <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
//         CampusFlow
//       </span>
//     </div>
//   );
// }








// import Image from "next/image";

// export default function Logo() {
//   return (
//     <div className="flex items-center gap-2">
//       <Image
//         src="/logo/logo.png"
//         alt="CampusFlow"
//         width={40}
//         height={40}
//         priority
//         className="h-7 w-7 object-contain sm:h-9 sm:w-9"
//       />

//       <span className="hidden text-xl font-bold tracking-tight text-slate-900 dark:text-white min-[200px]:inline">
//         CampusFlow
//       </span>
//     </div>
//   );
// }




import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="CampusFlow home"
      className="flex items-center gap-2"
    >
      <Image
        src="/logo/logo.png"
        alt="CampusFlow"
        width={40}
        height={40}
        priority
        className="h-7 w-7 object-contain sm:h-9 sm:w-9"
      />

      <span className="hidden text-xl font-bold tracking-tight text-slate-900 dark:text-white min-[200px]:inline">
        CampusFlow
      </span>
    </Link>
  );
}