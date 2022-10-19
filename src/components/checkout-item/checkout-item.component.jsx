import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { CheckoutItemContainer, ImageContainer, ItemProperty, ItemQtyProperty, RemoveButton, QtyValue, Arrow} from './checkout-item.styles'

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity} = cartItem;

    const {removeItemFromCart, incrementItemInCart} = useContext(CartContext);

    const removeItem = () => removeItemFromCart(cartItem);
    const incrementItemUp = () => incrementItemInCart(cartItem, +1);
    const incrementItemDown = () => incrementItemInCart(cartItem, -1);



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