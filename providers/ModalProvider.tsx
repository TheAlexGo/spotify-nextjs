'use client';

import { FC, JSX, useEffect, useState } from 'react';
import { AuthModal } from '@/components/Modal/components/AuthModal/AuthModal';
import { UploadModal } from '@/components/Modal/components/UploadModal/UploadModal';

interface IModalProvider {
}

export const ModalProvider: FC<IModalProvider> = ({...props}): JSX.Element | null => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
            <UploadModal />
        </>
    );
};
