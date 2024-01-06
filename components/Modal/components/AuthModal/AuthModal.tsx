'use client';

import { FC, JSX, useEffect } from 'react';
import { Modal } from '@/components/Modal/Modal';
import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useAuthModal } from '@/hooks/useAuthModal';

interface IAuthModal {
}

export const AuthModal: FC<IAuthModal> = ({...props}): JSX.Element => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    const changeHandler = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    useEffect(() => {
        if (session) {
            // todo: А ОНО НАМ НАДО????? ОНО ЛОМАЕТ НАМ 404!!!!
            router.refresh();
            onClose();
        }
    }, [onClose, router, session]);

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
