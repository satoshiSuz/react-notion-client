import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import memoReducer from './features/memoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    memo: memoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
