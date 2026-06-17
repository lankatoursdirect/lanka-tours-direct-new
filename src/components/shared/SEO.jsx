import { Helmet } from "react-helmet-async";

export function SEO({
  title,
  description,
  canonical,
  ogImage = "https://lankatoursdirect.com/logo.png",
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogType = "website",
  noindex,
  schema,
  preloadImage,
}) {
  const siteName = "Lanka Tours Direct";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const ogImageUrl = ogImage?.startsWith("http") ? ogImage : `https://lankatoursdirect.com${ogImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {preloadImage && (
        <link rel="preload" as="image" href={preloadImage} fetchpriority="high" />
      )}

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
