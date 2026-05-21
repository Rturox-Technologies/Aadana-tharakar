import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Aadana Tharakar",
  description: "Aadana Tharakar's Terms of Service governing your use of the platform.",
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing or using Aadana Tharakar (nilaamnai.com), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our platform.`,
    },
    {
      title: "2. Use of the Platform",
      content: `Aadana Tharakar is a real estate listing and discovery platform for Tamil Nadu. You may use the platform only for lawful purposes. You agree not to: post false or misleading property information; use the platform for spam or unsolicited communications; attempt to circumvent security features; or impersonate any person or entity.`,
    },
    {
      title: "3. Property Listings",
      content: `Agents and builders are responsible for the accuracy of their listings. Aadana Tharakar verifies listings against DTCP, CMDA, and RERA databases but does not guarantee absolute accuracy. All transactions are between buyers/sellers/tenants and property owners or their authorised agents.`,
    },
    {
      title: "4. User Accounts",
      content: `You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately at support@nilaamnai.com of any unauthorised use of your account.`,
    },
    {
      title: "5. Intellectual Property",
      content: `The Aadana Tharakar platform, including its design, logos, and software, is owned by Aadana Tharakar and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.`,
    },
    {
      title: "6. Limitation of Liability",
      content: `Aadana Tharakar shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform. Our liability is limited to the maximum extent permitted by applicable Indian law.`,
    },
    {
      title: "7. Governing Law",
      content: `These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Chennai, Tamil Nadu.`,
    },
    {
      title: "8. Changes to Terms",
      content: `We reserve the right to modify these Terms at any time. We will provide notice of significant changes. Continued use of the platform after changes constitutes acceptance of the new Terms.`,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A0F1E] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-white">Terms of Service</h1>
          <p className="text-slate-500 mt-3">Last updated: January 2025</p>
        </div>

        <div className="bg-[#111827] border border-white/5 rounded-2xl p-8 md:p-12 space-y-8">
          <p className="text-slate-300 text-lg">
            Welcome to Aadana Tharakar. Please read these Terms of Service carefully before using our platform.
            These terms govern your access to and use of Aadana Tharakar&apos;s website, mobile application, and services.
          </p>

          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
              <p className="text-slate-400 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/contact" className="text-[#C9A84C] hover:underline text-sm">
            Questions? Contact our Legal Team →
          </Link>
        </div>
      </div>
    </main>
  );
}
