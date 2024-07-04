import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateUserAPI, CheckUserAPI ,UpdateUserAPI,SignoutUserAPI,checkAuthAPI} from "./authAPI";
const initialState = {
  users: [],
  loggedinUser:false,
  status: "idle",
};
export const CreateUser = createAsyncThunk(
  "user/CreateUser",
  async (data) => {
    const response = await CreateUserAPI(data);
    console.log(response);
    return response;
  }
);
export const CheckUser = createAsyncThunk(
  "user/CheckUser",
  async (data) => {
    const response = await CheckUserAPI(data);
    console.log("check user+++++++++++++++++++++++++++++++++++++");
    return response;
  }
);
export const CheckAuth = createAsyncThunk(
  "user/CheckAuth",
  async (data) => {
    const response = await checkAuthAPI(data);
    console.log("check auth+++++++++++++++++++++++++++++++++++++");
    return response;
  }
);
export const UpdateUser = createAsyncThunk(
  "user/UpdateUser",
  async (data) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const response = await UpdateUserAPI(data);
    console.log("update user+++++++++++++++++++++++++++++++++++++");
    console.log(response);
    return response;
  }
);
export const SignOutUser = createAsyncThunk(
  "user/SignOutUser",
  async () => {
    const response = await SignoutUserAPI();
    console.log(response);
    return response;
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increment: (state) => {
      state.users = state.users;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreateUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(CheckUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CheckUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;

      })
      .addCase(CheckAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CheckAuth.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedinUser = true;

      })
      .addCase(UpdateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(SignOutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(SignOutUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = []
      })

  },
});

export default userSlice.reducer;
