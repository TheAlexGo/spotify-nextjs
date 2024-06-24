import { getLikedSongs } from '@/actions/getLikedSongs';
import { getUser } from '@/actions/getUser';
import { Header } from '@/components/Header/Header';
import Image from 'next/image';
import { LikedContent } from '@/app/liked/components/LikedContent/LikedContent';
import { redirect } from 'next/navigation';

export const revalidate = 0;

export default async function Liked() {
    const { user } = await getUser();
    if (!user) {
        redirect('/');

    }

    const songs = await getLikedSongs();

    return (
        <div
            className="
                bg-neutral-900
                rounded-lg
                h-full
                w-full
                overflow-hidden
                overflow-y-auto
            "
        >
            <Header>
                <div className="mt-20">
                    <div
                        className="
                            flex
                            flex-col
                            md:flex-row
                            items-center
                            gap-x-5
                        "
                    >
                        <div className="
                            relative
                            h-32
                            w-32
                            lg:h-44
                            lg:w-44
                        ">
                            <Image
                                className="object-cover"
                                src="/images/liked.png"
                                fill
                                alt="Playlist"
                            />
                        </div>
                        <div
                            className="
                                flex
                                flex-col
                                gap-y-2
                                mt-4
                                md:mt-0
                            "
                        >
                            <p
                                className="
                                    hidden
                                    md:block
                                    font-semibold
                                    text-sm
                                "
                            >
                                Playlist
                            </p>
                            <h1
                                className="
                                    text-white
                                    text-4xl
                                    sm:text-5xl
                                    lg:text-7xl
                                    font-bold
                                "
                            >
                                Liked Songs
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songs} />
        </div>
    )
}
