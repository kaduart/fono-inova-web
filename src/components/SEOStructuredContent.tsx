import { BookOpen } from 'lucide-react';
import SEOContentSection from './SEOContentSection';
import FAQSection from './FAQSection';
import type { SEOStructure } from '../data/seoStructures';

interface SEOStructuredContentProps {
  seoData: SEOStructure;
  showFAQ?: boolean;
  customFAQTitle?: string;
}

const SEOStructuredContent = ({ 
  seoData, 
  showFAQ = true,
  customFAQTitle
}: SEOStructuredContentProps) => {
  return (
    <div className="space-y-16">
      {/* H1 Section - Visível para SEO e usuários */}
      <section className="py-8 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
              <BookOpen className="w-4 h-4" />
              Conteúdo Especializado
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900">
              {seoData.h1}
            </h1>
            <p className="mt-4 text-slate-600">
              Entenda mais sobre esta especialidade e como podemos ajudar seu filho
            </p>
          </div>
        </div>
      </section>

      {/* H2 Sections */}
      <section className="py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {seoData.h2Sections.map((section, index) => (
                <SEOContentSection
                  key={index}
                  section={section}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {showFAQ && (
        <FAQSection 
          faqs={seoData.faq}
          title={customFAQTitle || "Perguntas Frequentes"}
        />
      )}
    </div>
  );
};

export default SEOStructuredContent;
