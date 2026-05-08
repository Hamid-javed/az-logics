import appReducer from '../reducer/AppReducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    appReducer,
  },
});

// ✅ Correctly Export RootState & AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;