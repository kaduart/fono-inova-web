import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageCircle,
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'

const BookingModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialty: '',
    childAge: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  })
  const [errors, setErrors] = useState({})

  const specialties = [
    {
      id: 'fonoaudiologia',
      name: 'Fonoaudiologia',
      description: 'Desenvolvimento da fala e linguagem',
      icon: '🗣️'
    },
    {
      id: 'psicologia',
      name: 'Psicologia',
      description: 'Desenvolvimento emocional e comportamental',
      icon: '🧠'
    },
    {
      id: 'terapia-ocupacional',
      name: 'Terapia Ocupacional',
      description: 'Independência nas atividades diárias',
      icon: '🤝'
    },
    {
      id: 'fisioterapia',
      name: 'Fisioterapia',
      description: 'Fortalecimento e coordenação motora',
      icon: '💪'
    }
  ]

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ]

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório'
      if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório'
      if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório'
      if (!formData.childAge.trim()) newErrors.childAge = 'Idade da criança é obrigatória'
    }
    
    if (step === 2) {
      if (!formData.specialty) newErrors.specialty = 'Selecione uma especialidade'
    }
    
    if (step === 3) {
      if (!formData.preferredDate) newErrors.preferredDate = 'Selecione uma data'
      if (!formData.preferredTime) newErrors.preferredTime = 'Selecione um horário'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = () => {
    if (validateStep(3)) {
      const selectedSpecialty = specialties.find(s => s.id === formData.specialty)
      const message = `Olá! Gostaria de agendar uma consulta na Clínica Fono Inova.

*Dados do Responsável:*
Nome: ${formData.name}
Telefone: ${formData.phone}
E-mail: ${formData.email}

*Dados da Criança:*
Idade: ${formData.childAge} anos

*Consulta:*
Especialidade: ${selectedSpecialty?.name}
Data preferida: ${formData.preferredDate}
Horário preferido: ${formData.preferredTime}

${formData.notes ? `*Observações:*\n${formData.notes}` : ''}

Aguardo confirmação. Obrigado!`

      const whatsappUrl = `https://wa.me/5562992013573?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, '_blank')
      onClose()
      setCurrentStep(1)
      setFormData({
        name: '',
        phone: '',
        email: '',
        specialty: '',
        childAge: '',
        preferredDate: '',
        preferredTime: '',
        notes: ''
      })
    }
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold font-poppins">Agendar Consulta</h2>
              <p className="text-muted-foreground">Passo {currentStep} de 4</p>
            </div>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
              ))}
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <User className="w-12 h-12 text-primary mx-auto mb-2" />
                <h3 className="text-xl font-semibold">Dados Pessoais</h3>
                <p className="text-muted-foreground">Informe seus dados para contato</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo *</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.name ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="Digite seu nome completo"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Telefone *</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.phone ? 'border-red-500' : 'border-border'
                    }`}
                    placeholder="(62) 99999-2635"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">E-mail *</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Idade da Criança *</label>
                <input 
                  type="number" 
                  value={formData.childAge}
                  onChange={(e) => handleInputChange('childAge', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.childAge ? 'border-red-500' : 'border-border'
                  }`}
                  placeholder="Ex: 5"
                  min="0"
                  max="18"
                />
                {errors.childAge && <p className="text-red-500 text-sm mt-1">{errors.childAge}</p>}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <MessageCircle className="w-12 h-12 text-primary mx-auto mb-2" />
                <h3 className="text-xl font-semibold">Escolha a Especialidade</h3>
                <p className="text-muted-foreground">Selecione o tipo de terapia necessária</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {specialties.map((specialty) => (
                  <Card 
                    key={specialty.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      formData.specialty === specialty.id 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleInputChange('specialty', specialty.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{specialty.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{specialty.name}</h4>
                          <p className="text-sm text-muted-foreground">{specialty.description}</p>
                        </div>
                        {formData.specialty === specialty.id && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {errors.specialty && <p className="text-red-500 text-sm mt-2">{errors.specialty}</p>}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Calendar className="w-12 h-12 text-primary mx-auto mb-2" />
                <h3 className="text-xl font-semibold">Data e Horário</h3>
                <p className="text-muted-foreground">Escolha sua data e horário preferidos</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Data Preferida *</label>
                <input 
                  type="date" 
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  min={getMinDate()}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.preferredDate ? 'border-red-500' : 'border-border'
                  }`}
                />
                {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Horário Preferido *</label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => handleInputChange('preferredTime', time)}
                      className={`p-2 text-sm rounded-md border transition-all ${
                        formData.preferredTime === time
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white hover:bg-muted border-border'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {errors.preferredTime && <p className="text-red-500 text-sm mt-2">{errors.preferredTime}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Observações</label>
                <textarea 
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Conte-nos mais sobre suas necessidades ou preferências..."
                />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center space-y-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Confirmar Agendamento</h3>
                <p className="text-muted-foreground">Revise suas informações antes de enviar</p>
              </div>
              
              <Card className="text-left">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Nome:</span>
                    <span>{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Telefone:</span>
                    <span>{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Especialidade:</span>
                    <span>{specialties.find(s => s.id === formData.specialty)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Data:</span>
                    <span>{new Date(formData.preferredDate).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Horário:</span>
                    <span>{formData.preferredTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Idade da criança:</span>
                    <span>{formData.childAge} anos</span>
                  </div>
                </CardContent>
              </Card>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Próximo passo:</strong> Você será redirecionado para o WhatsApp para confirmar o agendamento com nossa equipe.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 mt-6 border-t">
            <Button 
              variant="outline" 
              onClick={currentStep === 1 ? onClose : prevStep}
              className="flex items-center"
            >
              {currentStep === 1 ? (
                <>
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </>
              ) : (
                <>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </>
              )}
            </Button>
            
            <Button 
              onClick={currentStep === 4 ? handleSubmit : nextStep}
              className="flex items-center bg-primary hover:bg-primary/90"
            >
              {currentStep === 4 ? (
                <>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Confirmar via WhatsApp
                </>
              ) : (
                <>
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingModal

