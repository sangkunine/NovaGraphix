import * as dotenv from 'dotenv'; dotenv.config();

async function _getNotionItems( client, databaseId, filter=undefined, sorts=undefined )
{
    try {
        let results = [];

        const response = await client.databases.query({
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
            const response = await client.databases.query(
            {
                database_id: databaseId,
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
            date, price, formats, thumbnail, 
            categories, quantity, rating, name, 
            element, description, background } = item.properties;

    return {
        id:             item.id,                          // "4ecc729a-dd8c-4be9-bff7-6f2db973d5e3"
        authors:        _prop_multi_select(authors),      // ["NovaGraphix"]
        files:          _prop_files(files),               // [urls]
        features:       _prop_multi_select(features),     // ["Animated"]
        download_size:  download_size.number,             // size(KB)
        date:           date.date.start,                  // "2023-01-25"
        price:          price.number,                     // $ USD
        formats:        _prop_multi_select(formats),      // ["obj", "mtl"]
        thumbnail:      _prop_files(thumbnail),           // [urls]
        categories:     _prop_multi_select(categories),   // ["Characters", "Animals"]
        quantity:       quantity.number,                  // sales quantity
        rating:         rating.select.name,               // ⭐ ~ ⭐⭐⭐⭐
        name:           name.title.map( t => t.plain_text ), // ["model_name"]
        element:        _prop_multi_select(element),      // ["polygon" or "voxel"]
        description:    description.rich_text.map( t => t.plain_text ), // 'description'
        background:     background.select.name,           // '0x1919', '111.hdr', '111.jpg'
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

    const Client = require('@notionhq/client').Client;
    const NOTION_CLIENT = new Client({ auth: process.env.NOTION_TOKEN });
    const DATABASE_ID = process.env.NOTION_DATABASE_ID;

    let dataItems = await _getNotionItems( NOTION_CLIENT, DATABASE_ID, filter, sorts );

    if( dataItems !== undefined )
    {
        dataItems = dataItems.map( item => _normalizeItem( item ) );

        dataItems.forEach( item => {
            result[ item.id ] = item;
        });
    }

    return result; // result = { itemId: item }
}

export default getNotionItems;