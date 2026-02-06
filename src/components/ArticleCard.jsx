import { Link } from 'react-router-dom';
import { trackArticleClick } from '../hooks/useAnalytics';

const ArticleCard = ({ article }) => {
  const getCategoryColor = (color) => {
    switch (color) {
      case 'primary':
        return {
          text: 'text-blue-700',
          bg: 'bg-blue-100',
          border: 'border-blue-200',
          hover: 'hover:bg-blue-200'
        };
      case 'secondary':
        return {
          text: 'text-purple-700',
          bg: 'bg-purple-100',
          border: 'border-purple-200',
          hover: 'hover:bg-purple-200'
        };
      case 'accent':
        return {
          text: 'text-green-700',
          bg: 'bg-green-100',
          border: 'border-green-200',
          hover: 'hover:bg-green-200'
        };
      default:
        return {
          text: 'text-gray-700',
          bg: 'bg-gray-100',
          border: 'border-gray-200',
          hover: 'hover:bg-gray-200'
        };
    }
  };

  const colorClasses = getCategoryColor(article.categoryColor);

  const handleArticleClick = () => {
    trackArticleClick(article.id, article.title);
  };

  return (
    <article
      itemScope
      itemType="https://schema.org/Article"
      className="border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden bg-white group"
    >
      {/* Schema invisível para Google */}
      <meta itemProp="headline" content={article.title} />
      <meta itemProp="author" content={article.author} />
      <meta itemProp="datePublished" content={article.date} />
      <meta itemProp="image" content={article.image} />
      <meta itemProp="mainEntityOfPage" content={`https://www.clinicafonoinova.com.br/artigos/${article.slug}`} />

      {/* Imagem */}
      <div className="aspect-video overflow-hidden relative bg-gray-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <img
          src={article.image}
          alt={`Artigo sobre ${article.title} - Clínica Fono Inova`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          itemProp="image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x450?text=Fono+Inova';
          }}
        />

        {/* Badge categoria */}
        <div
          className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-semibold ${colorClasses.bg} ${colorClasses.text} z-20`}
        >
          {article.category}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center text-[11px] text-gray-500 mb-2">
          <time itemProp="datePublished">{article.date}</time>
          <span>5 min de leitura</span>
        </div>

        <div className="h-[3.75rem] mb-2 flex items-center">
          <h3
            itemProp="headline"
            className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight"
          >
            {article.title}
          </h3>
        </div>

        <div className="h-[4.5rem] mb-4 overflow-hidden">
          <p itemProp="description" className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Autor */}
        <div className="flex items-center mb-4 mt-auto">
          <div className="mr-2 shrink-0">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-[10px]">
              {article.author.charAt(0)}
            </div>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-900 truncate" itemProp="author">
              {article.author}
            </p>
            <p className="text-[10px] text-gray-500 truncate">Especialista</p>
          </div>
        </div>

        {/* Botão */}
        <Link
          to={`/artigos/${article.slug}`}
          onClick={handleArticleClick}
          itemProp="url"
          className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 
            border ${colorClasses.border} ${colorClasses.text} ${colorClasses.hover} 
            hover:shadow-md hover:-translate-y-0.5`}
        >
          Ler Artigo →
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
