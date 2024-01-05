import Link from 'next/link';
import { FC, JSX } from 'react';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface ISidebarItem {
    icon: IconType;
    label: string;
    href: string;
    active?: boolean;
}

export const SidebarItem: FC<ISidebarItem> = ({
    icon: Icon,
    label,
    href,
    active,
}): JSX.Element => {
    return (
        <Link
            className={twMerge(`
                flex
                flex-row
                h-auto
                items-center
                w-full
                gap-x-4
                text-md
                font-medium
                cursor-pointer
                hover:text-white
                transition
                text-neutral-400
                py-1
            `,
                active && 'text-white'
            )}
            href={href}
        >
            <Icon size={26} />
            <p className="truncate w-full">{label}</p>
        </Link>
    );
};
