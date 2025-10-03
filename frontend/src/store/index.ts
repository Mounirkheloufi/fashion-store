import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import usersReducer from './usersSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        products: productReducer,
        users: usersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;