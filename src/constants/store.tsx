import {configureStore} from '@reduxjs/toolkit';
import counterSlice from '@app/constants/cartReducers';

export const store = configureStore({
  reducer: counterSlice,
});
