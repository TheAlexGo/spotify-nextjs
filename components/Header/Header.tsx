'use client';

import { FC, JSX, PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { Button } from '@/components/Button/Button';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { usePlayer } from '@/hooks/usePlayer';
import Link from 'next/link';

interface IHeader extends PropsWithChildren {
    className?: string;
}

export const Header: FC<IHeader> = ({ children, className}): JSX.Element => {
    const { onOpen } = useAuthModal();
    const player = usePlayer();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();

        player.reset();
        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success('Logged out!');
        }
    };

    const backClickHandler = () => {
        router.back();
    };

    const forwardClickHandler = () => {
        router.forward();
    };

    return (
        <header
            className={twMerge(`
                h-fit
                bg-gradient-to-b
                from-emerald-800
                p-6
            `,
                className
            )}
        >
            <div
                className="
                    w-full
                    mb-4
                    flex
                    items-center
                    justify-between
                "
            >
                <div
                    className="
                        hidden
                        md:flex
                        gap-x-2
                        items-center
                    "
                >
                    <button
                        className="
                            rounded-full
                            bg-black
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition
                        "
                        onClick={backClickHandler}
                    >
                        <RxCaretLeft className="text-white" size={35} />
                    </button>
                    <button
                        className="
                            rounded-full
                            bg-black
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition
                        "
                        onClick={forwardClickHandler}
                    >
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>
                <div
                    className="
                        flex
                        md:hidden
                        gap-x-2
                        items-center
                    "
                >
                    <Link
                        href="/"
                        className="
                            rounded-full
                            p-2
                            bg-white
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition
                        "
                        aria-label="Home"
                    >
                        <HiHome className="text-black" size={20} />
                    </Link>
                    <Link
                        href="/search"
                        className="
                            rounded-full
                            p-2
                            bg-white
                            flex
                            items-center
                            justify-center
                            hover:opacity-75
                            transition
                        "
                        aria-label="Search"
                    >
                        <BiSearch className="text-black" size={20} />
                    </Link>
                </div>
                <div
                    className="
                        flex
                        justify-between
                        items-center
                        gap-x-4
                    "
                >
                    {
                        user
                            ? (
                                <div
                                    className="
                                        flex
                                        gap-x-4
                                        items-center
                                    "
                                >
                                    <Button
                                        onClick={handleLogout}
                                        className="bg-white px-6 py-2"
                                    >
                                        Logout
                                    </Button>
                                    <Link
                                        href="/account"
                                        aria-label="Profile"
                                    >
                                        <FaUserAlt />
                                    </Link>
                                </div>
                            )
                            : (
                                <>
                                    <div>
                                        <Button
                                            className="
                                bg-transparent
                                text-neutral-300
                                font-medium
                            "
                                            onClick={onOpen}
                                        >
                                            Sign up
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            className="
                                bg-white
                                px-6
                                py-2
                            "
                                            onClick={onOpen}
                                        >
                                            Log in
                                        </Button>
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
            {children}
        </header>
    );
};
