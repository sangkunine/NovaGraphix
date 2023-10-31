/** @type {import('tailwindcss').Config} */

module.exports =
{
    mode: 'jit',
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        'node_modules/preline/dist/*.js',
    ],
    theme: {
        // extend: {},
        extend: {
            fontFamily: {
                sans: [
                    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
                ],
            },
        },
    },
    plugins: [
        require('preline/plugin'),
    ],
    darkMode: 'class',
}