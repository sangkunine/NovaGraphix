'use client'

import Link from 'next/link';
import ToggleDark from './ToggleDark';
import SearchDB from './SearchDB';
import Products from '@/app/products/page';
import { signOut, useSession } from "next-auth/react";

const Header = () =>
{
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <header className="bg-primary text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="dark-text-slate ml-3 text-xl">NovaGraphix</span>
                </Link>
                {/* search database */}
                <SearchDB />
                {/* nav */}
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <Link href="/" className="mr-5">Home</Link>
                    {/* <Link href="/products" className="mr-5">Products</Link> */}
                    <Products />
                    <Link href="/marketplace" className="mr-5">Marketplace</Link>
                    <Link href="/contact" className="mr-5">Contact</Link>
                </nav>
                {/* login & register */}
                {!user && (
                    <>
                        <Link href="/login" className="mr-5">Login</Link>
                        <Link href="/register" className="mr-5">Register</Link>
                    </>
                )}
                {/* profile & logout */}
                {user && (
                    <>
                        <Link href="/profile" className="mr-5">Profile</Link>
                        <span className="dark-text-slate mr-5 cursor-pointer" onClick={() => signOut()}>Logout</span>
                    </>
                )}
                <ToggleDark />
            </div>
        </header>
    );
}

export default Header;