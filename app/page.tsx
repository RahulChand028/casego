import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaShopify, FaChartBar, FaDatabase } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen font-sans text-[#181818]">
      {/* Header & Hero */}
      <header className="border-b border-black/10 px-4 py-3 flex flex-col gap-2 sm:gap-4 md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-black tracking-tight">
          <Image src="/casego-logo.png" alt="casego" width={120} height={100} />
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/onboard" 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-50 hover:bg-yellow-100 border-yellow-300 border-r-3 border-b-3  text-black rounded-lg shadow transition font-bold"
          >
            <FcGoogle className="h-5 w-5" />
            Login
          </Link>
        </div>
      </header>

      <section className="flex flex-col py-8 sm:py-12 justify-center relative overflow-x-hidden">  
        <div className="text-center text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-black leading-tight">
          <p>GET</p>
          <p>ANALYTICS</p>
          <p>ON WHATSAPP</p>
        </div>
        <p className="text-center text-base sm:text-xl py-2 px-2">Database & Shopify analytics delivered directly to your WhatsApp.</p>
        <div className="flex justify-center py-8">
          <Link href="/onboard" className="flex flex-wrap bg-[#FFD700] text-[#181818] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
  Start Free Trial
</Link>
        </div>
        {/* Decorative dots, hidden on mobile */}
        <div className="hidden md:block absolute top-1/2 left-4 transform -translate-y-1/2 w-8 h-8 bg-[#8B5CF6] rounded-full"></div>
        <div className="hidden md:block absolute right-72 top-1/4 transform -translate-y-1/2 w-8 h-8 bg-[#EC4899] rounded-full"></div>
        <div className="hidden md:block absolute top-1/2 right-52 transform -translate-y-1/2 w-8 h-8 bg-[#FFD700] rounded-full"></div>

      </section>

      {/* Services Section */}
      <section className="py-8 sm:py-10 px-2 sm:px-4 max-w-6xl mx-auto justify-center">
        <h2 className="font-bold mb-4 text-xl sm:text-2xl text-center">OUR SERVICES</h2>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 items-center justify-center">
          <div className="bg-green-200 rounded-xl p-4 w-48 h-52 flex flex-col justify-between shadow-lg">
            <div className="flex flex-col items-center gap-2 font-extrabold text-lg"><FaWhatsapp size={30} /> <span className="text-center">WhatsApp Analytics</span></div>
            <div className="text-sm text-center">Get business insights delivered directly to your WhatsApp.</div>
          </div>
          <div className="bg-blue-200 rounded-xl p-4 w-48 h-52 flex flex-col justify-between shadow-lg">
            <div className="flex flex-col items-center gap-2 font-extrabold text-lg"><FaShopify size={30} /> <span className="text-center">Shopify Reports</span></div>
            <div className="text-sm text-center">Connect your Shopify store for automated sales & customer analytics.</div>
          </div>
          <div className="bg-yellow-200 rounded-xl p-4 w-48 h-52 flex flex-col justify-between shadow-lg">
            <div className="flex flex-col items-center gap-2 font-extrabold text-lg"><FaDatabase size={30} /> <span className="text-center">Database Integration</span></div>
            <div className="text-sm text-center">Plug in your own data sources for custom analytics workflows.</div>
          </div>
          <div className="bg-pink-200 rounded-xl p-4 w-48 h-52 flex flex-col justify-between shadow-lg">
            <div className="flex flex-col items-center gap-2 font-extrabold text-lg"><FaChartBar size={30} /> <span className="text-center">Automated Alerts</span></div>
            <div className="text-sm text-center">Receive real-time alerts and reports on WhatsApp for key metrics.</div>
          </div>
        </div>
      </section>

   

     

      {/* Call to Action Section */}
      <section className="py-8 sm:py-10 px-2 sm:px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-xl sm:text-3xl font-black tracking-tight mb-2">READY FOR SMARTER ANALYTICS ON <span className="text-green-500">WHATSAPP</span>?</h2>
        <div className="flex justify-center py-8">
          <Link href="/onboard" className="flex flex-wrap bg-[#FFD700] text-[#181818] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            Start Free Trial
          </Link>
        </div>
      </section>
      <div className="my-8">
        <Footer />
      </div>
      
    </div>
  );
}
