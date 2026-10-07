// components/SEO.jsx
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords = "", image, url, type = "website", schema, noindex = false }) => {
  const BRAND = "Clínica Fono Inova";
  const fullTitle = /fono inova/i.test(title) ? title : `${title} | ${BRAND}`;
  const siteUrl = "https://www.clinicafonoinova.com.br";
  const absoluteUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;
  const absoluteImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/images/logo-unica.png`;

  return (
    <Helmet>
      <html lang="pt-BR" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={absoluteUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* 🔥 SCHEMA JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(
            Array.isArray(schema) 
              ? { "@context": "https://schema.org", "@graph": schema }
              : schema
          )}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
