import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api",
        "/dashboard",
        "/private/",
        "/*?*" // Disallow query parameters search sorting pages to prevent duplicate indexing
      ],
    },
    sitemap: "https://aadanatharakar.com/sitemap.xml",
  };
}
