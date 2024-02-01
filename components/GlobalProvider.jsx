'use client'

import { ThemeProvider } from 'next-themes';
import NextAuthProvider from './NextAuthProvider';
import { ShoppingCartProvider } from './UseShoppingCart';

export default function GlobalProvider({ children })
{
    return (
        <ThemeProvider attribute="class">
            <NextAuthProvider>
                <ShoppingCartProvider>
                {/* <OtherProvider> */}
                    {children}
                {/* </OtherProvider> */}
                </ShoppingCartProvider>
            </NextAuthProvider>
        </ThemeProvider>
    );
}