import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ firstName, lastName, email, phoneNumber, password }, { rejectWithValue }) => {
    try {
      // Log the request details
      console.log('Signup Request Details:', {
        url: `${import.meta.env.VITE_BASEURL}/auth/register`,
        firstName,
        lastName,
        email,
        phoneNumber,
        passwordLength: password.length
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BASEURL}/auth/register`,
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      // Log the complete response
      console.log('Signup Response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers
      });

      if (response.data) {
        return response.data;
      }

      return rejectWithValue("Failed to create account");
    } catch (error) {
      // Log the complete error
      console.error('Signup Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers
      });

      // Handle specific error cases
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      } else if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      } else if (error.message) {
        return rejectWithValue(error.message);
      }
      
      return rejectWithValue("Failed to create account. Please try again.");
    }
  }
); 