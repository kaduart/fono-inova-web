import { Button } from '@/components/ui/button.jsx'
import {
  AlertCircle,
  CheckCircle,
  LoaderCircle,
  Mail,
  MessageCircle,
  User,
  X
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useFormTracking } from '../hooks/useFormTracking'
import { useCRMIntegration } from '../hooks/useCRMIntegration'

// Helpers de analytics (simples e seguros)
const getGtag = () =>
  (typeof window !== 'undefined' && typeof window.gtag === 'function')
    ? window.gtag
    : null;

const reportLeadConversion = () => {
  const gtag = getGtag();
  if (!gtag) return;
  // Conversão de LEAD no Google Ads
  gtag('event', 'conversion', {
    send_to: 'AW-17010705949/ceJrCLKfz70bEJ2Mq68_',
    value: 1.0,
    currency: 'BRL',
  });
};

const gaEvent = (name, params = {}) => {
  const gtag = getGtag();
  if (!gtag) return;
  gtag('event', name, params);
};

const BookingModal = ({ isOpen, onClose, onBookingSuccess, serviceInterest = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [fallbackUrl, setFallbackUrl] = useState('')
  const dialogRef = useRef(null)
  const nameInputRef = useRef(null)
  const phoneInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const previouslyFocusedRef = useRef(null)
  const closeTimerRef = useRef(null)
  const isSubmittingRef = useRef(false)
  const { trackFieldInteraction, trackFormSubmission } = useFormTracking('Formulário_Agendamento_Modal');
  const { submitLead } = useCRMIntegration();

  useEffect(() => {
    isSubmittingRef.current = isSubmitting
  }, [isSubmitting])

  useEffect(() => {
    if (!isOpen) return undefined

    previouslyFocusedRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => nameInputRef.current?.focus(), 0)
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !isSubmittingRef.current) onClose?.()

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocusedRef.current?.focus?.()
    }
  }, [isOpen, onClose])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório'
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (submissionStatus === 'error') {
      setSubmissionStatus('idle')
      setStatusMessage('')
      setFallbackUrl('')
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value)
    handleInputChange('phone', formatted)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return

    if (!validateForm()) {
      if (!formData.name.trim() || formData.name.trim().length < 3) nameInputRef.current?.focus()
      else if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) phoneInputRef.current?.focus()
      else emailInputRef.current?.focus()
      return
    }

    setIsSubmitting(true)
    setSubmissionStatus('sending')
    setStatusMessage('Enviando seus dados com segurança…')
    setFallbackUrl('')

    const message = `Oi! Vi no site de vocês e gostaria de entender melhor como funciona o atendimento.

*Meus dados:*
Nome: ${formData.name}
Telefone: ${formData.phone}
E-mail: ${formData.email}

Pode me explicar como funciona a avaliação?`;

    const whatsappUrl = `https://wa.me/5562992013573?text=${encodeURIComponent(message)}`;

    // Tracking interno do seu hook
    try {
      trackFieldInteraction('confirmacao_modal', 'confirmar_via_whatsapp');
    } catch (trackingError) {
      console.warn('[BookingModal] Falha ao registrar interação:', trackingError)
    }

    // GA4: marcamos a intenção de envio (lead via modal)
    gaEvent('generate_lead', {
      source: 'booking_modal_simplified',
      form_type: '3_fields'
    });

    try {
      const crmResult = await submitLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        serviceInterest: serviceInterest,
        formSource: 'booking_modal'
      });

      if (!crmResult?.success) {
        console.warn('[BookingModal] Lead salvo para nova tentativa:', crmResult?.error)
      }

      const whatsappWindow = window.open(whatsappUrl, '_blank')
      if (whatsappWindow) whatsappWindow.opener = null

      if (!whatsappWindow) {
        setFallbackUrl(whatsappUrl)
        setSubmissionStatus('error')
        setStatusMessage('O navegador bloqueou a abertura do WhatsApp. Use o link abaixo para continuar sem preencher novamente.')
        setIsSubmitting(false)
        trackFormSubmission(false)
        return
      }

      trackFormSubmission(true)
      reportLeadConversion()
      onBookingSuccess?.({ crmSuccess: Boolean(crmResult?.success) })
      setSubmissionStatus('success')
      setStatusMessage('WhatsApp aberto. Finalize o envio da mensagem para falar com a equipe.')

      closeTimerRef.current = window.setTimeout(() => {
        setIsSubmitting(false)
        setSubmissionStatus('idle')
        setStatusMessage('')
        onClose?.()
        setFormData({ name: '', phone: '', email: '' })
        setErrors({})
      }, 1000)
    } catch (error) {
      console.error('[BookingModal] Falha inesperada no agendamento:', error)
      trackFormSubmission(false)
      setFallbackUrl(whatsappUrl)
      setSubmissionStatus('error')
      setStatusMessage('Não foi possível concluir o envio agora. Seus dados foram preservados; continue diretamente pelo WhatsApp ou tente novamente.')
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose?.()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        aria-describedby="booking-modal-description"
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300"
      >
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-green-600 to-cyan-500 p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h2 id="booking-modal-title" className="text-2xl font-bold mb-2">Agende sua Consulta</h2>
            <p id="booking-modal-description" className="text-green-100 text-sm">
              Preencha os dados abaixo e fale conosco via WhatsApp
            </p>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nome */}
          <div>
            <label htmlFor="booking-name" className="block text-sm font-semibold mb-2 text-gray-800">
              Nome Completo *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={nameInputRef}
                id="booking-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onFocus={() => trackFieldInteraction('nome_modal_focus', 'focused')}
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 transition-all ${errors.name
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300 focus:border-green-500'
                  }`}
                placeholder="Digite seu nome completo"
                autoComplete="name"
                maxLength={100}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'booking-name-error' : undefined}
                required
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <p id="booking-name-error" role="alert" className="text-red-600 text-sm mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" /> {errors.name}
              </p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="booking-phone" className="block text-sm font-semibold mb-2 text-gray-800">
              Telefone/WhatsApp *
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={phoneInputRef}
                id="booking-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                onFocus={() => trackFieldInteraction('telefone_modal_focus', 'focused')}
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 transition-all ${errors.phone
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300 focus:border-green-500'
                  }`}
                placeholder="(62) 99999-9999"
                autoComplete="tel"
                inputMode="tel"
                maxLength={15}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
                required
                disabled={isSubmitting}
              />
            </div>
            {errors.phone && (
              <p id="booking-phone-error" role="alert" className="text-red-600 text-sm mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" /> {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="booking-email" className="block text-sm font-semibold mb-2 text-gray-800">
              E-mail *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
              <input
                ref={emailInputRef}
                id="booking-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={() => trackFieldInteraction('email_modal_focus', 'focused')}
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 transition-all ${errors.email
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300 focus:border-green-500'
                  }`}
                placeholder="seu@email.com"
                autoComplete="email"
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'booking-email-error' : undefined}
                required
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p id="booking-email-error" role="alert" className="text-red-600 text-sm mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" /> {errors.email}
              </p>
            )}
          </div>

          <div aria-live="polite" aria-atomic="true">
            {submissionStatus !== 'idle' && (
              <div
                role={submissionStatus === 'error' ? 'alert' : 'status'}
                className={`rounded-xl border p-4 text-sm ${submissionStatus === 'error'
                    ? 'border-red-200 bg-red-50 text-red-800'
                    : 'border-green-200 bg-green-50 text-green-800'
                  }`}
              >
                <div className="flex items-start gap-2">
                  {submissionStatus === 'error' && <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />}
                  {submissionStatus === 'sending' && <LoaderCircle className="w-5 h-5 flex-shrink-0 mt-0.5 animate-spin" aria-hidden="true" />}
                  {submissionStatus === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />}
                  <div>
                    <p>{statusMessage}</p>
                    {fallbackUrl && (
                      <a
                        href={fallbackUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex mt-3 font-bold underline underline-offset-4"
                      >
                        Continuar no WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-green-50 border-2 border-green-100 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-green-900 font-medium mb-1">
                  Rápido e Fácil!
                </p>
                <p className="text-xs text-green-700">
                  Após enviar, você será redirecionado para o WhatsApp onde nossa equipe finalizará o agendamento.
                </p>
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 py-3 border-2 border-gray-300 hover:bg-gray-50 rounded-xl font-semibold transition-all"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-cyan-500 hover:from-green-700 hover:to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle className="w-4 h-4 animate-spin" aria-hidden="true" />
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Agendar via WhatsApp
                </span>
              )}
            </Button>
          </div>

          {/* Nota de privacidade */}
          <p className="text-xs text-gray-500 text-center mt-4">
            Seus dados estão seguros e serão usados apenas para agendamento.
          </p>
        </form>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes zoom-in {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        .zoom-in {
          animation: zoom-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default BookingModal
