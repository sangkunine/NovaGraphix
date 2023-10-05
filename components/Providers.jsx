'use client'

import { ThemeProvider } from 'next-themes';

const Providers = ({ children }) =>
(
    <ThemeProvider attribute="class">
        {/* <OtherProvider> */}
        {children}
        {/* </OtherProvider> */}
    </ThemeProvider>
);

export default Providers;