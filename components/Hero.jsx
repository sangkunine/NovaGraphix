import Link from 'next/link';
import Image from 'next/image';

import treeImg from '@/public/images/tree.png';
import novagraphixImg from '@/public/images/novagraphix.jpg';

const Hero = () => (
    <section className="bg-primary flex min-h-screen flex-col justify-center items-center text-gray-400 bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">3D Digital Metaverse
                    <br className="hidden lg:inline-block"/> with NovaGraphix
                </h1>
                <p className="mb-8 leading-relaxed">We are experts that open up new/extended graphics for you. Born in 2015, NovaGraphix is a forward-looking company focused on building digital products and solutions that are needed for the 21st century. As a provider of global information & advanced technology, we will connect you to a dynamic network of data, ideas, and people, accurately delivering science & engineering insights to customers around the world.</p>
                <div className="flex justify-center">
                    <Link href="/products" className="btn-indigo inline-flex border-0 py-2 px-6 focus:outline-none rounded text-lg">
                        Explore Products
                    </Link>
                    <Link href="/worlds" className="btn-slate ml-4 inline-flex border-0 py-2 px-6 focus:outline-none rounded text-lg">
                        Open Worlds
                    </Link>
                </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                <div className="relative md:-top-60 left-20">
                    <Link href="https://www.youtube.com/watch?v=zIxW4sn3xZ8&t=6s">
                        <Image className="absolute top-0 -left-1/2 z-10" src={treeImg} alt="treeImg" priority/>
                        <Image className="absolute top-0 left-0 z-0" src={novagraphixImg} alt="novagraphixImg" priority/>
                    </Link>
                </div>
            </div>
        </div>
    </section>
);

export default Hero;