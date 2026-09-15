import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Award,
  Calendar,
  Clock,
  Facebook,
  Globe,
  Instagram,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Youtube,
} from 'lucide-react';
import ButtonWhatsApp from '../components/ui/ButtonWhatsapp.jsx';
import { CONTACT } from '../constants/index.js';
import { trackButtonClick, trackSocialMediaClick } from '../hooks/useAnalytics';

// Lucide não tem o glifo da marca do TikTok — SVG inline, mesmo padrão usado pro ícone do WhatsApp no site
const TikTokIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.6 5.82c-.86-.94-1.34-2.16-1.34-3.42h-3.14v13.44c0 1.54-1.25 2.79-2.79 2.79a2.79 2.79 0 0 1-2.79-2.79 2.79 2.79 0 0 1 2.79-2.79c.29 0 .56.05.82.13V9.98a6.02 6.02 0 0 0-.82-.06 6 6 0 0 0-6 6 6 6 0 0 0 6 6 6 6 0 0 0 6-6V8.32a9.3 9.3 0 0 0 5.43 1.74V6.92a5.58 5.58 0 0 1-4.16-1.1Z" />
  </svg>
);

const WHATSAPP_MESSAGE =
  "Oi! Vi o link do Instagram da Fono Inova e queria saber mais sobre o atendimento. Pode me orientar?";

const MAPS_QUERY = encodeURIComponent('Av. Minas Gerais, 405, Jundiaí, Anápolis - GO');

const CONVENIOS = [
  {
    label: 'Base Aérea de Anápolis (BAAN)',
    href: '/convenio-base-aerea-anapolis',
    source: 'links_bio_convenios_baan',
    available: true,
  },
  {
    label: 'GEAP',
    href: '/convenio-geap-anapolis',
    source: 'links_bio_convenios_geap',
    available: true,
  },
  {
    label: 'IPASGO',
    href: null,
    source: 'links_bio_convenios_ipasgo',
    available: false,
  },
];

const LINKS = [
  {
    label: 'Visitar nosso site',
    href: '/',
    icon: Globe,
    external: false,
    source: 'links_bio_website',
  },
  {
    label: 'Conheça nossas especialidades',
    href: '/#services',
    icon: Award,
    external: false,
    source: 'links_bio_home',
  },
  {
    label: 'Como chegar até nós',
    href: `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`,
    icon: MapPin,
    external: true,
    source: 'links_bio_maps',
  },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/clinicafonoinova', icon: Instagram, platform: 'Instagram' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@clinica.fono.inova', icon: TikTokIcon, platform: 'TikTok' },
  { label: 'Facebook', href: 'https://www.facebook.com/people/Cl%C3%ADnica-Fono-Inova/61575031024483/', icon: Facebook, platform: 'Facebook' },
  { label: 'YouTube', href: 'https://www.youtube.com/clinicafonoinova', icon: Youtube, platform: 'YouTube' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

const LinksBio = () => {
  const [conveniosOpen, setConveniosOpen] = useState(false);

  useEffect(() => {
    if (!conveniosOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setConveniosOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [conveniosOpen]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/40 to-cyan-50/30 px-4 py-16">
      <Helmet>
        <title>Clínica Fono Inova — Links</title>
        <meta
          name="description"
          content="Fale no WhatsApp, conheça nossas especialidades, veja como chegar e siga a Fono Inova nas redes sociais."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.clinicafonoinova.com.br/links" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Foto de fundo - criança em atendimento, clima acolhedor/premium */}
      <img
        src="/images/fono-inova-1.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/10 to-teal-50/40" />

      {/* Blobs decorativos, mesmo tratamento do Hero institucional */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-teal-200/30 to-cyan-200/20 rounded-full blur-3xl opacity-70" />
      <div className="absolute top-1/2 -left-24 w-[420px] h-[420px] bg-gradient-to-tr from-amber-200/30 to-orange-200/20 rounded-full blur-3xl opacity-60" />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center">
        <motion.div
          {...fadeUp(0)}
          className="flex flex-col items-center rounded-[2rem] bg-white/95 px-6 py-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.1)] backdrop-blur-md"
        >
          <div className="h-20 w-20 overflow-hidden rounded-full bg-primary shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
            <img
              src="/images/logos/fono-inova-icon-clean.png"
              alt="Clínica Fono Inova"
              className="h-full w-full object-cover"
            />
          </div>

          <h1
            className="mt-5 text-3xl font-bold text-slate-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Clínica Fono Inova
          </h1>
          <span className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Integrar e Transformar
          </span>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
            Cuidar da comunicação, do movimento e da mente com amor e ciência.
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span>4.9 no Google • +500 famílias atendidas</span>
          </div>
        </motion.div>

        <div className="mt-8 flex w-full flex-col gap-4">
          <motion.div {...fadeUp(0.15)}>
            <ButtonWhatsApp
              onClick={() => trackButtonClick('Links Bio - WhatsApp Principal')}
              message={WHATSAPP_MESSAGE}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] hover:bg-green-700 hover:shadow-xl active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" />
              Falar no WhatsApp
            </ButtonWhatsApp>
          </motion.div>

          <motion.a
            {...fadeUp(0.2)}
            href="tel:6237063924"
            onClick={() => trackButtonClick('Links Bio - Ligar')}
            className="group flex w-full items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md active:scale-[0.98]"
          >
            <Calendar className="h-4 w-4 shrink-0 text-primary" />
            <span className="flex-1 text-left">Agendar por telefone: (62) 3706-3924</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>

          {/* Fonoaudiologia é a especialidade de maior procura — recebe destaque próprio, acima dos demais links */}
          <motion.a
            {...fadeUp(0.22)}
            href="/fonoaudiologia-anapolis"
            onClick={() => trackButtonClick('links_bio_fono_destaque')}
            className="group flex w-full items-center gap-4 overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-white to-white p-1 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md active:scale-[0.98]"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
              <img
                src="/images/fonoaudiologia/fono1.jpg"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 py-2 pr-3 text-left">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                <Sparkles className="h-3 w-3" />
                Fonoaudiologia Infantil
              </span>
              <p className="mt-0.5 text-xs leading-snug text-slate-600">
                Atraso na fala, troca de sons, comunicação, linguagem e desenvolvimento.
              </p>
              <span className="mt-1 inline-block text-xs font-semibold text-primary">
                → Agendar avaliação de Fono
              </span>
            </div>
          </motion.a>

          {/* Neuropediatria é o outro pilar de alta procura (autismo, TDAH, atraso no desenvolvimento) */}
          <motion.a
            {...fadeUp(0.27)}
            href="/neuropediatra-anapolis"
            onClick={() => trackButtonClick('links_bio_neuropediatria_destaque')}
            className="group flex w-full items-center gap-4 overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-white to-white p-1 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md active:scale-[0.98]"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
              <img
                src="/images/neuropsicologia/neuro.jpeg"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 py-2 pr-3 text-left">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                <Sparkles className="h-3 w-3" />
                Neuropediatria
              </span>
              <p className="mt-0.5 text-xs leading-snug text-slate-600">
                Autismo, TDAH, atraso no desenvolvimento e avaliação neurológica infantil.
              </p>
              <span className="mt-1 inline-block text-xs font-semibold text-primary">
                → Agendar avaliação com Neuropediatra
              </span>
            </div>
          </motion.a>

          {/* Convênios: um único botão que abre modal, em vez de um link por convênio (evita poluir a página) */}
          <motion.button
            {...fadeUp(0.32)}
            type="button"
            onClick={() => {
              trackButtonClick('links_bio_convenios_abrir');
              setConveniosOpen(true);
            }}
            className="group flex w-full items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md active:scale-[0.98]"
          >
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
            <span className="flex-1 text-left">Convênios (BAAN, GEAP e mais)</span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.button>

          {LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              {...fadeUp(0.38 + i * 0.08)}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              onClick={() => trackButtonClick(link.source)}
              className="group flex w-full items-center gap-3 rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md active:scale-[0.98]"
            >
              <link.icon className="h-4 w-4 shrink-0 text-primary" />
              <span className="flex-1 text-left">{link.label}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          ))}

          <motion.div {...fadeUp(0.38 + LINKS.length * 0.08)} className="mt-2 flex justify-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialMediaClick(social.platform)}
                aria-label={social.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-md"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>

        <p className="mt-10 max-w-xs text-center text-xs leading-relaxed text-slate-500">
          Transformando o desenvolvimento infantil com acolhimento e conhecimento.
        </p>

        <p className="mt-3 text-center text-xs leading-relaxed text-slate-400">
          {CONTACT.ADDRESS} • Bairro Jundiaí
          <br />
          Clínica Fono Inova © {new Date().getFullYear()}
        </p>
      </div>

      <AnimatePresence>
        {conveniosOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 backdrop-blur-sm sm:items-center"
            onClick={() => setConveniosOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="convenios-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-sm rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 id="convenios-modal-title" className="text-lg font-bold text-slate-900">
                  Convênios atendidos
                </h2>
                <button
                  type="button"
                  onClick={() => setConveniosOpen(false)}
                  aria-label="Fechar"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {CONVENIOS.map((convenio) =>
                  convenio.available ? (
                    <a
                      key={convenio.label}
                      href={convenio.href}
                      onClick={() => trackButtonClick(convenio.source)}
                      className="group flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:border-primary/30 hover:bg-primary/5"
                    >
                      <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
                      <span className="flex-1 text-left">{convenio.label}</span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <div
                      key={convenio.label}
                      className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-200 px-4 py-3.5 text-sm font-semibold text-slate-400"
                    >
                      <Clock className="h-4 w-4 shrink-0" />
                      <span className="flex-1 text-left">{convenio.label}</span>
                      <span className="text-xs font-medium uppercase tracking-wide">Em breve</span>
                    </div>
                  )
                )}
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                Não encontrou seu convênio? Fale com a gente pelo WhatsApp e confirmamos a cobertura.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LinksBio;
