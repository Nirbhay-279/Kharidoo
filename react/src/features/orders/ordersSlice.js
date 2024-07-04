import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateOrdersAPI,GetOrdersAPI} from './ordersAPI';

const initialState = {
  orders: [],
  status: 'idle',
};
export const GetOrders = createAsyncThunk(
  'orders/GetOrders',
  async (id) => {
    const response = await GetOrdersAPI(id);
    return response;
  }
);

export const CreateOrders = createAsyncThunk(
  'orders/CreateOrders',
  async (orders) => {
    const response = await CreateOrdersAPI(orders);
    return response;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    increment: (state) => {
      state.products=state.products
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(GetOrders.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders = action.payload;
      })
      .addCase(CreateOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateOrders.fulfilled, (state, action) => {
        state.status = 'idle';
      })      
  },
});



export default ordersSlice.reducer;
