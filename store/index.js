import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import topPostsReducer from './slices/topPostsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    topPosts: topPostsReducer,
  },
});
