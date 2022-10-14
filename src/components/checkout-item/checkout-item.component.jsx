import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss'

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity} = cartItem;

    const {removeItemFromCart, incrementItemInCart} = useContext(CartContext);

    const removeItem = () => removeItemFromCart(cartItem);
    const incrementItemUp = () => incrementItemInCart(cartItem, +1);
    const incrementItemDown = () => incrementItemInCart(cartItem, -1);



    return(
        <div className="checkout-item-container">

            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>

            <span className="name">{name}</span>

            <span className="quantity">
                <div className='arrow' onClick={incrementItemDown}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={incrementItemUp}>&#10095;</div>
            </span>
            
            <span className="price">{price}</span>

            <div className="remove-button" onClick={removeItem}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem