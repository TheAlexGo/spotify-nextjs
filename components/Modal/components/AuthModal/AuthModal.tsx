'use client';

import { FC, JSX, useEffect } from 'react';
import { Modal } from '@/components/Modal/Modal';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useUser } from '@/hooks/useUser';

interface IAuthModal {
}

export const AuthModal: FC<IAuthModal> = (): JSX.Element => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();
    const { user } = useUser();

    const changeHandler = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    useEffect(() => {
        if (session) {
            onClose();
        }
    }, [onClose, session]);

    useEffect(() => {
        if (session && (isOpen || !user)) {
            router.refresh();
        }
    }, [isOpen, router, session, user]);

    return (
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen={isOpen}
            onChange={changeHandler}
        >
            <Auth
                theme="dark"
                magicLink
                providers={['github']}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: '#404040',
                                brandAccent: '#22c55e',
                            }
                        }
                    }
                }}
            />
        </Modal>
    );
};
