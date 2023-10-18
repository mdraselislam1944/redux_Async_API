import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/Counter/counterSlice';
import BaseApi from './features/Counter/api/BaseApi';
import userSlice from './features/Counter/api/userSlice';

 const store = configureStore({
  reducer: {
    counter:counterSlice,
    [BaseApi.reducerPath]: BaseApi.reducer,
    userSlice:userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(BaseApi.middleware),
})
export default store;