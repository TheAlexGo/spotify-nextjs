'use client';

import { useAuthModal } from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { FC, JSX } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import NProgress from 'nprogress';

interface IListItem {
    image: string;
    name: string;
    href: string;
}

export const ListItem: FC<IListItem> = ({ image, name, href }): JSX.Element => {
    const router = useRouter();
    const authModal = useAuthModal();
    const { user } = useUser();

    const clickHandler = () => {
        if (!user) {
            return authModal.onOpen();
        }
        NProgress.start();
        router.push(href);
    };

    return (
        <button
            className="
                relative
                group
                flex
                items-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-neutral-100/10
                hover:bg-neutral-100/20
                transition
                pr-4
            "
            onClick={clickHandler}
        >
            <div
                className="
                    relative
                    min-h-[64px]
                    min-w-[64px]
                "
            >
                <Image
                    className="object-cover"
                    src={image}
                    alt="Image"
                    fill
                />
            </div>
            <p className="font-medium truncate py-5">
                {name}
            </p>
            <div
                className="
                    absolute
                    transition
                    opacity-0
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-green-500
                    p-4
                    drop-shadow-md
                    right-5
                    group-hover:opacity-100
                    hover:scale-110
                "
            >
                <FaPlay className="text-black" />
            </div>
        </button>
    );
};
