import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, password }, { rejectWithValue }) => {
    try {
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
      
      // Check if the response contains a success message
      if (response.data.message === "Password reset successfully") {
        return { success: true, message: response.data.message };
      }

      // If we have a message but it's not a success message, it's an error
      if (response.data.message) {
        return rejectWithValue(response.data.message);
      }

      // If we have an error object
      if (response.data.error) {
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
      throw handleApiError(error);
    }
  }
); 