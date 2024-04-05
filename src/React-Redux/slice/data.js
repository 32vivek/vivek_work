import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    const response = await fetch("https://65a4e05752f07a8b4a3dd9b7.mockapi.io/auth");
    return response.json();
});

export const submitFormData = createAsyncThunk("submitFormData", async (formData) => {
    const response = await axios.post("https://65a4e05752f07a8b4a3dd9b7.mockapi.io/auth", formData);
    return response.data;
});

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        isLoading: false,
        data: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchTodos.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });

        builder.addCase(submitFormData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(submitFormData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(submitFormData.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });
    },
});

export default todoSlice.reducer;
