import { useState } from 'react';
import { ChevronDown, ChevronUp, Tag } from 'lucide-react';
import type { SEOH2 } from '../data/seoStructures';

interface SEOContentSectionProps {
  section: SEOH2;
  index: number;
}

const SEOContentSection = ({ section, index }: SEOContentSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // Alternância de cores para visualização
  const bgColors = [
    'bg-slate-50',
    'bg-teal-50/50',
    'bg-blue-50/50',
    'bg-purple-50/50',
    'bg-amber-50/50',
    'bg-rose-50/50',
    'bg-emerald-50/50',
    'bg-indigo-50/50',
  ];

  const bgColor = bgColors[index % bgColors.length];

  return (
    <div className={`rounded-2xl overflow-hidden border border-slate-200 ${bgColor}`}>
      {/* H2 Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/50 transition-colors"
      >
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-poppins">
          {section.title}
        </h2>
        <span className="text-slate-400">
          {isOpen ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
        </span>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-6 pb-6 space-y-4">
          {/* H3s */}
          <div className="space-y-4">
            {section.h3s.map((h3, h3Index) => (
              <div key={h3Index} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {h3.title}
                </h3>
                {h3.content && (
                  <p className="text-slate-600 leading-relaxed">
                    {h3.content}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Termos Relacionados */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-slate-700">Termos relacionados:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {section.relatedTerms.map((term, termIndex) => (
                <span
                  key={termIndex}
                  className="px-3 py-1.5 bg-white text-slate-600 text-sm rounded-full border border-slate-200 hover:border-primary hover:text-primary transition-colors"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOContentSection;
