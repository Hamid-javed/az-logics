import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../services/apiClient';
import { AxiosError } from 'axios';

export interface AuthState {
    seeds: string;
    isAuthenticated: boolean | undefined;
    isSeedsLoading: boolean;
    isTokenLoading: boolean;
    error: string | undefined | null;
  }

const initialState: AuthState = {
    seeds: '',
    isAuthenticated: false,
    isSeedsLoading: false,
    isTokenLoading: false,
    error: "",
}

interface SeedPayload {
  enc_salt: string;
  encrypted_private_key: string;
  encrypted_private_key_iv: string;
  encrypted_private_key_tag: string;
  pass_phrase: string;
  public_key: string;
}

// Async Thunks for API Calls
export const fetchSeeds = createAsyncThunk('auth/fetchSeeds', async (payload : SeedPayload, { rejectWithValue }) => {
  try {
    const response = await apiClient.post('/user/generate-pass-phrase/', payload);
    return response.data; 
  } catch (error) {
    if(error instanceof AxiosError)
    return rejectWithValue(error.response?.data || 'Failed to fetch seeds');
  }
});


  export const generateToken = createAsyncThunk(
    'api/generateToken',
    async (payload: object, { rejectWithValue }) => {
      try {
        const response = await apiClient.post('/user/generate-token/', payload);
        return response.data; 
      } catch (error) {
        if(error instanceof AxiosError)
        return rejectWithValue(error.response?.data);
      }
    }
  );
  
// Slice for API State Management
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}, // Use for non-async reducers if needed
  extraReducers: (builder) => {

    // Handle fetchSeeds actions
    builder.addCase(fetchSeeds.pending, (state) => {
      state.isSeedsLoading = true;
      state.error = null;
    });
    builder.addCase(fetchSeeds.fulfilled, (state, action) => {
      state.isSeedsLoading = false;
      state.seeds = action.payload;
    });
    builder.addCase(fetchSeeds.rejected, (state, action) => {
      state.isSeedsLoading = false;
      state.error =  (typeof action.payload === 'string' || action.payload === null || action.payload === undefined) ? action.payload : 'Unkown Error';
    });

      // Handle generateToken actions
    builder.addCase(generateToken.pending, (state) => {
      state.isTokenLoading = true;
      state.error = null;
    });
    builder.addCase(generateToken.fulfilled, (state) => {
      state.isTokenLoading = false;
    });
    builder.addCase(generateToken.rejected, (state, action) => {
      state.isTokenLoading = false;
      state.error = (typeof action.payload === 'string' || action.payload === null || action.payload === undefined) ? action.payload : 'Unkown Error';
    });
  },
});

export default authSlice.reducer;
