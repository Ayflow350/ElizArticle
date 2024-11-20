"use client";

import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
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
  { name: "Account", href: "/Account" }, // Changed href to "#"

  { name: "Log Out", href: "#" }, // Changed href to "#"
  { name: "SignUp", href: "/signup" }, // Changed href to "#"
];

const adminNav = [
  { name: "Overview", href: "/AuthorDashboard/Analytics" },
  { name: "Create Content", href: "/AuthorDashboard/Analytics" },
  { name: "Articles", href: "/Article" },
  { name: "Analytics", href: "/AuthorDashboard/Analytics" },
  { name: "Account", href: "/Account" }, // Changed href to "#"
  { name: "Log Out", href: "#" }, // Changed href to "#"
  { name: "SignUp", href: "/signup" },
];

const NavMobile: React.FC<NavProps> = ({ setNavMobile }) => {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Determine which navigation data to use based on the path
  const data = pathname?.startsWith("/AuthorDashboard") ? adminNav : userNav;

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default routing behavior
    setIsProfileOpen(!isProfileOpen); // Toggle dropdown visibility
  };

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
              className="transition duration-300 hover:text-black relative"
            >
              {item.name === "Profiles" ? (
                <button
                  onClick={handleProfileClick} // Ensure this button only toggles the dropdown
                  className="text-gray-700"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setNavMobile(false)}
                  className="text-gray-700"
                >
                  {item.name}
                </Link>
              )}

              {/* Dropdown menu for "Profiles" */}
              {item.name === "Profiles" && isProfileOpen && (
                <div className="absolute left-0 mt-2 bg-white shadow-md rounded-lg w-full z-10">
                  <ul className="flex flex-col items-center">
                    <li className="transition duration-300 hover:text-black py-2">
                      <Link
                        href="/account"
                        onClick={() => setNavMobile(false)}
                        className="text-gray-700"
                      >
                        Account
                      </Link>
                    </li>
                    <li className="transition duration-300 hover:text-black py-2">
                      <Link
                        href="/payments"
                        onClick={() => setNavMobile(false)}
                        className="text-gray-700"
                      >
                        Payments
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
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
