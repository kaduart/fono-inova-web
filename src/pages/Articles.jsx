// pages/Articles.jsx
import { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import Layout from '../components/Layout';
import ArticleCard from '../components/ArticleCard';
import SEO from '../components/SEO';
import { articlesData } from '../data/articlesData';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setArticles(articlesData);
  }, []);

  return (
    <Layout>
      <SEO
        title="Artigos sobre Desenvolvimento Infantil"
        description="Confira nossos conteúdos exclusivos sobre fonoaudiologia, psicologia e terapias infantis em Anápolis."
        keywords="artigos fonoaudiologia, desenvolvimento infantil, blog clinica fono inova, dicas pais anapolis"
        url="/artigos"
      />
      <Container maxWidth="lg" className="py-16 mt-16">
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h1" className="font-poppins font-bold mb-4">
            Artigos sobre <span className="text-accent">Desenvolvimento Infantil</span>
          </Typography>
          <Typography variant="h6" color="textSecondary" className="max-w-2xl mx-auto">
            Confira nossos conteúdos exclusivos sobre terapias e desenvolvimento infantil.
          </Typography>
        </Box>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="h-full">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default Articles;