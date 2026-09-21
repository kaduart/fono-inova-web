import { AlertCircle, ArrowDown, ArrowRight, Bell, ClipboardList, Info, Loader2, MapPin, Users } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';
import Layout from './Layout/index.jsx';
import SEO from './SEO.jsx';
import ButtonWhatsApp from './ui/ButtonWhatsapp.jsx';
import { sendWaitlistToCRM } from '../services/crmAnalyticsApi';
import { trackButtonClick, trackEvent } from '../hooks/useAnalytics';

// Versão do texto de consentimento exibido abaixo. Se o texto mudar, publicar nova versão aqui E no backend
// (WAITLIST_CONSENT_VERSIONS em crm/back/constants/convenioWaitlist.js) — o backend rejeita versões desconhecidas.
export const CONSENT_VERSION = 'convenio-interesse-2026-09';

type ConvenioInteresseProps = {
  nome: string;
  slug: string;
  path: string;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  especialidade: string;
  idade: string;
  periodo: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMPTY_FORM: FormState = { name: '', phone: '', email: '', especialidade: '', idade: '', periodo: '', consent: false };

const ESPECIALIDADES = [
  'Fonoaudiologia',
  'Psicologia infantil',
  'Terapia Ocupacional',
  'Fisioterapia',
  'Psicopedagogia',
  'Neuropediatria',
  'Ainda não sei / preciso de orientação',
];

const PERIODOS = ['Manhã', 'Tarde', 'Sem preferência'];

// Imagens ilustrativas (geradas por IA, sem logos nem texto) — cada convênio tem a sua. `base` aponta para
// public/images/convenios/<base>-800.webp e -1600.webp. Nenhuma imagem sugere credenciamento ou marca de plano.
const HERO_IMAGES: Record<string, { base: string; alt: string }> = {
  geap: {
    base: '/images/convenios/geap-interesse',
    alt: 'Mãe e filha brincando com blocos de madeira em uma sala de brincar acolhedora',
  },
  ipasgo: {
    base: '/images/convenios/ipasgo-interesse',
    alt: 'Terapeuta e criança explorando materiais sensoriais em uma sala de terapia lúdica',
  },
  bradesco: {
    base: '/images/convenios/bradesco-interesse',
    alt: 'Pai e filho entrando de mãos dadas em uma recepção acolhedora',
  },
};

const steps = [
  {
    icon: ClipboardList,
    title: 'Você registra seu interesse',
    description: 'Informe seus dados, a especialidade que procura e a idade da criança.',
  },
  {
    icon: Users,
    title: 'Guardamos seu cadastro',
    description: 'Seu interesse entra na lista de interesse do plano com a nossa equipe.',
  },
  {
    icon: Bell,
    title: 'Avisamos se for concluído',
    description:
      'Se o credenciamento for concluído e o seu produto estiver elegível, nossa equipe entra em contato com você.',
  },
];

// Mensagens de validação do backend (utils/convenioWaitlistPayload.js) que pertencem a um campo do formulário:
// aparecem embaixo do campo, como os erros locais. Qualquer outra mensagem 4xx vai para o aviso vermelho.
const SERVER_FIELD_ERRORS: Record<string, { field: keyof FormState; inputId: string }> = {
  'Nome inválido': { field: 'name', inputId: 'interesse-nome' },
  'Telefone inválido': { field: 'phone', inputId: 'interesse-telefone' },
  'E-mail inválido': { field: 'email', inputId: 'interesse-email' },
};

const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  if (numbers.length <= 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }
  return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
};

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border-2 px-4 py-3 text-base text-slate-900 transition-all focus:outline-none focus:ring-4 focus:ring-green-100 ${
    hasError ? 'border-red-400' : 'border-slate-200 focus:border-green-500'
  }`;

const ConvenioInteresse = ({ nome, slug, path }: ConvenioInteresseProps) => {
  const navigate = useNavigate();
  const heroImage = HERO_IMAGES[slug];
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const whatsappBase = `Oi! Sou beneficiário(a) do ${nome} e gostaria de registrar meu interesse para ser avisado(a) caso o credenciamento seja concluído na Fono Inova.`;
  const whatsappFallback = form.name || form.phone ? `${whatsappBase}\n\nNome: ${form.name}\nTelefone: ${form.phone}` : whatsappBase;

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    if (status === 'error') {
      setStatus('idle');
      setServerMessage(null);
    }
  };

  const validate = () => {
    const next: FormErrors = {};
    if (form.name.trim().length < 3) next.name = 'Informe seu nome completo';
    if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Informe um telefone válido com DDD';
    // e-mail é opcional: só valida o formato quando preenchido
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Informe um e-mail válido';
    if (!form.consent) next.consent = 'Para registrar seu interesse, é preciso aceitar o contato e a política de privacidade';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Botão do topo: leva até o formulário e já coloca o cursor no nome
  const goToForm = () => {
    trackButtonClick(`Interesse ${nome} - CTA topo`);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), 600);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === 'sending' || !validate()) return;

    setStatus('sending');
    setServerMessage(null);

    const result = await sendWaitlistToCRM({
      name: form.name.trim(),
      phone: form.phone,
      email: form.email.trim(),
      convenio: slug,
      especialidade: form.especialidade,
      idadeCrianca: form.idade,
      periodo: form.periodo,
      consent: { accepted: true, version: CONSENT_VERSION },
    });

    if (result?.success) {
      trackEvent('convenio_interest_signup', 'Lead Generation', nome);
      navigate(`/lista-de-interesse-confirmada?plano=${encodeURIComponent(nome)}`);
      return;
    }

    // Mensagem do backend sobre um campo (ex.: DDD inexistente): mostra no campo e devolve o foco
    const fieldError = result?.message ? SERVER_FIELD_ERRORS[result.message] : undefined;
    if (fieldError && result?.message) {
      setErrors((prev) => ({ ...prev, [fieldError.field]: result.message }));
      setStatus('idle');
      document.getElementById(fieldError.inputId)?.focus();
      return;
    }

    setServerMessage(result?.message || null);
    setStatus('error');
  };

  return (
    <Layout>
      <SEO
        title={`Convênio ${nome}: credenciamento em andamento | Fono Inova`}
        description={`Estamos em processo de credenciamento com o ${nome}. Registre seu interesse; entramos em contato somente se o credenciamento for concluído e o seu produto estiver elegível.`}
        url={`https://www.clinicafonoinova.com.br${path}`}
        type="website"
        noindex
      />

      <Breadcrumb items={[{ label: 'Convênios', href: '/' }, { label: nome }]} />

      <section className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/40 to-cyan-50/30" />
        <div className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-teal-200/30 to-cyan-200/20 blur-3xl opacity-70" />

        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
              Credenciamento em andamento
            </span>

            <h1 className="text-4xl font-bold leading-tight text-slate-900 font-poppins md:text-5xl">
              Convênio {nome}: credenciamento em andamento
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600">
              Estamos em processo de credenciamento com o <strong className="text-slate-900">{nome}</strong>. Se você é
              beneficiário e procura atendimento infantil em Anápolis, registre seu interesse. Entraremos em contato
              somente se o credenciamento for concluído e o seu produto estiver elegível para atendimento na clínica.
            </p>

            <button
              type="button"
              onClick={goToForm}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl"
            >
              Entrar na lista de interesse
              <ArrowDown className="h-5 w-5" />
            </button>
          </div>

          {heroImage && (
            <figure className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl shadow-2xl ring-1 ring-slate-900/5">
              <img
                src={`${heroImage.base}-1600.webp`}
                srcSet={`${heroImage.base}-800.webp 800w, ${heroImage.base}-1600.webp 1600w`}
                sizes="(min-width: 1024px) 896px, 100vw"
                alt={heroImage.alt}
                width={1600}
                height={905}
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
            </figure>
          )}

          <form
            ref={formRef}
            id="registrar-interesse"
            onSubmit={handleSubmit}
            noValidate
            className="mx-auto mt-10 max-w-xl scroll-mt-24 space-y-4 rounded-3xl border border-slate-100 bg-white p-6 text-left shadow-xl md:p-8"
          >
            <h2 className="text-xl font-bold text-slate-900">Registrar interesse</h2>

            <div>
              <label htmlFor="interesse-nome" className="mb-1.5 block text-sm font-semibold text-slate-800">
                Nome completo
              </label>
              <input
                ref={nameRef}
                id="interesse-nome"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'interesse-nome-erro' : undefined}
                className={inputClass(Boolean(errors.name))}
              />
              {errors.name && (
                <p id="interesse-nome-erro" role="alert" className="mt-1 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="interesse-telefone" className="mb-1.5 block text-sm font-semibold text-slate-800">
                  Telefone / WhatsApp
                </label>
                <input
                  id="interesse-telefone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(62) 99999-9999"
                  value={form.phone}
                  onChange={(e) => setField('phone', formatPhone(e.target.value))}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'interesse-telefone-erro' : undefined}
                  className={inputClass(Boolean(errors.phone))}
                />
                {errors.phone && (
                  <p id="interesse-telefone-erro" role="alert" className="mt-1 text-sm text-red-600">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="interesse-email" className="mb-1.5 block text-sm font-semibold text-slate-800">
                  E-mail <span className="font-normal text-slate-400">(opcional)</span>
                </label>
                <input
                  id="interesse-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField('email', e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'interesse-email-erro' : undefined}
                  className={inputClass(Boolean(errors.email))}
                />
                {errors.email && (
                  <p id="interesse-email-erro" role="alert" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="interesse-especialidade" className="mb-1.5 block text-sm font-semibold text-slate-800">
                Especialidade que você procura <span className="font-normal text-slate-400">(opcional)</span>
              </label>
              <select
                id="interesse-especialidade"
                value={form.especialidade}
                onChange={(e) => setField('especialidade', e.target.value)}
                className={inputClass(false)}
              >
                <option value="">Selecione</option>
                {ESPECIALIDADES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="interesse-idade" className="mb-1.5 block text-sm font-semibold text-slate-800">
                  Idade da criança <span className="font-normal text-slate-400">(opcional)</span>
                </label>
                <input
                  id="interesse-idade"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  max={18}
                  placeholder="Ex.: 4"
                  value={form.idade}
                  onChange={(e) => setField('idade', e.target.value)}
                  className={inputClass(false)}
                />
              </div>

              <div>
                <label htmlFor="interesse-periodo" className="mb-1.5 block text-sm font-semibold text-slate-800">
                  Período preferido <span className="font-normal text-slate-400">(opcional)</span>
                </label>
                <select
                  id="interesse-periodo"
                  value={form.periodo}
                  onChange={(e) => setField('periodo', e.target.value)}
                  className={inputClass(false)}
                >
                  <option value="">Selecione</option>
                  {PERIODOS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="interesse-consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
                <input
                  id="interesse-consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setField('consent', e.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? 'interesse-consent-erro' : undefined}
                  className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 accent-green-600"
                />
                <span>
                  Autorizo a Clínica Fono Inova a entrar em contato comigo por telefone, WhatsApp ou e-mail sobre este
                  cadastro de interesse e li a{' '}
                  <Link to="/privacidade" target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                    política de privacidade
                  </Link>
                  .
                </span>
              </label>
              {errors.consent && (
                <p id="interesse-consent-erro" role="alert" className="mt-1 text-sm text-red-600">
                  {errors.consent}
                </p>
              )}
            </div>

            {status === 'error' && (
              <div role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-semibold">{serverMessage || 'Não conseguimos registrar seu interesse agora.'}</p>
                  <p>
                    Seus dados foram mantidos aqui. Tente novamente ou{' '}
                    <a
                      href={`https://wa.me/5562992013573?text=${encodeURIComponent(whatsappFallback)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold underline"
                    >
                      fale com a equipe pelo WhatsApp
                    </a>
                    .
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Registrar interesse'
              )}
            </button>

            <p className="flex items-start gap-2 text-sm text-slate-500">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                O cadastro não garante cobertura ou vaga. O atendimento pelo plano depende da conclusão do
                credenciamento, do produto contratado, da elegibilidade do beneficiário, da autorização do plano e da
                disponibilidade de agenda.
              </span>
            </p>
          </form>

          <div className="mx-auto mt-6 max-w-xl text-center">
            <ButtonWhatsApp
              onClick={() => trackButtonClick(`WhatsApp Interesse ${nome}`)}
              className="mx-auto flex items-center justify-center gap-2 rounded-xl border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
              message={whatsappBase}
            >
              Prefiro falar com a equipe no WhatsApp
            </ButtonWhatsApp>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-900 font-poppins md:text-3xl">
            Como funciona a lista de interesse
          </h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <div className="mb-2 flex items-center justify-center gap-2 text-slate-600">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="font-medium">Clínica Fono Inova — Av. Minas Gerais, 405, Jundiaí, Anápolis</span>
          </div>
          <Link
            to="/#services"
            className="mt-2 inline-flex items-center gap-1 font-semibold text-primary hover:underline"
          >
            Conheça nossas especialidades
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ConvenioInteresse;
