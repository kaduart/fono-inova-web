import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showSchema?: boolean;
}

export default function Breadcrumb({ items, showSchema = true }: BreadcrumbProps) {
  // Schema JSON-LD para SEO
  const schemaData = showSchema ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.clinicafonoinova.com.br/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href && { "item": `https://www.clinicafonoinova.com.br${item.href}` })
      }))
    ]
  } : null;

  return (
    <>
      {/* Schema JSON-LD */}
      {showSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      
      {/* Visual Breadcrumb */}
      <nav aria-label="breadcrumb" className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center flex-wrap text-sm text-gray-600">
            {/* Home */}
            <li className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center hover:text-primary transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            
            {/* Separator */}
            <li className="mx-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </li>
            
            {/* Items */}
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
                )}
                
                {item.href && index < items.length - 1 ? (
                  <Link
                    to={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium" aria-current="page">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
