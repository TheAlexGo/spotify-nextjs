'use client';
import { FC, JSX } from 'react';
import { TbPlaylist } from 'react-icons/tb';
import { AiOutlinePlus } from 'react-icons/ai';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';
import { useUploadModal } from '@/hooks/useUploadModal';
import { ISong } from '@/types';
import { MediaItem } from '@/components/MediaItem/MediaItem';
import { useOnPlay } from '@/hooks/useOnPlay';

interface ILibrary {
    songs: ISong[];
}

export const Library: FC<ILibrary> = ({ songs }): JSX.Element => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();

    const onPlay = useOnPlay(songs);

    const clickHandler = () => {
        if (!user) {
            return authModal.onOpen();
        }

        // TODO: check for subscription
        return uploadModal.onOpen();
    }
    return (
        <div className="flex flex-col">
            <div
                className="
                    flex
                    items-center
                    justify-between
                    px-5
                    pt-4
                "
            >
                <div
                    className="
                        inline-flex
                        items-center
                        gap-x-2
                    "
                >
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p
                        className="
                            text-neutral-400
                            font-medium
                            text-md
                        "
                    >
                        Your library
                    </p>
                </div>
                <button
                    className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                    onClick={clickHandler}
                >
                    <AiOutlinePlus size={20} />
                </button>
            </div>
            <div
                className="
                    flex
                    flex-col
                    gap-y-2
                    mt-4
                    px-3
                "
            >
                {songs.map((song) => (
                    <MediaItem
                        key={song.id}
                        onClick={onPlay}
                        data={song}
                    />
                ))}
            </div>
        </div>
    );
};
