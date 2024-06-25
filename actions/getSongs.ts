import { ILikedSong, ISong } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getSongs = async (): Promise<ISong[]> => {
    const supabase = createServerComponentClient({
        cookies,
    });

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
        .order('created_at', {
            ascending: false,
        });

    if (error) {
        console.log(error);
    }

    return data!.map((song: Omit<ISong, 'liked'> & { liked_songs: ILikedSong[] }) => {
        return {
            ...song,
            liked: user
                ? song.liked_songs.find(({ user_id }: ILikedSong) => user_id === user.id)
                : false,
        }
    }) as ISong[] || [];
}
