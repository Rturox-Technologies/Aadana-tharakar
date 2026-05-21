import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, BookOpen, User } from "lucide-react";
import { notFound } from "next/navigation";

const mockBlogs = [
  {
    title: "Understanding DTCP & CMDA Approvals in Tamil Nadu",
    titleTa: "தமிழ்நாட்டில் DTCP மற்றும் CMDA ஒப்புதல்களைப் புரிந்துகொள்வது",
    slug: "understanding-dtcp-cmda-approvals",
    excerpt: "Before buying land in Tamil Nadu, learn the crucial differences between DTCP and CMDA approvals, Patta requirements, and layout safety regulations.",
    category: "Legal & Guides",
    date: "May 15, 2026",
    readTime: "6 min read",
    author: "Aadana Tharakar Legal Team",
    cover: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
    content: `
      When purchasing land or properties in Tamil Nadu, you will frequently encounter the acronyms DTCP and CMDA. Getting layout approval from the appropriate authority is the single most important step in securing your real estate investment.

      ### What is CMDA?
      The Chennai Metropolitan Development Authority (CMDA) is responsible for layout approvals, building permits, and master plans within the Chennai Metropolitan Area. This covers Chennai district, and portions of Thiruvallur, Kanchipuram, and Chengalpattu districts.

      ### What is DTCP?
      The Directorate of Town and Country Planning (DTCP) governs approvals for the rest of Tamil Nadu outside the CMDA jurisdiction. If you are buying a plot in Coimbatore, Madurai, Trichy, Salem, or Tirunelveli, the layout must be approved by the local DTCP body.

      ### The Importance of Patta
      A layout approval is only valid if the parent land ownership is documented clearly via a Patta (revenue land holding record) under the seller's name. Always check if the Patta has been updated online on the Any-Anytime Patta website.
    `,
  },
  {
    title: "Tamil Nadu Real Estate Market Trends: Chennai & Coimbatore 2026",
    titleTa: "தமிழக ரியல் எஸ்டேட் சந்தை போக்குகள் 2026",
    slug: "tamil-nadu-real-estate-trends-2026",
    excerpt: "An in-depth analysis of property prices, demand, and yield projections across residential and commercial sectors in OMR, RS Puram, and beyond.",
    category: "Market Reports",
    date: "May 10, 2026",
    readTime: "8 min read",
    author: "Aadana Tharakar Research Team",
    cover: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    content: `
      The real estate market in Tamil Nadu is experiencing strong growth in 2026, driven by IT corridor expansions and infrastructure investments.

      ### Chennai IT Belts
      Areas along OMR (Old Mahabalipuram Road) and ECR (East Coast Road) are experiencing steady demand. The suburban corridors are seeing double-digit price increases.

      ### Coimbatore Industrial Hubs
      Coimbatore remains a hotbed for plot and independent villa investments. Localities near Saravanampatti and RS Puram have seen 12-15% price increases year-over-year.
    `,
  },
  {
    title: "The Ultimate Guide to Checking Patta & Chitta Land Records Online",
    titleTa: "பட்டா & சிட்டா நில ஆவணங்களை ஆன்லைனில் சரிபார்ப்பதற்கான வழிகாட்டி",
    slug: "guide-to-checking-patta-chitta-online",
    excerpt: "Step-by-step instructions to verify ownership records on the Any-Anytime Patta portal (eservices.tn.gov.in) with easy validation guides.",
    category: "Guides",
    date: "May 02, 2026",
    readTime: "5 min read",
    author: "Aadana Tharakar Legal Team",
    cover: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
    content: `
      Tamil Nadu land administration is fully digitized. You can check your Patta/Chitta records and view land registration details online.

      ### Step 1: Visit the e-Services Portal
      Go to the official portal at eservices.tn.gov.in.

      ### Step 2: Select District and Area
      Choose whether the land is rural or urban, and select the appropriate district and taluk.

      ### Step 3: Enter Survey Number
      Enter the exact survey number or subdivision number to fetch the online Patta extract.
    `,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = mockBlogs.find((b) => b.slug === slug);
  if (!post) return { title: "Article Not Found | Aadana Tharakar" };
  return {
    title: `${post.title} — Blog | Aadana Tharakar`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = mockBlogs.find((b) => b.slug === slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white py-16 px-4">
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link href="/blog" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 w-fit">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Category */}
        <span className="px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-semibold rounded-full w-fit mb-6 block">
          {post.category}
        </span>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">{post.title}</h1>
        <p className="text-xl text-[#C9A84C] font-semibold mb-6">{post.titleTa}</p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm mb-10 pb-6 border-b border-white/5">
          <span className="flex items-center gap-1.5"><User size={16} /> {post.author}</span>
          <span className="flex items-center gap-1.5"><Calendar size={16} /> {post.date}</span>
          <span className="flex items-center gap-1.5"><Clock size={16} /> {post.readTime}</span>
        </div>

        {/* Cover image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 border border-white/5">
          <img
            src={post.cover}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Body content */}
        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed space-y-6">
          {post.content.trim().split("\n\n").map((para, idx) => {
            const line = para.trim();
            if (line.startsWith("###")) {
              return <h3 key={idx} className="text-2xl font-bold text-white pt-4 mb-2">{line.replace("###", "").trim()}</h3>;
            }
            return <p key={idx}>{line}</p>;
          })}
        </div>
      </article>
    </main>
  );
}
