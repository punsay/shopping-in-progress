import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions/actionTypes';
import './shoppingProducts.css';

class ShoppingProducts extends Component {

    handleAddToCart = (product) => {

        this.props.addToCart(product);
        this.props.decShopItemQty(product.id);

    }

    render() {

        console.log("ADDED: ", this.props.cartProducts);

        const productsList = this.props.products.map((item) => {

            return (
                <div key={item.id} className="productCard">
                    <div className="itemImage">
                        <img src={item.image} />
                    </div>
                    <div className="itemDetail" >{item.name}</div>
                    <div className="itemDetail" >In Stock({item.quantity})</div>
                    <div className="itemDetail" >Price:{item.price}</div>
                    <button disabled={item.quantity === 0} onClick={() => this.handleAddToCart(item)} className="addToCartBtn">ADD TO CART</button>
                </div>
            );
        });

        return (
            <Fragment>
                <h2>To The New Mart</h2>
                <div className="TTNShop">
                    {productsList}
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.product.products,
        //cartProducts to be removed 
        cartProducts: state.cart.cartItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (product) => dispatch({ type: actionTypes.ADD_TO_CART, payload: product }),
        decShopItemQty: (id) => dispatch({ type: actionTypes.DEC_SHOP_ITEM_QTY, id: id })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingProducts);