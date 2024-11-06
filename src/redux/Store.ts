import { configureStore } from "@reduxjs/toolkit";
import ShopReducer from "./Reducers/ShopReducer"

const store = configureStore({
    reducer: {
        shop: ShopReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;