import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [],
  track: {},
  isPlayerVisible: false,
  isMinimized: false,
  trackId: null,
  isPlaying: false,
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    showPlayer: (state, action) => {
      state.isPlayerVisible = true;
      state.isMinimized = true;
      state.isPlaying = true;
      state.track = action.payload.track;
      if (action.payload.queue && action.payload.queue.length > 0) {
        state.queue = action.payload.queue;
      }
    },
    hidePlayer: (state) => {
      state.isPlayerVisible = false;
      state.track = null;
      state.queue = [];
      state.isMinimized = false;
      state.isPlaying = false;
    },
    minimizePlayer: (state) => {
      state.isMinimized = true;
    },
    expandPlayer: (state) => {
      state.isMinimized = false;
    },
    toggleIsPlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const {
  showPlayer,
  hidePlayer,
  minimizePlayer,
  expandPlayer,
  toggleIsPlaying,
} = audioPlayerSlice.actions;

export default audioPlayerSlice.reducer;
