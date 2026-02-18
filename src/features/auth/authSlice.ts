import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, meRequest, registerRequest } from "./authApi";
import type { User } from "./types";
import type { AuthForm } from "./validation";
import type { AxiosError } from "axios";

type State = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

/* ================= REGISTER ================= */

export const register = createAsyncThunk<
  { accessToken: string; user: User },
  AuthForm,
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await registerRequest(data.email, data.password);

    localStorage.setItem("token", res.accessToken);
    return res;
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 409)
      return rejectWithValue("User already exists");

    return rejectWithValue("Registration failed");
  }
});

/* ================= LOGIN ================= */

export const login = createAsyncThunk<
  { accessToken: string; user: User },
  AuthForm,
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await loginRequest(data.email, data.password);

    localStorage.setItem("token", res.accessToken);
    return res;
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.status === 401)
      return rejectWithValue("Invalid email or password");

    return rejectWithValue("Login failed");
  }
});

/* ================= RESTORE SESSION ================= */

export const fetchMe = createAsyncThunk<User>(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      return await meRequest();
    } catch {
      return rejectWithValue(null);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      /* LOGIN */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login error";
      })

      /* REGISTER */
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Register error";
      })

      /* RESTORE SESSION */
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
