import { ILikedSong, ISong } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getLikedSongs = async (): Promise<ISong[]> => {
    const supabase = createServerComponentClient({
        cookies,
    });

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
        .from('songs')
        .select('*, liked_songs!inner(user_id)')
        .eq('liked_songs.user_id', session?.user?.id)
        .order('created_at', {
            ascending: false,
        });

    if (error) {
        console.log(error);
        return [];
    }

    if (!data) {
        return [];
    }

    return data.map((song: Omit<ISong, 'liked'> & { liked_songs: ILikedSong[] }) => ({
        ...song,
        liked: Boolean(song.liked_songs.length),
    }));
}
