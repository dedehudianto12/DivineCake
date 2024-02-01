
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
    name: "carts",
    initialState: {
        carts: [],
        loading: false,
        error: null
    },
    reducers: {
        clearCarts: (state) => {
            state.carts = [];
            state.loading = false;
            state.error = null;
          },
    },
    extraReducers: (builder) => {
        builder
        // Fetch
        .addCase(fetchCartsAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCartsAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.carts = action.payload.payload;
            state.error = null;
        })
        .addCase(fetchCartsAsync.rejected, (state, action) => {
            state.loading = false;
            state.carts = [];
            state.error = action.error.message;
        })
        // Add
        .addCase(createCartsAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createCartsAsync.fulfilled, (state, action) => {
            state.loading = false;
            const existingCartIndex = state.carts.findIndex(
                (cart) => cart.id === action.payload.cart.id
            );
            
            if (existingCartIndex !== -1) {
                // Cart already exists, update the quantity
                state.carts[existingCartIndex].quantity += 1;
            } else {
                // Cart does not exist, push the new cart
                state.carts.push(action.payload.cart);
            }
            state.error = null;
            })
        .addCase(createCartsAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
        // delete
        .addCase(deleteCartsAsync.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
        .addCase(deleteCartsAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.carts = action.payload.payload
            state.error = null;
        })
        .addCase(deleteCartsAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }

})

export const fetchCartsAsync = createAsyncThunk(
    "carts/fetchCarts",
    async () => {
        try{
            const token = await AsyncStorage.getItem('token') 
            const userType = await AsyncStorage.getItem("userType")
            const response = await axios.get(`http://192.168.0.104:3000/${userType}s/cart`, {headers: {access_token: token}});
            return response.data;
        }catch(error){
            return error.message
        }
    }
)

export const createCartsAsync = createAsyncThunk(
    "carts/createCarts",
    async (body) => {
        try{
            const token = await AsyncStorage.getItem('token') 
            const userType = await AsyncStorage.getItem("userType")
            const response = await axios.post(`http://192.168.0.104:3000/${userType}s/cart`, body, {headers: {access_token: token}});
            return response.data;
        }catch(error){
            return error.message
        }
    }
)

export const deleteCartsAsync = createAsyncThunk(
    "carts/deleteCarts",
    async (id) => {
        try{
            const token = await AsyncStorage.getItem('token') 
            const userType = await AsyncStorage.getItem("userType")
            const response = await axios.delete(`http://192.168.0.104:3000/${userType}s/cart/${id}`, {headers: {access_token: token}});
            return response.data;
        }catch(error){
            return error.message
        }
    }
)

// cartSlice.js

export const createCheckoutAsync = createAsyncThunk(
    'carts/createCheckout',
    async (_, { dispatch, getState }) => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token)
        const userType = await AsyncStorage.getItem('userType');
        const transactionResponse = await axios.post(
          `http://192.168.0.104:3000/${userType}s/checkout`, {},
          {
            headers: { access_token: token },
          }
        );
  
        dispatch(clearCarts());
  
        return transactionResponse.data;
      } catch (error) {
        return error.message
      }
    }
  );
  

export const {clearCarts} = cartSlice.actions
  

export default cartSlice.reducer