import { useDispatch, useSelector } from 'react-redux'
import { toogleCart } from '../../store/cart/cart.action'
import { selectIsCartOpen, selectNumOfItems } from '../../store/cart/cart.selector'

import { CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles'

const CartIcon = () => {
    const dispatch = useDispatch();
    const numOfItems = useSelector(selectNumOfItems)
    const isCartOpen = useSelector(selectIsCartOpen)

    const toogleIsCartOpen = () => dispatch(toogleCart(!isCartOpen))

    return (
        <CartIconContainer>
            <ShoppingIcon className='shopping-icon' onClick={toogleIsCartOpen} />
            <ItemCount>{numOfItems}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon