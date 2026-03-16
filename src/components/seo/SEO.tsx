import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

const BASE_URL = "https://grivilabs.com";
const DEFAULT_OG = `${BASE_URL}/og-image.png`;

const SEO = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG,
  ogType = "website",
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title.includes("GriviLabs")
    ? title
    : `${title} · GriviLabs`;

  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type"        content={ogType} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:locale"      content="id_ID" />
      <meta property="og:site_name"   content="GriviLabs" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />
    </Helmet>
  );
};

export default SEO;
