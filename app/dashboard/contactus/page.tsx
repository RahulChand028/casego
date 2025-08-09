"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/common/clientAuth";
import { User } from "better-auth";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineSupport,
  HiOutlineChat,
  HiOutlineGlobeAlt,
  HiOutlineDocumentText
} from 'react-icons/hi';

import Sidebar from '@/components/Sidebar';
import Loading from '@/components/Loading';

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

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
    return <Loading fullScreen={true} size="md" text="Loading Contact Information" />;
  }

  return (
    <div className="min-h-screen font-sans pt-8 md:pt-24">
      <div className="flex gap-6 flex-col md:flex-row">
        <Sidebar user={user} link='contact' />
        <div className="flex-1 max-w-4xl px-4">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
            <p className="text-gray-600">
              Get in touch with our team for support, questions, or feedback about CaseGo.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="flex flex-col md:flex-row md:flex-wrap gap-6 mb-8">
            {/* Email Support */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow w-full md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <HiOutlineMail className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Email Support</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Send us an email for general inquiries and support requests.
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">General Support:</span>
                  <br />
                  <a href="mailto:support@casego.com" className="text-blue-600 hover:text-blue-800">
                    support@casego.com
                  </a>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">Technical Issues:</span>
                  <br />
                  <a href="mailto:tech@casego.com" className="text-blue-600 hover:text-blue-800">
                    tech@casego.com
                  </a>
                </p>
              </div>
            </div>

            {/* Phone Support */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow w-full md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <HiOutlinePhone className="text-green-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Phone Support</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Call us directly for immediate assistance and urgent matters.
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">India:</span>
                  <br />
                  <a href="tel:+918218723037" className="text-green-600 hover:text-green-800">
                    +91 82187 23037
                  </a>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-gray-700">International:</span>
                  <br />
                  <a href="tel:+15551234567" className="text-green-600 hover:text-green-800">
                    +1 (555) 123-4567
                  </a>
                </p>
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow w-full md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <HiOutlineChat className="text-purple-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">AI Agent Chat</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Chat with our AI agent via WhatsApp for instant support and reports.
              </p>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium text-gray-700">WhatsApp:</span>
                  <br />
                  <a href="https://wa.me/918218723037" className="text-purple-600 hover:text-purple-800">
                    +91 82187 23037
                  </a>
                </p>
                <p className="text-xs text-gray-500">
                  Available 24/7 for automated responses and report delivery
                </p>
              </div>
            </div>

            {/* Office Location */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow w-full md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <HiOutlineLocationMarker className="text-orange-600 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Office Location</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Visit our office for in-person meetings and consultations.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">CaseGo Technologies</span>
                  <br />
                  123 Business District
                  <br />
                  Mumbai, Maharashtra 400001
                  <br />
                  India
                </p>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <HiOutlineClock className="text-yellow-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Business Hours</h3>
            </div>
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Support Hours (IST)</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">AI Agent Availability</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>WhatsApp Bot: 24/7</p>
                  <p>Automated Reports: 24/7</p>
                  <p>Instant Responses: Always Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow w-full sm:w-1/2 lg:w-1/3">
              <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto mb-3">
                <HiOutlineDocumentText className="text-gray-600 text-xl" />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Documentation</h4>
              <p className="text-sm text-gray-600 mb-3">
                Access our comprehensive guides and API documentation.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Docs →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow w-full sm:w-1/2 lg:w-1/3">
              <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto mb-3">
                <HiOutlineSupport className="text-gray-600 text-xl" />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Help Center</h4>
              <p className="text-sm text-gray-600 mb-3">
                Find answers to frequently asked questions and tutorials.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Get Help →
              </a>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow w-full sm:w-1/2 lg:w-1/3">
              <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto mb-3">
                <HiOutlineGlobeAlt className="text-gray-600 text-xl" />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Website</h4>
              <p className="text-sm text-gray-600 mb-3">
                Visit our main website for more information about our services.
              </p>
              <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Visit Site →
              </a>
            </div>
          </div>

          {/* Response Time Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Response Times</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Email Support: Within 24 hours during business days</p>
              <p>• Phone Support: Immediate during business hours</p>
              <p>• WhatsApp AI: Instant automated responses 24/7</p>
              <p>• Technical Issues: Priority handling within 4 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;