'use client';

import { FC, JSX, useEffect, useMemo, useState } from 'react';
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
    const [currentSeconds, setCurrentSeconds] = useState(0);
    const [isDragged, setIsDragged] = useState(false);

    const [play, { pause, sound, duration }] = useSound(
        songUrl,
        {
            volume,
            html5: true,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3'],
        }
    );

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
    };

    const durationChangeHandler = (value: number) => {
        setCurrentSeconds(value);
    };

    const durationChangeCommitHandler = ([value]: number[]) => {
        sound?.seek(value);
        setCurrentSeconds(value);
    };

    const durationSliderPointerDownHandler = () => {
        setIsDragged(true);
    };

    const durationSliderPointerUpHandler = () => {
        setIsDragged(false);
    };

    const currentTime = useMemo(() => {
        const result = [];

        result.push(Math.floor(currentSeconds / 60));
        result.push(('0' + Math.floor(currentSeconds % 60)).slice(-2));

        return result.join(':');
    }, [currentSeconds]);

    const fullTime = useMemo(() => {
        const result = [];

        const seconds = duration! / 1000;
        result.push(Math.floor(seconds / 60));
        result.push(('0' + Math.floor(seconds % 60)).slice(-2));

        return result.join(':');
    }, [duration]);

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!sound || isDragged) {
                return;
            }
            if (!isPlaying) {
                clearInterval(interval);
                return;
            }
            const seconds = sound.seek();
            setCurrentSeconds(seconds);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [isDragged, isPlaying, sound]);

    return (
        <div>
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
                        onClick={playHandler}
                    >
                        <Icon className="text-black" size={30} />
                    </button>
                </div>

                <div
                    className="
                    hidden
                    h-full
                    md:flex
                    flex-col
                    gap-y-2
                    w-full
                    max-w-[722px]
                "
                >
                    <div
                        className="
                            flex
                            justify-center
                            items-center
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
                            flex
                            items-center
                            justify-center
                            gap-x-3
                        "
                    >
                        <span
                            className="
                                text-sm
                                text-neutral-400
                            "
                        >
                            {currentTime}
                        </span>
                        <Slider
                            className="h-3"
                            value={currentSeconds}
                            defaultValue={duration!}
                            max={duration! / 1000}
                            step={1}
                            onChange={durationChangeHandler}
                            onValueCommit={durationChangeCommitHandler}
                            onPointerDown={durationSliderPointerDownHandler}
                            onPointerUp={durationSliderPointerUpHandler}
                            aria-label="Sound duration"
                        />
                        <span
                            className="
                                text-sm
                                text-neutral-400
                            "
                        >
                            {fullTime}
                        </span>
                    </div>
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
                            className="h-10"
                            value={volume}
                            max={1}
                            onChange={volumeChangeHandler}
                            aria-label="Volume"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
