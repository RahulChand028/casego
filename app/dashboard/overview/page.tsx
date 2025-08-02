"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/common/clientAuth";
import { User } from "better-auth";
import Link from "next/link";


import Sidebar from '@/components/Sidebar';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser(session.data.user);
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans pt-24">

      <div className="flex gap-6">
        <Sidebar user={user} link='overview' />
        <div className="flex-1">
          <div className="flex flex-col justify-center items-center bg-yellow-50 rounded-sm p-4  py-8">
            <p className="text-md"> You have not added phone number please add it </p>
            <Link href=""><p className="text-sm text-yellow-400"> Add Phone Number </p></Link>
          </div>
        </div>
      </div>




    </div>
  );
};

export default DashboardPage; 