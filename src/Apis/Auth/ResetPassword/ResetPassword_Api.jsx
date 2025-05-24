import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, password }, { rejectWithValue }) => {
    try {
      // Log the request details
      console.log('Reset Password Request Details:');
      console.log('URL:', `${import.meta.env.VITE_BASEURL}/auth/reset-password`);
      console.log('Request Body:', {
        email,
        otp,
        newPassword: '***' // Don't log actual password
      });

      // Ensure all required fields are present and properly formatted
      if (!email || !otp || !password) {
        return rejectWithValue("All fields are required");
      }

      // Format the request body to match Swagger API specification
      const requestBody = {
        email: email.trim(),
        otp: otp.trim(),
        newPassword: password.trim()
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/auth/reset-password`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
      // Log the complete response
      console.log('Reset Password Response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers
      });

      // Check if the response contains a success message
      if (response.data.message === "Password reset successfully") {
        return { success: true, message: response.data.message };
      }

      // If we have a message but it's not a success message, it's an error
      if (response.data.message) {
        console.log('Error message from response:', response.data.message);
        return rejectWithValue(response.data.message);
      }

      // If we have an error object
      if (response.data.error) {
        console.log('Error object from response:', response.data.error);
        const errorObj = response.data.error;
        if (typeof errorObj === 'object') {
          // If error object has specific fields, use them
          if (errorObj.message) {
            return rejectWithValue(errorObj.message);
          }
          // If error object is empty, provide a default message
          if (Object.keys(errorObj).length === 0) {
            return rejectWithValue("Invalid OTP or password. Please try again.");
          }
        }
      }

      return rejectWithValue("Failed to reset password. Please try again.");
    } catch (error) {
      // Log the complete error
      console.error('Reset Password Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers
      });
      
      // Handle axios error response
      if (error.response?.data) {
        const errorData = error.response.data;
        console.log('Error data:', errorData);
        
        // If we have a message in the error response
        if (errorData.message) {
          return rejectWithValue(errorData.message);
        }
        
        // If we have an error object
        if (errorData.error) {
          const errorObj = errorData.error;
          if (typeof errorObj === 'object') {
            if (errorObj.message) {
              return rejectWithValue(errorObj.message);
            }
            if (Object.keys(errorObj).length === 0) {
              return rejectWithValue("Invalid OTP or password. Please try again.");
            }
          }
        }
      }

      // Handle network or other errors
      return rejectWithValue(error.message || "Network error. Please try again.");
    }
  }
); 