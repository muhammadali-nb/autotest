import { configureStore } from '@reduxjs/toolkit'
// ...
import baseDataReducer from './reducers/baseDataSlice';
import filterReducer from './reducers/filterSlice';

export const store = configureStore({
  reducer: {
    baseData: baseDataReducer,
    filter: filterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch