import React, { ForwardedRef } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode;
}

export const Select = React.forwardRef((
    { children, ...props }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>
) => (
    <select
        ref={ref}
        className="mt-1 block w-full pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        {...props}
    >
        {children}
    </select>
));