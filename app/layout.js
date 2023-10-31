import './globals.css';
import { ServerThemeProvider } from '@wits/next-themes';
import Providers from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children })
{
    return (
        <ServerThemeProvider attribute="class">
            <html lang="en">
                <head />
                <body>
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