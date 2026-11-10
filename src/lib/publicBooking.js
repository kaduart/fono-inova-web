/**
 * Agendamento online (/agendar). Ligado por padrão: todo botão de
 * "agendar" do site leva para a página /agendar em vez do WhatsApp.
 * Botões de "falar/tirar dúvida" continuam no WhatsApp.
 */
import { Children, cloneElement, isValidElement } from 'react';

// Ligado por padrão. Para desligar: VITE_PUBLIC_BOOKING_ENABLED=false na Vercel.
// Se a API estiver desligada (503), a página /agendar mostra o WhatsApp.
export const isPublicBookingOn = () => import.meta.env.VITE_PUBLIC_BOOKING_ENABLED !== 'false';

// Página atual → especialidade já marcada no /agendar
const PATH_SPECIALTY = [
  [/neuropsico|tdah|dificuldade-escolar|dislexia/, 'neuropsicologia'],
  [/psicopedagog/, 'psicopedagogia'],
  [/terapia-ocupacional|seletividade|sensorial/, 'terapia_ocupacional'],
  [/fisioterapia|prematuridade/, 'fisioterapia'],
  [/psicolog|comportamento|autismo/, 'psicologia'],
  [/fono|fala|linguinha|voz|gagueira/, 'fonoaudiologia'],
];

export function specialtyFromPath(path = '') {
  const p = String(path).toLowerCase();
  for (const [re, spec] of PATH_SPECIALTY) if (re.test(p)) return spec;
  return '';
}

export function agendarHref(medium = 'botao', specialty) {
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const params = new URLSearchParams({ utm_source: 'site', utm_medium: medium, utm_content: path || '/' });
  const spec = specialty || specialtyFromPath(path);
  if (spec) params.set('especialidade', spec);
  return `/agendar?${params.toString()}`;
}

export function goToAgendar(medium = 'botao', specialty) {
  if (typeof window !== 'undefined') window.location.assign(agendarHref(medium, specialty));
}

function textOf(node) {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join(' ');
  if (isValidElement(node)) return textOf(node.props.children);
  return '';
}

/** O botão é de agendar? ("Agendar avaliação", "Quero agendar"...) */
export function isAgendarLabel(children) {
  return /agend/i.test(textOf(children));
}

const WA_SUFFIX = /\s*(pelo|no|via)\s+whats\s?app/gi;

/** Tira "pelo WhatsApp" do texto do botão quando ele passa a ir para o /agendar. */
export function relabel(children) {
  return Children.map(children, (c) => {
    if (typeof c === 'string') return c.replace(WA_SUFFIX, '');
    if (isValidElement(c) && c.props?.children) return cloneElement(c, undefined, relabel(c.props.children));
    return c;
  });
}
