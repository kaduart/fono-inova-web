/**
 * /agendar — agendamento online pelo link da bio do Instagram.
 * Fala com a API pública do ERP (/api/public/booking). A família escolhe só DIA + PERÍODO
 * (regra da clínica: horário genérico); a secretária confirma o horário exato no WhatsApp.
 * Se a API estiver desligada ou fora do ar, a página vira um botão de WhatsApp.
 * Doc do back: docs/flows/public_booking_flow.md (repo fono-inova-crm-back).
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, CalendarCheck, CheckCircle2, Loader2, MessageCircle, Moon, ShieldCheck, Sun } from 'lucide-react';
import SEO from '../components/SEO.jsx';
import { CONTACT, getCRMApiUrl } from '../constants/index.js';
import { trackButtonClick, trackFormSubmission } from '../hooks/useAnalytics';
import { trackMetaEvent, trackWhatsAppContact } from '../helper/metaPixel.js';

const API = '/api/public/booking';
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
const EVALUATION_PRICE = 'R$ 220';

const SPECIALTIES = [
  { value: 'fonoaudiologia', label: 'Fonoaudiologia', hint: 'fala, linguagem, voz, alimentação' },
  { value: 'psicologia', label: 'Psicologia infantil', hint: 'comportamento, emoções, TEA, TDAH' },
  { value: 'terapia_ocupacional', label: 'Terapia ocupacional', hint: 'sensorial, coordenação, autonomia' },
  { value: 'neuropsicologia', label: 'Neuropsicologia', hint: 'avaliação de atenção, memória, aprendizagem' },
  { value: 'psicopedagogia', label: 'Psicopedagogia', hint: 'dificuldade escolar, leitura e escrita' },
  { value: 'fisioterapia', label: 'Fisioterapia infantil', hint: 'desenvolvimento motor' },
];

type Period = 'manha' | 'tarde';
type DayOption = { date: string; label: string; periods: { period: Period; available: boolean }[] };
type Step = 'especialidade' | 'quando' | 'dados' | 'pronto' | 'indisponivel';

const PERIOD_LABEL: Record<Period, string> = { manha: 'Manhã', tarde: 'Tarde' };

function utmFromUrl() {
  const p = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const k of ['source', 'medium', 'campaign', 'content']) {
    const v = p.get(`utm_${k}`);
    if (v) utm[k] = v;
  }
  if (!utm.source) utm.source = 'instagram';
  if (!utm.medium) utm.medium = 'bio';
  return utm;
}

function whatsappUrl(text: string) {
  return `${CONTACT.WHATSAPP_LINK}?text=${encodeURIComponent(text)}`;
}

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
}

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

function useTurnstile(active: boolean) {
  const ref = useRef<HTMLDivElement | null>(null);
  const widgetId = useRef<string | null>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (!active || !TURNSTILE_SITE_KEY || !ref.current) return;
    const render = () => {
      if (!window.turnstile || !ref.current || widgetId.current) return;
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: TURNSTILE_SITE_KEY,
        language: 'pt-br',
        callback: (t: string) => setToken(t),
        'expired-callback': () => setToken(''),
      });
    };
    if (window.turnstile) {
      render();
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    s.async = true;
    s.onload = render;
    document.head.appendChild(s);
  }, [active]);

  const reset = () => {
    setToken('');
    if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current);
  };

  return { ref, token, ready: !TURNSTILE_SITE_KEY || Boolean(token), reset };
}

const Agendar = () => {
  const base = getCRMApiUrl();
  const utm = useMemo(utmFromUrl, []);
  const [step, setStep] = useState<Step>(base ? 'especialidade' : 'indisponivel');
  const [specialty, setSpecialty] = useState('');
  const [days, setDays] = useState<DayOption[]>([]);
  const [loadingDays, setLoadingDays] = useState(false);
  const [date, setDate] = useState('');
  const [period, setPeriod] = useState<Period | ''>('');
  const [form, setForm] = useState({ childName: '', birthDate: '', responsibleName: '', phone: '', consent: false, website: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ code: string; display: string } | null>(null);
  const captcha = useTurnstile(step === 'dados');

  const specialtyLabel = SPECIALTIES.find((s) => s.value === specialty)?.label || '';

  async function loadDays(spec: string) {
    setLoadingDays(true);
    setNotice('');
    try {
      const r = await fetch(`${base}${API}/options?specialty=${encodeURIComponent(spec)}&days=10`);
      if (r.status === 503) {
        setStep('indisponivel');
        return;
      }
      const json = await r.json();
      if (!r.ok) throw new Error(json?.message || 'erro');
      setDays(json.days || []);
    } catch {
      setStep('indisponivel');
    } finally {
      setLoadingDays(false);
    }
  }

  function chooseSpecialty(value: string) {
    setSpecialty(value);
    setDate('');
    setPeriod('');
    setStep('quando');
    trackButtonClick(`Agendar - especialidade ${value}`);
    loadDays(value);
  }

  function choosePeriod(d: string, p: Period) {
    setDate(d);
    setPeriod(p);
    setNotice('');
    setStep('dados');
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    const local: Record<string, string> = {};
    if (form.childName.trim().split(/\s+/).length < 2) local.childName = 'Informe nome e sobrenome da criança.';
    if (!form.birthDate) local.birthDate = 'Informe a data de nascimento.';
    if (form.responsibleName.trim().length < 3) local.responsibleName = 'Informe o nome do responsável.';
    if (form.phone.replace(/\D/g, '').length < 10) local.phone = 'Informe um WhatsApp com DDD.';
    if (!form.consent) local.consent = 'Marque a autorização para seguirmos com o agendamento.';
    setErrors(local);
    if (Object.keys(local).length) return;

    setSending(true);
    setNotice('');
    try {
      const r = await fetch(`${base}${API}/hold`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          specialty,
          date,
          period,
          child: { fullName: form.childName.trim(), birthDate: form.birthDate },
          responsible: { name: form.responsibleName.trim(), phone: form.phone },
          consentLgpd: form.consent,
          utm,
          captchaToken: captcha.token,
          website: form.website,
        }),
      });
      const json = await r.json().catch(() => ({}));

      if (r.status === 201) {
        setResult({ code: json.code, display: json.display });
        setStep('pronto');
        trackFormSubmission('Agendamento online');
        trackMetaEvent('Schedule', { content_name: specialty });
        return;
      }
      if (r.status === 409) {
        setNotice(json.message || 'Esse período acabou de lotar. Escolha outro.');
        setPeriod('');
        setStep('quando');
        loadDays(specialty);
        return;
      }
      if (r.status === 400 && json.fields) {
        const map: Record<string, string> = {};
        for (const [k, v] of Object.entries(json.fields as Record<string, string>)) map[k === 'consentLgpd' ? 'consent' : k] = v;
        setErrors(map);
        if (map.date || map.period || map.specialty) setStep('quando');
        return;
      }
      if (r.status === 503 && json.error === 'DISABLED') {
        setStep('indisponivel');
        return;
      }
      setNotice(json.message || 'Não conseguimos reservar agora. Fale com a gente no WhatsApp.');
      captcha.reset();
    } catch {
      setNotice('Sem conexão. Tente de novo ou fale com a gente no WhatsApp.');
    } finally {
      setSending(false);
    }
  }

  const whatsappText = result
    ? `Oi! Fiz a reserva ${result.code} pelo site (${specialtyLabel}, ${result.display}). Pode confirmar o horário?`
    : `Oi! Vim pelo Instagram e quero agendar uma avaliação${specialtyLabel ? ` de ${specialtyLabel}` : ''}.`;

  const input = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20';
  const errText = (k: string) => (errors[k] ? <p className="mt-1 text-sm text-red-700">{errors[k]}</p> : null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/40 to-cyan-50/30 px-4 py-8">
      <SEO
        title="Agendar avaliação | Fono Inova Anápolis"
        description="Escolha o dia e o período da avaliação da criança na Clínica Fono Inova, em Anápolis."
        url="https://www.clinicafonoinova.com.br/agendar"
        type="website"
        noindex
      />

      <main className="mx-auto w-full max-w-md">
        <header className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Clínica Fono Inova</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Agende a avaliação da criança</h1>
        </header>

        {step !== 'indisponivel' && step !== 'pronto' && (
          <ol className="mb-5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500" aria-label="Etapas">
            {(['especialidade', 'quando', 'dados'] as Step[]).map((s, i) => (
              <li key={s} className={`rounded-full px-3 py-1 ${step === s ? 'bg-teal-600 text-white' : 'bg-white'}`}>
                {i + 1}. {s === 'especialidade' ? 'Para quê' : s === 'quando' ? 'Quando' : 'Seus dados'}
              </li>
            ))}
          </ol>
        )}

        <section className="rounded-3xl bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
          {step === 'especialidade' && (
            <div>
              <p className="text-sm leading-relaxed text-slate-600">
                Na avaliação, a especialista conhece a criança, entende o que preocupa a família e indica o caminho do
                cuidado. Você sai com orientação clara sobre os próximos passos.
              </p>
              <h2 className="mt-5 text-base font-bold text-slate-900">Qual área você procura?</h2>
              <div className="mt-3 flex flex-col gap-2">
                {SPECIALTIES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => chooseSpecialty(s.value)}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:border-teal-400 hover:bg-teal-50/50 active:scale-[0.99]"
                  >
                    <span className="block font-semibold text-slate-900">{s.label}</span>
                    <span className="block text-sm text-slate-500">{s.hint}</span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500">
                Convênio ou liminar?{' '}
                <a className="font-semibold text-teal-700 underline" href={whatsappUrl('Oi! Vim pelo Instagram e quero agendar pelo convênio.')} onClick={() => trackWhatsAppContact('agendar_convenio')}>
                  Fale com a gente no WhatsApp
                </a>
                .
              </p>
            </div>
          )}

          {step === 'quando' && (
            <div>
              <button type="button" onClick={() => setStep('especialidade')} className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-slate-500">
                <ArrowLeft className="h-4 w-4" /> {specialtyLabel}
              </button>
              <h2 className="text-base font-bold text-slate-900">Qual dia e período ficam melhor?</h2>
              <p className="mt-1 text-sm text-slate-500">O horário certinho a gente confirma com você no WhatsApp.</p>
              {notice && <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900">{notice}</p>}

              {loadingDays && (
                <div className="mt-6 flex justify-center text-slate-500">
                  <Loader2 className="h-6 w-6 animate-spin" aria-label="Carregando dias" />
                </div>
              )}

              {!loadingDays && days.length === 0 && (
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                  Não temos vagas online para os próximos dias nessa área. Chama a gente no WhatsApp que encontramos um
                  horário para você.
                </div>
              )}

              {!loadingDays && days.length > 0 && (
                <ul className="mt-4 flex flex-col gap-2">
                  {days.map((d) => (
                    <li key={d.date} className="flex items-center gap-2 rounded-2xl border border-slate-100 p-2">
                      <span className="w-24 shrink-0 pl-2 text-sm font-semibold text-slate-800">{d.label}</span>
                      <div className="grid flex-1 grid-cols-2 gap-2">
                        {d.periods.map((p) => (
                          <button
                            key={p.period}
                            type="button"
                            disabled={!p.available}
                            onClick={() => choosePeriod(d.date, p.period)}
                            className={`inline-flex items-center justify-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition ${
                              p.available
                                ? date === d.date && period === p.period
                                  ? 'bg-teal-600 text-white'
                                  : 'bg-teal-50 text-teal-800 hover:bg-teal-100'
                                : 'cursor-not-allowed bg-slate-50 text-slate-300 line-through'
                            }`}
                          >
                            {p.period === 'manha' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            {PERIOD_LABEL[p.period]}
                          </button>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step === 'dados' && (
            <form onSubmit={submit} noValidate>
              <button type="button" onClick={() => setStep('quando')} className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-slate-500">
                <ArrowLeft className="h-4 w-4" /> {specialtyLabel} · {days.find((d) => d.date === date)?.label} · {period && PERIOD_LABEL[period]}
              </button>
              {notice && <p className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900">{notice}</p>}

              <label className="block text-sm font-semibold text-slate-700" htmlFor="childName">Nome completo da criança</label>
              <input id="childName" className={`${input} mt-1`} autoComplete="off" value={form.childName} onChange={(e) => setForm({ ...form, childName: e.target.value })} />
              {errText('childName')}

              <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="birthDate">Data de nascimento</label>
              <input id="birthDate" type="date" className={`${input} mt-1`} value={form.birthDate} max={new Date().toISOString().slice(0, 10)} onChange={(e) => setForm({ ...form, birthDate: e.target.value })} />
              {errText('birthDate')}

              <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="responsibleName">Seu nome (responsável)</label>
              <input id="responsibleName" className={`${input} mt-1`} autoComplete="name" value={form.responsibleName} onChange={(e) => setForm({ ...form, responsibleName: e.target.value })} />
              {errText('responsibleName')}

              <label className="mt-4 block text-sm font-semibold text-slate-700" htmlFor="phone">WhatsApp com DDD</label>
              <input id="phone" inputMode="tel" autoComplete="tel" className={`${input} mt-1`} placeholder="(62) 99999-9999" value={form.phone} onChange={(e) => setForm({ ...form, phone: maskPhone(e.target.value) })} />
              {errText('phone')}

              {/* Campo isca: escondido de pessoas, robôs preenchem */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Site</label>
                <input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              </div>

              <label className="mt-4 flex items-start gap-2 text-sm text-slate-600">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-teal-600" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
                <span>
                  Autorizo a Fono Inova a usar esses dados para agendar e falar comigo pelo WhatsApp (
                  <a className="underline" href="/privacidade" target="_blank" rel="noreferrer">privacidade</a>).
                </span>
              </label>
              {errText('consent')}

              <p className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600">
                Avaliação completa com a especialista: <strong>{EVALUATION_PRICE}</strong>. Não cobramos nada agora.
              </p>

              {TURNSTILE_SITE_KEY && <div ref={captcha.ref} className="mt-4 flex justify-center" />}

              <button
                type="submit"
                disabled={sending || !captcha.ready}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-green-700 px-6 py-4 text-base font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-800 disabled:opacity-60"
              >
                {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <CalendarCheck className="h-5 w-5" />}
                Reservar meu horário
              </button>
              <p className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5" /> Seus dados ficam só com a clínica.
              </p>
            </form>
          )}

          {step === 'pronto' && result && (
            <div className="text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="mt-3 text-xl font-bold text-slate-900">Reservamos {result.display}!</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Vamos te chamar no WhatsApp para confirmar o horário certinho. Se preferir, chama a gente agora.
              </p>
              <p className="mt-3 text-xs text-slate-400">Código da reserva: {result.code}</p>
            </div>
          )}

          {step === 'indisponivel' && (
            <div className="text-center">
              <h2 className="text-lg font-bold text-slate-900">Vamos agendar pelo WhatsApp</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                A agenda online está pausada agora. No WhatsApp a gente encontra o melhor dia para a criança.
              </p>
            </div>
          )}
        </section>

        {(step === 'pronto' || step === 'indisponivel' || step === 'quando') && (
          <a
            href={whatsappUrl(whatsappText)}
            onClick={() => trackWhatsAppContact(`agendar_${step}`)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-green-700 bg-white px-6 py-3 text-base font-bold text-green-800 transition hover:bg-green-50"
          >
            <MessageCircle className="h-5 w-5" />
            {step === 'pronto' ? 'Confirmar no WhatsApp' : 'Prefiro falar no WhatsApp'}
          </a>
        )}
      </main>
    </div>
  );
};

export default Agendar;
