'use client';

import { FC, JSX, useEffect, useState } from 'react';
import { Modal } from '@/components/Modal/Modal';

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
            <Modal title="Test" description="Test description" isOpen onChange={() => {}}>
                Test children
            </Modal>
        </>
    );
};
