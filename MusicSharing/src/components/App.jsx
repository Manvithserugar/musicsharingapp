import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
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
            <Route path="/become-artist" element={<BecomeArtist />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
