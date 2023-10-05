import { ServerThemeProvider } from '@wits/next-themes';
import Providers from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './globals.css';

export default function RootLayout({ children })
{
    return (
        <ServerThemeProvider attribute="class">
            <html lang="en">
                {/*
                <head /> will contain the components returned by the nearest parent
                head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
                */}
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