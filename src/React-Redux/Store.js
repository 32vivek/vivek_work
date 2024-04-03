import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reduxSlicer';

export const store = configureStore({

    reducer: {
        todo: todoReducer
    }
})