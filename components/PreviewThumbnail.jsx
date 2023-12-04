"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';

const PreviewThumbnail = ({ item, width, height }) =>
{
    const [ urls, setUrls ] = useState([]);
    const [ isPreview, setIsPreview ] = useState(false);

    const { authors, files, features, download_size, 
        date, price, formats, thumbnail, preview, 
        categories, quantity, rating, name, 
        element, description, background } = item;

    // thumbnail = [image_0.jpg]
    // preview = [images.zip (= image_0.jpg + ... + image_15.jpg)]

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

    const mouseenter = () => setIsPreview( !isPreview );

    useEffect(() =>
    {
        const promises = [];

        const promise = new JSZip.external.Promise( (resolve, reject) =>
        {
            JSZipUtils.getBinaryContent( preview[0], (err, data) =>
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

    }, [ preview ]);

    if( isPreview && urls.length > 0 )
    {
        // Preview
        return (
            <Image className="lg:h-48 md:h-36 w-full object-cover object-center" 
                src={urls[0]} 
                alt={item.name} 
                width={width} height={height} 
                onMouseMove={mousemove} 
                priority
            />
        );
    }
    else
    {
        // Thumbnail
        return (
            <Image className="lg:h-48 md:h-36 w-full object-cover object-center" 
                src={thumbnail[0]} 
                alt={item.name} 
                width={width} height={height} 
                onMouseEnter={mouseenter} 
                priority
            />
        );
    }
}

export default PreviewThumbnail;