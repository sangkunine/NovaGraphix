import { getNotionItems } from '@/utils/notionDB';
import MarketplaceItem from '@/components/MarketplaceItem';
import { decodeURIData } from '@/utils/novaUtils';

const MarketplacePage = async ({ params }) =>
// params = { slug: ['filters', 'sorts'] }
// (eg)
// filter1 = "{ property: 'categories', rich_text: { contains: 'Characters' } }"
// filter2 = "{ property: 'features', rich_text: { contains: 'Animated' } }"
// 'filters' = "{ and: [ filter1, filter2 ] }"
// 'sorts' = "[{ property: 'name', direction: 'ascending' }]"
{
    let filters = undefined;
    let sorts = undefined;

    // console.log( 'params:', params );

    if( params.slug )
    {
        let [ f, s ] = params.slug;
        if( f !== 'null' ) filters = JSON.parse( decodeURIData( f ) );
        if( s !== 'null' ) sorts = JSON.parse( decodeURIData( s ) );

        // console.log( 'filters:', filters );
        // console.log( 'sorts:', sorts );
    }

    const notionItems = await getNotionItems( filters, sorts );
    const items = Object.values( notionItems );

    if( items.length === 0 )
    {
        return (
            <h1 className="m-6">⭐ Sorry we couldn&apos;t find any matches. If you contact us, we will take immediate action.</h1>
        );
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                {
                    items.map( item =>
                    {
                        return <MarketplaceItem key={item.id} item={item}/>;
                    })
                }
                </div>
            </div>
        </section>
    );
}

export default MarketplacePage;