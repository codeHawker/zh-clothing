import { createContext, useReducer } from 'react'

const addCartItem = (cartItems, productToAdd) => {
    // Returns a new cart with the given product added to it
    // if the product is already in the cart the quantity is
    // incrimented by 1. 

    // Check if product is in the cart
    const id = cartItems.findIndex(item => item.id === productToAdd.id);

    // If present incriment by 1
    if( id > -1){       
        return incrementCartItem(cartItems, productToAdd, 1)

    // Else add item to cart    
    }else{
        return [ ...cartItems, {...productToAdd, quantity:1}]
    }
}

const removeCartItem = (cartItems, productToRemove) => {
    // Returns a new cart with the given product removed
    return cartItems.filter( (cartItem) => cartItem.id !== productToRemove.id)
}

const incrementCartItem = (cartItems, productToIncrement, ammoutToIncrement) => {
    // Returns a new cart with the given product incremented.
    return cartItems.map( (cartItem) => 
            cartItem.id === productToIncrement.id ? 
            {...cartItem, quantity: cartItem.quantity + ammoutToIncrement} :
            cartItem
        ).filter((cartItem) => cartItem.quantity > 0) //removes item once it hits zero
}

const countNumOfItems = (cartItems) => (
    cartItems.reduce((previousVal, currentItem) => (previousVal + currentItem.quantity), 0)
)

const calculateCartTotalPrice = (cartItems) => (
    (cartItems.length > 0) ? cartItems.reduce((sum, item) => (sum + item.quantity*item.price), 0) : 0.00
)

export const CartContext = createContext({
    isCartOpen: false,
    cartItems: [],
    numOfItems: 0,
    totalPrice: 0,
    toogleCart: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    incrementItemInCart: () => {}
});

export const CART_ACTION_TYPE = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`)    
    }
}

const INITIAL_STATE = {
    cartItems: [],
    isCartOpen: false,
    numOfItems: 0,
    totalPrice: 0
}

export const CartProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);
    const { cartItems, isCartOpen, numOfItems, totalPrice } = state;

    const setIsCartOpen = ( newState ) => {
        dispatch({
            type: CART_ACTION_TYPE.SET_IS_CART_OPEN,
            payload: newState
        })
    }

    const setCartItems = ( newCart ) => {
        dispatch({
            type: CART_ACTION_TYPE.SET_CART_ITEMS,
            payload: {
                cartItems: newCart,
                numOfItems: countNumOfItems(newCart),
                totalPrice: calculateCartTotalPrice(newCart)
            }
        })
    }

    const toogleCart = () => {
        isCartOpen ? setIsCartOpen(false) : setIsCartOpen(true)
    }

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const incrementItemInCart = (productToIncrement, ammoutToIncrement) => {
        setCartItems(incrementCartItem(cartItems, productToIncrement, ammoutToIncrement))
    }

    const value = {
        isCartOpen,
        cartItems,
        numOfItems,
        totalPrice,
        toogleCart,
        addItemToCart,
        removeItemFromCart,
        incrementItemInCart
        }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};