import dotenv from 'dotenv';
import './globals.css';
import { ServerThemeProvider } from '@wits/next-themes';
import Providers from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';

dotenv.config();

export default function RootLayout({ children })
{
    return (
        <ServerThemeProvider attribute="class">
            <html lang="en">
                <head />
                <body suppressHydrationWarning={true}>
                    <Providers>
                        <Header />
                        {children}
                        <Footer />
                    </Providers>
                </body>
            </html>
        </ServerThemeProvider>
    );
}