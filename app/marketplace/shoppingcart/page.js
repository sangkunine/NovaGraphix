'use client'

import Image from "next/image";
import { useShoppingCart } from "@/components/UseShoppingCart";
import shoppingcart_icon from '@/public/images/shoppingcart_icon.png';

export default function ShoppingCartPage()
{
    const {
        // state
        id,                 // string
        items,              // array (current cart items in an array)
        isEmpty,            // boolean (check if the cart is empty. Returned as a boolean)
        totalItems,         // number (totaly quantity of items in the cart as an integer)
        totalUniqueItems,   // number (total unique items in the cart as an integer)
        cartTotal,          // number (total value of all items in the cart)
        metadata,           // {key: string}

        // functions
        addItem,
        removeItem,
        updateItem,
        updateItemQuantity,
        getItem,
        setItems,
        emptyCart,  // remove all cart items, and resetting cart totals to the default 0 values
        inCart,     // boolean (check if an item is in the cart)
        clearCartMetadata,
        setCartMetadata,
        updateCartMetadata,

    } = useShoppingCart();

    // if( isEmpty ) return (
    //     <div className="p-4 max-w-xl mx-auto mt-16 mb-16">
    //         <h1 className="bg-blue-300 dark:text-slate-900 p-6 text-center text-lg font-bold rounded-lg">
    //             Your cart is empty
    //         </h1>
    //     </div>
    // );

    let totalPrice = 0;

    return (
        <div className="p-4 max-w-xl mx-auto mt-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">

                {/* shopping cart */}
                <div className="flex items-center justify-between px-4 py-3 bg-gray-200">
                    <h1 className="text-slate-900 dark:text-slate-900 text-lg font-bold">
                        <Image className="inline-block mr-2" src={shoppingcart_icon} alt="ShoppingCart" />
                        Shopping Cart
                    </h1>
                    <span className="text-slate-900 dark:text-slate-900">({totalUniqueItems} items)</span>
                </div>

                {/* list of items */}
                <div className="p-4">
                {
                    items && items.length > 0
                    ? items.map( item =>
                    {
                        const itemName = item.name.join(", ");
                        const itemPrice = item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                        totalPrice += item.price;

                        return (
                            <div key={item.id} className="flex items-center mb-4">

                                {/* 1) item: thumbnail */}
                                <Image 
                                    className="h-16 w-32 object-contain rounded-lg mr-4" 
                                    src={item.thumbnail[0]} 
                                    alt={itemName} 
                                    width={100} height={100} 
                                />

                                {/* 2) item: name & price */}
                                <div className="flex-1">
                                    <h2 className="text-slate-900 dark:text-slate-900 text-lg font-bold">{itemName}</h2>
                                    <span className="text-slate-900 dark:text-slate-900">{itemPrice}</span>
                                </div>

                                {/* 3) item: removal button */}
                                <button className="text-gray-600 hover:text-red-500">
                                    <svg onClick={() => removeItem( item.id )}
                                        fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                            </div>
                        );
                    })
                    : null
                }
                </div>

                <div className="px-4 py-3 bg-gray-200">

                    {/* Total */}
                    <div className="flex justify-between items-center text-slate-900 dark:text-slate-900">
                        <span className="font-bold text-lg">Total:</span>
                        <span className="font-bold text-lg">{totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                    </div>

                    {/* Checkout */}
                    <button className="block w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Checkout
                    </button>

                </div>
            </div>
        </div>
    );
}