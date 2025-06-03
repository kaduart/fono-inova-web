// components/ui/Input.tsx
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, id, ...props }, ref) => {
        return (
            <div className="flex flex-col">
                {label && (
                    <label htmlFor={id} className="font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={id}
                    className={`mt-1 block w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ease-in-out ${className}`}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';


Input.displayName = 'Input'; // Importante para debugging

export default Input;