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
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <img
          src={article.image}
          alt={`Artigo sobre ${article.title} - Clínica Fono Inova`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          itemProp="image"
        />

        {/* Badge categoria */}
        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${colorClasses.bg} ${colorClasses.text} z-20`}
        >
          {article.category}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <time itemProp="datePublished">{article.date}</time>
          <span>5 min de leitura</span>
        </div>

        <h3
          itemProp="headline"
          className="font-bold text-xl mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2"
        >
          {article.title}
        </h3>

        <p itemProp="description" className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {article.excerpt}
        </p>

        {/* Autor */}
        <div className="flex items-center mb-5">
          <div className="mr-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {article.author.charAt(0)}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900" itemProp="author">
              {article.author}
            </p>
            <p className="text-xs text-gray-500">Especialista em {article.category}</p>
          </div>
        </div>

        {/* Botão */}
        <Link
          to={`/artigos/${article.slug}`}
          onClick={handleArticleClick}
          itemProp="url"
          className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 
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
