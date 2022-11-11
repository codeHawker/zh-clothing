import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.type";


// Utility functions

const addCartItem = (cartItems, productToAdd) => {
    // Returns a new cart with the given product added to it
    // if the product is already in the cart the quantity is
    // incrimented by 1. 

    // Check if product is in the cart
    const id = cartItems.findIndex(item => item.id === productToAdd.id);

    // If present incriment by 1
    if (id > -1) {
        return incrementCartItem(cartItems, productToAdd, 1)

        // Else add item to cart    
    } else {
        return [...cartItems, { ...productToAdd, quantity: 1 }]
    }
}

const removeCartItem = (cartItems, productToRemove) => {
    // Returns a new cart with the given product removed
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
}

const incrementCartItem = (cartItems, productToIncrement, ammoutToIncrement) => {
    // Returns a new cart with the given product incremented.
    return cartItems.map((cartItem) =>
        cartItem.id === productToIncrement.id ?
            { ...cartItem, quantity: cartItem.quantity + ammoutToIncrement } :
            cartItem
    ).filter((cartItem) => cartItem.quantity > 0) //removes item once it hits zero
}


// Setter functions

const setIsCartOpen = (boolean) => (
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
)

const setCartItems = (newCart) => (
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCart)
)


// Interface functions

export const toogleCart = (boolean) => (
    setIsCartOpen(boolean)
)

export const addItemToCart = (cartItems, productToAdd) => (
    setCartItems(addCartItem(cartItems, productToAdd))
)

export const removeItemFromCart = (cartItems, productToRemove) => (
    setCartItems(removeCartItem(cartItems, productToRemove))
)

export const incrementItemInCart = (cartItems, productToIncrement, ammoutToIncrement) => (
    setCartItems(incrementCartItem(cartItems, productToIncrement, ammoutToIncrement))
)