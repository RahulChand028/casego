"use client";

import { authClient } from "@/common/clientAuth";
import { useState, useEffect } from "react";
import Sidebar from '@/components/Sidebar';
import { User } from "better-auth";
import Loading from '@/components/Loading';

const Integration = () => {

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser(session.data.user);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading fullScreen={true} size="md" text="Loading Integration" />;
  }

  return (
    <div className="min-h-screen font-sans pt-24">
      <div className="flex gap-6">
        <Sidebar user={user} link='integration' />
      </div>
    </div>
  );
};

export default Integration;