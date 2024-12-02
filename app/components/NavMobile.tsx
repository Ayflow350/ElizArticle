"use client";

import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState, useCallback } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

import Logo from "@/assets/blocklogo.svg";

interface NavProps {
  setNavMobile: Dispatch<SetStateAction<boolean>>;
}

const userNav = [
  { name: "Home", href: "https://www.elizbright.com/" },
  { name: "Interview", href: "https://www.elizbright.com/interviews" },
  { name: "Articles", href: "/Article" },
  { name: "Books", href: "https://www.elizbright.com/books" },
  { name: "Account", href: "/Account" },
  { name: "Log Out", href: "#" },
  { name: "Subscription", href: "/Payments" },
];

const adminNav = [
  { name: "Overview", href: "/AuthorDashboard/Analytics" },
  { name: "Create Content", href: "/AuthorDashboard/Analytics" },
  { name: "Articles", href: "/Article" },
  { name: "Analytics", href: "/AuthorDashboard/Analytics" },
  { name: "Account", href: "/Account" },
  { name: "Log Out", href: "#" },
  { name: "SignUp", href: "/signup" },
];

const NavMobile: React.FC<NavProps> = ({ setNavMobile }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const data = pathname?.startsWith("/AuthorDashboard") ? adminNav : userNav;

  const handleLogout = useCallback(() => {
    setNavMobile(false); // Close the sidebar on logout
    signOut({ redirect: false })
      .then(() => {
        toast.success("You have been signed out.");
        router.push("/login");
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      });
  }, [router, setNavMobile]);

  const handleLinkClick = (href: string) => {
    setNavMobile(false); // Close sidebar
    router.push(href);
    window.location.href = "/login";
    // Navigate to the selected link
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
              {item.name === "Log Out" ? (
                <button
                  onClick={handleLogout}
                  className="text-gray-700 transition duration-300 hover:text-black"
                >
                  {item.name}
                </button>
              ) : (
                <button
                  onClick={() => handleLinkClick(item.href)}
                  className="text-gray-700 transition duration-300 hover:text-black"
                >
                  {item.name}
                </button>
              )}
            </li>
          ))}

          <button
            onClick={() => setNavMobile(false)}
            className="font-medium text-base text-[#22221F] bg-[#ffe146] py-3 px-6 rounded-full mt-4 transition duration-300 hover:bg-yellow-400"
          >
            Book
          </button>
        </ul>
      </div>
    </div>
  );
};

export default NavMobile;
