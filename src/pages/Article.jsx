import { AccessTime, Article, Home, Person, Share, WhatsApp } from '@mui/icons-material';
import { Box, Breadcrumbs, Chip, Container, Link, Typography } from '@mui/material';
import {
    Facebook,
    Instagram,
    Youtube
} from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { articlesData } from '../data/articlesData';

const ArticlePage = () => {
    const { slug } = useParams();
    const article = articlesData.find(article => article.slug === slug);

    if (!article) {
        return (
            <Layout>
                <Container className="py-16 mt-16 text-center">
                    <Typography variant="h4">Artigo não encontrado</Typography>
                </Container>
            </Layout>
        );
    }

    // Função para determinar as classes de cor baseadas na categoria
    const getCategoryColor = (color) => {
        switch (color) {
            case 'primary':
                return {
                    bg: 'bg-blue-100',
                    text: 'text-blue-800',
                    border: 'border-blue-200',
                    hover: 'hover:bg-blue-200',
                    gradient: 'from-blue-500 to-blue-700'
                };
            case 'secondary':
                return {
                    bg: 'bg-purple-100',
                    text: 'text-purple-800',
                    border: 'border-purple-200',
                    hover: 'hover:bg-purple-200',
                    gradient: 'from-purple-500 to-purple-700'
                };
            case 'accent':
                return {
                    bg: 'bg-green-100',
                    text: 'text-green-800',
                    border: 'border-green-200',
                    hover: 'hover:bg-green-200',
                    gradient: 'from-green-500 to-green-700'
                };
            default:
                return {
                    bg: 'bg-gray-100',
                    text: 'text-gray-800',
                    border: 'border-gray-200',
                    hover: 'hover:bg-gray-200',
                    gradient: 'from-gray-500 to-gray-700'
                };
        }
    };

    const colorClasses = getCategoryColor(article.categoryColor);

    // Função para estilizar o conteúdo do artigo
    const styledContent = (
        <div className="space-y-6">
            {React.Children.map(article.content.props.children, (child) => {
                if (!child) return null;

                // Estilizar parágrafos
                if (child.type === 'p') {
                    return <p className="text-lg text-gray-700 leading-relaxed">{child}</p>;
                }

                // Estilizar cabeçalhos
                if (child.type === 'h2') {
                    return (
                        <div className="flex items-center mt-10 mb-6">
                            <div className={`w-3 h-8 rounded-md bg-gradient-to-b ${colorClasses.gradient} mr-4`}></div>
                            <h2 className="text-2xl font-bold text-gray-900">{child.props.children}</h2>
                        </div>
                    );
                }

                // Estilizar listas
                if (child.type === 'ul') {
                    return (
                        <ul className="space-y-3 bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                            {React.Children.map(child.props.children, (li) => (
                                <li className="flex items-start">
                                    <span className={`w-2 h-2 rounded-full ${colorClasses.bg} mt-2 mr-3 flex-shrink-0`}></span>
                                    <span className="text-gray-700">{li.props.children}</span>
                                </li>
                            ))}
                        </ul>
                    );
                }

                // Manter outros elementos sem alteração
                return child;
            })}
        </div>
    );

    return (
        <Layout>
            <Container maxWidth="lg" className="py-8 mt-16">
                <SEO
                    title={article.title}
                    description={article.excerpt}
                    keywords={`${article.category}, desenvolvimento infantil, ${article.title.toLowerCase()}`}
                    image={article.image}
                    url={`https://www.clinicafonoinova.com.br/artigos/${article.slug}`}
                    type="article"
                />

                {/* Breadcrumb */}
                <Breadcrumbs aria-label="breadcrumb" className="mb-8">
                    <Link
                        color="inherit"
                        href="/"
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <Home className="mr-1" fontSize="small" />
                        Home
                    </Link>
                    <Link
                        color="inherit"
                        href="/artigos"
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <Article className="mr-1" fontSize="small" />
                        Artigos
                    </Link>
                    <Typography color="textPrimary" className="text-gray-800 font-medium">
                        {article.title}
                    </Typography>
                </Breadcrumbs>

                {/* Cabeçalho do artigo */}
                <Box className="mb-10 text-center">
                    <Chip
                        label={article.category}
                        className={`${colorClasses.bg} ${colorClasses.text} font-semibold mb-4`}
                    />

                    <Typography
                        variant="h1"
                        component="h1"
                        className="font-bold my-4 text-3xl md:text-4xl lg:text-5xl text-gray-900 leading-tight"
                    >
                        {article.title}
                    </Typography>

                    <Typography variant="subtitle1" className="text-gray-600 mb-6 text-lg max-w-2xl mx-auto">
                        {article.excerpt}
                    </Typography>

                    <div className="flex items-center justify-center flex-wrap gap-4">
                        <div className="flex items-center">
                            <Person className="text-gray-500 mr-2" />
                            <Typography variant="body2" className="text-gray-600">
                                {article.author}
                            </Typography>
                        </div>
                        <div className="flex items-center">
                            <AccessTime className="text-gray-500 mr-2" />
                            <Typography variant="body2" className="text-gray-600">
                                {article.date}
                            </Typography>
                        </div>
                        <div className="flex items-center">
                            <Share className="text-gray-500 mr-2" />
                            <Typography variant="body2" className="text-gray-600">
                                5 min de leitura
                            </Typography>
                        </div>
                    </div>
                </Box>

                {/* Imagem destacada */}
                <Box className="mb-10 rounded-xl overflow-hidden shadow-lg relative">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-64 md:h-96 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/50 to-transparent"></div>
                </Box>

                {/* Conteúdo do artigo */}
                <Box className="max-w-3xl mx-auto mb-12">
                    {styledContent}

                    {/* Destaque de citação */}
                    <div className={`${colorClasses.bg} p-6 rounded-xl my-10 border-l-4 ${colorClasses.border}`}>
                        <p className="text-lg italic text-gray-800">
                            "Cada criança tem seu próprio ritmo de desenvolvimento. Com as estratégias certas, podemos potencializar seu crescimento."
                        </p>
                    </div>
                </Box>

                {/* Compartilhamento */}
                <Box className="py-8 border-t border-gray-200">
                    <Typography variant="h6" className="mb-6 text-gray-900 font-semibold text-center">
                        Compartilhe este artigo
                    </Typography>
                    <div className="flex justify-center space-x-4">
                        <a
                            href="https://wa.me/5562992013573"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                            aria-label="Siga-nos no Instagram"
                        >
                            <WhatsApp className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.instagram.com/clinicafonoinova"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                            aria-label="Siga-nos no Instagram"
                        >
                            <Instagram className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.facebook.com/clinicafonoinova"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                            aria-label="Curta nossa página no Facebook"
                        >
                            <Facebook className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.youtube.com/clinicafonoinova"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
                            aria-label="Inscreva-se no nosso YouTube"
                        >
                            <Youtube className="w-6 h-6" />
                        </a>
                    </div>
                </Box>

                {/* Artigos relacionados */}
                <Box className="mt-12 pt-8 border-t border-gray-200">
                    <Typography variant="h5" className="mb-6 text-gray-900 font-bold text-center">
                        Artigos relacionados
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {articlesData
                            .filter(a => a.id !== article.id)
                            .slice(0, 2)
                            .map(relatedArticle => {
                                const relatedColorClasses = getCategoryColor(relatedArticle.categoryColor);
                                return (
                                    <Link
                                        key={relatedArticle.id}
                                        href={`/artigos/${relatedArticle.slug}`}
                                        className="block p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-blue-300"
                                    >
                                        <Chip
                                            label={relatedArticle.category}
                                            className={`${relatedColorClasses.bg} ${relatedColorClasses.text} text-xs font-semibold mb-3`}
                                            size="small"
                                        />
                                        <h4 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                                            {relatedArticle.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                            {relatedArticle.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2">
                                                    {relatedArticle.author.charAt(0)}
                                                </div>
                                                <span className="text-sm text-gray-500">{relatedArticle.author.split(' ')[0]}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">{relatedArticle.date}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                </Box>

                {/* Newsletter */}
                <Box className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl text-center">
                    <Typography variant="h6" className="mb-2 font-semibold text-gray-900">
                        Receba mais conteúdos como este
                    </Typography>
                    <Typography variant="body2" className="mb-4 text-gray-600 max-w-md mx-auto">
                        Inscreva-se em nossa newsletter e receba artigos exclusivos sobre desenvolvimento infantil.
                    </Typography>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Seu e-mail"
                            className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className={`px-6 py-2 bg-gradient-to-r ${colorClasses.gradient} text-white rounded-lg font-medium hover:opacity-90 transition-opacity`}>
                            Inscrever
                        </button>
                    </div>
                </Box>
            </Container>
        </Layout>
    );
};

export default ArticlePage;