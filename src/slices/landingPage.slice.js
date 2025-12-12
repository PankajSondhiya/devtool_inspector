import { createSlice } from "@reduxjs/toolkit";

const LandingPageSlice = createSlice({
  name: "landingPage",
  initialState: {
    position: {
      x: 0,
      y: 0,
    },
    hoveredRect: null,
    demoMode: false,
    locked: false,
  },
  reducers: {
    setPosition(state, { payload }) {
      state.position.x = payload.x;
      state.position.y = payload.y;
    },
    setHoveredRect(state, { payload }) {
      state.hoveredRect = payload;
    },
    setDemoMode(state) {
      state.demoMode = !state.demoMode;
    },
    setLocked: (state, action) => {
      state.locked = action.payload.value ?? !state.locked;
    },
  },
});

export const { setPosition, setHoveredRect, setDemoMode, setLocked } =
  LandingPageSlice.actions;
export default LandingPageSlice.reducer;
