"use client";

import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface NavProps {
  setNavMobile: Dispatch<SetStateAction<boolean>>;
}

const userNav = [
  { name: "Home", href: "/" },
  { name: "Interview", href: "#" },
  { name: "Articles", href: "/Article" },
  { name: "Books", href: "#" },
  { name: "Profiles", href: "/profile" },
];

const adminNav = [
  { name: "Overview", href: "/" },
  { name: "Create Content", href: "#" },
  { name: "Articles", href: "/Article" },
  { name: "Analytics", href: "#" },
  { name: "Profile", href: "/profile" },
];

const NavMobile: React.FC<NavProps> = ({ setNavMobile }) => {
  const pathname = usePathname();

  // Determine which navigation data to use based on the path
  const data = pathname?.startsWith("/AuthorDashboard") ? adminNav : userNav;

  return (
    <div className="lg:hidden bg-violet h-full w-80 fixed top-0 bottom-0 z-10 flex justify-center items-center">
      {/* Close button */}
      <div
        onClick={() => setNavMobile(false)}
        className="absolute top-2 left-2 cursor-pointer"
      >
        <CgClose className="text-3xl" />
      </div>

      <ul className="text-xl flex flex-col gap-y-8 items-center">
        {data.map((item, index) => (
          <li key={index}>
            <Link href={item.href} onClick={() => setNavMobile(false)}>
              {item.name}
            </Link>
          </li>
        ))}

        <button className="font-medium text-base text-[#22221F] bg-[#ffe146] py-3 px-6 rounded-full">
          Book
        </button>
      </ul>
    </div>
  );
};

export default NavMobile;
