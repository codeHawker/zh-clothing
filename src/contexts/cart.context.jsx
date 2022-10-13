import { createContext, useState } from 'react'

const addCartItem = (cartItems, productToAdd) => {
    // Find if product exists in cart

    const id = cartItems.findIndex(item => item.id === productToAdd.id);

    // If found increment quantity

    if( id > -1){
        return cartItems.map( (cartItem) => 
            cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} :
            cartItem
        )
    }else{
        return [ ...cartItems, {...productToAdd, quantity:1}]
    }

}

export const CartContext = createContext({
    isCartOpen: false,
    toogleCart: () => {},
    cartItems: [],
    addItemtToCart: () => {}
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

    const value = {isCartOpen, toogleCart, cartItems, addItemToCart}

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};