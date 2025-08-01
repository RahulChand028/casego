import Link from "next/link";
import { FaWhatsapp, FaShopify, FaChartBar, FaDatabase } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-[#FDFBF7] min-h-screen font-sans text-[#181818]">
      {/* Header & Hero */}
      <header className="border-b border-black/10 px-4 py-3 flex flex-col gap-2 sm:gap-4 md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-3xl font-black tracking-tight">
          <span className="bg-green-300 rounded px-2 font-bold">casego</span>
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
          <span className=" flex flex-wrap bg-[#FFD700] text-[#181818] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            Start Free Trial
          </span>
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
          <span className=" flex flex-wrap bg-[#FFD700] text-[#181818] px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            Start Free Trial
          </span>
        </div>
      </section>

      {/* Footer/Newsletter Section */}
      <footer className="bg-black text-white py-12 px-4 text-center my-12 rounded-xl">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Brand & Description */}
          <div className="mb-6 md:mb-0 text-left flex-1">
            <div className="text-2xl font-black mb-2">casego</div>
            <div className="text-sm max-w-xs text-gray-200">Smarter analytics for modern businesses. Get insights, alerts, and reports delivered directly to your WhatsApp.</div>
          </div>
          {/* Quick Links & Useful Links */}
          <div className="justify-between mt-4 mb-6 md:mb-0 flex flex-col md:flex-row gap-8 flex-1">
            <div>
              <div className="font-bold mb-2">Quick Links</div>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:underline text-white">Home</a></li>
                <li><a href="#" className="hover:underline text-white">Services</a></li>
                <li><a href="#" className="hover:underline text-white">Pricing</a></li>
                <li><a href="#" className="hover:underline text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <div className="font-bold mb-2">Useful Links</div>
              <ul className="space-y-1 text-sm">
                <li><Link href="/privacy-policy" className="hover:underline text-white">Privacy Policy</Link></li>
                <li><Link href="/terms-and-conditions" className="hover:underline text-white">Terms &amp; Conditions</Link></li>
              </ul>
            </div>
          </div>
          {/* Contact & Social */}
          <div className="flex flex-col items-end flex-1">
            <div className="font-bold mb-2">Contact</div>
            <div className="text-sm">Email: <a href="mailto:info@casego.com" className="underline text-white">info@casego.com</a></div>
            <div className="text-sm mb-2">WhatsApp: <a href="https://wa.me/9258754315" className="underline text-white">+91 9258754315</a></div>
            <div className="flex gap-4 mt-2">
              <a href="https://wa.me/9258754315" target="_blank" rel="noopener noreferrer" className="hover:text-green-400"><FaWhatsapp size={24} /></a>
              <a href="https://shopify.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaShopify size={24} /></a>
              <a href="#" className="hover:text-yellow-300"><FaChartBar size={24} /></a>
              <a href="#" className="hover:text-yellow-200"><FaDatabase size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-xs text-gray-400">© 2025 Casego. All rights reserved.</div>
      </footer>
    </div>
  );
}
