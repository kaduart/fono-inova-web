import React, { useState } from 'react';

const formatCurrency = (value: string): string => {
    const numericValue = value.replace(/\D/g, '');
    const formattedValue = (Number(numericValue) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    return formattedValue;
};

const InputCurrency = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, onChange, value, ...props }, ref) => {
        const [displayValue, setDisplayValue] = useState<string>(formatCurrency(value?.toString() || ''));

        const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const formattedValue = formatCurrency(e.target.value);
            setDisplayValue(formattedValue);

            // Remove os caracteres não numéricos e converte para número decimal
            const rawValue = formattedValue.replace(/[^\d]/g, '');
            const numericValue = Number(rawValue) / 100;

            if (onChange) {
                onChange({
                    ...e,
                    target: { ...e.target, name: props.name || '', value: numericValue.toString() },
                } as React.ChangeEvent<HTMLInputElement>);
            }
        };


        return (
            <input
                ref={ref}
                value={displayValue}
                onChange={handleCurrencyChange}
                className={`mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out ${className}`}
                {...props}
            />
        );
    }
);

InputCurrency.displayName = 'InputCurrency';

export default InputCurrency;
