import { ISong } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getSongs = async (): Promise<ISong[]> => {
    const supabase = createServerComponentClient({
        cookies,
    });

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .order('created_at', {
            ascending: false,
        });

    if (error) {
        console.log(error);
    }

    return data as ISong[] || [];
}
