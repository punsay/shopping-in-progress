import React, { Component } from 'react';
import { NavLink, BrowserRouter, Route, Switch } from 'react-router-dom';
import ShoppingProducts from '../components/shoppingProducts/shoppingProducts';
import ShoppingCart from '../components/shoppingCart/shoppingCart';
import './shop.css';

class Shop extends Component {

    render() {
        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li><NavLink to="/cart">TTN Cart</NavLink></li>
                    </ul>
                    <Switch>
                        <Route exact path='/' component={ShoppingProducts} />
                        <Route path='/cart' component={ShoppingCart} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default Shop;