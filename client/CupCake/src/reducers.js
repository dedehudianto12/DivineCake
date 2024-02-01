// reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from "./productSlice"
import transactionReducer from './transactionSlice';
import cartReducer from "./cartSlice"

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  transactions: transactionReducer,
  carts: cartReducer
  // Add other slices here
});

export default rootReducer;
