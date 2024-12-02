"use client";

import { useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { FaUserAlt, FaCreditCard } from "react-icons/fa";
import { IoSettings, IoLogOut } from "react-icons/io5";
import Logo from "@/assets/blocklogo.svg";
import Container from "./Container";
import NavMobile from "./NavMobile";
import { SafeUser } from "@/types/index";

export const dynamic = "force-dynamic";

interface HeaderProps {
  currentUser?: SafeUser | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [navMobile, setNavMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    if (!currentUser) {
      router.push("/signup"); // Redirect to signup if no user
    } else {
      setIsDropdownOpen((prev) => !prev);
    }
  }, [currentUser, router]);

  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    signOut({ redirect: false })
      .then(() => {
        toast.success("You have been signed out.");

        router.push("/login");
        window.location.href = "/login"; // Reload the login page
        closeDropdown();
        // Close dropdown after logout
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      });
  }, [router, closeDropdown]);

  const defaultNavLinks = (
    <>
      <Link href="https://www.elizbright.com/">Home</Link>
      <Link href="https://www.elizbright.com/interviews">Interviews</Link>
      <Link href="/Article">Articles</Link>
      <Link href="https://www.elizbright.com/books">Books</Link>

      <div className="relative inline-block">
        <button onClick={toggleDropdown} className="focus:outline-none">
          Profile
        </button>
        {isDropdownOpen && currentUser && (
          <div className="absolute px-5 -left-10 mt-2 w-[250px] bg-black rounded-lg shadow-lg z-10">
            <div className="absolute top-[-10px] left-10 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-transparent border-b-black"></div>
            <ul className="py-2">
              <div className="flex items-center gap-x-2 border-b py-4 border-gray-400">
                {currentUser.image ? (
                  <Image
                    src={currentUser.image}
                    alt="User Image"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white text-xl font-bold">
                    {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div>
                  <h1 className="font-bold text-white">
                    {currentUser.name || "John Doe"}
                  </h1>
                  <h1 className="text-white font-base">Online</h1>
                </div>
              </div>
              <div className="my-3">
                <li
                  className="px-4 py-2 hover:bg-white hover:text-black text-white cursor-pointer"
                  onClick={closeDropdown}
                >
                  <Link href="/Account" className="flex items-center gap-x-2">
                    <FaUserAlt /> My Account
                  </Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-white hover:text-black text-white cursor-pointer"
                  onClick={closeDropdown}
                >
                  <Link href="/Payments" className="flex items-center gap-x-2">
                    <FaCreditCard /> Payments
                  </Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-white hover:text-black text-white cursor-pointer"
                  onClick={closeDropdown}
                >
                  <Link href="/Favorite" className="flex items-center gap-x-2">
                    <IoSettings /> Favorites
                  </Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-white hover:text-black text-white cursor-pointer flex items-center gap-x-2"
                  onClick={handleLogout}
                >
                  <IoLogOut /> LogOut
                </li>
              </div>
            </ul>
          </div>
        )}
      </div>
    </>
  );

  const editorDashboardNavLinks = (
    <>
      <Link href="/AuthorDashboard/Article">Overview</Link>

      <Link href="/AuthorDashboard/Analytics">Analytics</Link>

      <div className="relative inline-block">
        <button onClick={toggleDropdown} className="focus:outline-none">
          Profile
        </button>
        {isDropdownOpen && currentUser && (
          <div className="absolute px-5 -left-10 mt-2 w-[250px] bg-black rounded-lg shadow-lg z-10">
            <div className="absolute top-[-10px] left-10 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-transparent border-b-black"></div>
            <ul className="py-2">
              <div className="flex items-center gap-x-2 border-b py-4 border-gray-400">
                {currentUser.image ? (
                  <Image
                    src={currentUser.image}
                    alt="User Image"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white text-xl font-bold">
                    {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div>
                  <h1 className="font-bold text-white">
                    {currentUser.name || "John Doe"}
                  </h1>
                  <h1 className="text-white font-base">Online</h1>
                </div>
              </div>
              <div className="my-3">
                <li
                  className="px-4 py-2 hover:bg-white hover:text-black text-white cursor-pointer"
                  onClick={closeDropdown}
                >
                  <Link href="/Account" className="flex items-center gap-x-2">
                    <FaUserAlt /> My Account
                  </Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-white hover:text-black text-white cursor-pointer"
                  onClick={closeDropdown}
                >
                  <Link href="/Payments" className="flex items-center gap-x-2">
                    <FaCreditCard /> Payments
                  </Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-white hover:text-black text-white cursor-pointer"
                  onClick={closeDropdown}
                >
                  <Link href="/Favorite" className="flex items-center gap-x-2">
                    <IoSettings /> Favorites
                  </Link>
                </li>
                <li
                  className="px-4 py-2 hover:bg-white hover:text-black text-white cursor-pointer flex items-center gap-x-2"
                  onClick={handleLogout}
                >
                  <IoLogOut /> LogOut
                </li>
              </div>
            </ul>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="border-b pb-5 border-[#EDE8D9]">
      <Container>
        <div className="flex pt-4 md:pt-5 items-center justify-between">
          <div>
            <Image src={Logo} alt="eliz bright logo" className="w-[120px]" />
          </div>
          <div className="hidden md:flex lg:flex items-center gap-x-3">
            <nav className="flex items-center gap-x-8 font-normal text-base text-[#22221F] leading-[26px]">
              {pathname?.startsWith("/AuthorDashboard")
                ? editorDashboardNavLinks
                : defaultNavLinks}
            </nav>
            <div className="flex items-center gap-x-3">
              <div className="border-l border-[#22221F] h-3"></div>

              {pathname?.startsWith("/AuthorDashboard") ? (
                <Link
                  href="/AuthorDashboard/create"
                  className="font-medium text-base text-[#22221F] bg-[#ffe146] py-3 px-6 rounded-full"
                >
                  Create Article
                </Link>
              ) : (
                <Link
                  href="https://calendly.com/eliz-elizbright"
                  className="font-medium text-base text-[#22221F] bg-[#ffe146] py-3 px-6 rounded-full"
                >
                  Book
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setNavMobile(!navMobile)}>
              <MdMenu className="text-xl text-black" />
            </button>
          </div>
        </div>

        {navMobile && <NavMobile setNavMobile={setNavMobile} />}
      </Container>
    </div>
  );
};

export default Header;
