interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
        {children}
    </div>
);

interface CardHeaderProps {
    children: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
}

export const CardHeader = ({ children, icon: Icon }: CardHeaderProps) => (
    <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center justify-between">
        {children}
        {Icon && <Icon className="h-5 w-5 text-blue-600 ml-2" />}
    </div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg leading-6 font-medium text-gray-900">{children}</h3>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
    <div className="px-4 py-5 sm:p-6">{children}</div>
);

export const CardFooter = ({ children }: { children: React.ReactNode }) => (
    <div className="px-4 py-4 sm:px-6">{children}</div>
);