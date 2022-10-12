import { createContext, useState } from 'react'

export const CartContext = createContext({
    isCartOpen: false,
    toogleCart: () => {},
    cartItems: [],
    addProductToCart: () => {}
});

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const toogleCart = () => {
        isCartOpen ? setIsCartOpen(false) : setIsCartOpen(true)
    }

    const addProductToCart = (product) => {
        console.log('CART: ', cartItems)
        setCartItems([...cartItems, product])
    }

    const value = {isCartOpen, toogleCart, cartItems, addProductToCart}

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};