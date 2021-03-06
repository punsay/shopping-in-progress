import * as actionTypes from '../actions/actionTypes';
const initialState = {
    cartItems: []
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            {
                let { cartItems } = state;
                const { id, name, price, image } = action.payload;
                let availableQty = action.payload.quantity;
                let quantity = 1;
                let totalPrice = price;

                //if the user clicks on the same item then increment the quantity
                //of the same item , otherwise 
                let sameItem = cartItems.filter(item => (id === item.id));
                if (sameItem.length) {

                    quantity = sameItem[0].quantity + 1;
                    availableQty = --availableQty;
                    totalPrice = quantity * price;
                    cartItems = cartItems.map((item) => {
                        if (item.id === id) {
                            return { id, name, quantity, price, image, availableQty, totalPrice }
                        } else {
                            return item;
                        }
                    });
                }

                else {     //  the case when user has clicked on a different item
                    // let avQuantity = availableQty - 1;
                    cartItems = cartItems.concat([{ id, name, quantity, price, image, availableQty: --availableQty, totalPrice }]);
                }
                return {
                    cartItems
                };
            }
        case actionTypes.INC_CART_ITEM_QUANTITY:
            {
                let { cartItems } = state;
                const { id, price } = action.payload;
                let totalPrice = price;

                let sameItem = cartItems.filter(item => (id === item.id));
                if (sameItem.length) {
                    let quantity = sameItem[0].quantity + 1;
                    totalPrice = sameItem[0].price * quantity;
                    let availableQty = sameItem[0].availableQty - 1;
                    cartItems = cartItems.map((item) => {
                        if (item.id === id) {
                            return { ...item, quantity, availableQty, totalPrice }
                        } else {
                            return item;
                        }
                    });
                }
                return {
                    cartItems
                };
            }
        case actionTypes.DEC_CART_ITEM_QTY:
            {
                let { cartItems } = state;
                const { id, price } = action.payload;
                let totalPrice = price;

                let sameItem = cartItems.filter(item => (id === item.id));
                if (sameItem.length) {
                    let quantity = sameItem[0].quantity - 1;
                    totalPrice = price * quantity;
                    let availableQty = sameItem[0].availableQty + 1;
                    cartItems = cartItems.map((item) => {
                        if (item.id === id) {
                            return { ...item, quantity, availableQty, totalPrice }
                        } else {
                            return item;
                        }
                    });
                }
                return {
                    cartItems
                };
            }
        case actionTypes.DELETE_FROM_CART:
            {
                let { cartItems } = state;
                const currItem = action.payload;
                const itemToRemoveIndex = cartItems.indexOf(currItem);
                cartItems.splice(itemToRemoveIndex, 1);
                const updatedCartItems = cartItems.slice();
                return {
                    cartItems: updatedCartItems
                };
            }
        default:
            return state;

    }
}

export default reducer;