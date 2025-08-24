// components/ArticleCard.jsx
import { Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className={`text-sm font-semibold mb-2 text-${article.categoryColor}`}>
          {article.category}
        </div>
        <h3 className="font-bold text-xl mb-3">{article.title}</h3>
        <p className="text-muted-foreground mb-4 flex-grow">{article.excerpt}</p>
        <Button 
          variant="outline" 
          className="w-full"
          component={Link}
          to={`/artigos/${article.slug}`}
        >
          Ler Artigo
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;