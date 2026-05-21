import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Aadana Tharakar",
  description: "Aadana Tharakar's privacy policy explaining how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us, such as when you create an account, submit a property inquiry, or contact us. This includes: your name, email address, phone number, and property preferences. We also automatically collect certain information when you use our platform, including log data, device information, and cookies.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information we collect to: provide, maintain, and improve our services; match you with relevant properties in Tamil Nadu; send you property alerts and market updates; respond to your comments and questions; and comply with legal obligations.`,
    },
    {
      title: "3. Information Sharing",
      content: `We share your information with: registered agents and builders only when you express interest in their properties; service providers who assist in our operations; and legal authorities when required by law. We do not sell your personal data to third parties.`,
    },
    {
      title: "4. Data Security",
      content: `We implement industry-standard security measures including encryption in transit (TLS), hashed passwords (BCrypt), JWT token expiry (15 minutes), and Redis-backed session management. However, no method of transmission over the Internet is 100% secure.`,
    },
    {
      title: "5. Cookies",
      content: `We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.`,
    },
    {
      title: "6. Your Rights",
      content: `You have the right to: access your personal data; correct inaccurate data; request deletion of your data; object to processing; and data portability. To exercise these rights, contact us at privacy@aadanatharakar.com.`,
    },
    {
      title: "7. Contact Us",
      content: `If you have questions about this Privacy Policy, please contact us at: privacy@aadanatharakar.com or Aadana Tharakar, Anna Salai, Chennai – 600002, Tamil Nadu, India.`,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A0F1E] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-3">Legal</p>
          <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-slate-500 mt-3">Last updated: January 2025</p>
        </div>

        <div className="bg-[#111827] border border-white/5 rounded-2xl p-8 md:p-12 space-y-8">
          <p className="text-slate-300 text-lg">
            At Aadana Tharakar (ஆதனத் தரகர்), we are committed to protecting your personal information and your right to privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
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
            Questions? Contact our Privacy Team →
          </Link>
        </div>
      </div>
    </main>
  );
}
