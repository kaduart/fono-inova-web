import { Calendar } from 'lucide-react';
import { useState } from 'react';
import BookingModal from '../BookingModal';

const ButtonAgendamento = ({
  className = '',
  children = 'Agendar Avaliação',
  size = 'default',
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    default: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
    xl: 'px-8 py-6 text-xl'
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`${sizeClasses[size]} ${className}`}
        {...props}
      >
        <Calendar className="w-4 h-4 mr-2" />
        {children}
      </button>

      {/* Renderiza o modal apenas se estiver controlando internamente */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ButtonAgendamento;