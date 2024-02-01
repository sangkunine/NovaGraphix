'use client'

import JAMIE from '@/utils/jamieWorks';
import { useRef, useState } from 'react';
import { useShoppingCart } from './UseShoppingCart';

import Image from 'next/image';
import shoppingcart_icon from '@/public/images/shoppingcart_icon.png';

//==============================================================================
// Buttons
//==============================================================================

export const AddToCartButton = ({ item, px = 6, py = 2 }) =>
{
    const { items, addItem } = useShoppingCart();

    const handleClick = () =>
    {
        addItem({
            id: item.id,
            price: item.price,
            name: item.name,
            thumbnail: item.thumbnail,
            // quantity: item.quantity,
        }, 1 );
    }

    return (
        <button 
            disabled={ items.findIndex( i => i.id === item.id ) !== -1 } 
            onClick={ handleClick } 
            className={`flex ml-auto bg-slate-700 px-${px} py-${py} hover:bg-slate-900 rounded disabled:opacity-20`}>
            <p class="text-xs text-white">ADD TO CART</p>
        </button>
    );
}
export const HeartButton = () =>
{
    return (
        <button onClick={() => alert("좋아요!!")} className="w-10 h-10 p-0 ml-4 hover:bg-indigo-600 border-2 rounded-full inline-flex items-center justify-center text-indigo-200">
            <HeartIcon />
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

//==============================================================================
// Icons
//==============================================================================

export const HomeIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
)

export const GiftIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
)

export const BuildingIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
    </svg>
)

export const PhoneIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
)

const ArrowDownIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
)

const GearIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
)

const Bar4Icon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
)

export const UserIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
)

export const RegisterIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
    </svg>
)

export const LoginIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
    </svg>
)

export const LogoutIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
)

const HeartIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
)

const StarIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
)

const CartIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
)

const FacebookIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
    </svg>
)
const TwitterIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
    </svg>
)
const TalkIcon = ({ w = 6, h = 6 }) => (
    <svg className={`w-${w} h-${h}`} fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
    </svg>
)
const SNSIcons = ({ w = 6, h = 6 }) => (
    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
        <a className="text-gray-500"><FacebookIcon w={w} h={h} /></a>
        <a className="text-gray-500"><TwitterIcon w={w} h={h} /></a>
        <a className="text-gray-500"><TalkIcon w={w} h={h} /></a>
    </span>
)

//==============================================================================
// dummy
//==============================================================================

const __SizeSelect = () => (
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
const __ColorSelect = () => (
    <div className="flex">
        <span className="mr-3">Color</span>
        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none ml-1 bg-gray-700"></button>
        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none ml-1 bg-indigo-500"></button>
    </div>
)