
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateProductStocks: (state, action) => {
      const updates = action.payload;
      
      updates.forEach(({ productId, newStock }) => {
        const productIndex = state.products.findIndex((product) => product.id === productId);

        if (productIndex !== -1) {
          state.products[productIndex].stock = newStock;
        }
      });
    }
  }, 
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.payload;
        state.error = null;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message;
      })
      // Post
      .addCase(createProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.payload);
        state.error = null;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete
      .addCase(deleteProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        const productIndex = state.products.findIndex((product) => product.id === action.payload.id);
        state.products.splice(productIndex, 1);
        state.error = null;
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update
      .addCase(updateProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
      
        const current_product = action.payload.payload
        const productIndex = state.products.findIndex((product) => product.id === current_product.id);
      
        state.products[productIndex] = current_product;
        state.error = null;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const fetchProductsAsync = createAsyncThunk(
    'products/fetchProducts',
    async () => {
      try{
        const token = await AsyncStorage.getItem('token') 
        const userType = await AsyncStorage.getItem("userType")
        const response = await axios.get(`http://192.168.0.104:3000/${userType}s/product`, {headers: {access_token: token}});
        return response.data;
      }catch(error){
        return error.message
      }
    }
  );

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (productId) => {
    console.log(productId)
    const token = await AsyncStorage.getItem('token');
    const response = await axios.delete(`http://192.168.0.104:3000/admins/product/${productId}`, {
      headers: { access_token: token },
    });
    return response.data; 
  }
);

export const createProductAsync = createAsyncThunk(
  'products/createProduct',
  async (formData) => {
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: { 
        "Content-Type": "multipart/form-data",
        "access_token": token 
      }
    }
    const response = await axios.post('http://192.168.0.104:3000/admins/product', formData, config)
    return response.data
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProduct",
  async (arg, { rejectWithValue }) => {
    const { productId, formData } = arg;
    const token = await AsyncStorage.getItem('token');
    const config = {
      headers: { 
        "Content-Type": "multipart/form-data",
        "access_token": token 
      }
    }
    try{
      const response = await axios.patch(`http://192.168.0.104:3000/admins/product/${productId}`, formData, config)
      console.log(response.data)
      return response.data
    }catch(error){
      throw(error)
    }
  }
)

export const { updateProductStocks } = productSlice.actions

export default productSlice.reducer;