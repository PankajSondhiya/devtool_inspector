import { configureStore } from "@reduxjs/toolkit";
import landingPage from "../slices/landingPage.slice";
export const store = configureStore({
  reducer: {
    landingPage,
  },
});
