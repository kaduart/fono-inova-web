import { Navigate, useLocation } from 'react-router-dom';

// Redireciona sem perder ?gclid, ?utm_* e #hash. Um <Navigate> simples descarta a query,
// e aí o Google Ads e o GA4 perdem a origem do clique.
export default function RedirectKeepQuery({ to }) {
  const { search, hash } = useLocation();
  return <Navigate to={`${to}${search}${hash}`} replace />;
}
