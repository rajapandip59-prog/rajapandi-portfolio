import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePortfolioData } from "@/context/PortfolioDataContext";

const BASE_URL = "https://rajapandi.vercel.app";

const getPageTitle = (pathname: string, defaultTitle: string): string => {
  switch (pathname) {
    case "/":
    case "/about":
      return defaultTitle;
    case "/experience":
      return "Work Experience | Rajapandi P - AI & Software Developer";
    case "/skills":
      return "Skills & Expertise | Rajapandi P - AI & Software Developer";
    case "/projects":
      return "Featured Projects | Rajapandi P - AI & Software Developer";
    case "/certificates":
      return "Certifications & Credentials | Rajapandi P - AI & Software Developer";
    case "/social":
      return "Connect & Socials | Rajapandi P - AI & Software Developer";
    case "/resume":
      return "Resume & CV | Rajapandi P - AI & Software Developer";
    case "/hire":
      return "Hire Rajapandi P | AI & Software Developer";
    default:
      return defaultTitle;
  }
};

export const SEO: React.FC = () => {
  const location = useLocation();
  const { seoSettings, profile, socialLinks } = usePortfolioData();

  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${location.pathname === "/" ? "" : location.pathname}`;
    const pageTitle = getPageTitle(location.pathname, seoSettings.metaTitle || "Rajapandi P | AI & Software Developer Portfolio");
    const description = seoSettings.metaDescription || "Official portfolio of Rajapandi P, AI & Software Developer specializing in Machine Learning, Computer Vision, Deep Learning, and Full Stack Web Development.";
    const keywords = seoSettings.keywords || "Rajapandi P, Rajapandi, AI Developer, Software Developer, Machine Learning, Computer Vision, Deep Learning, Data Scientist, Full Stack Developer";
    const ogImage = seoSettings.ogImage || `${BASE_URL}/og-image.png`;

    // 1. Update Title
    document.title = pageTitle;

    // Helper to set meta tag content
    const setMeta = (nameOrProperty: string, value: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        if (isProperty) {
          element.setAttribute("property", nameOrProperty);
        } else {
          element.setAttribute("name", nameOrProperty);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", value);
    };

    // 2. Meta Description & Keywords
    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("author", profile.name || "Rajapandi P");
    setMeta("robots", "index, follow");

    // 3. Open Graph
    setMeta("og:title", pageTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", `${profile.name || "Rajapandi P"} Portfolio`, true);
    setMeta("og:locale", "en_US", true);

    // 4. Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:url", canonicalUrl);
    setMeta("twitter:title", pageTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
    if (seoSettings.twitterHandle) {
      setMeta("twitter:creator", seoSettings.twitterHandle);
      setMeta("twitter:site", seoSettings.twitterHandle);
    }

    // 5. Canonical Link
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 6. Dynamic Schema.org JSON-LD Structured Data
    const sameAsList = Array.from(new Set([
      ...socialLinks.map((s) => s.url).filter(Boolean),
      "https://github.com/rajapandip59-prog",
      "https://www.linkedin.com/in/rajapandi-p/",
      "https://twitter.com/RajapandiP70029"
    ]));

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": `${BASE_URL}/#webpage`,
          "url": canonicalUrl,
          "name": pageTitle,
          "description": description,
          "mainEntity": { "@id": `${BASE_URL}/#person` }
        },
        {
          "@type": "Person",
          "@id": `${BASE_URL}/#person`,
          "name": profile.name || "Rajapandi P",
          "givenName": "Rajapandi",
          "familyName": "P",
          "alternateName": [
            "Rajapandi",
            "Rajapandi P AI Developer",
            "Rajapandi P Software Developer"
          ],
          "jobTitle": profile.title || "AI & Software Developer",
          "worksFor": {
            "@type": "Organization",
            "name": "AI Tech Solutions"
          },
          "url": BASE_URL,
          "image": ogImage,
          "sameAs": sameAsList,
          "knowsAbout": [
            "Artificial Intelligence",
            "Machine Learning",
            "Deep Learning",
            "Computer Vision",
            "Data Science",
            "Full Stack Development",
            "React",
            "Python",
            "TypeScript"
          ],
          "email": profile.email ? `mailto:${profile.email}` : "mailto:rajapandip59@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Theni",
            "addressRegion": "Tamil Nadu",
            "addressCountry": "India"
          }
        }
      ]
    };

    let scriptTag = document.getElementById("dynamic-json-ld") as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "dynamic-json-ld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData, null, 2);
  }, [location.pathname, seoSettings, profile, socialLinks]);

  return null;
};
