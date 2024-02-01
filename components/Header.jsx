'use client'

import Link from 'next/link';
import Image from 'next/image';
import ToggleDark from './ToggleDark';
import SearchDB from './SearchDB';
import Products from '@/app/products/page';
import { signOut, useSession } from "next-auth/react";

import { useState, useEffect } from 'react';
import { useShoppingCart } from './UseShoppingCart';

import novagraphix_icon from '@/public/images/novagraphix_icon.png';
import shoppingcart_icon from '@/public/images/shoppingcart_icon.png';

import { HomeIcon, BuildingIcon, PhoneIcon, UserIcon, RegisterIcon, LoginIcon, LogoutIcon } from './ClientUI';

const Header = () =>
{
    // login, register, profile
    const { data: session } = useSession();
    const user = session?.user;

    // shopping cart
    const [ itemCount, setItemCount ] = useState( 0 );
    const { totalUniqueItems } = useShoppingCart();
    useEffect(() => {
        setItemCount( totalUniqueItems );
    }, [ totalUniqueItems ]);

    return (
        <header className="bg-primary text-gray-400 bg-gray-900 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

                {/* Novagraphix */}
                <Link href="/" className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <Image src={novagraphix_icon} alt="novagraphix_icon" />
                    <span className="dark-text-slate ml-3 text-xl">NovaGraphix</span>
                </Link>

                {/* Search database */}
                <SearchDB />

                {/* Nav */}
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

                    {/* Home */}
                    <Link href="/" className="mr-5 flex flex-col items-center">
                        <HomeIcon />Home
                    </Link>

                    {/* Products */}
                    <Products />

                    {/* Marketplace */}
                    <Link href="/marketplace" className="mr-5 flex flex-col items-center">
                        <BuildingIcon />Marketplace
                    </Link>

                    {/* Contact */}
                    <Link href="/contact" className="mr-5 flex flex-col items-center">
                        <PhoneIcon />Contact
                    </Link>

                    {/* Login & Register */}
                    {!user && (
                        <div className="flex flex-row">
                            <Link href="/login" className="mr-5 flex flex-col items-center">
                                <LoginIcon />Login
                            </Link>

                            <Link href="/register" className="mr-5 flex flex-col items-center">
                                <RegisterIcon />Register
                            </Link>
                        </div>
                    )}

                    {/* Profile & Logout */}
                    {user && (
                        <div className="flex flex-row">
                            <Link href="/profile" className="mr-5 flex flex-col items-center">
                                <UserIcon />Profile
                            </Link>

                            <span className="dark-text-slate cursor-pointer mr-5 flex flex-col items-center" onClick={() => signOut()}>
                                <LogoutIcon />Logout
                            </span>
                        </div>
                    )}

                    {/* Shopping Cart */}
                    {itemCount > 0 && (
                        <Link href="/marketplace/shoppingcart" className="mr-5 has-tooltip">
                            <span className="tooltip p-1 rounded bg-gray-900 text-white shadow-lg mt-8 text-sm">
                                Shopping Cart
                            </span>

                            <Image className="inline-block" src={shoppingcart_icon} alt="ShoppingCart" />
                            <span className="relative right-1 -top-3 ml-1">({itemCount})</span>
                        </Link>
                    )}
                </nav>

                <ToggleDark />

            </div>
        </header>
    );
}

export default Header;