import Link from 'next/link';
import PreviewThumbnail from './PreviewThumbnail';
import { AddToCartButton } from './ClientUI';

const dollarFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const yenFormatter = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });
const euroFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
const decimalFormatter = new Intl.NumberFormat("en-US", { style: "decimal" });

const MarketplaceItem = ({ item }) => {

    const { authors, files, features, download_size, 
            date, price, formats, thumbnail, preview, 
            categories, quantity, rating, name, 
            element, description, background } = item;

    return (
        <div className="p-4 md:w-1/5">
            <div className="hover:scale-110 h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-xl">

                <Link href={`/marketplace/model/${item.name}`}>
                    <PreviewThumbnail item={item} width={400} height={400} />
                </Link>

                <div className="p-6">

                    {/* name */}
                    <h2 className="tracking-widest text-sm title-font font-medium mb-1">{name.join(', ')}</h2>

                    {/* formats */}
                    <h1 className="title-font text-sm font-medium mb-1">{formats.length === 1 ? formats[0] : formats.slice(1).map(ext => '.' + ext).join(' ')}</h1>

                    {/* add to cart */}
                    <div className="-mt-6 mb-2 -mr-2">
                        <AddToCartButton item={item} px={3} py={1} />
                    </div>

                    {/* price, quantity, rating */}
                    <div className="flex items-center flex-wrap ">

                        {/* price */}
                        <Link href={`/marketplace/${item.id}`}
                            className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                            {dollarFormatter.format(price)}
                        </Link>

                        {/* quantity */}
                        <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                            </svg>
                            {decimalFormatter.format(quantity)}
                        </span>

                        {/* rating */}
                        <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                            {rating}
                        </span>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarketplaceItem;