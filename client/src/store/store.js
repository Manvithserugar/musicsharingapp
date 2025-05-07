import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";
import audioPlayerReducer from "./audioPlayerSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    audioPlayer: audioPlayerReducer,
  },
});

export default store;
