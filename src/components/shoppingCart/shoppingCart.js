import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/actionTypes';
import './shoppingCart.css';


class ShoppingCart extends Component {


    render() {

        const { cartProducts } = this.props;

        console.log("ADDED: ", cartProducts);

        let cartItemsList = cartProducts.map((item) => {
            if (item.quantity) {
                return (
                    <div key={item.id} className="cartItemCard">
                        <div className="cartItemImage">
                            <img src={item.image} />
                        </div>
                        <div className="cartItemDetail-main">
                            <div className="cartItemInfo">{item.name}</div>
                            <div className="cartItemInfo" >Price:{item.price}</div>
                            <div className="cartQty-main">
                                <button disabled={item.availableQty == 0} onClick={() => this.props.incCartItemQty(item)} className="incCartItemBtn">+</button>
                                <div className="cartItemQty" >{item.quantity}</div>
                                <button onClick={() => this.props.decCartItemQty(item)} className="removeFromCartBtn">-</button>
                            </div>
                            <button onClick={() => this.props.deleteFromCart(item)} className="deleteFromCartButton">Remove from Cart</button>
                        </div>
                    </div>
                )
            }
        });
        let orderSummaryList = cartProducts.map((item) => {
            return (
                <div key="item.id">
                    <div>{item.name}</div>
                    <div>Total Price: {item.price} X {item.quantity} = {item.totalPrice}</div>
                </div>
            );
        });

        let totalPriceArray = cartProducts.map((item) => {

            return (item.totalPrice);
        });

        let totalAmount = totalPriceArray.reduce((a, b) => a + b, 0);

        console.log("totalAmount: ", totalAmount);

        console.log("cartProducts.length:  ", this.props.cartProducts.length);

        return (
            <div>
                <h2>Your Shopping Cart</h2>
                {this.props.cartProducts.length ? (
                    <div className="TTNCart">
                        <div className="items-section">
                            {cartItemsList}
                        </div>
                        <div className="orderSummary-section">
                            <h3>Order Summary</h3>
                            {orderSummaryList}
                            <div>
                                Total ({cartProducts.length} items): {totalAmount} Rs
                        </div>
                        </div>
                    </div>
                ) : (
                        <div className="emptyCartMsg">
                            Sorry !! There are no items in you cart.
                            Please go back to the store to add items to your shopping cart.
                        </div>
                    )
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {

    return {
        cartProducts: state.cart.cartItems,
    }

}

const mapDispatchToProps = (dispatch) => {

    return {
        incCartItemQty: (item) => dispatch({ type: actionTypes.INC_CART_ITEM_QUANTITY, payload: item }),
        decCartItemQty: (item) => dispatch({ type: actionTypes.DEC_CART_ITEM_QTY, payload: item }),
        deleteFromCart: (item) => dispatch({ type: actionTypes.DELETE_FROM_CART, payload: item, availableQty: item.availableQty })
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);