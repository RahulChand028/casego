import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaShopify, FaChartBar, FaDatabase } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 text-center mt-12 rounded-xl w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Brand & Description */}
        <div className="mb-6 md:mb-0 text-left flex-1">
          <div className="text-2xl font-black mb-2">casego</div>
          <div className="text-sm max-w-xs text-gray-200">
            Smarter analytics for modern businesses. Get insights, alerts, and reports delivered directly to your WhatsApp.
          </div>
        </div>
        {/* Quick Links & Useful Links */}
        <div className="justify-between mt-4 mb-6 md:mb-0 flex flex-col md:flex-row gap-8 flex-1">
          <div>
            <div className="font-bold mb-2">Quick Links</div>
            <ul className="space-y-1 text-sm">
              <li><Link href="/" className="hover:underline text-white">Home</Link></li>
              <li><a href="#" className="hover:underline text-white">Services</a></li>
              <li><a href="#" className="hover:underline text-white">Pricing</a></li>
              <li><a href="#" className="hover:underline text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="font-bold mb-2">Useful Links</div>
            <ul className="space-y-1 text-sm">
              <li><Link href="/privacy-policy" className="hover:underline text-white">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:underline text-white">Terms & Conditions</Link></li>
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
      <div className="mt-8 text-xs text-gray-400">© {new Date().getFullYear()} Casego. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
