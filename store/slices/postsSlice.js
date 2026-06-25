import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '@/lib/axiosClient';

export const fetchPosts = createAsyncThunk(
  'posts/fetch',
  async ({ page = 1, limit = 9, tag } = {}) => {
    const params = { page, limit };
    if (tag) params.tag = tag;
    const { data } = await axiosClient.get('/api/client/blog', { params });
    return { ...data, page };
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    total: 0,
    page: 1,
    limit: 9,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.posts;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
