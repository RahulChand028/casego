'use client'
import React from 'react';
import Link from 'next/link';
import { User } from 'better-auth';
import { useRouter } from 'next/navigation';
import { authClient } from '@/common/clientAuth';
import {
  HiOutlineViewGrid,
  HiOutlineCog,
  HiOutlinePuzzle,
  HiOutlineSupport,
  HiOutlineLogout
} from 'react-icons/hi';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  linkKey: string;
}

interface SidebarProps {
  user: User | null;
  activeLink: string;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeLink, className = '' }) => {
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await authClient.signOut();
    router.push('/');
  };

  const navItems: NavItem[] = [
    {
      href: '/dashboard/overview',
      label: 'Overview',
      icon: <HiOutlineViewGrid className="text-xl" />,
      linkKey: 'overview'
    },
    {
      href: '/dashboard/setting',
      label: 'Settings',
      icon: <HiOutlineCog className="text-xl" />,
      linkKey: 'setting'
    },
    {
      href: '/dashboard/integration',
      label: 'Integrations',
      icon: <HiOutlinePuzzle className="text-xl" />,
      linkKey: 'integration'
    },
    {
      href: '/dashboard/contactus',
      label: 'Contact Us',
      icon: <HiOutlineSupport className="text-xl" />,
      linkKey: 'contact'
    }
  ];

  const renderNavItem = (item: NavItem) => {
    const isActive = activeLink === item.linkKey;
    const baseClasses = 'py-2 px-3 rounded-md cursor-pointer font-medium flex items-center gap-3 transition-colors my-1';
    const activeClasses = 'bg-yellow-100 text-black';
    const inactiveClasses = 'text-gray-700 hover:bg-yellow-100';

    return (
      <Link key={item.href} href={item.href}>
        <div className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
          {item.icon}
          <span>{item.label}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className={`flex flex-col md:w-[300px] w-full px-4 ${className}`}>
      {/* User Info */}
      <div className="flex flex-col py-4 px-3 text-sm">
        <p className="text-gray-900 font-medium">{user?.name}</p>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      {/* Navigation Items */}
      <div className="flex flex-col py-4 text-sm border-b border-gray-200">
        {navItems.slice(0, 2).map(renderNavItem)}
      </div>

      <div className="flex flex-col py-4 text-sm border-b border-gray-200">
        {navItems.slice(2, 3).map(renderNavItem)}
      </div>

      <div className="flex flex-col py-4 text-sm border-b border-gray-200">
        {navItems.slice(3, 4).map(renderNavItem)}
        
        {/* Logout */}
        <Link href="" onClick={handleLogout}>
          <div className="py-2 px-3 hover:bg-yellow-100 rounded-md cursor-pointer font-medium text-gray-700 flex items-center gap-3 transition-colors my-1">
            <HiOutlineLogout className="text-xl" />
            <span>Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar; 