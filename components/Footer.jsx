import Link from 'next/link';
import Image from 'next/image';

import novagraphix_icon from '@/public/images/novagraphix_icon.png';

const Footer = () => (
    <footer className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
            <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link href="/" className="flex title-font font-medium items-center md:justify-start justify-center text-slate-400 hover:text-slate-50">
                <Image src={novagraphix_icon} alt="novagraphix_icon" priority />
                <span className="ml-3 text-xl">NovaGraphix</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">Your choice can change the rules of the game for your business.</p>
            </div>
            <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">ENTERPRISE</h2>
                <nav className="list-none mb-10">
                    <li>
                        <Link target="_blank" href="/products/natureworks/execute" className="text-gray-400 hover:text-white">3D Nature Engine</Link>
                    </li>
                    <li>
                        <Link target="_blank" href="/products/viewworks/execute" className="text-gray-400 hover:text-white">3D Model Viewer</Link>
                    </li>
                    <li>
                        <Link target="_blank" href="/products/medicalworks/execute" className="text-gray-400 hover:text-white">3D Medical Solution</Link>
                    </li>
                    <li>
                        <Link href="#" className="text-gray-400 hover:text-white">Become a Partner</Link>
                    </li>
                </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">MARKETPLACE</h2>
                <nav className="list-none mb-10">
                    <li>
                        <Link href="#" className="text-gray-400 hover:text-white">Free 3D Models</Link>
                    </li>
                    <li>
                        <Link href="#" className="text-gray-400 hover:text-white">Voxel Models</Link>
                    </li>
                    <li>
                        <Link href="#" className="text-gray-400 hover:text-white">Become a Seller</Link>
                    </li>
                </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">LEGAL</h2>
                <nav className="list-none mb-10">
                    <li>
                        <Link target="_blank" href="/register/terms" className="text-gray-400 hover:text-white">Terms & Conditions</Link>
                    </li>
                    <li>
                        <Link target="_blank" href="/register/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link target="_blank" href="/register/license" className="text-gray-400 hover:text-white">License</Link>
                    </li>
                </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">COMMUNITY</h2>
                <nav className="list-none mb-10">
                    <li>
                        <Link href="https://github.com/sangkunine/NovaGraphix" className="text-gray-400 hover:text-white">Github</Link>
                    </li>
                    <li>
                        <Link href="https://www.youtube.com/@3D-novagraphix" className="text-gray-400 hover:text-white">YouTube</Link>
                    </li>
                    <li>
                        <Link href="https://www.linkedin.com/company/novagraphix" className="text-gray-400 hover:text-white">LinkedIn</Link>
                    </li>
                    <li>
                        <Link href="https://www.facebook.com/NovaGraphixCo" className="text-gray-400 hover:text-white">Facebook</Link>
                    </li>
                </nav>
            </div>
            </div>
        </div>
        <div className="bg-gray-800 bg-opacity-75">
            <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-400 text-sm text-center sm:text-left">© 2018 NovaGraphix —
                <Link href="https://www.youtube.com/@3D-novagraphix" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-100 ml-1" target="_blank">@3D-novagraphix</Link>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                <Link href="#" className="hover:text-gray-100">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                </Link>
                <Link href="#" className="ml-3 hover:text-gray-100">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                </Link>
                <Link href="#" className="ml-3 hover:text-gray-100">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                </Link>
                <Link href="#" className="ml-3 hover:text-gray-100">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                        <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                        <circle cx="4" cy="4" r="2" stroke="none"></circle>
                    </svg>
                </Link>
            </span>
            </div>
        </div>
    </footer>
);

export default Footer;