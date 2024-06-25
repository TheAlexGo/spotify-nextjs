'use client';

import { FC, JSX } from 'react';
import { ISong } from '@/types';
import { useLoadImage } from '@/hooks/useLoadImage';
import Image from 'next/image';

interface IMediaItem {
    data: ISong;
    onClick?: (id: string) => void;
}

export const MediaItem: FC<IMediaItem> = ({ data, onClick }): JSX.Element => {
    const imageUrl = useLoadImage(data);

    const clickHandler = () => {
        if (onClick) {
            return onClick(data.id);
        }

        // TODO: Default turn on player
    }
    return (
        <button
            className="
                flex
                items-center
                gap-x-3
                cursor-pointer
                hover:bg-neutral-800/50
                w-full
                p-2
                rounded-md
                text-left
                min-w-0
            "
            onClick={clickHandler}
        >
            <div
                className="
                    relative
                    rounded-md
                    min-h-[48px]
                    min-w-[48px]
                    overflow-hidden
                "
            >
                <Image
                    className="object-cover"
                    src={imageUrl || '/images/liked.png'}
                    fill
                    alt="Media item"
                />
            </div>
            <div
                className="
                    flex
                    flex-col
                    gap-y-1
                    overflow-hidden
                "
            >
                <p className="text-white truncate">
                    {data.title}
                </p>
                <p className="text-neutral-400 text-sm truncate">
                    {data.author}
                </p>
            </div>
        </button>
    );
};
