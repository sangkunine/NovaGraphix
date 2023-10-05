"use client"

import { useEffect, useRef, useMemo } from 'react';
// import * as THREE from 'three';
import JAMIE from '../utils/viewWorks';

// const ModelViewer = ({ item, width, height }) =>
// {
//     const { authors, files, features, download_size, 
//             date, price, formats, thumbnail, 
//             categories, quantity, rating, name, 
//             element, description, background } = item;

//     const ref = useRef( null );

//     useEffect(() =>
//     {
//         // mount
//         const appWorks = new JAMIE.AppWorks({
//             dom: ref.current,
//             width: width,
//             height: height,
//             background: background, // 0x191919, 'default.hdr'
//         });
//         appWorks.init().animate();
//         JAMIE.loadFiles( files, appWorks ); // files = [urls]

//         // unmount
//         return () => ref.current?.removeChild( JAMIE.appWorks.renderer.domElement );

//     }, [] );

//     return (
//         <div ref={ref}></div>
//     );
// }

const ModelViewer = ({ item, width, height }) =>
{
    const { authors, files, features, download_size, 
            date, price, formats, thumbnail, 
            categories, quantity, rating, name, 
            element, description, background } = item;

    const ref = useRef();

    let loaded = false;

    useEffect( () =>
    {
        if( !loaded )
        {
            const appWorks = new JAMIE.AppWorks(
            {
                dom: ref.current,
                width: width,
                height: height,
                background: background, // 0x191919, 'default.hdr'
            });
            appWorks.init().animate();
            JAMIE.loadFiles( files, appWorks ); // files = [urls]

            loaded = true;

            // unmount
            // return () => ref.current?.removeChild( JAMIE.appWorks.renderer.domElement );
        }
    }, [] );

    return (
        <div ref={ref}></div>   // ref.current = <div>
    );
}

export default ModelViewer;