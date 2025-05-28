import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import LeftPanel from "./LeftPanel.jsx";

import Home from "./pages/Home.jsx";
import Trending from "./pages/Trending.jsx";
import Artists from "./pages/Artists.jsx";
import Playlist from "./pages/Playlist.jsx";
import PlaylistContenet from "./pages/PlaylistContenet.jsx";
import Saved from "./pages/Saved.jsx";
import Liked from "./pages/Liked.jsx";
import Album from "./pages/Album.jsx";
import DisplayPage from "./DisplayPage.jsx";
import BecomeArtist from "./pages/BecomeArtist.jsx";

import "./App.css";

import UserAuth from "./pages/UserAuth.jsx";
import SnackbarNotification from "./SnackbarNotification.jsx";
import CustomAudioPlayer from "./CustomAudioPlayer.jsx";
import Modal from "./Modal.jsx";

import { styled, ThemeProvider } from "@mui/material";
import theme from "../theme.js";
import ArtistContent from "./pages/ArtistContent.jsx";
import YourProfile from "./pages/YourProfile.jsx";

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
          <Route path="/playlist/:id" element={<PlaylistContenet />} />
          <Route path="/album" element={<Album />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/artist/:artistId" element={<ArtistContent />} />
          <Route path="/become-artist" element={<BecomeArtist />} />
          <Route path="/profile" element={<YourProfile />} />
        </Routes>
      </div>
      <CustomAudioPlayer />
      {/* <Modal /> */}
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
