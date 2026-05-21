import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Aadana Tharakar — Tamil Nadu's #1 Real Estate Platform",
    template: "%s | Aadana Tharakar",
  },
  description: "ஆதனத் தரகர் - தமிழ்நாட்டின் முதன்மையான ரியல் எஸ்டேட் தளம். Premium luxury real estate portal in Tamil Nadu. Buy, rent, and sell verified properties, plots, apartments, and luxury villas across Chennai, Coimbatore, Madurai, Trichy, Salem, and Tirunelveli.",
  metadataBase: new URL("https://aadanatharakar.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aadana Tharakar — Tamil Nadu's #1 Real Estate Platform",
    description: "ஆதனத் தரகர் - தமிழ்நாட்டின் முதன்மையான ரியல் எஸ்டேட் தளம். Buy, rent, and sell verified properties across Tamil Nadu.",
    url: "https://aadanatharakar.com",
    siteName: "Aadana Tharakar",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "Aadana Tharakar Tamil Nadu Real Estate Portal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aadana Tharakar — Tamil Nadu's #1 Real Estate Platform",
    description: "ஆதனத் தரகர் - தமிழ்நாட்டின் முதன்மையான ரியல் எஸ்டேட் தளம். Buy, rent, and sell verified properties across Tamil Nadu.",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
