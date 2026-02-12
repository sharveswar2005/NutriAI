import React from 'react';

const Input = ({
    label,
    error,
    className = '',
    id,
    type = 'text',
    ...props
}) => {
    const inputId = id || props.name;

    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                className={`
          flex h-11 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 
          placeholder:text-slate-400 transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-1
          ${error
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-slate-300 hover:border-slate-400 focus:border-emerald-500 focus:ring-emerald-200'
                    }
        `}
                {...props}
            />
            {error && (
                <p className="text-sm font-medium text-red-600 animate-pulse">{error}</p>
            )}
        </div>
    );
};

export default Input;
