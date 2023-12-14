'use client'

import JAMIE from '@/utils/viewWorks';
import { useRef, useState } from 'react';

const handleAlert = () => alert("Under Construction...");

//

const StarPath = () => <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>;

const StarNotFilled = () => (
    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
        <StarPath />
    </svg>
)

const StarFilled = () => (
    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
        <StarPath />
    </svg>
)

//

const FacebookSvg = () => (
    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
    </svg>
)

const TwitterSvg = () => (
    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
    </svg>
)

const TalkSvg = () => (
    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
    </svg>
)

const SNSLogo = () => (
    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
        <a className="text-gray-500"><FacebookSvg/></a>
        <a className="text-gray-500"><TwitterSvg/></a>
        <a className="text-gray-500"><TalkSvg/></a>
    </span>
)

//

export const SizeSelect = () => (
    <div className="flex ml-6 items-center">
        <span className="mr-3">Size</span>
        <div className="relative">
            <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                <option>SM</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
            </select>
            <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M6 9l6 6 6-6"></path>
                </svg>
            </span>
        </div>
    </div>
)

export const ColorSelect = () => (
    <div className="flex">
        <span className="mr-3">Color</span>
        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none ml-1 bg-gray-700"></button>
        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none ml-1 bg-indigo-500"></button>
    </div>
)

//

export const AddToCartButton = () =>
(
    <button onClick={handleAlert} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">ADD TO CART</button>
)
export const HeartButton = () =>
{
    return (
        <button onClick={handleAlert} className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
        </button>
    );
}

export const GeometryComplexityButton = () =>
{
    const [count, setCount] = useState( null );

    const handleClick = () =>
    {
        if( JAMIE.appWorks?.scene )
        {
            const count = JAMIE.getVertexFaceCount( JAMIE.appWorks.scene );
            setCount( count ); // count = { nvertices, nfaces }
        }
    }

    return (
        <button onClick={handleClick} className="flex text-indigo-500 border-0 my-2 focus:outline-none hover:text-indigo-600 rounded">
            Geometry complexity &#8680;
            {
                count &&
                <span className="ml-2 text-slate-500 dark:text-slate-400">
                    vertices: {count.nvertices.toLocaleString()}, faces: {count.nfaces.toLocaleString()}
                </span>
            }
        </button>
    );
}

export const MaterialComplexityButton = () =>
{
    const [count, setCount] = useState( null );

    const handleClick = () =>
    {
        if( JAMIE.appWorks?.scene )
        {
            let ntextures = JAMIE.getTextureCount( JAMIE.appWorks.scene );
            ntextures = ntextures.toLocaleString();
            let nmaterials = JAMIE.getMaterialCount( JAMIE.appWorks.scene );
            nmaterials = nmaterials.toLocaleString();
            setCount({ ntextures, nmaterials });
        }
    }

    return (
        <button onClick={handleClick} className="flex text-indigo-500 border-0 my-2 focus:outline-none hover:text-indigo-600 rounded">
            Material complexity &#8680;
            {
                count &&
                <span className="ml-2 text-slate-500 dark:text-slate-400">
                    textures: {count.ntextures}, materials: {count.nmaterials}
                </span>
            }
        </button>
    );
}

export const SelectAnimationButton = () =>
{
    const [clicked, setClicked] = useState( false );
    const animClips = useRef( null );
    const animObject = useRef( null );

    const handleClick = () =>
    {
        const removeDuplicates = ( clips ) =>
        {
            const result = [];
            const l = clips.length;
            for( let k = 0; k < l; k++ )
            {
                for( let i = 0; i < l; i++ )
                {
                    if( clips[i].name === clips[k].name )
                    {
                        if( i === k ) result.push( clips[k] );
                        break;
                    }
                }
            }
            return result;
        }

        if( JAMIE.appWorks?.scene )
        {
            if( !clicked )
            {
                JAMIE.appWorks.scene.traverse( object =>
                {
                    if( object.animations?.length > 0 )
                    {
                        console.log( '>> # clips =', object.animations );
                        animClips.current = removeDuplicates( object.animations );
                        animObject.current = object;
                        return;
                    }
                });
                setClicked( true );
            }
        }
    }

    const handleSelect = (e) =>
    {
        if( JAMIE.appWorks?.animator )
        {
            const animClip = animClips.current[ e.target.value ];
            JAMIE.appWorks.animator.playAction( animObject.current, animClip );
        }
    }

    return (
        <button onClick={handleClick} className="flex text-indigo-500 border-0 my-2 focus:outline-none hover:text-indigo-600 rounded">
            <span className="pt-[2px]">Animations &#8680;</span>
            {
                clicked && 
                (
                    animClips.current ?
                    <div className="ml-2 relative">
                        <select onChange={handleSelect} className="rounded border border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-1 pr-1">
                        {
                            animClips.current &&
                            animClips.current.map( (item, index) => (
                                <option value={index} key={item.name}>{item.name}</option>
                            ))
                        }
                        </select>
                    </div>
                    : <span className="ml-2 pt-[2px]">no animation data</span>
                )
            }
        </button>
    );
}