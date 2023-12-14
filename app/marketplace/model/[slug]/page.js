import dynamic from 'next/dynamic';
import { getNotionItems } from '@/utils/notionDB';
import { AddToCartButton, HeartButton, GeometryComplexityButton, MaterialComplexityButton, SelectAnimationButton } from '@/components/ClientUI';

const ModelPage = async ({ params }) =>
{
    const itemName = params.slug;
    const filter = { property: 'name', rich_text: {contains: itemName} };
    const notionItems = await getNotionItems( filter );
    const item = notionItems[ itemName ];

    if( !item )
    {
        return (
            <h1 className="m-6">⭐ Failed to fetch items from database. If you contact us, we will take immediate action.</h1>
        );
    }

    const ModelViewer = dynamic(
        () => import('@/components/ModelViewer'), {
        ssr: false,
        loading: () => <p>Loading...</p>
    });

    const { authors, files, features, download_size, 
        date, price, formats, thumbnail, preview, 
        categories, quantity, rating, name, 
        element, description, background } = item;

    // console.log( 'item:', item );

    const _authors = authors.join(", ");
    const _name = name.join(", ");
    const _rating = rating;
    // const _description = description.join("\n");
    const dummy = [
        'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna',
        'aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea',
        'commodo consequat.'
    ];
    const _description = dummy.join("\n");
    const _features = features.join(", ");
    const _download_size = download_size.toLocaleString() + ' (KB)';
    const _date = new Date(date).toLocaleDateString("en-us",{ weekday: "long", year: "numeric", month: "short", day: "numeric" });
    const _formats = formats.join(", ");
    const _categories = categories.join(", ");
    const _quantity = quantity.toLocaleString();
    const _element = element.join(", ").toUpperCase();
    const _price = '$' + price.toLocaleString();

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-full mx-auto flex flex-wrap">

                    {/* ModelViewer */}
                    <div className="lg:w-1/2 w-full lg:py-0 mt-6 lg:mt-0">
                        <ModelViewer item={item} secret={process.env.MODEL_SECRET_KEY}/>
                    </div>

                    {/* Model Description */}
                    <div className="lg:w-1/2 w-full lg:pl-12 lg:py-0 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{_authors}</h2>

                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{_name}</h1>

                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {_rating}
                                {/* <span className="text-gray-600 ml-3">4 Reviews</span> */}
                            </span>
                            {/* <SNSLogo /> */}
                        </div>

                        <p className="leading-relaxed mb-4">{_description}</p>

                        <ul className="list-disc ml-4">
                            <li>Features: {_features}</li>
                            <li>Download-size: {_download_size}</li>
                            <li>Date: {_date}</li>
                            <li>Formats: {_formats}</li>
                            <li>Categories: {_categories}</li>
                            <li>Quantity: {_quantity}</li>
                            <li>Element-type: {_element}</li>
                        </ul>

                        <GeometryComplexityButton />
                        <MaterialComplexityButton />
                        <SelectAnimationButton />
                        
                        <div className="flex mt-0 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            {/* <ColorSelect />
                            <SizeSelect /> */}
                        </div>

                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-500">{_price}</span>
                            <AddToCartButton />
                            <HeartButton />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default ModelPage;