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
            <img src={imageUrl} alt={`${name}`} />
            <span className="name">{name}</span>
            <div>
                <span onClick={incrementItemDown} >{`< `}</span>
                <span className="quantity">{quantity}</span>
                <span onClick={incrementItemUp}>{` >`}</span>
            </div>
            
            <span className="price">{price}</span>
            <span className="remove" onClick={removeItem}>X</span>
        </div>
    )
}

export default CheckoutItem