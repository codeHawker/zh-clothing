import { useContext } from "react";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { CartContext } from "../../contexts/cart.context";




const Checkout = () => {
    const {cartItems} = useContext(CartContext);

    const totalPrice = (cartItems.length > 0) ? cartItems.reduce((sum, item) => (sum + item.quantity*item.price), 0) : 0.00

    return(
        <div className="checkout-container">
            <div className="checkout-header">
                <span>Product</span>
                <span>Description</span>
                <span>Quantity</span>
                <span>Price</span>
                <span>Remove</span>
            </div>

            {cartItems.map((cartItem) => 
                <CheckoutItem cartItem={cartItem} key={cartItem.id} />
            )}

            <div className="total">
                <span>Total: ${totalPrice}</span>
            </div>


        </div>
    )
};

export default Checkout;