"use client"

import { useRef } from 'react';
import JAMIE from '@/utils/viewWorks';
import Loading from '../app/loading';

const parentClientRect = (element) => element?.parentElement?.getBoundingClientRect();

const readfile = (file) => {
    return new Promise( (resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve( reader.result );
        reader.readAsArrayBuffer( file );
    });
}

const decryptFile = async ( secretKey, file ) =>
// secretKey = password to encrypt/decrypt the file
// file = file encrypted previously
// return decrypted file
{
	let cipherbytes = await readfile( file )
	.catch( err => console.error( err ) );
	cipherbytes = new Uint8Array( cipherbytes );

	const pbkdf2iterations = 10000;
	const passphrasebytes = new TextEncoder( "utf-8" ).encode( secretKey );
	const pbkdf2salt = cipherbytes.slice( 8, 16 );

	const passphrasekey = await window.crypto.subtle.importKey( 'raw', passphrasebytes, {name: 'PBKDF2'}, false, ['deriveBits'] )
	.catch( err => console.error( err ) );
	// console.log('passphrasekey imported');

	let pbkdf2bytes = await window.crypto.subtle.deriveBits( {"name": 'PBKDF2', "salt": pbkdf2salt, "iterations": pbkdf2iterations, "hash": 'SHA-256'}, passphrasekey, 384 )
	.catch( err => console.error( err ) );
	// console.log('pbkdf2bytes derived');
	pbkdf2bytes = new Uint8Array( pbkdf2bytes );

	const keybytes = pbkdf2bytes.slice( 0, 32 );
	const ivbytes = pbkdf2bytes.slice( 32 );
	cipherbytes = cipherbytes.slice( 16 );

	const key = await window.crypto.subtle.importKey( 'raw', keybytes, {name: 'AES-CBC', length: 256}, false, ['decrypt'] )
	.catch( err => console.error( err ) );
	// console.log('key imported');

	let plaintextbytes = await window.crypto.subtle.decrypt( {name: "AES-CBC", iv: ivbytes}, key, cipherbytes )
	.catch( err => console.error( err ) );

	if( !plaintextbytes ) {
		console.error('Error decrypting file.  Password may be incorrect.');
		return;
	}
	// console.log('ciphertext decrypted');
	plaintextbytes = new Uint8Array( plaintextbytes );

	const blob = new Blob( [ plaintextbytes ] );
	// console.log('File decrypted.');
	return blob;
}

const fetchFile = ({ item, secret }) =>
{
    const { authors, files, features, download_size, 
        date, price, formats, thumbnail, preview, 
        categories, quantity, rating, name, 
        element, description, background } = item;

    const secretKey = secret.split('').splice(5,10,'a').reverse().join('');
    const [ fileName ] = name;
    const [ fileUrl ] = files;
    const fileType = formats[0];

    return new Promise( resolve => {
        fetch( fileUrl )
        .then( res => res.blob() )
        .then( blob => decryptFile( secretKey, blob ) )
        .then( blob => new File( [ blob ], `${ fileName }.${ fileType }` ) )
        .then( file => resolve( file ) );
    });
}

const ModelViewer = ({ item, secret }) =>
{
    const ref = useRef( null );
    const loading = useRef( false );

    if( !loading.current )
    {
        loading.current = true;

        return fetchFile({ item, secret }).then( file =>
        {
            ref.current?.removeChild( ref.current.firstChild );

            const rect = parentClientRect( ref.current );

            const appWorks = new JAMIE.AppWorks(
            {
                dom: ref.current,
                width: rect.width,
                height: rect.height,
                background: item.background, // 0x191919, 'default.hdr'
            });
            appWorks.init().animate();

            new JAMIE.Loader( appWorks ).loadFiles([ file ]);

            return <div ref={ref}></div>;
        });
    }

    return (
        <div ref={ref}>
            {/* (cf) border-solid border-2 border-indigo-600 */}
            <div className="flex flex-col item-center justify-center w-[500px] h-[500px]">
                <Loading />
            </div>
        </div>
    );
}

export default ModelViewer;