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

interface HeaderProps {
  currentUser?: SafeUser | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const pathname = usePathname();

  // State for controlling mobile nav visibility
  const [navMobile, setNavMobile] = useState(false);

  // Toggle mobile navigation
  const toggleNavMobile = useCallback(() => {
    setNavMobile((prev) => !prev);
  }, []);

  // Define navigation links for regular users
  const defaultNavLinks = (
    <>
      <Link href="/">Home</Link>
      <Link href="/interviews">Interviews</Link>
      <Link href="/Article">Articles</Link>
      <Link href="/books">Books</Link>
      <Link href="/profile">Profile</Link>
    </>
  );

  // Define navigation links for editor dashboard
  const editorDashboardNavLinks = (
    <>
      <Link href="/EditorDashboard/overview">Overview</Link>
      <Link href="/EditorDashboard/manage">Create Content</Link>
      <Link href="/EditorDashboard/settings">Analytics</Link>
      <Link href="/EditorDashboard/profile">Profile</Link>
    </>
  );

  return (
    <div className="border-b pb-5 border-[#EDE8D9]">
      <Container>
        <div className="flex pt-4 md:pt-5 items-center justify-between">
          {/* Logo */}
          <div>
            <Image src={Logo} alt="eliz bright logo" className="w-[120px]" />
          </div>
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex lg:flex items-center gap-x-3">
            <nav className="flex items-center gap-x-8 font-normal text-base text-[#22221F] leading-[26px]">
              {pathname?.startsWith("/EditorDashboard")
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
          {/* Mobile Menu Icon */}
          <div className="flex md:hidden" onClick={toggleNavMobile}>
            <MdMenu className="text-2xl" />
          </div>
          {/* Mobile Navigation */}
          <div
            className={`${
              navMobile ? "right-0" : "-right-full"
            } fixed z-10 top-0 left-0 h-full w-full bg-white transition-all duration-200`}
          >
            <NavMobile setNavMobile={setNavMobile} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;
