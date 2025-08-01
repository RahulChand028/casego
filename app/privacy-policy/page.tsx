import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#181818] py-16 px-4 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-black mb-6 text-center">Privacy Policy</h1>
        <p className="mb-4 text-sm text-gray-600 text-center">Last updated: August 2, 2025</p>
        <h2 className="text-2xl font-bold mt-8 mb-2">1. Introduction</h2>
        <p className="mb-4">This Privacy Policy explains how Casego collects, uses, discloses, and safeguards your information when you use our SaaS platform to connect your database or Shopify store for analytics via WhatsApp.</p>
        <h2 className="text-2xl font-bold mt-8 mb-2">2. Information We Collect</h2>
        <p className="mb-4">When you use Casego, we may collect the following types of information:</p>
        <ul className="mb-4 list-disc list-inside text-sm text-gray-700">
          <li>Personal information such as your name, email address, and WhatsApp number.</li>
          <li>Database credentials or Shopify access tokens you provide to enable analytics.</li>
          <li>Usage data, queries, and communication history with our AI system.</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-2">3. How We Use Your Information</h2>
        <p className="mb-4">We use your information to:</p>
        <ul className="mb-4 list-disc list-inside text-sm text-gray-700">
          <li>Connect to your database or Shopify store to generate analytics and answer your questions.</li>
          <li>Send analytics and responses to your WhatsApp number.</li>
          <li>Improve and personalize our AI-powered services.</li>
          <li>Communicate with you and provide customer support.</li>
          <li>Comply with legal and regulatory requirements.</li>
        </ul>
        <h2 className="text-2xl font-bold mt-8 mb-2">4. Data Access and Security</h2>
        <p className="mb-4">We access your database or Shopify data only with your explicit consent and solely for the purpose of providing analytics and responses. We use industry-standard security measures to protect your data, but cannot guarantee absolute security of data transmitted over the Internet. You are responsible for safeguarding your credentials and access tokens.</p>
        <h2 className="text-2xl font-bold mt-8 mb-2">5. Sharing Your Information</h2>
        <p className="mb-4">We do not sell your personal or business data. We may share your information with trusted third-party service providers who help us operate our platform (such as cloud hosting or messaging services), and only as necessary to deliver our services. All third parties are required to maintain confidentiality and security of your data.</p>
        <h2 className="text-2xl font-bold mt-8 mb-2">6. AI and Automated Processing</h2>
        <p className="mb-4">Your queries and data may be processed by AI systems to generate analytics or responses. While we strive for accuracy, AI-generated content may not always be correct or complete. Please use your own judgment when acting on any information provided by our service.</p>
        <h2 className="text-2xl font-bold mt-8 mb-2">7. Your Rights</h2>
        <p className="mb-4">You have the right to access, update, or delete your personal information and revoke database or Shopify access at any time. To exercise these rights, please contact us at <a href="mailto:info@casego.com" className="underline text-blue-600">info@casego.com</a>.</p>
        <h2 className="text-2xl font-bold mt-8 mb-2">8. Compliance</h2>
        <p className="mb-4">You are responsible for ensuring that your use of Casego complies with all applicable data privacy laws and regulations. We are committed to complying with relevant legal requirements regarding data protection and privacy.</p>
        <h2 className="text-2xl font-bold mt-8 mb-2">9. Changes to This Policy</h2>
        <p className="mb-4">We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of the service constitutes acceptance of the new policy.</p>
        <h2 className="text-2xl font-bold mt-8 mb-2">10. Contact Us</h2>
        <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at <a href="mailto:info@casego.com" className="underline text-blue-600">info@casego.com</a>.</p>
      </div>
    </div>
  );
}
