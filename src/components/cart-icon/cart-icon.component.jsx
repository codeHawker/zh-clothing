import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

import { CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles'

const CartIcon = () => {
    const {toogleCart, numOfItems} = useContext(CartContext)

    return (
        <CartIconContainer>
            <ShoppingIcon className='shopping-icon' onClick={toogleCart} />
            <ItemCount>{numOfItems}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon