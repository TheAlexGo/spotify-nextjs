import { useUser } from '@/hooks/useUser';
import { useEffect, useMemo, useState } from 'react';
import { ILikedSong, ISong } from '@/types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { toast } from 'react-hot-toast';

export const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState<ISong | undefined>(undefined);
    const { supabaseClient } = useSessionContext();
    const { user } = useUser();

    useEffect(() => {
        if (!id) {
            return;
        }

        setIsLoading(true);

        const fetchSong = async () => {
            const { data, error } = await supabaseClient
                .from('songs')
                .select(`
                    *,
                    liked_songs(user_id)
                `)
                .eq('id', id)
                .single();

            if (error) {
                setIsLoading(false);
                return toast.error(error.message);
            }

            setSong({
                ...data,
                liked: user
                    ? data.liked_songs.find(({ user_id }: ILikedSong) => user_id === user.id)
                    : false,
            } as ISong);
            setIsLoading(false);
        }

        fetchSong();
    }, [id, supabaseClient]);

    return useMemo(() => ({
        isLoading,
        song,
    }), [isLoading, song]);
}
