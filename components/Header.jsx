'use client'

import Link from 'next/link';
import Image from 'next/image';
import ToggleDark from './ToggleDark';
import SearchDB from './SearchDB';
import Products from '@/app/products/page';
import { signOut, useSession } from "next-auth/react";

import novagraphix_icon from '@/public/images/novagraphix_icon.png';

const Header = () =>
{
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <header className="bg-primary text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <Image src={novagraphix_icon} alt="novagraphix_icon" priority />
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