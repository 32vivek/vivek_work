import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/data"

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});
