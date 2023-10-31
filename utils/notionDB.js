import * as dotenv from 'dotenv'; dotenv.config();
import { Client } from '@notionhq/client';
import { hashedPassword, verifyPassword } from './novaUtils';

const NOTION_ITEMS_CLIENT = new Client({ auth: process.env.NOTION_ITEMS_TOKEN });
const NOTION_ITEMS_ID = process.env.NOTION_ITEMS_ID;

const NOTION_USERS_CLIENT = new Client({ auth: process.env.NOTION_USERS_TOKEN });
const NOTION_USERS_ID = process.env.NOTION_USERS_ID;

async function _getNotionItems( notion, databaseId, filter=undefined, sorts=undefined )
{
    try {
        let results = [];

        const response = await notion.databases.query(
        {
            database_id: databaseId,
            filter: filter,
            sorts: sorts,
        });
        results = [ ...results, ...response.results ];

        // while loop variables
        let hasMore = response.has_more;
        let nextCursor = response.next_cursor;

        // keep fetching while there are more results
        while( hasMore )
        {
            const response = await notion.databases.query(
            {
                database_id: databaseId,
                filter: filter,
                sorts: sorts,
                start_cursor: nextCursor,
            });
            results = [ ...results, ...response.results ];
            hasMore = response.has_more;
            nextCursor = response.next_cursor;
        }

        return results;
    }
    catch( error )
    {
        console.error( error );
    }
}

const _prop_multi_select = (prop) => (prop.multi_select.map( select => select.name ));
const _prop_files = (prop) => (prop.files.map( file => file.file.url ));
const _normalizeItem = ( item ) =>
{
    const { authors, files, features, download_size, 
            date, price, formats, thumbnail, preview, 
            categories, quantity, rating, name, 
            element, description, background } = item.properties;

    return {
        id:             item.id,                          // "4ecc729a-dd8c-4be9-bff7-6f2db973d5e3"
        authors:        _prop_multi_select(authors),      // ["NovaGraphix"]
        files:          _prop_files(files),               // [.enc url]
        features:       _prop_multi_select(features),     // ["Animated"]
        download_size:  download_size.number,             // size(KB)
        date:           date.date.start,                  // "2023-01-25"
        price:          price.number,                     // $ USD
        formats:        _prop_multi_select(formats),      // ["zip, "obj", "mtl", "jpg"] or ["glb"]
        thumbnail:      _prop_files(thumbnail),           // [url]
        preview:        _prop_files(preview),             // [url]
        categories:     _prop_multi_select(categories),   // ["Characters", "Animals"]
        quantity:       quantity.number,                  // sales quantity
        rating:         rating.select.name,               // ⭐ ~ ⭐⭐⭐⭐
        name:           name.title.map( t => t.plain_text ), // ["model_name"]
        element:        _prop_multi_select(element),      // ["polygon" or "voxel"]
        description:    description.rich_text.map( t => t.plain_text ), // 'description'
        background:     background.select.name,           // '0x1919', '111.hdr', '111.jpg'
    }
}
const _normalizeUser = ( user ) =>
{
    const { name, email, password, salt, date } = user.properties;

    return {
        id:         user.id,                                        // "cb6877ce-1635-44ef-8b1d-66854219d952"
        name:       name.title.map( t => t.plain_text )[0],         // "sangkunine"
        email:      email.email,                                    // "sangkunine@gmail.com"
        password:   password.rich_text.map( t => t.plain_text )[0], // "hashed_password" <== crypto.pbkdf2
        salt:       salt.rich_text.map( t => t.plain_text )[0],     // "salt" (64 bytes) <== crypto.pbkdf2
        date:       date.date.start,                                // "2023-10-22"
    }
}

//=====================
//  filter examples
//=====================
// const c1 = { property: 'categories', multi_select: {contains: 'Creatures'} };
// const c2 = { property: 'categories', multi_select: {contains: 'Technology'} };
// const c3 = { property: 'categories', multi_select: {contains: 'Nature'} };
// const filter = c2
// const filter = { and: [c1, c2] };
// const filter = { or: [c1, c2] };
// const filter = { and: [c1, { or : [c2, c3] }] };

//=====================
//  sorts examples
//=====================
// const sorts = [{ property: 'name', direction: 'ascending' }];
// const sorts = [{ property: 'name', direction: 'descending' }];

async function getNotionItems( filter=undefined, sorts=undefined )
{
    const result = {};

    let items = await _getNotionItems( NOTION_ITEMS_CLIENT, NOTION_ITEMS_ID, filter, sorts );

    if( items !== undefined )
    {
        items = items.map( item => _normalizeItem( item ) );

        items.forEach( item => {
            result[ item.name ] = item;
        });
    }

    return result; // result = { item.name: item }
}

async function getNotionUsers( filter=undefined, sorts=undefined )
{
    const result = {};

    let users = await _getNotionItems( NOTION_USERS_CLIENT, NOTION_USERS_ID, filter, sorts );

    if( users !== undefined )
    {
        users = users.map( user => _normalizeUser( user ) );

        users.forEach( user => {
            result[ user.email ] = user;
        });
    }

    return result; // result = { user.email: user }
}

async function authorizeUser( email, password )
{
    // check email

    let users = await getNotionUsers({
        property: 'email',
        email: { equals: email }
    });

    users = Object.values( users );

    if( users.length === 0 )
    {
        console.log( 'There is no user matching the given email...' );
        return null;
    }

    if( users.length !== 1 )
    {
        console.log( 'Two or more users have the same email address...' );
        return null;
    }

    const user = users[ 0 ];

    // check password

    const ok = await verifyPassword( password, user.salt, user.password );
    if( !ok )
    {
        console.log( 'You have invalid password...' );
        return null;
    }

    return {
        id: user.id,
        email: user.email,
        name: user.name
    }
}

async function registerUser( name, email, password )
{
    const notion = NOTION_USERS_CLIENT;
    const databaseId = NOTION_USERS_ID;

    const { salt, hash } = await hashedPassword( password );

    const response = await notion.pages.create(
    {
        "parent": {
            "type": "database_id",
            "database_id": databaseId
        },
        "properties": {
            "name": {
                "title": [ { "text": { "content": name } } ]
            },
            "email": {
                // "email": { "text": { "content": email } }
                "email": email
            },
            "password": {
                "rich_text": [ { "text": { "content": hash } } ]
            },
            "salt": {
                "rich_text": [ { "text": { "content": salt } } ]
            },
            "date": {
                "date": { "start": new Date().toISOString().slice(0, 10) } // "2023-10-22"
            }
        }
    });

    // (cf)
    // response.properties = {
    //     date: { id: 'YIhk', type: 'date', date: [Object] },
    //     email: { id: '_A%3B%3E', type: 'email', email: '111@111.111' },
    //     salt: { id: 'bH%40h', type: 'rich_text', rich_text: [Array] },
    //     password: { id: 'lBqk', type: 'rich_text', rich_text: [Array] },
    //     name: { id: 'title', type: 'title', title: [Array] }
    // }
}

export { getNotionItems, authorizeUser, registerUser };