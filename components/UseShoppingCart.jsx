'use client'

import * as React from "react";

import useLocalStorage from "./useLocalStorage";

// # cart-item
//     id,             // string
//     price,          // number
//     quantity?,      // number
//     itemTotal?,     // number
//     [key: string],

// # cart-state
//     id,                 // string
//     items,              // array (current cart items in an array)
//     isEmpty,            // boolean (check if the cart is empty. Returned as a boolean)
//     totalItems,         // number (totaly quantity of items in the cart as an integer)
//     totalUniqueItems,   // number (total unique items in the cart as an integer)
//     cartTotal,          // number (total value of all items in the cart)
//     metadata,           // {key: string}

// # cart-functions
//     addItem,
//     removeItem,
//     updateItem,
//     updateItemQuantity,
//     getItem,
//     setItems,
//     emptyCart,  // remove all cart items, and resetting cart totals to the default 0 values
//     inCart,     // boolean (check if an item is in the cart)
//     clearCartMetadata,
//     setCartMetadata,
//     updateCartMetadata,

// # cart-actions
//     { type: "SET_ITEMS", payload: items }
//     { type: "ADD_ITEM", payload: item }
//     { type: "REMOVE_ITEM", id: itemId }
//     { type: "UPDATE_ITEM", id: itemId, payload: object }
//     { type: "EMPTY_CART" }
//     { type: "CLEAR_CART_META" }
//     { type: "SET_CART_META", payload: metadata }
//     { type: "UPDATE_CART_META", payload: metadata }

//======================================================================
// ShoppingCartContext
//======================================================================

export const initialState = {
    items: [],
    isEmpty: true,
    totalItems: 0,
    totalUniqueItems: 0,
    cartTotal: 0,
    metadata: {},
}

const ShoppingCartContext = React.createContext( initialState );

//======================================================================
// useShoppingCart
//======================================================================

export const useShoppingCart = () =>
{
    const context = React.useContext( ShoppingCartContext );

    if( !context ) throw new Error("Expected to be wrapped in a ShoppingCartProvider");

    return context;
}

//======================================================================
// reducer (passed to useReducer)
//======================================================================

const calculateItemTotals = (items) =>
(
    items.map(item => ({
        ...item,
        itemTotal: item.price * item.quantity,
    }))
)

const calculateTotal = (items) =>
(
    items.reduce( (total, item) => total + item.quantity * item.price, 0 )
)

const calculateTotalItems = (items) =>
(
    items.reduce( (sum, item) => sum + item.quantity, 0 )
)

const calculateUniqueItems = (items) => items.length;

const generateCartState = (state = initialState, items) =>
{
    const totalUniqueItems = calculateUniqueItems( items );
    const isEmpty = totalUniqueItems === 0;

    return {
        ...initialState,
        ...state,
        items: calculateItemTotals( items ),
        totalItems: calculateTotalItems( items ),
        totalUniqueItems,
        cartTotal: calculateTotal( items ),
        isEmpty,
    };
}

function reducer( state, action )
{
    switch( action.type )
    {
        case "SET_ITEMS":
        {
            return generateCartState( state, action.payload );
        }

        case "ADD_ITEM":
        {
            const items = [ ...state.items, action.payload ];

            return generateCartState( state, items );
        }

        case "UPDATE_ITEM":
        {
            const items = state.items.map( (item) =>
            {
                if( item.id !== action.id ) return item;

                return {
                    ...item,
                    ...action.payload,
                };
            });

            return generateCartState( state, items );
        }

        case "REMOVE_ITEM":
        {
            const items = state.items.filter( (i) => i.id !== action.id );

            return generateCartState( state, items );
        }

        case "EMPTY_CART":
        {
            return initialState;
        }

        case "CLEAR_CART_META":
        {
            return {
                ...state,
                metadata: {},
            }
        }

        case "SET_CART_META":
        {
            return {
                ...state,
                metadata: { ...action.payload },
            }
        }

        case "UPDATE_CART_META":
        {
            return {
                ...state,
                metadata: {
                    ...state.metadata,
                    ...action.payload,
                },
            }
        }

        default:
            throw new Error("No action specified");
    }
}

//======================================================================
// ShoppingCartProvider (using useReducer)
//======================================================================

const createCartIdentifier = (len = 12) =>
(
    [...Array(len)].map(() => (~~(Math.random() * 36)).toString(36)).join("")
)

export const ShoppingCartProvider = ({
    children,
    cartId,
    defaultItems = [],
    // onSetItems,
    // onItemAdd,
    // onItemUpdate,
    // onItemRemove,
    // onEmptyCart,
    storage = useLocalStorage,
    metadata,
}) => {

    const id = cartId ? cartId : createCartIdentifier();

    const [savedCart, saveCart] = storage
    (
        cartId ? `react-use-cart-${id}` : `react-use-cart`,
        JSON.stringify({
            id,
            ...initialState,
            items: defaultItems,
            metadata,
        })
    )

    const [state, dispatch] = React.useReducer( reducer, JSON.parse( savedCart ) );

    React.useEffect( () =>
    {
        saveCart( JSON.stringify( state ) );

    }, [ state, saveCart ]);

    const addItem = (item, quantity = 1) =>
    {
        if( !item.id ) throw new Error("You must provide an `id` for items");
        if( quantity <= 0 ) return;

        const currentItem = state.items.find( (i) => i.id === item.id );

        if( !currentItem && !item.hasOwnProperty("price") )
            throw new Error("You must pass a `price` for new items");

        if( !currentItem )
        {
            const payload = { ...item, quantity };

            dispatch({ type: "ADD_ITEM", payload });

            // onItemAdd && onItemAdd(payload);

            return;
        }

        const payload = { ...item, quantity: currentItem.quantity + quantity };

        dispatch({
            type: "UPDATE_ITEM",
            id: item.id,
            payload,
        });

        // onItemUpdate && onItemUpdate(payload);
    }

    const removeItem = (id) =>
    {
        if( !id ) return;

        dispatch({ type: "REMOVE_ITEM", id });

        // onItemRemove && onItemRemove(id);
    }

    const updateItem = (id, payload) =>
    // id = Item["id"], payload = object
    {
        if( !id || !payload ) return;

        dispatch({ type: "UPDATE_ITEM", id, payload });

        // onItemUpdate && onItemUpdate(payload);
    }

    const updateItemQuantity = (id, quantity) =>
    {
        if( quantity <= 0 )
        {
            // onItemRemove && onItemRemove(id);

            dispatch({ type: "REMOVE_ITEM", id });

            return;
        }

        const currentItem = state.items.find( (item) => item.id === id );

        if( !currentItem ) throw new Error("No such item to update");

        const payload = { ...currentItem, quantity };

        dispatch({
            type: "UPDATE_ITEM",
            id,
            payload,
        });

        // onItemUpdate && onItemUpdate(payload);
    }

    const getItem = (id) =>
    (
        state.items.find( (i) => i.id === id )
    )

    const setItems = (items) =>
    {
        dispatch({
            type: "SET_ITEMS",
            payload: items.map(item => ({
                ...item,
                quantity: item.quantity || 1,
            })),
        });

        // onSetItems && onSetItems(items);
    }

    const emptyCart = () =>
    {
        dispatch({ type: "EMPTY_CART" });

        // onEmptyCart && onEmptyCart();
    }

    const inCart = (id) =>
    (
        state.items.some( (i) => i.id === id )
    )

    const clearCartMetadata = () =>
    {
        dispatch({
            type: "CLEAR_CART_META",
        });
    }

    const setCartMetadata = (metadata) =>
    {
        if( !metadata ) return;

        dispatch({
            type: "SET_CART_META",
            payload: metadata,
        });
    }

    const updateCartMetadata = (metadata) =>
    {
        if( !metadata ) return;

        dispatch({
            type: "UPDATE_CART_META",
            payload: metadata,
        });
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                ...state,
                addItem,
                removeItem,
                updateItem,
                updateItemQuantity,
                getItem,
                setItems,
                emptyCart,
                inCart,
                clearCartMetadata,
                setCartMetadata,
                updateCartMetadata,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
}