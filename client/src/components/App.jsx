import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import LeftPanel from "./LeftPanel.jsx";

import Home from "./pages/Home.jsx";
import Trending from "./pages/Trending.jsx";
import Artists from "./pages/Artists.jsx";
import Playlist from "./pages/Playlist.jsx";
import Album from "./pages/Album.jsx";
import DisplayPage from "./DisplayPage.jsx";
import BecomeArtist from "./pages/BecomeArtist.jsx";
import "./App.css";
import UserAuth from "./pages/UserAuth.jsx";
import SnackbarNotification from "./SnackbarNotification.jsx";
import CustomAudioPlayer from "./CustomAudioPlayer.jsx";

import { styled, ThemeProvider } from "@mui/material";
import theme from "../theme.js";

function AppLayout() {
  return (
    <div className="main-page">
      <Header />
      <div className="card-container">
        <LeftPanel />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/album" element={<Album />} />
          <Route path="/artist1" element={<DisplayPage />} />
          <Route path="/become-artist" element={<BecomeArtist />} />
        </Routes>
      </div>
      <CustomAudioPlayer />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isUserAuthRoute = location.pathname.startsWith("/userauth");

  return isUserAuthRoute ? (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/userauth/*" element={<UserAuth />} />
      </Routes>
    </ThemeProvider>
  ) : (
    <>
      <AppLayout />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SnackbarNotification />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
