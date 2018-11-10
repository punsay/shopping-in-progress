import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import productReducer from './src/store/reducers/product';
import cartReducer from './src/store/reducers/cart';

import App from './src/app';

const rootReducer = combineReducers({
    cart: cartReducer,
    product: productReducer
});

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

