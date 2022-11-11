import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles'

const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems)

    const navigate = useNavigate();
    const goToCheckout = () => {
        navigate('/checkout')
    };
    

    return(
            <CartDropdownContainer>
                <CartItems>
                    {
                    cartItems.length? (cartItems.map( (item) => {
                        return(
                            <CartItem key={item.id} cartItem={item}/>
                        )
                    }
                    )): <EmptyMessage>No Items In Cart</EmptyMessage>
                    }
                </CartItems>
                <Button onClick={goToCheckout}>Go To Checkout</Button>
                
            </CartDropdownContainer>
        )
};

export default CartDropdown;