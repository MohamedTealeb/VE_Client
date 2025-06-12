import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASEURL}/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
    }
  }
);

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/categories`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

