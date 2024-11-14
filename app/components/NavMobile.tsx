"use client";

import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import Logo from "@/assets/blocklogo.svg";

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
    <div className="lg:hidden bg-white h-full w-[70%] fixed top-0 right-0 z-10 flex flex-col justify-center items-center rounded-l-xl transition duration-300 shadow-lg">
      {/* Close button */}
      <div
        onClick={() => setNavMobile(false)}
        className="absolute top-4 left-4 cursor-pointer text-gray-700 transition duration-300 hover:text-black"
      >
        <CgClose className="text-3xl" />
      </div>
      <div className="space-y-4 flex flex-col">
        <Image src={Logo} alt="Logo" className="mb-5" />

        <ul className="text-lg flex flex-col gap-y-8 items-center">
          {data.map((item, index) => (
            <li
              key={index}
              className="transition duration-300 hover:text-black"
            >
              <Link
                href={item.href}
                onClick={() => setNavMobile(false)}
                className="text-gray-700"
              >
                {item.name}
              </Link>
            </li>
          ))}

          <button className="font-medium text-base text-[#22221F] bg-[#ffe146] py-3 px-6 rounded-full mt-4 transition duration-300 hover:bg-yellow-400">
            Book
          </button>
        </ul>
      </div>
    </div>
  );
};

export default NavMobile;
