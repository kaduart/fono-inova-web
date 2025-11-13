import { Button } from '@/components/ui/button.jsx'
import {
  CheckCircle,
  MessageCircle,
  User,
  X
} from 'lucide-react'
import { useState } from 'react'
import { useFormTracking } from '../hooks/useFormTracking'

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

const BookingModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { trackFieldInteraction, trackFormSubmission } = useFormTracking('Formulário_Agendamento_Modal');

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

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Tracking interno do seu hook
    try {
      trackFormSubmission(true);
      trackFieldInteraction('confirmacao_modal', 'confirmar_via_whatsapp');
    } catch { }

    // GA4: marcamos a intenção de envio (lead via modal)
    gaEvent('generate_lead', {
      source: 'booking_modal_simplified',
      form_type: '3_fields'
    });

    // Google Ads: conversão de lead
    reportLeadConversion();

    // Monta a mensagem simplificada para o WhatsApp
    const message = `Olá! Gostaria de agendar uma consulta na Clínica Fono Inova.

*Meus dados:*
Nome: ${formData.name}
Telefone: ${formData.phone}
E-mail: ${formData.email}

Aguardo contato para mais informações. Obrigado!`;

    const whatsappUrl = `https://wa.me/5562992013573?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // Pequeno delay para garantir que o WhatsApp abriu
    setTimeout(() => {
      setIsSubmitting(false)
      onClose?.();
      setFormData({
        name: '',
        phone: '',
        email: ''
      });
      setErrors({})
    }, 1000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-green-600 to-cyan-500 p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-3 backdrop-blur-sm">
              <MessageCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Agende sua Consulta</h2>
            <p className="text-green-100 text-sm">
              Preencha os dados abaixo e fale conosco via WhatsApp
            </p>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              Nome Completo *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                onFocus={() => trackFieldInteraction('nome_modal_focus', 'focused')}
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 transition-all ${errors.name
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300 focus:border-green-500'
                  }`}
                placeholder="Digite seu nome completo"
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <p className="text-red-600 text-sm mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {errors.name}
              </p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              Telefone/WhatsApp *
            </label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                onFocus={() => trackFieldInteraction('telefone_modal_focus', 'focused')}
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 transition-all ${errors.phone
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300 focus:border-green-500'
                  }`}
                placeholder="(62) 99999-9999"
                maxLength={15}
                disabled={isSubmitting}
              />
            </div>
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-800">
              E-mail *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                📧
              </span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={() => trackFieldInteraction('email_modal_focus', 'focused')}
                className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-100 transition-all ${errors.email
                    ? 'border-red-400 bg-red-50'
                    : 'border-gray-200 hover:border-gray-300 focus:border-green-500'
                  }`}
                placeholder="seu@email.com"
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {errors.email}
              </p>
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
                  <span className="animate-spin">⏳</span>
                  Enviando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
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