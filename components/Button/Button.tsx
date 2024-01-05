import { ButtonHTMLAttributes, forwardRef, JSX } from 'react';
import { twMerge } from 'tailwind-merge';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export const Button = forwardRef<HTMLButtonElement, IButton>(
    ({
         children,
        className,
        disabled,
        type = 'button',
        ...props
    }, ref): JSX.Element => {
        return (
            <button
                className={twMerge(`
                    w-full
                    rounded-full
                    bg-green-500
                    border
                    border-transparent
                    px-3
                    py-3
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    text-black
                    font-fold
                    hover:opacity-75
                    transition
                `,
                    className
                )}
                type={type}
                disabled={disabled}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
