import { configureStore } from "@reduxjs/toolkit";
import { propertiesReducer } from "../features/properties/propertiesSlice";
import { authReducer } from "../features/auth/authSlice";
import { applicationsReducer } from "../features/applications/applicationsSlice";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    auth: authReducer,
    aplications: applicationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
