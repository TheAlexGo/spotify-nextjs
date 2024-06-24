import { Header } from '@/components/Header/Header';
import { getUser } from '@/actions/getUser';
import Image from 'next/image';

export default async function Account() {
    const { user } = await getUser();

    if (!user) {
        return null;
    }

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
            <Header
                className="
                    from-bg-neutral-900
                "
            >
                <div className="mb-2 flex gap-x-4">
                    <div className="shrink-0">
                        <Image
                            className="rounded-full"
                            src={user.user_metadata.avatar_url}
                            width={128}
                            height={128}
                            alt={user.user_metadata.full_name}
                        />
                    </div>
                    <div className="flex flex-col justify-end">
                        <span className="text-sm">Account</span>
                        <h1 className="text-4xl lg:text-6xl xl:text-7xl !leading-normal font-bold">{user.user_metadata.full_name || 'Unnamed user'}</h1>
                    </div>
                </div>
            </Header>
        </div>
    )
}
