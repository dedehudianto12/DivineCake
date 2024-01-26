// reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from "./productSlice"
import transactionReducer from './transactionSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  transactions: transactionReducer
  // Add other slices here
});

export default rootReducer;
