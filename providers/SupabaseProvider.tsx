import { FC, JSX, PropsWithChildren, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types_db';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

interface ISupabaseProvider extends PropsWithChildren {
}

export const SupabaseProvider: FC<ISupabaseProvider> = ({ children }): JSX.Element => {
    const [supabaseClient] = useState(() => {
        createClientComponentClient<Database>()
    });

    return (
        <SessionContextProvider supabaseClient={supabaseClient}>
            {children}
        </SessionContextProvider>
    );
};
