"use client";

import Logo from "@/assets/blocklogo.svg";
import Image from "next/image";
import { useState, useCallback } from "react";
import Link from "next/link";
import Container from "./Container";
import { SafeUser } from "@/types/index";
import { usePathname } from "next/navigation";
import { MdMenu } from "react-icons/md";
import NavMobile from "./NavMobile";
import User from "@/assets/user.svg";
import { FaUserAlt } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

export const dynamic = "force-dynamic";

interface HeaderProps {
  currentUser?: SafeUser | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const pathname = usePathname();
  const [navMobile, setNavMobile] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const defaultNavLinks = (
    <>
      <Link href="/">Home</Link>
      <Link href="/interviews">Interviews</Link>
      <Link href="/Article">Articles</Link>
      <Link href="/books">Books</Link>
      {/* Profile Link with Dropdown */}
      <div className="relative inline-block">
        <button onClick={toggleDropdown} className="focus:outline-none">
          Profile
        </button>
        {isDropdownOpen && (
          <div className="absolute px-5 -left-10 mt-2 w-[250px] bg-black rounded-lg shadow-lg z-10">
            <div className="absolute top-[-10px] left-10 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-transparent  border-b-black"></div>
            <ul className="py-2">
              <div className="flex items-center gap-x-2  border-b py-4 border-gray-400 ">
                <Image src={User} alt="" className="w-10 h-10 mb-5" />
                <div>
                  <h1 className="font-bold text-white">John Doe</h1>
                  <h1 className="text-white font-base">Online</h1>
                </div>
              </div>
              <div className="my-3">
                <li className="px-4 py-2 hover:bg-white hover:text-black text-white cursor-pointer">
                  <Link href="/Account" className="flex items-center gap-x-2">
                    <span>
                      <FaUserAlt />
                    </span>
                    My Account
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-white hover:text-black text-white cursor-pointer">
                  <Link href="/Payments" className="flex items-center gap-x-2">
                    <span>
                      <FaCreditCard />
                    </span>
                    Payments
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-white hover:text-black text-white cursor-pointer">
                  <Link href="/Favorite" className="flex items-center gap-x-2">
                    <span>
                      <IoSettings />
                    </span>
                    Favorites
                  </Link>
                </li>
                <li className="px-4 py-2 hover:bg-white hover:text-black text-white cursor-pointer">
                  <Link
                    href="/profile/work-diary"
                    className="flex items-center gap-x-2"
                  >
                    <span>
                      <IoLogOut />
                    </span>
                    LogOut
                  </Link>
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
      <Link href="/AuthorDashboard/create">Create Content</Link>
      <Link href="/AuthorDashboard/Analytics">Analytics</Link>
      <Link href="/EditorDashboard/profile">Profile</Link>
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
              <button className="font-medium text-base text-[#22221F] bg-[#ffe146] py-3 px-6 rounded-full">
                Book
              </button>
            </div>
          </div>
          <div className="flex md:hidden" onClick={() => setNavMobile(true)}>
            <MdMenu className="text-2xl" />
          </div>
          <div
            className={`${
              navMobile ? "right-0" : "-right-full"
            } fixed z-10 top-0 h-full transition-all duration-200`}
          >
            <NavMobile setNavMobile={setNavMobile} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
