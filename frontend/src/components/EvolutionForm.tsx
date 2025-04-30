// src/components/EvolutionForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface EvolutionFormProps {
    onSubmit: (data: any) => void;
    isSubmitting?: boolean;
}

const EvolutionForm: React.FC<EvolutionFormProps> = ({ onSubmit, isSubmitting = false }) => {
    const { register, handleSubmit, reset } = useForm();

    const submit = (data: any) => {
        onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-4 p-4 bg-white rounded-xl shadow-md">
            <div>
                <label className="block text-sm font-medium text-gray-700">Data</label>
                <input
                    type="date"
                    {...register('date', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea
                    {...register('description', { required: true })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Profissional</label>
                <input
                    type="text"
                    {...register('professional', { required: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                {isSubmitting ? 'Salvando...' : 'Salvar Evolução'}
            </button>
        </form>
    );
};

export default EvolutionForm;
