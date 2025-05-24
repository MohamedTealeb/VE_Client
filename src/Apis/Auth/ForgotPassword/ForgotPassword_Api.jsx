import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      // Log the request details
      console.log('Forgot Password Request Details:');
      console.log('URL:', `${import.meta.env.VITE_BASEURL}/auth/forgot-password`);
      console.log('Email:', email);

      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/auth/forgot-password`,
        { email }
      );
      
      // Log the complete response
      console.log('Forgot Password Response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers
      });
      
      if (response.data) {
        return response.data;
      }
      
      return rejectWithValue("Failed to send OTP");
    } catch (error) {
      // Log the complete error
      console.error('Forgot Password Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers
      });

      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      } else if (error.message) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to send OTP. Please try again.");
    }
  }
);

