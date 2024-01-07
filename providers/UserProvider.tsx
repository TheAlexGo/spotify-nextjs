'use client';

import { createContext, FC, JSX, PropsWithChildren } from 'react';
import { IGetUserResponse } from '@/actions/getUser';

interface IUserProvider extends PropsWithChildren {
    serverData: IGetUserResponse;
}

export type UserContextType = IGetUserResponse;

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export const UserProvider: FC<IUserProvider> = ({ children, serverData }): JSX.Element => {
    return (
        <UserContext.Provider value={serverData}>
            {children}
        </UserContext.Provider>
    );
};
