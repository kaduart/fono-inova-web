import { useState } from "react";

const OptimizedImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${loaded ? 'img-loaded' : 'img-fade-in'}`}
      onLoad={() => setLoaded(true)}
      onError={(e) => {
        console.error(`Erro ao carregar imagem: ${src}`);
        e.target.src = "/images/placeholder.jpg"; // Imagem de fallback
      }}
    />
  );
};

export default OptimizedImage;