'use client'
import React from "react";
import { User } from "better-auth";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { authClient } from "@/common/clientAuth";
import {
  HiOutlineViewGrid,
  HiOutlineCog,
  HiOutlinePuzzle,
  HiOutlineSupport,
  HiOutlineLogout
} from "react-icons/hi";


const Sidebar: React.FC<{ user: User | null, link: string }> = ({ user, link }) => {

  const router = useRouter();

  const logout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await authClient.signOut();
    router.push('/');
  }
  return (
    <div className="flex flex-col w-[300px]">
      <div className="flex flex-col py-4 px-3 text-sm">
        <p className="">{user?.name}</p>
        <p className="">{user?.email}</p>
      </div>
      <div className="flex flex-col  py-4 text-sm border-b border-gray-200">
        <Link href="/dashboard/overview">
          <div className={`py-2 px-3 hover:bg-yellow-100 rounded-md cursor-pointer font-medium flex items-center gap-3 transition-colors my-1 ${link == 'overview' ? 'bg-yellow-100 text-black' : 'text-gray-700'}`}>
            <HiOutlineViewGrid className="text-xl" />
            <span>Overview</span>
          </div>
        </Link>
        <Link href="/dashboard/setting">
          <div className={`py-2 px-3 hover:bg-yellow-100 rounded-md cursor-pointer font-medium text-gray-700 flex items-center gap-3 transition-colors my-1 ${link == 'setting' ? 'bg-yellow-100 text-black' : 'text-gray-700'}`}>
            <HiOutlineCog className="text-xl" />
            <span>Settings</span>
          </div>
        </Link>
      </div>

      <div className="flex flex-col py-4 text-sm border-b border-gray-200">
        <Link href="/dashboard/integration">
          <div className={`py-2 px-3 hover:bg-yellow-100 rounded-md cursor-pointer font-medium text-gray-700 flex items-center gap-3 transition-colors  my-1 ${link == 'integration' ? 'bg-yellow-100 text-black' : 'text-gray-700'}`}>
            <HiOutlinePuzzle className="text-xl" />
            <span>Integrations</span>
          </div>
        </Link>
      </div>

      <div className="flex flex-col py-4 text-sm border-b border-gray-200">
        <Link href="/dashboard/contactus">
          <div className={`py-2 px-3 hover:bg-yellow-100 rounded-md cursor-pointer font-medium text-gray-700 flex items-center gap-3 transition-colors my-1 ${link == 'contact' ? 'bg-yellow-100 text-black' : 'text-gray-700'}`}>
            <HiOutlineSupport className="text-xl" />
            <span>Contact Us</span>
          </div>
        </Link>
        <Link href="" onClick={logout}>
          <div className={`py-2 px-3 hover:bg-yellow-100 rounded-md cursor-pointer font-medium text-gray-700 flex items-center gap-3 transition-colors my-1 ${link == 'logout' ? 'bg-yellow-100 text-black' : 'text-gray-700'}`}>
            <HiOutlineLogout className="text-xl" />
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
