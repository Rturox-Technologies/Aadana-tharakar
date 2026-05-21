import { MetadataRoute } from "next";
import { ALL_MOCK_PROPERTIES } from "@/lib/mockData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aadanatharakar.com";

  // 1. Static Routes
  const staticRoutes = [
    "",
    "/properties",
    "/agents",
    "/blog",
    "/about",
    "/contact"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Property types static shortcuts
  const typeRoutes = [
    "/apartments",
    "/villas",
    "/plots",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // 2. Dynamic Property Slugs
  const propertyRoutes = ALL_MOCK_PROPERTIES.map((property) => ({
    url: `${baseUrl}/property/${property.slug}`,
    lastModified: new Date(property.postedDate),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // 3. Dynamic Blog Slugs (Simulated)
  const mockBlogs = [
    "vaastu-tips-for-modern-home",
    "why-invest-in-chennai-real-estate",
    "ecr-villa-buying-guide",
    "dtcp-rera-verification-handbook",
    "coimbatore-real-estate-boom-2026"
  ];
  const blogRoutes = mockBlogs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // 4. Tamil Nadu Location Pages (13 key cities)
  const tnCities = [
    "chennai",
    "coimbatore",
    "madurai",
    "salem",
    "trichy",
    "tirunelveli",
    "erode",
    "vellore",
    "tiruppur",
    "thoothukudi",
    "nagercoil",
    "thanjavur",
    "dindigul"
  ];
  const cityRoutes = tnCities.map((city) => ({
    url: `${baseUrl}/location/${city}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  // 5. Pre-rendered City SEO Landing Pages
  const seoLandingRoutes = [
    { url: `${baseUrl}/flats-in-chennai`, priority: 0.9 },
    { url: `${baseUrl}/villas-in-coimbatore`, priority: 0.9 },
    { url: `${baseUrl}/plots-in-madurai`, priority: 0.9 },
  ].map((route) => ({
    url: route.url,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));

  return [
    ...staticRoutes,
    ...typeRoutes,
    ...propertyRoutes,
    ...blogRoutes,
    ...cityRoutes,
    ...seoLandingRoutes,
  ];
}
