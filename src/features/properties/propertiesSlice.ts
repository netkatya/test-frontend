import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProperties } from "./propertiesApi";
import type { Property } from "./types";

type State = {
  items: Property[];
  loading: boolean;
};

const initialState: State = {
  items: [],
  loading: false,
};

export const loadProperties = createAsyncThunk("properties/load", async () => {
  return await fetchProperties();
});

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadProperties.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      });
  },
});

export const propertiesReducer = propertiesSlice.reducer;
