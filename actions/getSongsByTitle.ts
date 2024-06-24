import { ILikedSong, ISong } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getSongs } from '@/actions/getSongs';

export const getSongsByTitle = async (title: string): Promise<ISong[]> => {
    const supabase = createServerComponentClient({
        cookies,
    });

    if (!title) {
        return await getSongs();
    }

    const {
        data: {
            user,
        },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
        .from('songs')
        .select(`
            *,
            liked_songs(user_id)
        `)
        .ilike('title', `%${title}%`)
        .order('created_at', {
            ascending: false,
        });

    if (error) {
        console.log(error);
    }

    return data!.map((song) => {
        return {
            ...song,
            liked: user
                ? song.liked_songs.find(({ user_id }: ILikedSong) => user_id === user.id)
                : false,
        }
    }) as ISong[] || [];
}
