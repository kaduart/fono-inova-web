// components/SEO.jsx
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords = "", image, url, type = "website", schema }) => {
  const siteUrl = "https://www.clinicafonoinova.com.br";
  const absoluteUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;
  const absoluteImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/images/logo-unica.png`;

  return (
    <Helmet>
      <html lang="pt-BR" />
      <title>{title.includes("Clínica Fono Inova") ? title : `${title} | Clínica Fono Inova em Anápolis`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
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
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
