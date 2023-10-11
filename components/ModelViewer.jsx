"use client"

import { useEffect, useRef } from 'react';
import JAMIE from '../utils/viewWorks';

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

const ModelViewer = ({ item, width, height, secret }) =>
{
    const { authors, files, features, download_size, 
            date, price, formats, thumbnail, preview, 
            categories, quantity, rating, name, 
            element, description, background } = item;

    const ref = useRef();

    let loaded = false;

    const viewWorks = async ( files ) =>
    {
        const secretKey = secret.split('').splice(5,10,'a').reverse().join('');
        const [ fileName ] = name;
        const [ fileType ] = formats;
        const [ fileUrl ] = files;

        const res = await fetch( fileUrl );
        let blob = await res.blob();

        blob = await decryptFile( secretKey, blob );
        const file = new File( [ blob ], `${ fileName }.${ fileType }` );

        const appWorks = new JAMIE.AppWorks(
        {
            dom: ref.current,
            width: width,
            height: height,
            background: background, // 0x191919, 'default.hdr'
        });
        appWorks.init().animate();
        new JAMIE.Loader( appWorks ).loadFiles( [file] );

        // unmount
        // return () => ref.current?.removeChild( JAMIE.appWorks.renderer.domElement );
    }

    useEffect( () =>
    {
        if( !loaded )
        {
            viewWorks( files );
            loaded = true;
        }
    }, [] );

    return (
        <div ref={ref}></div>   // ref.current = <div>
    );
}

export default ModelViewer;