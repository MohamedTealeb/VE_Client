import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching categories from:', `${import.meta.env.VITE_BASEURL}/categories`);
      const response = await axios.get(`${import.meta.env.VITE_BASEURL}/categories`);
      console.log('Categories API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Categories API Error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
    }
  }
);

export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/categories`);
    return response.data;
  } catch (error) {
    console.error('getAllCategories API Error:', error);
    throw error.response?.data || error.message;
  }
};

