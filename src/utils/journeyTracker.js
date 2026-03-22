/**
 * 🛤️ Journey Tracker - Site público Fono Inova
 * Rastreia jornada do visitante e sincroniza com o CRM.
 * Adaptado para funcionar com URL absoluta do CRM (VITE_CRM_API_URL).
 */

import { getCRMApiUrl, isCRMConfigured } from '../constants';

const STORAGE_KEY = 'fono_lead_journey';
const JOURNEY_COOKIE_KEY = 'fono_journey_id';
const SESSION_TIMEOUT_MIN = 30;

// ─── INIT ────────────────────────────────────────────────────────────────────

export function initJourneyTracker() {
  const journey = getOrCreateJourney();
  trackPageView();
  setupEventListeners();
  syncJourneyCookie();
  return journey;
}

// ─── JORNADA ─────────────────────────────────────────────────────────────────

function getOrCreateJourney() {
  let journey = loadFromStorage();

  if (!journey) {
    journey = createNewJourney();
    saveToStorage(journey);
    return journey;
  }

  // Nova sessão se inativo > 30 min
  const minutesInactive =
    (Date.now() - new Date(journey.lastActivityAt).getTime()) / (1000 * 60);

  if (minutesInactive > SESSION_TIMEOUT_MIN) {
    journey = startNewSession(journey);
    saveToStorage(journey);
  }

  return journey;
}

function createNewJourney() {
  const params = new URLSearchParams(window.location.search);

  return {
    journeyId: generateId('jny'),
    sessionId: generateId('sess'),
    sessionCount: 1,

    // Origem
    source: params.get('utm_source') || getReferrerSource(),
    medium: params.get('utm_medium') || 'organic',
    campaign: params.get('utm_campaign') || null,
    content: params.get('utm_content') || null,

    // Comportamento
    pagesVisited: [],
    interactions: [],
    maxScrollDepth: 0,

    // Lead (quando identificado)
    leadData: null,
    isIdentified: false,

    // Flags de conversão
    hasClickedWhatsapp: false,
    hasStartedForm: false,
    hasSubmittedForm: false,

    // Timestamps
    createdAt: new Date().toISOString(),
    lastActivityAt: new Date().toISOString(),
  };
}

function startNewSession(journey) {
  return {
    ...journey,
    sessionId: generateId('sess'),
    sessionCount: (journey.sessionCount || 0) + 1,
    lastActivityAt: new Date().toISOString(),
  };
}

// ─── TRACKING PÚBLICO ─────────────────────────────────────────────────────────

export function trackPageView() {
  const journey = loadFromStorage();
  if (!journey) return;

  const pageData = {
    url: window.location.pathname,
    title: document.title,
    referrer: document.referrer,
    timestamp: new Date().toISOString(),
  };

  // Evitar duplicata imediata
  const last = journey.pagesVisited[journey.pagesVisited.length - 1];
  if (last?.url === pageData.url) return;

  journey.pagesVisited.push(pageData);
  if (journey.pagesVisited.length > 50) journey.pagesVisited = journey.pagesVisited.slice(-50);
  journey.lastActivityAt = new Date().toISOString();

  saveToStorage(journey);
  syncWithCRM('page_view', { page: pageData.url, title: pageData.title, referrer: pageData.referrer });
}

export function trackCTAClick(ctaType, metadata = {}) {
  const journey = loadFromStorage();
  if (!journey) return;

  journey.interactions.push({
    type: 'cta_click',
    ctaType,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
    metadata,
  });
  journey.lastActivityAt = new Date().toISOString();

  if (ctaType === 'whatsapp') journey.hasClickedWhatsapp = true;
  if (ctaType === 'form_start') journey.hasStartedForm = true;
  if (ctaType === 'form_submit') journey.hasSubmittedForm = true;

  saveToStorage(journey);
  syncWithCRM('cta_click', { ctaType, page: window.location.pathname, ...metadata });
}

export function identifyLead(leadData) {
  const journey = loadFromStorage();
  if (!journey) return;

  journey.leadData = { ...leadData, identifiedAt: new Date().toISOString() };
  journey.isIdentified = true;
  journey.lastActivityAt = new Date().toISOString();

  saveToStorage(journey);
  syncWithCRM('lead_identified', { journeyId: journey.journeyId, ...leadData });
}

export function getJourneyData() {
  return loadFromStorage();
}

// ─── SINCRONIZAÇÃO COM O CRM ──────────────────────────────────────────────────

async function syncWithCRM(type, data) {
  if (!isCRMConfigured()) return;

  try {
    const journey = loadFromStorage();
    if (!journey) return;

    await fetch(`${getCRMApiUrl()}/api/journey/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        journeyId: journey.journeyId,
        sessionId: journey.sessionId,
        type,
        ...data,
      }),
    });
  } catch {
    // Silencioso — tracking nunca deve quebrar a UX
  }
}

// ─── COOKIE ───────────────────────────────────────────────────────────────────

export function syncJourneyCookie() {
  const journey = loadFromStorage();
  if (!journey) return;
  // Cookie de 90 dias — lido pelo backend quando o lead abre o WhatsApp
  document.cookie = `${JOURNEY_COOKIE_KEY}=${journey.journeyId}; path=/; max-age=${90 * 24 * 60 * 60}`;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function loadFromStorage() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveToStorage(journey) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(journey));
  } catch {
    // Ignore storage full
  }
}

function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function getReferrerSource() {
  const ref = document.referrer;
  if (!ref) return 'direct';
  if (ref.includes('google')) return 'google';
  if (ref.includes('facebook')) return 'facebook';
  if (ref.includes('instagram')) return 'instagram';
  return 'referral';
}

function setupEventListeners() {
  const journey = loadFromStorage();
  if (!journey) return;

  // Scroll depth (50% e 90%)
  let maxScroll = journey.maxScrollDepth || 0;
  const tracked = new Set();

  window.addEventListener('scroll', () => {
    const pct = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );
    if (pct > maxScroll) {
      maxScroll = pct;
      const j = loadFromStorage();
      if (j) { j.maxScrollDepth = maxScroll; saveToStorage(j); }
    }
    [50, 90].forEach(threshold => {
      if (maxScroll >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        syncWithCRM('scroll_depth', { page: window.location.pathname, depth: threshold });
      }
    });
  }, { passive: true });

  // Page exit
  window.addEventListener('beforeunload', () => {
    const j = loadFromStorage();
    if (j && !j.hasSubmittedForm && j.interactions.length > 0) {
      syncWithCRM('page_exit', { page: window.location.pathname, scrollDepth: maxScroll });
    }
  });
}

// ─── HOOK REACT ───────────────────────────────────────────────────────────────

import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export function useJourneyTracker() {
  const location = useLocation();

  // Init uma vez
  useEffect(() => {
    initJourneyTracker();
  }, []);

  // Track page view em cada mudança de rota
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  const trackCTA = useCallback((type, metadata) => trackCTAClick(type, metadata), []);
  const identify = useCallback((data) => identifyLead(data), []);

  return { trackCTA, identify, getJourneyData };
}
