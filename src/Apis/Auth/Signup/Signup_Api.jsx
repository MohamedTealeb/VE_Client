import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "auth/signup",
  async ({ firstName, lastName, email, phoneNumber, password }, { rejectWithValue }) => {
    try {
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

      if (response.data) {
        return response.data;
      }

      return rejectWithValue("Failed to create account");
    } catch (error) {
      throw handleApiError(error);
    }
  }
);

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/auth/signup`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}; 