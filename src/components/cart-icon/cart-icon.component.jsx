import './cart-icon.styles.scss'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CartIcon = () => {
    const {toogleCart, cartItems} = useContext(CartContext)

    const cartItemQty = cartItems.reduce((previousVal, currentItem) => (previousVal + currentItem.quantity), 0)


    return (
        <div className="cart-icon-container" >
            <ShoppingIcon className='shopping-icon' onClick={toogleCart} />
            <span className='item-count'>{cartItemQty}</span>
        </div>
    )
}

export default CartIcon