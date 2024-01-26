// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    userType: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    loginUser: (state, action) => {
      console.log("masukkk")
      const { user, userType } = action.payload;
      state.user = user;
      state.userType = userType;
      state.loading = 'idle';
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = null;
      state.userType = null;
      state.loading = 'idle';
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder)=>{
    builder
    .addCase(loginUserAsync.pending, (state)=>{
      state.loading = true
      state.user = null
      state.userType = null
      state.error = null
    })
    .addCase(loginUserAsync.fulfilled, (state, action)=>{
      state.loading = false
      const { user, userType } = action.payload;
      state.user = user;
      state.userType = userType;
      state.error = null;
    })
    .addCase(loginUserAsync.rejected, (state, action)=>{
      state.loading = false
      state.user = null
      state.error  = action.error.message
    })
  }
});


export const { loginUser, logoutUser, setError } = authSlice.actions;

export const loginUserAsync = createAsyncThunk("user/loginUser", async (credentials)=>{
  const response = await axios.post('http://192.168.0.104:3000/auth/login', credentials);
  const { access_token, userType } = response.data;
  await AsyncStorage.setItem('token', access_token);
  await AsyncStorage.setItem('userType', userType);
  return response.data
  
})

export default authSlice.reducer;
