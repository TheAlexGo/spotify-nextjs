'use client';

import { FC, JSX, useEffect, useState } from 'react';
import { ISong } from '@/types';
import { MediaItem } from '@/components/MediaItem/MediaItem';
import { LikeButton } from '@/components/LikeButton/LikeButton';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { Slider } from '@/components/Slider/Slider';
import { usePlayer } from '@/hooks/usePlayer';
import useSound from 'use-sound';

interface IPlayerContent {
    song: ISong;
    songUrl: string;
}

export const PlayerContent: FC<IPlayerContent> = ({ song, songUrl }): JSX.Element => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);
    };

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    const playHandler = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    };

    const volumeChangeHandler = (value: number) => {
        setVolume(value);
    }

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    return (
        <div
            className="
                grid
                grid-cols-2
                md:grid-cols-3
                h-full
            "
        >
            <div
                className="
                    flex
                    w-full
                    justify-start
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-x-4
                    "
                >
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            <div
                className="
                        flex
                        md:hidden
                        col-auto
                        w-full
                        justify-end
                        items-center
                    "
            >
                <button
                    className="
                            h-10
                            w-10
                            flex
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            p-1
                            cursor-pointer
                        "
                    onClick={() => {}}
                >
                    <Icon className="text-black" size={30} />
                </button>
            </div>

            <div
                className="
                    hidden
                    h-full
                    md:flex
                    justify-center
                    items-center
                    w-full
                    max-w-[722px]
                    gap-x-6
                "
            >
                <button onClick={onPlayPrevious}>
                    <AiFillStepBackward
                        className="
                        text-neutral-400
                        cursor-pointer
                        hover:text-white
                        transition
                    "
                        size={30}
                    />
                </button>
                <button
                    className="
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                    onClick={playHandler}
                >
                    <Icon className="text-black" size={30} />
                </button>
                <button onClick={onPlayNext}>
                    <AiFillStepForward
                        className="
                            text-neutral-400
                            hover:text-white
                            transition
                        "
                        size={30}
                    />
                </button>
            </div>

            <div
                className="
                    hidden
                    md:flex
                    w-full
                    justify-end
                    pr-2
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-x-2
                        w-[120px]
                    "
                >
                    <button onClick={toggleMute}>
                        <VolumeIcon size={34} />
                    </button>
                    <Slider
                        value={volume}
                        onChange={volumeChangeHandler}
                    />
                </div>
            </div>
        </div>
    );
};
