// components/SEO.jsx
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, image, url, type = "website", schema }) => {
  return (
    <Helmet>
      <title>{title} | Clínica Fono Inova</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />

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
