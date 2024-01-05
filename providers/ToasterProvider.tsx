'use client';

import { FC, JSX } from 'react';
import { Toaster } from 'react-hot-toast';

export const ToasterProvider: FC = (): JSX.Element => {
    return (
        <Toaster toastOptions={{
            style: {
                background: '#333',
                color: '#fff'
            }
        }} />
    );
};
