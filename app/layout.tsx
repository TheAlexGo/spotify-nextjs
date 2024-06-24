import { Sidebar } from '@/components/Sidebar/Sidebar';
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { SupabaseProvider } from '@/providers/SupabaseProvider';
import { UserProvider } from '@/providers/UserProvider';
import { ModalProvider } from '@/providers/ModalProvider';
import { ToasterProvider } from '@/providers/ToasterProvider';
import { getSongsByUserId } from '@/actions/getSongsByUserId';
import { Player } from '@/components/Player/Player';
import { getUser } from '@/actions/getUser';
import NextTopLoader from 'nextjs-toploader';

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Next',
  description: 'Listen to music!',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const userSongs = await getSongsByUserId();
    const userData = await getUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <NextTopLoader color="#fff" showSpinner={false} />
        <ToasterProvider />
        <SupabaseProvider>
            <UserProvider serverData={userData}>
                <ModalProvider />
                <Sidebar songs={userSongs}>
                    {children}
                </Sidebar>
                <Player />
            </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
