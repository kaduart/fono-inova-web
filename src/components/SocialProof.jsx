// Componente de Prova Social - CRO
// Aumenta confiança e conversão

export const SocialProofHero = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 mt-4">
      <div className="flex items-center">
        <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span className="font-semibold">+500</span>
        <span className="ml-1">crianças atendidas em Anápolis</span>
      </div>
      <span className="hidden sm:inline text-gray-300">|</span>
      <div className="flex items-center">
        <svg className="w-5 h-5 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
        <span>Equipe especializada</span>
      </div>
      <span className="hidden sm:inline text-gray-300">|</span>
      <div className="flex items-center">
        <svg className="w-5 h-5 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
        <span>Atendimento humanizado</span>
      </div>
    </div>
  );
};

export const TrustBadges = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg mx-auto">
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600">+500</div>
        <div className="text-xs text-gray-600">Crianças atendidas</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600">+5</div>
        <div className="text-xs text-gray-600">Anos de experiência</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-blue-600">4.9</div>
        <div className="text-xs text-gray-600">Avaliação Google</div>
      </div>
    </div>
  );
};

export const UrgencySection = ({ items }) => {
  return (
    <div className="my-8 p-6 bg-red-50 rounded-xl border-l-4 border-red-500">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <span className="text-2xl mr-2">⚠️</span>
        Quando procurar um especialista?
      </h3>
      <ul className="space-y-3 mb-6">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-red-500 mr-2">•</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
      <a
        href="https://wa.me/5562993377726?text=Olá! Vim pelo site e gostaria de agendar uma avaliação para meu filho."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full sm:w-auto text-center bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors"
      >
        Agende uma avaliação na Clínica Fono Inova
      </a>
    </div>
  );
};

export default SocialProofHero;
