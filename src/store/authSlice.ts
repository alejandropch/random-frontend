import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean
  userId: string | null
  isLoading: boolean,
  isAdmin: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  isLoading: true,
  isAdmin: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true
      state.userId = action.payload
      state.isLoading = false

    },
    finishLoading: (state) => {
      state.isLoading = false
    },
    isAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload
    }

  },
});

export const { login, finishLoading, isAdmin } = authSlice.actions;
export default authSlice.reducer;
