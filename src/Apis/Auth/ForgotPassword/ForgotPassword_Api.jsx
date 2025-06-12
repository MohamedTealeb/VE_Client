import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/forgot-password`, { email }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

