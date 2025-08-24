// pages/Article.jsx
import { Article, Home } from '@mui/icons-material';
import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material';
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

    return (
        <Layout>
            <Container maxWidth="lg" className="py-8 mt-16">
                {/* Breadcrumb */}
                <Breadcrumbs aria-label="breadcrumb" className="mb-6">
                    <Link color="inherit" href="/" className="flex items-center">
                        <Home className="mr-1" fontSize="small" />
                        Home
                    </Link>
                    <Link color="inherit" href="/artigos" className="flex items-center">
                        <Article className="mr-1" fontSize="small" />
                        Artigos
                    </Link>
                    <Typography color="textPrimary">{article.title}</Typography>
                </Breadcrumbs>

                {/* Cabeçalho do artigo */}
                <Box className="mb-8">
                    <Typography variant="overline" color="primary" className="font-semibold">
                        {article.category}
                    </Typography>
                    <Typography variant="h2" component="h1" className="font-poppins font-bold my-3">
                        {article.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Por {article.author} • {article.date}
                    </Typography>
                </Box>

                {/* Imagem destacada */}
                <Box className="mb-8 rounded-lg overflow-hidden">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-96 object-cover"
                    />
                </Box>

                {/* Conteúdo do artigo */}
                <Box className="prose prose-lg max-w-none">
                    {article.content}
                </Box>

                {/* Compartilhamento */}
                <Box className="mt-12 pt-8 border-t border-gray-200">
                    <Typography variant="h6" className="mb-4">Compartilhe este artigo:</Typography>
                    <div className="flex space-x-4">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Facebook
                        </a>
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="bg-blue-400 text-white px-4 py-2 rounded-lg">
                            Twitter
                        </a>
                        <a href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`}
                            target="_blank" rel="noopener noreferrer"
                            className="bg-green-500 text-white px-4 py-2 rounded-lg">
                            WhatsApp
                        </a>
                    </div>
                </Box>
                <SEO
                    title={article.title}
                    description={article.excerpt}
                    keywords={`${article.category}, desenvolvimento infantil, ${article.title.toLowerCase()}`}
                    image={article.image}
                    url={`https://www.clinicafonoinova.com.br/artigos/${article.slug}`}
                    type="article"
                />
            </Container>
        </Layout>
    );
};

export default ArticlePage;