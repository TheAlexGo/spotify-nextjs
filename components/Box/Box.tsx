import { FC, JSX, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface IBox extends PropsWithChildren {
    className?: string;
}

export const Box: FC<IBox> = ({ children, className }): JSX.Element => {
    return (
        <div className={twMerge(`
            bg-neutral-900
            rounded-lg
            h-fit
            w-full
        `,
            className
        )}>
            {children}
        </div>
    );
};
