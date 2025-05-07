import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlayerVisible: false,
  isMinimized: false,
  trackId: null,
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    showPlayer: (state, action) => {
      state.isPlayerVisible = true;
      state.isMinimized = false;
      state.trackId = action.payload; 
    },
    hidePlayer: (state) => {
      state.isPlayerVisible = false;
      state.trackId = null;
    },
    minimizePlayer: (state) => {
      state.isMinimized = true;
    },
    expandPlayer: (state) => {
      state.isMinimized = false;
    },
  },
});

export const { showPlayer, hidePlayer, minimizePlayer, expandPlayer } =
  audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
