import { useContext } from "react";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";

import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.styles'




const Checkout = () => {
    const {cartItems} = useContext(CartContext);

    const totalPrice = (cartItems.length > 0) ? cartItems.reduce((sum, item) => (sum + item.quantity*item.price), 0) : 0.00

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


        </CheckoutContainer>
    )
};

export default Checkout;