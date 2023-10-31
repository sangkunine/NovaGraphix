const crypto = require('crypto');

export const encodeURIData = ( s ) =>
{
    return encodeURIComponent(s).replace(/\-/g, "%2D").replace(/\_/g, "%5F").replace(/\./g, "%2E").replace(/\!/g, "%21").replace(/\~/g, "%7E").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
}

export const decodeURIData = ( s ) =>
{
    return decodeURIComponent(s.replace(/\%2D/g, "-").replace(/\%5F/g, "_").replace(/\%2E/g, ".").replace(/\%21/g, "!").replace(/\%7E/g, "~").replace(/\%2A/g, "*").replace(/\%27/g, "'").replace(/\%28/g, "(").replace(/\%29/g, ")"));
}

export const hashedPassword = ( password ) =>
// create { salt, hash } from password
{
    return new Promise( (resolve, reject) =>
    {
        crypto.randomBytes( 64, (error, buf) =>
        {
            if( error ) reject( error );
            const salt = buf.toString('base64');
            crypto.pbkdf2( password, salt, 256, 64, 'sha512', (err, key) =>
            {
                if( err ) reject( err );
                const hash = key.toString('base64');
                resolve({ salt, hash });
            });
        });
    });
}

export const verifyPassword = ( password, salt, hash ) =>
// check if password + salt ==> hash
{
    return new Promise( (resolve, reject) =>
    {
        crypto.pbkdf2( password, salt, 256, 64, 'sha512', (err, key) =>
        {
            if( err ) reject( err );
            resolve( hash === key.toString('base64') );
        });
    });
}