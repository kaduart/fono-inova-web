import { Star } from 'lucide-react';

const TestimonialCards = () => {

    const testimonials = [
        {
            name: "Ana Oliveira",
            role: "Mãe de Paciente",
            content: "Minha filha começou a falar muito melhor depois das sessões na Clínica Fono Inova. A equipe é incrível!",
            rating: 5
        },
        {
            name: "Carlos Silva",
            role: "Pai de Paciente",
            content: "Profissionais extremamente qualificados e um ambiente acolhedor. Recomendo para todas as famílias.",
            rating: 5
        },
        {
            name: "Maria Santos",
            role: "Mãe de Paciente",
            content: "O cuidado multidisciplinar fez toda a diferença no desenvolvimento do meu filho. Muito obrigada!",
            rating: 5
        }
    ];

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
                <div key={index} className="group">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover-lift border border-gray-100 transition-all duration-300 group-hover:shadow-xl">
                        {/* Header do depoimento */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'fill-gray-300 text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-lg">
                                    {testimonial.name.charAt(0)}
                                </span>
                            </div>
                        </div>

                        {/* Conteúdo do depoimento */}
                        <blockquote className="text-gray-700 leading-relaxed mb-4 italic">
                            "{testimonial.content}"
                        </blockquote>

                        {/* Informações do autor */}
                        <div className="border-t border-gray-100 pt-4">
                            <div className="font-semibold text-gray-900">{testimonial.name}</div>
                            <div className="text-sm text-gray-600">{testimonial.role}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TestimonialCards;