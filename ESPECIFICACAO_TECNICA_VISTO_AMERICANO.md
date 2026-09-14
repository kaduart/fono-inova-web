# ESPECIFICAÇÃO TÉCNICA — PROJETO VISTO AMERICANO

## 1. Visão Geral

Este documento define a arquitetura técnica do site da assessoria de visto americano, projetado para escalar de 20 para 400+ URLs mantendo performance, SEO técnico e GEO (SEO para IA).

**Objetivos técnicos:**
- Site rápido (Core Web Vitals otimizado).
- SEO técnico automatizado.
- CMS simples para produção de conteúdo em escala.
- Geração dinâmica de landing pages locais e artigos.
- Rastreamento completo de conversões.
- Preparado para Google Search, Google AI Overview, Bing Copilot e ChatGPT Search.

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR/SSG, metadata API, performance, SEO nativo. |
| Linguagem | TypeScript | Tipagem segura para escalabilidade. |
| Estilo | Tailwind CSS | Produtividade e bundle enxuto. |
| UI Components | shadcn/ui | Componentes acessíveis e customizáveis. |
| CMS | Sanity | Headless CMS flexível para artigos e páginas. |
| Banco de dados | PostgreSQL (Vercel Postgres/Neon) | Dados estruturados de leads, cidades, serviços. |
| ORM | Prisma | Modelagem de dados e migrations. |
| Hospedagem | Vercel | Deploy automático, CDN global, edge network. |
| Analytics | Google Analytics 4 + GTM | Rastreamento de eventos e conversões. |
| Search Console | Google + Bing | Indexação e monitoramento. |
| Formulários | React Hook Form + Zod | Validação robusta. |
| WhatsApp | WhatsApp Business API / wa.me | Links com mensagens pré-preenchidas. |
| Imagens | Next.js Image + Cloudinary | Otimização automática e CDN de imagens. |

---

## 3. Estrutura de Pastas Next.js

```
my-app/
├── app/
│   ├── (site)/
│   │   ├── page.tsx                    # Home
│   │   ├── layout.tsx                  # Layout raiz com schemas globais
│   │   ├── sobre/
│   │   │   └── page.tsx
│   │   ├── equipe/
│   │   │   └── page.tsx
│   │   ├── contato/
│   │   │   └── page.tsx
│   │   ├── depoimentos/
│   │   │   └── page.tsx
│   │   ├── casos-de-sucesso/
│   │   │   └── page.tsx
│   │   ├── perguntas-frequentes/
│   │   │   └── page.tsx
│   │   ├── visto-americano/
│   │   │   ├── page.tsx                # Página mãe
│   │   │   ├── turismo/
│   │   │   │   └── page.tsx
│   │   │   ├── negocios/
│   │   │   │   └── page.tsx
│   │   │   ├── estudante/
│   │   │   │   └── page.tsx
│   │   │   ├── renovacao/
│   │   │   │   └── page.tsx
│   │   │   ├── crianca/
│   │   │   │   └── page.tsx
│   │   │   ├── idoso/
│   │   │   │   └── page.tsx
│   │   │   └── familia/
│   │   │       └── page.tsx
│   │   ├── servicos/
│   │   │   └── page.tsx
│   │   ├── processos/
│   │   │   ├── ds160/
│   │   │   ├── documentos/
│   │   │   ├── entrevista/
│   │   │   ├── casv/
│   │   │   └── taxa-mrv/
│   │   ├── cidades/
│   │   │   └── [slug]/                 # Páginas locais dinâmicas
│   │   │       └── page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx                # Listagem
│   │   │   ├── categoria/[slug]/
│   │   │   │   └── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── api/
│   │       ├── leads/
│   │       │   └── route.ts
│   │       └── revalidate/
│   │           └── route.ts
│   ├── layout.tsx
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ui/                             # shadcn/ui
│   ├── seo/
│   │   ├── JsonLd.tsx                  # Injeção de Schema.org
│   │   ├── MetadataBuilder.tsx         # Builder de metadata
│   │   ├── Breadcrumb.tsx
│   │   ├── FaqSchema.tsx
│   │   └── OpenGraphImage.tsx
│   ├── conversion/
│   │   ├── WhatsAppButton.tsx
│   │   ├── ContactForm.tsx
│   │   ├── FloatingCta.tsx
│   │   └── LeadMagnet.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Benefits.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Services.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Faq.tsx
│   │   ├── LocalMap.tsx
│   │   └── FinalCta.tsx
│   └── layout/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── MobileMenu.tsx
├── lib/
│   ├── utils.ts
│   ├── seo/
│   │   ├── schemas.ts
│   │   ├── metadata.ts
│   │   └── constants.ts
│   ├── data/
│   │   ├── services.ts
│   │   ├── cities.ts
│   │   └── navigation.ts
│   └── prisma.ts
├── prisma/
│   └── schema.prisma
├── sanity/
│   ├── schemaTypes/
│   │   ├── post.ts
│   │   ├── author.ts
│   │   ├── category.ts
│   │   ├── page.ts
│   │   └── city.ts
│   ├── lib/
│   │   ├── client.ts
│   │   └── queries.ts
│   └── config.ts
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   ├── hero/
│   │   ├── team/
│   │   └── cities/
│   └── fonts/
├── scripts/
│   ├── generate-city-pages.ts
│   └── generate-sitemap.ts
├── types/
│   ├── seo.ts
│   ├── city.ts
│   ├── service.ts
│   └── lead.ts
├── middleware.ts
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 4. Modelos de Dados

### 4.1 Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Lead {
  id          String   @id @default(cuid())
  name        String
  phone       String
  email       String?
  city        String?
  serviceType String?
  source      String   // página de origem
  status      String   @default("new") // new, contacted, qualified, closed
  message     String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model City {
  id            String   @id @default(cuid())
  slug          String   @unique
  name          String
  state         String
  description   String   @db.Text
  distanceText  String
  neighborhoods String[]
  testimonials  Json?
  faq           Json?
  active        Boolean  @default(true)
  priority      Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Service {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  metaTitle   String
  metaDesc    String
  h1          String
  description String   @db.Text
  icon        String?
  priceFrom   String?
  active      Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 4.2 Sanity Schemas

#### Post (Blog)
```ts
// sanity/schemaTypes/post.ts
export default {
  name: 'post',
  type: 'document',
  title: 'Artigo',
  fields: [
    { name: 'title', type: 'string', title: 'Título' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'metaTitle', type: 'string', title: 'Meta Title' },
    { name: 'metaDescription', type: 'text', title: 'Meta Description' },
    { name: 'excerpt', type: 'text', title: 'Resumo' },
    { name: 'featuredImage', type: 'image', title: 'Imagem Destaque' },
    { name: 'category', type: 'reference', to: [{ type: 'category' }] },
    { name: 'author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'publishedAt', type: 'datetime', title: 'Data de Publicação' },
    { name: 'updatedAt', type: 'datetime', title: 'Data de Atualização' },
    { name: 'content', type: 'array', title: 'Conteúdo', of: [{ type: 'block' }] },
    { name: 'faq', type: 'array', title: 'FAQ', of: [{ type: 'faqItem' }] },
    { name: 'targetKeyword', type: 'string', title: 'Keyword Principal' },
    { name: 'intent', type: 'string', title: 'Intenção', options: { list: ['informacional', 'comercial', 'transacional', 'local'] } },
    { name: 'priority', type: 'string', title: 'Prioridade', options: { list: ['P0', 'P1', 'P2', 'P3'] } },
  ]
}
```

#### Page (Landing Pages genéricas)
```ts
export default {
  name: 'page',
  type: 'document',
  title: 'Página',
  fields: [
    { name: 'title', type: 'string', title: 'Título' },
    { name: 'slug', type: 'slug', title: 'Slug' },
    { name: 'metaTitle', type: 'string', title: 'Meta Title' },
    { name: 'metaDescription', type: 'string', title: 'Meta Description' },
    { name: 'h1', type: 'string', title: 'H1' },
    { name: 'sections', type: 'array', title: 'Seções', of: [{ type: 'pageSection' }] },
    { name: 'faq', type: 'array', title: 'FAQ', of: [{ type: 'faqItem' }] },
    { name: 'schemaType', type: 'string', title: 'Tipo de Schema' },
  ]
}
```

---

## 5. Componentes SEO Reutilizáveis

### 5.1 Metadata Builder

```tsx
// lib/seo/metadata.ts
export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

export function buildMetadata({ title, description, canonical, ogImage }: PageMetadata) {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Assessoria Visto Americano',
      locale: 'pt_BR',
      type: 'website',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
```

### 5.2 Schema.org automatizado

```tsx
// components/seo/JsonLd.tsx
'use client';

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
```

### 5.3 Schemas pré-configurados

```ts
// lib/seo/schemas.ts
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Assessoria Visto Americano Anápolis',
  url: 'https://seudominio.com.br',
  logo: 'https://seudominio.com.br/images/logo.png',
  sameAs: [
    'https://instagram.com/...',
    'https://facebook.com/...',
    'https://linkedin.com/company/...',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55-62-99999-9999',
    contactType: 'customer service',
    availableLanguage: 'Portuguese',
  },
};

export function localBusinessSchema(city: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Assessoria Visto Americano ${city}`,
    image: 'https://seudominio.com.br/images/og-default.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressRegion: 'GO',
      addressCountry: 'BR',
    },
    telephone: '+55-62-99999-9999',
    url: `https://seudominio.com.br/cidades/${slugify(city)}`,
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
  };
}

export function serviceSchema(serviceName: string, city?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: { '@type': 'ProfessionalService', name: 'Assessoria Visto Americano Anápolis' },
    areaServed: city
      ? { '@type': 'City', name: city }
      : { '@type': 'State', name: 'Goiás' },
    description: `Assessoria especializada em ${serviceName} com acompanhamento completo.`,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

---

## 6. Sistema de Metadata Dinâmica

### 6.1 Metadata por tipo de página

```tsx
// app/(site)/visto-americano/page.tsx
import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Visto Americano em Anápolis | Assessoria Especializada 2026',
  description: 'Tire ou renove seu visto americano em Anápolis com assessoria completa. Auxílio no DS-160, documentos e preparação para entrevista.',
  canonical: 'https://seudominio.com.br/visto-americano',
  ogImage: 'https://seudominio.com.br/images/og/visto-americano.jpg',
});
```

### 6.2 Metadata dinâmica para cidades

```tsx
// app/(site)/cidades/[slug]/page.tsx
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { buildMetadata } from '@/lib/seo/metadata';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = await prisma.city.findUnique({ where: { slug: params.slug } });

  if (!city) return {};

  return buildMetadata({
    title: `Visto Americano em ${city.name} | Assessoria Especializada`,
    description: `Assessoria de visto americano em ${city.name}. Atendimento online e presencial. Auxílio no DS-160, documentos e entrevista.`,
    canonical: `https://seudominio.com.br/cidades/${city.slug}`,
  });
}

export async function generateStaticParams() {
  const cities = await prisma.city.findMany({ where: { active: true } });
  return cities.map((city) => ({ slug: city.slug }));
}
```

---

## 7. Sitemap e Robots Dinâmicos

### 7.1 Sitemap.xml

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { getPosts } from '@/sanity/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://seudominio.com.br';

  const cities = await prisma.city.findMany({ where: { active: true } });
  const services = await prisma.service.findMany({ where: { active: true } });
  const posts = await getPosts();

  const staticRoutes = [
    '',
    '/sobre',
    '/equipe',
    '/contato',
    '/depoimentos',
    '/perguntas-frequentes',
    '/visto-americano',
    '/blog',
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/visto-americano/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...cities.map((city) => ({
      url: `${baseUrl}/cidades/${city.slug}`,
      lastModified: city.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug.current}`,
      lastModified: post.updatedAt || post.publishedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
```

### 7.2 Robots.ts

```ts
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/'],
    },
    sitemap: 'https://seudominio.com.br/sitemap.xml',
  };
}
```

---

## 8. Componentes de Conversão

### 8.1 WhatsApp Button

```tsx
// components/conversion/WhatsAppButton.tsx
interface WhatsAppButtonProps {
  message?: string;
  phone?: string;
  variant?: 'primary' | 'outline' | 'floating';
  children?: React.ReactNode;
}

export function WhatsAppButton({
  message = 'Olá! Gostaria de uma consultoria sobre visto americano.',
  phone = '5562999999999',
  variant = 'primary',
  children,
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={/* classes por variant */}
      data-event="whatsapp_click"
    >
      {children || 'Falar no WhatsApp'}
    </a>
  );
}
```

### 8.2 Formulário de Lead

```tsx
// components/conversion/ContactForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  phone: z.string().min(14, 'Telefone inválido'),
  email: z.string().email('Email inválido').optional(),
  city: z.string().optional(),
  serviceType: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({ source }: { source: string }) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await fetch('/api/leads', {
      method: 'POST',
      body: JSON.stringify({ ...data, source }),
    });
    // redirecionar para WhatsApp ou página de agradecimento
  };

  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}
```

### 8.3 Rastreamento de eventos

```tsx
// lib/analytics/events.ts
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

// Eventos principais:
// - whatsapp_click
// - form_submit
// - phone_click
// - page_scroll_75
// - download_checklist
// - time_on_page_60s
```

---

## 9. Configuração de Analytics e Tracking

### 9.1 Google Analytics 4 + GTM

```tsx
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 9.2 Meta Pixel

```tsx
<Script id="meta-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
    fbq('track', 'PageView');
  `}
</Script>
```

---

## 10. Performance e Core Web Vitals

### 10.1 Otimizações obrigatórias

- [ ] Imagens em WebP/AVIF via Next.js Image.
- [ ] Lazy loading em imagens abaixo da dobra.
- [ ] Fontes com `font-display: swap`.
- [ ] CSS crítico inline para hero.
- [ ] JavaScript não essencial carregado com lazy.
- [ ] Cache de páginas estáticas no Vercel.
- [ ] ISR para blog com revalidação a cada hora.
- [ ] Compressão gzip/brotli automática.
- [ ] Preconnect para domínios externos (Google Fonts, Analytics).

### 10.2 Metas de Core Web Vitals

| Métrica | Meta |
|---|---|
| LCP | < 2,5s |
| INP | < 200ms |
| CLS | < 0,1 |
| TTFB | < 600ms |
| FCP | < 1,8s |

---

## 11. Páginas Locais Dinâmicas

### 11.1 Geração automática

Cada cidade no banco de dados gera automaticamente uma URL em `/cidades/[slug]`.

### 11.2 Conteúdo único por cidade

O componente `CityPage` recebe os dados da cidade e renderiza:
- Hero com nome da cidade.
- Contexto local (distância, rodovia, consulado/CASV).
- Bairros atendidos.
- Serviços disponíveis.
- Depoimentos locais.
- FAQ local.
- CTA WhatsApp com mensagem da cidade.

### 11.3 Exemplo de página local

```tsx
// app/(site)/cidades/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { JsonLd } from '@/components/seo/JsonLd';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schemas';

export default async function CityPage({ params }: { params: { slug: string } }) {
  const city = await prisma.city.findUnique({ where: { slug: params.slug } });

  if (!city || !city.active) return notFound();

  const schemas = [
    localBusinessSchema(city.name),
    faqSchema(city.faq || []),
    breadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Cidades', url: '/cidades' },
      { name: city.name, url: `/cidades/${city.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <CityPageTemplate city={city} />
    </>
  );
}
```

---

## 12. Fluxo de Publicação de Conteúdo

### 12.1 Artigo novo

1. Redator cria artigo no Sanity.
2. Define title, slug, meta title, meta description, keyword, intent, priority.
3. Adiciona conteúdo em blocos.
4. Insere FAQ no final.
5. Publica.
6. Next.js regenera a página (ISR).
7. Sitemap atualiza automaticamente.
8. Envia para indexação no Search Console.

### 12.2 Nova cidade

1. Adiciona cidade no Prisma/Admin.
2. Preenche descrição única, distância, bairros, FAQ.
3. Next.js gera página estática em build ou on-demand.
4. Cria post GMB para a cidade.

---

## 13. Deploy e CI/CD

### 13.1 Vercel

- Deploy automático a cada push na branch main.
- Preview deploys para pull requests.
- Variáveis de ambiente:
  - `DATABASE_URL`
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_GA_ID`
  - `NEXT_PUBLIC_META_PIXEL_ID`
  - `WHATSAPP_NUMBER`

### 13.2 Migrations

```bash
npx prisma migrate dev
npx prisma generate
```

### 13.3 Revalidação on-demand

```ts
// app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const path = request.nextUrl.searchParams.get('path');
  if (path) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true });
  }

  return NextResponse.json({ message: 'Path required' }, { status: 400 });
}
```

---

## 14. Backlog Técnico Inicial

### Sprint 1 — Foundation
- [ ] Setup Next.js + Tailwind + shadcn/ui.
- [ ] Configurar Prisma + PostgreSQL.
- [ ] Configurar Sanity CMS.
- [ ] Criar schemas de SEO.
- [ ] Criar componentes base (Header, Footer, Hero, CTA).
- [ ] Configurar GA4 + GTM + Meta Pixel.

### Sprint 2 — Landing Pages P0
- [ ] Home.
- [ ] /visto-americano.
- [ ] /visto-americano/turismo.
- [ ] /visto-americano/renovacao.
- [ ] /visto-americano/negocios.
- [ ] /visto-americano/estudante.

### Sprint 3 — Local SEO
- [ ] Páginas dinâmicas de cidades.
- [ ] Seed de 20 cidades.
- [ ] Schema LocalBusiness por cidade.

### Sprint 4 — Blog + Automação
- [ ] Listagem de blog.
- [ ] Página de artigo.
- [ ] Categorias.
- [ ] ISR e revalidação.
- [ ] Integração com GMB posts (futuro).

---

## 15. Convenções de Código

### Nomenclatura
- Componentes: PascalCase (`Hero.tsx`).
- Hooks: camelCase com prefixo `use` (`useAnalytics.ts`).
- Utilitários: camelCase (`buildMetadata.ts`).
- Páginas Next.js: `page.tsx`, `layout.tsx`.
- Rotas API: `route.ts`.

### SEO
- Titles com máximo 60 caracteres.
- Meta descriptions com máximo 160 caracteres.
- URLs em português, minúsculas, com hífens.
- Uma única H1 por página.
- Hierarquia de headings respeitada (H1 → H2 → H3).
- Imagens com alt text descritivo.

### Performance
- Evitar client components quando não necessário.
- Usar Server Components por padrão.
- Fetch com cache quando apropriado.
- Lazy load de componentes pesados.

---

## 16. Variáveis de Ambiente

```env
# Database
DATABASE_URL="postgresql://..."

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="..."
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="..."

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GTM_ID="GTM-XXXXXX"
NEXT_PUBLIC_META_PIXEL_ID="XXXXXXXXXX"

# Business
NEXT_PUBLIC_WHATSAPP_NUMBER="5562999999999"
NEXT_PUBLIC_SITE_URL="https://seudominio.com.br"

# Revalidation
REVALIDATE_SECRET="..."
```

---

## 17. Próximos Passos

1. Criar repositório no GitHub.
2. Fazer setup inicial do Next.js.
3. Configurar banco de dados e Sanity.
4. Implementar componentes SEO base.
5. Criar as 5 landing pages P0.
6. Configurar Google Business Profile.
7. Publicar e indexar.
