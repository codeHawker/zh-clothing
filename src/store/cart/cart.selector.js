import { createSelector } from 'reselect'

// Selector functions

const selectCartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cartSlice) => cartSlice.isCartOpen
)

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cartSlice) => cartSlice.cartItems
)

export const selectNumOfItems = createSelector(
    [selectCartItems],
    (cartItems) => countNumOfItems(cartItems)
)

export const selectTotalPrice = createSelector(
    [selectCartItems],
    (cartItems) => calculateCartTotalPrice(cartItems)
)


// Utility functions

const countNumOfItems = (cartItems) => (
    cartItems.reduce((previousVal, currentItem) => (previousVal + currentItem.quantity), 0)
)

const calculateCartTotalPrice = (cartItems) => (
    (cartItems.length > 0) ? cartItems.reduce((sum, item) => (sum + item.quantity*item.price), 0) : 0.00
)