import './globals.css';
import { ServerThemeProvider } from '@wits/next-themes';
import Providers from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NextAuthProvider from '@/components/NextAuthProvider';

export default function RootLayout({ children })
{
    return (
        <ServerThemeProvider attribute="class">
            <html lang="en">
                <head />
                <body>
                    <Providers>
                        <NextAuthProvider>
                            <Header />
                            {children}
                            <Footer />
                        </NextAuthProvider>
                    </Providers>
                </body>
            </html>
        </ServerThemeProvider>
    );
}