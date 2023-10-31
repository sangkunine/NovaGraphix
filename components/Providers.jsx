'use client'

import { ThemeProvider } from 'next-themes';
import NextAuthProvider from './NextAuthProvider';

export default function Providers({ children })
{
    return (
        <ThemeProvider attribute="class">
            <NextAuthProvider>
                {/* <OtherProvider> */}
                {children}
                {/* </OtherProvider> */}
            </NextAuthProvider>
        </ThemeProvider>
    );
}