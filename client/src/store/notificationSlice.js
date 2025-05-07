import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  severity: "success",
  notification: "",
  notifications: [],
  notificationsCount: 0,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = action.payload.message;
      state.severity = action.payload.severity || "success";
      state.open = true;
    },
    addNotification: (state, action) => {
      console.log("payload data", action.payload);

      state.notifications = [...state.notifications, action.payload];
      state.notificationsCount = state.notificationsCount + 1;
    },
    clearNotifications: (state, action) => {
      state.notifications = [];
      state.notificationsCount = 0;
    },
  },
});

export const {
  showNotification,
  addNotification,
  clearNotifications,
  setOpen,
} = notificationSlice.actions;

export default notificationSlice.reducer;
