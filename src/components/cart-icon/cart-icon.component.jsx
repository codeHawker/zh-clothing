import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import { CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles'

const CartIcon = () => {
    const {toogleCart, cartItems} = useContext(CartContext)

    const cartItemQty = cartItems.reduce((previousVal, currentItem) => (previousVal + currentItem.quantity), 0)


    return (
        <CartIconContainer>
            <ShoppingIcon className='shopping-icon' onClick={toogleCart} />
            <ItemCount>{cartItemQty}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon