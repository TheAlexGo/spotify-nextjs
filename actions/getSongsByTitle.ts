import { ISong } from '@/types';
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

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', {
            ascending: false,
        });

    if (error) {
        console.log(error);
    }

    return data as ISong[] || [];
}
