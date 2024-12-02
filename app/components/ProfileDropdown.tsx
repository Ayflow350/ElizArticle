// components/ProfileDropdown.tsx
import { useCallback } from "react";
import { FaUserAlt, FaCreditCard } from "react-icons/fa";
import { IoSettings, IoLogOut } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { SafeUser } from "@/types/index";

interface ProfileDropdownProps {
  currentUser: SafeUser;
  closeDropdown: () => void;
  handleLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  currentUser,
  closeDropdown,
  handleLogout,
}) => (
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
);

export default ProfileDropdown;
