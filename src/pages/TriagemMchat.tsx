// Triagem M-CHAT-R online (16 a 30 meses). Desligada até a autorização dos autores:
// a rota só é montada quando mchatEnabled() — ver src/lib/mchat/items.js e docs/MCHAT.md.
import { useMemo, useState } from 'react';
import Layout from '../components/Layout/index.jsx';
import SEO from '../components/SEO.jsx';
import { CONTACT } from '../constants';
import { MCHAT_ITEMS, COPYRIGHT_NOTICE } from '../lib/mchat/items.js';
import { ageInMonths, guidanceFor, isEligibleAge, leadSummary, scoreMchat } from '../lib/mchat/scoring.js';
import { sendLeadToCRM } from '../services/crmAnalyticsApi.js';

type Answers = Record<number, boolean>;
const LEVEL_STYLE: Record<string, string> = {
  baixo: 'bg-emerald-50 text-emerald-900 border-emerald-200',
  medio: 'bg-amber-50 text-amber-900 border-amber-200',
  alto: 'bg-rose-50 text-rose-900 border-rose-200',
};
const LEVEL_LABEL: Record<string, string> = { baixo: 'Baixo risco', medio: 'Risco moderado', alto: 'Risco elevado' };

export default function TriagemMchat() {
  const [birth, setBirth] = useState('');
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState<'idade' | 'perguntas' | 'resultado'>('idade');
  const [lead, setLead] = useState({ name: '', phone: '', consent: false });
  const [leadState, setLeadState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const months = birth ? ageInMonths(birth) : null;
  const result = useMemo(() => scoreMchat(answers), [answers]);
  const eligible = months !== null && isEligibleAge(months);

  const waText = encodeURIComponent(
    `Olá! Fiz a triagem M-CHAT no site (${result.level ? LEVEL_LABEL[result.level].toLowerCase() : 'sem resultado'}) e gostaria de conversar sobre uma avaliação.`
  );

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    if (!lead.consent || !result.level || months === null) return;
    setLeadState('sending');
    const r = await sendLeadToCRM({
      name: lead.name.trim(),
      phone: lead.phone,
      serviceInterest: leadSummary(result, months),
      formSource: 'triagem_mchat',
    });
    setLeadState(r?.success ? 'sent' : 'error');
  }

  return (
    <Layout>
      <SEO
        title="Triagem M-CHAT de sinais de autismo (16 a 30 meses)"
        description="Questionário de triagem para pais de crianças de 16 a 30 meses. Leva cerca de 5 minutos e mostra se vale procurar uma avaliação."
        url="https://www.clinicafonoinova.com.br/triagem-autismo-m-chat"
      />
      <main className="mx-auto max-w-2xl px-4 py-10 text-gray-900">
        <h1 className="text-3xl font-bold">Triagem de sinais de autismo (M-CHAT-R)</h1>
        <p className="mt-2 text-gray-600">Para crianças de 16 a 30 meses. Responda pensando no que a criança faz no dia a dia. Triagem não é diagnóstico.</p>

        {step === 'idade' && (
          <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
            <label htmlFor="mchat-birth" className="block font-semibold">Data de nascimento da criança</label>
            <input id="mchat-birth" type="date" value={birth} onChange={(e) => setBirth(e.target.value)} className="mt-2 h-12 w-full rounded-lg border border-gray-300 px-3" />
            {months !== null && !eligible && (
              <p className="mt-3 text-sm text-amber-800">A M-CHAT-R foi feita para 16 a 30 meses (a criança tem {months}). Fale com a nossa equipe que indicamos o caminho certo para a idade.</p>
            )}
            <button type="button" disabled={!eligible} onClick={() => setStep('perguntas')} className="mt-5 h-12 w-full rounded-lg bg-emerald-700 font-semibold text-white disabled:opacity-40">Começar</button>
          </section>
        )}

        {step === 'perguntas' && (
          <section className="mt-8 flex flex-col gap-3">
            <p className="text-sm text-gray-600">{result.answered} de 20 respondidas</p>
            {MCHAT_ITEMS.map((it) => (
              <fieldset key={it.n} className="rounded-2xl border border-gray-200 bg-white p-4">
                <legend className="px-1 font-semibold">{it.n}. {it.text}</legend>
                {it.example && <p className="mt-1 text-sm text-gray-600">{it.example}</p>}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[true, false].map((v) => (
                    <button key={String(v)} type="button" aria-pressed={answers[it.n] === v}
                      onClick={() => setAnswers((a) => ({ ...a, [it.n]: v }))}
                      className={`h-11 rounded-lg border font-semibold ${answers[it.n] === v ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-gray-300 bg-white'}`}>
                      {v ? 'Sim' : 'Não'}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
            <button type="button" disabled={!result.complete} onClick={() => setStep('resultado')} className="h-12 rounded-lg bg-emerald-700 font-semibold text-white disabled:opacity-40">Ver resultado</button>
          </section>
        )}

        {step === 'resultado' && result.level && months !== null && (
          <section className="mt-8 flex flex-col gap-5">
            <div className={`rounded-2xl border p-6 ${LEVEL_STYLE[result.level]}`}>
              <p className="text-sm font-semibold uppercase tracking-wide">{LEVEL_LABEL[result.level]}</p>
              <p className="mt-2">{guidanceFor(result.level, months)}</p>
            </div>
            <a href={`${CONTACT.WHATSAPP_LINK}?text=${waText}`} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center rounded-lg bg-emerald-700 font-semibold text-white">Conversar no WhatsApp</a>

            <form onSubmit={submitLead} className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="font-semibold">Prefere que a gente chame você?</p>
              {leadState === 'sent' ? (
                <p className="mt-3 text-emerald-800">Recebemos! Nossa equipe fala com você pelo WhatsApp em breve.</p>
              ) : (
                <>
                  <label htmlFor="mchat-name" className="mt-4 block text-sm font-semibold">Seu nome</label>
                  <input id="mchat-name" required minLength={2} value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} className="mt-1 h-12 w-full rounded-lg border border-gray-300 px-3" />
                  <label htmlFor="mchat-phone" className="mt-3 block text-sm font-semibold">WhatsApp</label>
                  <input id="mchat-phone" required inputMode="tel" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} className="mt-1 h-12 w-full rounded-lg border border-gray-300 px-3" />
                  <label className="mt-3 flex items-start gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={lead.consent} onChange={(e) => setLead({ ...lead, consent: e.target.checked })} className="mt-1" />
                    Autorizo a Fono Inova a guardar o resultado desta triagem e entrar em contato comigo (LGPD).
                  </label>
                  {leadState === 'error' && <p className="mt-2 text-sm text-rose-700">Não conseguimos enviar agora. Use o botão do WhatsApp acima.</p>}
                  <button type="submit" disabled={!lead.consent || leadState === 'sending'} className="mt-4 h-12 w-full rounded-lg border border-emerald-700 font-semibold text-emerald-800 disabled:opacity-40">{leadState === 'sending' ? 'Enviando…' : 'Quero que me chamem'}</button>
                </>
              )}
            </form>
            <button type="button" onClick={() => { setAnswers({}); setStep('idade'); setLeadState('idle'); }} className="text-sm text-gray-600 underline">Refazer a triagem</button>
          </section>
        )}

        {COPYRIGHT_NOTICE && <p className="mt-10 text-xs text-gray-500">{COPYRIGHT_NOTICE}</p>}
      </main>
    </Layout>
  );
}
