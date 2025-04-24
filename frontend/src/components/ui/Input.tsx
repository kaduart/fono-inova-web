// components/ui/Input.tsx
import React from 'react';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 h-6 ${className}`}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input'; // Importante para debugging

export default Input;