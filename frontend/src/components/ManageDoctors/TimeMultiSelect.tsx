import { Check } from 'lucide-react';
import { useState } from 'react';
import { PatientData } from '../../utils/types';

interface TimeMultiSelectProps {
  selected?: string[];
  availableTimes?: string[];
  selectedDate?: Date | null;
  patients: PatientData[];
  selectedDoctorId?: string;
  onChange: (selected: string[]) => void;

  onSubmit: (data: {
    time: string,
    isBookingModalOpen: boolean
  }) => void;
}


export function TimeMultiSelect({
  selected = [],
  availableTimes,
  selectedDate,
  onChange,
  onSubmit,
}: TimeMultiSelectProps) {


  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedTime, setSelectedTime] = useState<string>('');

  const handleSelectAvailableTime = (time: string) => {
    if (!selectedDate) return;
    setIsModalOpen(true);
    // setSelectedTime(time);

    const data = {
      time: time,
      isBookingModalOpen: isModalOpen
    }
    onSubmit(data);
  };

  return (
    <>
      <div className="grid grid-cols-6 gap-3">
        {availableTimes?.map((time) => {
          const isSelected = selected.includes(time);
          return (
            <button
              key={time}
              className="bg-blue-500 hover:bg-blue-200 rounded px-3 py-2"
              onClick={() => handleSelectAvailableTime(time)}
            >
              <span>{time}</span>
              {isSelected && <Check size={16} className="ml-2" />}
            </button>
          );
        })}
      </div>
    </>
  );
}
