import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const OptimizedImage = ({ src, alt, className }: OptimizedImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} ${loaded ? 'img-loaded' : 'img-fade-in'}`}
      onLoad={() => setLoaded(true)}
      onError={(e) => {
        console.error(`Erro ao carregar imagem: ${src}`);
        (e.target as HTMLImageElement).src = "/images/placeholder.jpg"; // Imagem de fallback
      }}
    />
  );
};

export default OptimizedImage;