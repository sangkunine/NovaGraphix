"use client"

import { useState, useEffect } from 'react';
// import Image from 'next/image';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';

const PreviewThumbnail = ({ item, width, height }) =>
{
    const [ urls, setUrls ] = useState([]);

    const { authors, files, features, download_size, 
        date, price, formats, thumbnail, 
        categories, quantity, rating, name, 
        element, description, background } = item;

    let zipURL = thumbnail[0];

    const mousemove = (e) =>
    {
        let mx, my;
        if( e.changedTouches )
        {
            mx = e.changedTouches[0].clientX;
            my = e.changedTouches[0].clientY;
        }
        else
        {
            mx = e.clientX;
            my = e.clientY;
        }
        const rect = e.target.getBoundingClientRect();
        mx = ((mx - rect.left) / rect.width) * 2 - 1;
        my = -((my - rect.top) / rect.height) * 2 + 1;

        const numImgs = urls.length;
        const delta = 2 / numImgs;

        let idx = 0;
        if( mx > 0 )
        {
            idx = numImgs - Math.round( mx / delta );
            if( idx === numImgs ) idx = 0;
        }
        else
        {
            idx = Math.round( Math.abs( mx ) / delta );
        }

        e.target.src = urls[ idx ];
    }

    useEffect(() =>
    {
        const promises = [];

        const promise = new JSZip.external.Promise( (resolve, reject) =>
        {
            JSZipUtils.getBinaryContent( zipURL, (err, data) =>
            {
                if( err ) {
                    reject( err );
                } else {
                    resolve( data );
                }
            });
        });

        promise.then( JSZip.loadAsync ).then( zip =>
        {
            zip.forEach( fileName =>
            {
                promises.push( new Promise( resolve =>
                {
                    zip.file( fileName ).async( 'blob' ).then( blob =>
                    {
                        const url = URL.createObjectURL( blob );
                        resolve( url );
                    });
                }));
            });

            Promise.all( promises ).then( urls =>
            {
                setUrls( urls );
            });
        });

    }, []);

    return (
        <img className="lg:h-48 md:h-36 w-full object-cover object-center" 
        src={ urls[0] } alt="thumbnail" width={width} height={height} 
        onMouseMove={ mousemove } />
    );
}

export default PreviewThumbnail;