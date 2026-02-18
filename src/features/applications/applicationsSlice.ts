import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createApplication } from "./aplicationApi";

type State = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: State = {
  loading: false,
  success: false,
  error: null,
};

export const sendApplication = createAsyncThunk(
  "applications/send",
  async (
    { propertyId, amount }: { propertyId: number; amount: number },
    { rejectWithValue },
  ) => {
    try {
      return await createApplication(propertyId, amount);
    } catch {
      return rejectWithValue("FAILED");
    }
  },
);

const slice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    reset(state) {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendApplication.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendApplication.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to send";
      });
  },
});

export const { reset } = slice.actions;
export const applicationsReducer = slice.reducer;
