import { createContext, useState } from 'react'

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

export const CartContext = createContext({
    isCartOpen: false,
    toogleCart: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    incrementItemInCart: () => {}
});

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)

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
        toogleCart, 
        cartItems, 
        addItemToCart, 
        removeItemFromCart,
        incrementItemInCart
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};