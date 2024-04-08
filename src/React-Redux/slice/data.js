import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API = "https://65a4e05752f07a8b4a3dd9b7.mockapi.io/auth";

//Fetch Item
export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    const response = await fetch(API);
    return response.json();
});

//Post Item
export const submitFormData = createAsyncThunk("submitFormData", async (formData) => {
    const response = await axios.post(API, formData);
    return response.data;
});

// Delete Item
export const deleteItem = createAsyncThunk("deleteItem", async (itemId) => {
    await axios.delete(`${API}/${itemId}`);
    return itemId;
});

// Update Item
export const updateItem = createAsyncThunk("updateItem", async ({ itemId, formData }) => {
    const response = await axios.put(`${API}/${itemId}`, formData);
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

        // fetching data
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

        // submit form data
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

        // delete form data 
        builder.addCase(deleteItem.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deleteItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.filter(item => item.id !== action.payload);
        });
        builder.addCase(deleteItem.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });

        // Update Item
        builder.addCase(updateItem.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(updateItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload; // Update the item
                }
                return item;
            });
        });
        builder.addCase(updateItem.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isError = true;
        });

    },
});

export default todoSlice.reducer;
