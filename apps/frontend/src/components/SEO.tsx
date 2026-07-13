import { Helmet } from "react-helmet-async";

const SITE_URL = "https://tianipekins.org";
const SITE_NAME = "Tiani Pekins Foundation";
const OG_IMAGE = `${SITE_URL}/og-image.svg`;

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}

const PAGE_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "Our Roots",
  "/initiatives": "Initiatives",
  "/field-log": "Field Log",
  "/contact": "Contact",
};

export function SEO({
  title,
  description = "A grassroots engineering foundation in Buea, Cameroon - building smart infrastructure, teaching digital literacy, and documenting community impact from ground to signal.",
  path = "",
  image = OG_IMAGE,
  type = "website",
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Ground to Signal`;
  const url = `${SITE_URL}${path}`;
  const pageLabel = PAGE_LABELS[path] || title || "Page";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE_NAME,
    url: SITE_URL,
    logo: OG_IMAGE,
    description:
      "A grassroots engineering foundation working across digital literacy, moral education, agriculture, and community care in Buea, Cameroon.",
    founder: {
      "@type": "Person",
      name: "Tiani Pekins",
      url: "https://tianipekins.com",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buea",
      addressCountry: "CM",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@tianipekins.org",
      contactType: "general",
    },
    sameAs: [
      "https://tianipekins.com",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      ...(path !== "/"
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: pageLabel,
              item: url,
            },
          ]
        : []),
    ],
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data - NGO schema only on homepage */}
      {path === "/" && (
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      )}

      {/* Structured Data - BreadcrumbList on all pages */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}
