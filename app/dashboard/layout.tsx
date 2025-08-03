import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from 'next/navigation';
import { HiOutlineUser } from "react-icons/hi";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  
  if(!session) {
    redirect('/onboard');
  }
  return (
    <div>
      <header className="border-b border-black/10 px-4 py-3 flex flex-col gap-2 sm:gap-4 md:flex-row md:justify-between md:items-center w-full">
        <div className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-black tracking-tight">
          <Link href="/">
            <Image src="/casego-logo.png" alt="casego" width={120} height={100} />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                  <HiOutlineUser className="text-gray-600 text-lg" />
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {children}
      <div className="my-8 w-full">
        <Footer />
      </div>
    </div>
  );
}
