import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddReviewAPI, FetchReviewsAPI, DeleteReviewAPI,FetchReviewsByProductAPI } from "./reviewAPI";

const initialState = {
  review: [],
  status: "idle",
};

export const AddReview = createAsyncThunk(
  "review/AddReview",
  async (data) => {
    const response = await AddReviewAPI(data);
    return response; // Adjust the payload based on your API response structure
  }
);

export const FetchReviews = createAsyncThunk(
  "review/FetchReviews",
  async (id) => {
    const response = await FetchReviewsByProductAPI(id)
    return response; // Adjust the payload based on your API response structure
  }
);

export const DeleteReview = createAsyncThunk(
  "review/DeleteReview",
  async (reviewId) => {
    const response = await DeleteReviewAPI(reviewId);
    return response; // Adjust the payload based on your API response structure
  }
);

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AddReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddReview.fulfilled, (state, action) => {
        state.status = "idle";
        state.review.push(action.payload); // Assuming the payload is the added review
      })
      .addCase(FetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchReviews.fulfilled, (state, action) => {
        state.status = "idle";
        state.review = action.payload; // Assuming the payload is an array of reviews
      })
      .addCase(DeleteReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteReview.fulfilled, (state, action) => {
        state.status = "idle";
        // Remove the deleted review from the review array
        state.review = state.review.filter((review) => review.id !== action.payload.id);
      });
  },
});

export default reviewSlice.reducer;
