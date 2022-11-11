import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, incrementItemInCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';

import { CheckoutItemContainer, ImageContainer, ItemProperty, ItemQtyProperty, RemoveButton, QtyValue, Arrow} from './checkout-item.styles'

const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const { name, imageUrl, price, quantity} = cartItem;
    const cartItems = useSelector(selectCartItems);

    const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem));
    const incrementItemUp = () => dispatch(incrementItemInCart(cartItems, cartItem, +1));
    const incrementItemDown = () => dispatch(incrementItemInCart(cartItems, cartItem, -1));

    return(
        <CheckoutItemContainer>

            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>

            <ItemProperty>{name}</ItemProperty>

            <ItemQtyProperty>
                <Arrow onClick={incrementItemDown}>&#10094;</Arrow>
                <QtyValue>{quantity}</QtyValue>
                <Arrow onClick={incrementItemUp}>&#10095;</Arrow>
            </ItemQtyProperty>
            
            <ItemProperty>{price}</ItemProperty>

            <RemoveButton onClick={removeItem}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem