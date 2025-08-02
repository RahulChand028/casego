import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from 'next/navigation';

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
      </header>
      {children}
      <div className="my-8 w-full">
        <Footer />
      </div>
    </div>
  );
}
