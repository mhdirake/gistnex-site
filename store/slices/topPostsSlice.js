import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '@/lib/axiosClient';

export const fetchTopPosts = createAsyncThunk(
  'topPosts/fetch',
  async ({ limit = 9, minScore = 9 } = {}) => {
    const { data } = await axiosClient.get('/api/client/top-posts', { params: { limit, minScore } });
    return data;
  }
);

const topPostsSlice = createSlice({
  name: 'topPosts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTopPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.posts;
      })
      .addCase(fetchTopPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default topPostsSlice.reducer;
