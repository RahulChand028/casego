'use client'
import React from "react";
import { User } from "better-auth";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { authClient } from "@/common/clientAuth";


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
          <p className={`py-1 px-3 hover:bg-yellow-100 rounded-sm cursor-pointer font-bold  ${link == 'overview' ? 'bg-yellow-100 text-black' : 'text-gray-700'}`}>Overview</p>
        </Link>
        <Link href="/dashboard/setting">
          <p className={`py-1 px-3 hover:bg-yellow-100 rounded-sm cursor-pointer font-bold text-gray-700 ${link == 'setting' ? 'bg-yellow-100 text-black' : 'text-gray-700'}`}>Settings</p>
        </Link>
      </div>

      <div className="flex flex-col py-4 text-sm border-b border-gray-200">
        <Link href="/dashboard/integration">
          <p className={`py-1 px-3 hover:bg-yellow-100 rounded-sm cursor-pointer font-bold text-gray-700 ${link == 'integration' ? 'bg-yellow-100 text-black' : 'text-gray-700'}`}>Integrations</p>
        </Link>
      </div>

      <div className="flex flex-col py-4 text-sm border-b border-gray-200">
        <Link href="/dashboard/contactus">
          <p className={`py-1 px-3 hover:bg-yellow-100 rounded-sm cursor-pointer font-bold text-gray-700 ${link == 'contact' ? 'bg-yellow-100 text-black' : 'text-gray-700'}`}>Contact Us</p>
        </Link>
        <Link href="" onClick={logout}>
          <p className={`py-1 px-3 hover:bg-yellow-100 rounded-sm cursor-pointer font-bold text-gray-700 ${link == 'logout' ? 'bg-yellow-100 text-black' : 'text-gray-700'}`}>Logout</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
