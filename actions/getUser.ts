import { createServerComponentClient, User } from '@supabase/auth-helpers-nextjs';
import { Subscription, UserDetails } from '@/types';
import { cookies } from 'next/headers';

export interface IGetUserResponse {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    subscription: Subscription | null;
}

export const getUser = async (): Promise<IGetUserResponse> => {
    const supabase = createServerComponentClient({
        cookies,
    });

    const {
        data: {
            session,
        }
    } = await supabase.auth.getSession();

    const {
        data: {
            user,
        },
    } = await supabase.auth.getUser();

    const {
        data: userDetails,
    } = await supabase
        .from('users')
        .select('*')
        .single();

    const {
        data: subscription,
    } = await supabase
        .from('subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .single();

    return {
        accessToken: session?.access_token || null,
        user,
        userDetails,
        subscription,
    }
}
