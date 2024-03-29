import { getSongsByTitle } from '@/actions/getSongsByTitle';
import { Header } from '@/components/Header/Header';
import { SearchInput } from '@/components/Input/components/SearchInput/SearchInput';
import { SearchContent } from './components/SearchContent/SearchContent';

interface ISearch {
    searchParams: {
        title: string;
    }
}

export const revalidate = 0;

export default async function Search({ searchParams: { title } }: ISearch) {
    const songs = await getSongsByTitle(title);

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
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Search
                    </h1>
                    <SearchInput searchValue={title} />
                </div>
            </Header>
            <SearchContent songs={songs} />
        </div>
    )
}
