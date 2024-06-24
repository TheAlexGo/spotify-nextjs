'use client';

import NProgress from 'nprogress';
import { FC, JSX, useEffect } from 'react';
import { ISong } from '@/types';
import { MediaItem } from '@/components/MediaItem/MediaItem';
import { LikeButton } from '@/components/LikeButton/LikeButton';
import { useOnPlay } from '@/hooks/useOnPlay';

interface ILikedContent {
    songs: ISong[];
}

export const LikedContent: FC<ILikedContent> = ({ songs }): JSX.Element => {
    const onPlay = useOnPlay(songs);

    useEffect(() => {
        NProgress.done();
    }, []);

    if (songs.length === 0) {
        return (
            <div
                className="
                    flex
                    flex-col
                    gap-y-2
                    w-full
                    px-6
                    text-neutral-400
                "
            >
                No liked songs.
            </div>
        )
    }

    return (
        <div
            className="
                flex
                flex-col
                gap-y-2
                w-full
                p-6
            "
        >
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="
                        flex
                        items-center
                        gap-x-4
                        w-full
                    "
                >
                    <div className="flex-1">
                        <MediaItem
                            data={song}
                            onClick={onPlay}
                        />
                    </div>
                    <LikeButton song={song} />
                </div>
            ))}
        </div>
    );
};
