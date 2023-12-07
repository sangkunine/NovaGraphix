'use client'

import { useEffect } from 'react';
import Link from 'next/link';

export default function ProductsPage()
{
    useEffect( () => { import('preline') }, [] );

    const dropdownStyle = "mr-5 hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] sm:[--trigger:hover] sm:py-4";
    const buttonTextStyle = "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50";
    const buttonStyle = "flex items-center w-full text-white/[.8] font-medium " + buttonTextStyle;
    const aParentStyle = "hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:left-0 before:w-full before:h-5";
    const aStyle = "flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300";

    return (
        <div className={dropdownStyle}>
            <button type="button" className={buttonStyle}>
                <Link href="#">Products</Link>
            </button>
            <div className={aParentStyle}>
                <Link href="/products/natureworks" className={aStyle}>NatureWorks</Link>
                <Link href="/products/viewworks" className={aStyle}>ViewWorks</Link>
                <Link href="/products/medicalworks" className={aStyle}>MedicalWorks</Link>
                <Link href="/products/voxelmesh" className={aStyle}>VoxelMesh</Link>
            </div>
        </div>
    );
}