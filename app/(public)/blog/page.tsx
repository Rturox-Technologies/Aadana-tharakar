import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Real Estate Blog & Insights — Aadana Tharakar",
  description: "Read the latest guides, legal updates, market reports, and property insights about buying, selling, and investing in Tamil Nadu.",
};

const mockBlogs = [
  {
    title: "Understanding DTCP & CMDA Approvals in Tamil Nadu",
    titleTa: "தமிழ்நாட்டில் DTCP மற்றும் CMDA ஒப்புதல்களைப் புரிந்துகொள்வது",
    slug: "understanding-dtcp-cmda-approvals",
    excerpt: "Before buying land in Tamil Nadu, learn the crucial differences between DTCP and CMDA approvals, Patta requirements, and layout safety regulations.",
    category: "Legal & Guides",
    date: "May 15, 2026",
    readTime: "6 min read",
    cover: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Tamil Nadu Real Estate Market Trends: Chennai & Coimbatore 2026",
    titleTa: "தமிழக ரியல் எஸ்டேட் சந்தை போக்குகள் 2026",
    slug: "tamil-nadu-real-estate-trends-2026",
    excerpt: "An in-depth analysis of property prices, demand, and yield projections across residential and commercial sectors in OMR, RS Puram, and beyond.",
    category: "Market Reports",
    date: "May 10, 2026",
    readTime: "8 min read",
    cover: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "The Ultimate Guide to Checking Patta & Chitta Land Records Online",
    titleTa: "பட்டா & சிட்டா நில ஆவணங்களை ஆன்லைனில் சரிபார்ப்பதற்கான வழிகாட்டி",
    slug: "guide-to-checking-patta-chitta-online",
    excerpt: "Step-by-step instructions to verify ownership records on the Any-Anytime Patta portal (eservices.tn.gov.in) with easy validation guides.",
    category: "Guides",
    date: "May 02, 2026",
    readTime: "5 min read",
    cover: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80",
  },
];

export default function BlogPage() {
  const featured = mockBlogs[0];
  const posts = mockBlogs.slice(1);

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase mb-4">Insights</p>
          <h1 className="text-5xl font-bold mb-4">
            Aadana Tharakar <span className="text-[#C9A84C]">Blog</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Your source for RERA updates, DTCP guides, and real estate market trends in Tamil Nadu.
          </p>
        </div>

        {/* Featured Post */}
        <div className="bg-[#111827] border border-white/5 rounded-3xl overflow-hidden hover:border-[#C9A84C]/20 transition-all mb-12">
          <div className="grid lg:grid-cols-2 gap-8 p-6 md:p-8">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <img
                src={featured.cover}
                alt={featured.title}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-semibold rounded-full w-fit mb-4">
                {featured.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 hover:text-[#C9A84C] transition-colors">
                <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p className="text-[#C9A84C] text-xs font-medium mb-4">{featured.titleTa}</p>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-4 text-slate-500 text-xs mb-6">
                <span className="flex items-center gap-1"><Calendar size={14} /> {featured.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {featured.readTime}</span>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="flex items-center gap-2 text-white hover:text-[#C9A84C] font-semibold transition-colors"
              >
                Read Article <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden hover:border-[#C9A84C]/20 transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.cover}
                  alt={post.title}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="px-3 py-1 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-semibold rounded-full w-fit mb-4">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mb-2 hover:text-[#C9A84C] transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-[#C9A84C] text-xs font-medium mb-3">{post.titleTa}</p>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4 text-slate-500 text-xs">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="text-[#C9A84C] text-sm font-semibold hover:underline">
                    Read →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
