'use client'

import { useState, useEffect, useCallback } from 'react';
import { redirect } from 'next/navigation';
import { encodeURIData } from '@/utils/novaUtils';

let __clickedValues = {};
let __checkedFeatures = {};
let __checkedFormats = {};
let __checkedSorts = {};

// styles for 'categories', 'features', 'rating', 'element'
const buttonStyle = "hs-dropdown-toggle ml-1 py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800";
const menuStyle = "hs-dropdown-menu w-32 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 top-0 right-0 left-auto lg:right-auto lg:left-0 min-w-[8rem] bg-white shadow-md rounded-lg p-1 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700";
const aStyle = "flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300";

// styles for 'formats'
const inputSpanStyle = "relative flex items-start py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700";
const inputParentStyle = "flex items-center h-5";
const inputStyle = "border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800";
const spanStyle = "block text-sm font-semibold text-gray-800 dark:text-gray-300";

const properties = {
    'categories': [ 'Any', 'Animals', 'Architecture', 'Art', 'Characters', 'Electronics', 'Fashion', 'Food', 'Furniture', 'History', 'Music', 'Nature', 'People', 'Science', 'Sports', 'Toy', 'Vehicles', 'Weapons' ],
    'rating': [ 'Any', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐' ],
    'element': [ 'Any', 'Polygon', 'Voxel' ],
    'features': [ 'PBR', 'Animated', 'Low Poly' ],
    'formats': [ 'zip', '3ds', '3mf', 'amf', 'dae', 'fbx', 'gltf', 'glb', 'kmz', 'md2', 'nii', 'nrrd', 'obj', 'mtl', 'ply', 'stl', 'svg', 'vox', 'wrl', 'vtk', 'png', 'jpg' ],
    'sorts': [ 'Most liked', 'Most recent', 'Lowest price' ],
}

const createGeneralFilters = ( clickedValues ) =>
{
    const filters = [];

    Object.keys( clickedValues ).forEach( _property =>
    {
        switch( _property )
        {
            case 'categories':
            case 'element':
                if( clickedValues[_property] !== 'Any' )
                {
                    filters.push({ property: _property, multi_select: { contains: clickedValues[_property] } });
                }
                break;
            case 'rating':
                if( clickedValues[_property] !== 'Any' )
                {
                    filters.push({ property: _property, select: { equals: clickedValues[_property] } });
                }
                break;
        }
    });

    return filters;
}

const createFeaturesFilter = ( checkedFeatures ) =>
{
    const filters = [];

    Object.keys( checkedFeatures ).forEach( _feat =>
    {
        if( checkedFeatures[_feat] )
        {
            filters.push({ property: 'features', multi_select: { contains: _feat } });
        }
    });

    if( filters.length === 0 ) return null;

    return (filters.length === 1) ? filters[0] : { and: filters };
}

const createFormatsFilter = ( checkedFormats ) =>
{
    const filters = [];

    Object.keys( checkedFormats ).forEach( _fmt =>
    {
        if( checkedFormats[_fmt] )
        {
            filters.push({ property: 'formats', multi_select: { contains: _fmt } });
        }
    });

    if( filters.length === 0 ) return null;

    return (filters.length === 1) ? filters[0] : { or: filters };
}

const createSortsFilter = ( checkedSorts ) =>
{
    const filters = [];

    Object.keys( checkedSorts ).forEach( _sort =>
    {
        if( checkedSorts[_sort] )
        {
            if( _sort === 'Most liked' )
                filters.push({ property: 'rating', direction: 'ascending' });
            else if( _sort === 'Most recent' )
                filters.push({ timestamp: 'last_edited_time', direction: 'descending' });
            else if( _sort === 'Lowest price' )
                filters.push({ property: 'price', direction: 'ascending' });
        }
    });

    if( filters.length === 0 ) return null;

    return filters;
}

const redirectByFilters = ( clickedValues, checkedFeatures, checkedFormats, checkedSorts ) =>
{
    // 'categories', 'rating', 'element'
    const filters = createGeneralFilters( clickedValues );

    // 'features'
    let filter;
    filter = createFeaturesFilter( checkedFeatures );
    if( filter ) filters.push( filter );

    // 'formats'
    filter = createFormatsFilter( checkedFormats );
    if( filter ) filters.push( filter );

    // filter
    let filterData = 'null';
    if( filters.length > 0 )
    {
        const filterTotal = (filters.length === 1) ? filters[0] : { and: filters };
        filterData = encodeURIData( JSON.stringify( filterTotal ) );
    }

    // sort
    let sortData = 'null';
    const sortTotal = createSortsFilter( checkedSorts );
    if( sortTotal ) sortData = encodeURIData( JSON.stringify( sortTotal ) );

    redirect( `/marketplace/${filterData}/${sortData}`, 'push' );
}

export default function FilterDB()
{
    console.log('>>>>>>');

    const [ filtering, setFiltering ] = useState( false );

    if( filtering === true )
    {
        redirectByFilters( __clickedValues, __checkedFeatures, __checkedFormats, __checkedSorts );
    }

    const onClick = useCallback( ( e, property, value ) =>
    {
        e.preventDefault();
        __clickedValues = {
            ...__clickedValues,
            [property]: value // e.target.innerText
        }
        setFiltering( true );
    }, [] );

    const onChange = useCallback( ( e, property, value ) =>
    {
        e.preventDefault();
        if( property === 'features' )
        {
            __checkedFeatures = {
                ...__checkedFeatures,
                [value]: e.target.checked
            }
        }
        if( property === 'formats' )
        {
            __checkedFormats = {
                ...__checkedFormats,
                [value]: e.target.checked
            }
        }
        if( property === 'sorts' )
        {
            __checkedSorts = {
                ...__checkedSorts,
                [value]: e.target.checked
            }
        }
        setFiltering( true );
    }, [] );

    useEffect( () => { import('preline') }, [] );

    return (
        Object.keys(properties).map( property =>
        {
            const filterId = 'filter-' + property;
            return (
                <div key={filterId} className="hs-dropdown relative inline-flex [--strategy:absolute]">
                    <button type="button" className={buttonStyle}>
                        {property.toUpperCase()}<br/>
                        {__clickedValues[property]==='Any'? '': __clickedValues[property]}
                        <svg className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                    <div className={menuStyle}>
                    {
                        property === 'features' || 
                        property === 'formats' || 
                        property === 'sorts' ?
                            properties[property].map( (value, i) =>
                            {
                                return (
                                    <div key={i} className={inputSpanStyle}>
                                        <div className={inputParentStyle}>
                                        {
                                            property === 'features' && __checkedFeatures[value] || 
                                            property === 'formats' && __checkedFormats[value] || 
                                            property === 'sorts'   && __checkedSorts[value] ?
                                                <input onChange={ e => onChange( e, property, value ) } type="checkbox" className={inputStyle} checked/>
                                                :
                                                <input onChange={ e => onChange( e, property, value ) } type="checkbox" className={inputStyle} />
                                        }
                                        </div>
                                        <label className="ml-3.5">
                                            <span className={spanStyle}>{value}</span>
                                        </label>
                                    </div>
                                )
                            })
                            :
                            properties[property].map( (value, i) =>
                            {
                                return <a href='#' onClick={ e => onClick( e, property, value ) } className={aStyle} key={i}>{value}</a>
                            })
                    }
                    </div>
                </div>
            );
        })
    );
}