'use client'

import { useEffect } from 'react';
// import Link from 'next/link';

export default function ProductsPage()
{
    // const youtubeId = 'X9dkxjxfKK4';
    // return (
    //     <div>
    //         <h1>Products page</h1>
    //         <div>
    //             <iframe src="https://sangkunine.github.io/NatureWorks/" width={1920*0.5} height={1080*0.5} />
    //         </div>
    //         <div>
    //             <iframe src={`https://www.youtube.com/embed/${youtubeId}`} width={16*50} height={9*50} allowFullScreen />
    //         </div>
    //         <Link href="/">Back to Home page</Link>
    //     </div>
    // );

    useEffect( () => { import('preline') }, [] );

    const dropdownStyle = "mr-5 hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] sm:[--trigger:hover] sm:py-4";
    const buttonTextStyle = "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50";
    const buttonStyle = "flex items-center w-full text-white/[.8] font-medium " + buttonTextStyle;
    const aParentStyle = "hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:left-0 before:w-full before:h-5";
    const aStyle = "flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300";

    return (
        <div className={dropdownStyle}>
            <button type="button" className={buttonStyle}>
                Products
            </button>

            <div className={aParentStyle}>
                <a href="/products/natureworks" className={aStyle}>
                    NatureWorks
                </a>
                <a href="/products/viewworks" className={aStyle}>
                    ViewWorks
                </a>
                <a href="/products/medicalworks" className={aStyle}>
                    MedicalWorks
                </a>
                <a href="/products/voxelmesh" className={aStyle}>
                    VoxelMesh
                </a>

                {/* <div className="hs-dropdown relative [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] sm:[--trigger:hover]">
                    <button type="button" className="w-full flex justify-between w-full items-center text-sm text-gray-800 rounded-md py-2 px-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                        Sub Menu
                        <svg className="sm:-rotate-90 ml-2 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                        </svg>
                    </button>

                    <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-2 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute sm:border before:-right-5 before:top-0 before:h-full before:w-5 top-0 right-full !mx-[10px]">
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                            About
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                            Downloads
                        </a>
                        <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300" href="#">
                            Team Account
                        </a>
                    </div>
                </div> */}

            </div>
        </div>
    );
}