'use client';

import { FC, JSX, PropsWithChildren } from 'react';
import { MyUserContextProvider } from '@/hooks/useUser';

interface IUserProvider extends PropsWithChildren {
}

export const UserProvider: FC<IUserProvider> = ({ children }): JSX.Element => {
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    );
};
