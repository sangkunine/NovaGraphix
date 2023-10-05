import MarketplaceItem from '../../components/MarketplaceItem';
import getNotionItems from '../../utils/notionDB';

export let notionItems = {};

const Page = async () =>
{
    notionItems = await getNotionItems();

    const notionKeys = Object.keys( notionItems );

    if( notionKeys.length === 0 )
    {
        return (
            <h1 className="m-6">⭐ Failed to fetch items from database.</h1>
        );
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">
                {
                    notionKeys.map( key => {
                        const item = notionItems[ key ];
                        return <MarketplaceItem key={item.id} item={item}/>
                    })
                }
                </div>
            </div>
        </section>
    );
};

export default Page;