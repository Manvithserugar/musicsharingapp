import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationSlice";
import audioPlayerReducer from "./audioPlayerSlice";
import modalReducer from "./modalSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    audioPlayer: audioPlayerReducer,
    modal: modalReducer,
  },
});

export default store;
