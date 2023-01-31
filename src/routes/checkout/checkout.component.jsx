import { useSelector } from "react-redux";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { selectCartItems, selectTotalPrice } from "../../store/cart/cart.selector";

import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.styles'
import PayementForm from "../../components/paymemt-form/payment-form.component";




const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const totalPrice = useSelector(selectTotalPrice)

    return(
        <CheckoutContainer>
            <CheckoutHeader>
                
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>

                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>

            </CheckoutHeader>

            {cartItems.map((cartItem) => 
                <CheckoutItem cartItem={cartItem} key={cartItem.id} />
            )}

            <Total>Total: ${totalPrice}</Total>

            <PayementForm/>


        </CheckoutContainer>
    )
};

export default Checkout;