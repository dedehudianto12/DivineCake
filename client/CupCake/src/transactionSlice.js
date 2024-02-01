
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const transactionSlice = createSlice({
    name: "transactions",
    initialState: {
        transactions: [],
        loading: false,
        error: null
    },
    reducers: {
        updateTransactionSuccess: (state, action) => {
            const index = state.transactions.findIndex(t => t.id === action.payload.id);
            state.transactions[index].status = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchTransactionAsync.pending, (state)=>{
                state.loading = true,
                state.error = null
            })
            .addCase(fetchTransactionAsync.fulfilled, (state, action)=>{
                state.transactions = action.payload.payload
                state.loading = false
                state.error = null
            })
            .addCase(fetchTransactionAsync.rejected, (state, action)=>{
                state.loading = false
                state.transactions = []
                state.error = action.error.message
            })
            // Update
            .addCase(updateTransactionAsync.pending, (state)=>{
                state.loading = true,
                state.error = null
            })
            .addCase(updateTransactionAsync.fulfilled, (state, action)=>{
                state.loading = false;
                const currentTransaction = action.payload.updateTransaction;
                updateTransactionSuccess(state, { payload: currentTransaction });

                state.error = null;
            })
            .addCase(updateTransactionAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
              });
    }
})


export const fetchTransactionAsync = createAsyncThunk(
    "transaction/fetchTransaction",
    async () => {
        const token = await AsyncStorage.getItem('token')
        const userType = await AsyncStorage.getItem("userType")
        const response = await axios.get(`http://192.168.0.104:3000/${userType}s/transaction`, {
            headers : {
                access_token: token
            }
        })
        return response.data
    }
)

export const updateTransactionAsync = createAsyncThunk(
    "transaction/updateTransaction",
    async (payload) => {
        const {id, status} = payload
        const body = {status}
        const token = await AsyncStorage.getItem("token")
        const response = await axios.patch(`http://192.168.0.104:3000/admins/transaction/${id}`, body, {
            headers : {
                access_token: token
            }
        })
        
        return response.data
    }
)

export const { updateTransactionSuccess } = transactionSlice.actions;

export default transactionSlice.reducer