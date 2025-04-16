import React from "react";
import Card from "../Card";
import ImageCard from "../ImageCard";
import Frieren from "../../assets/Frieren.jpg";
import "./Playlist.css";

function Playlist() {
  return (
    <Card variantName="right-panel">
      <h2>Artists</h2>
      <div className="playlist-section">
        <ImageCard
          className="popular artists"
          imageUrl={Frieren}
          redirectUrl=""
        >
          <h5>Sisters</h5>
          <p>Frieren </p>
        </ImageCard>
        <ImageCard
          className="popular artists"
          imageUrl={Frieren}
          redirectUrl=""
        >
          <h5>Sisters</h5>
          <p>Frieren </p>
        </ImageCard>
        <ImageCard
          className="popular artists"
          imageUrl={Frieren}
          redirectUrl=""
        >
          <h5>Sisters</h5>
          <p>Frieren </p>
        </ImageCard>
        <ImageCard
          className="popular artists"
          imageUrl={Frieren}
          redirectUrl=""
        >
          <h5>Sisters</h5>
          <p>Frieren </p>
        </ImageCard>
        <ImageCard
          className="popular artists"
          imageUrl={Frieren}
          redirectUrl=""
        >
          <h5>Sisters</h5>
          <p>Frieren </p>
        </ImageCard>
        <ImageCard
          className="popular artists"
          imageUrl={Frieren}
          redirectUrl=""
        >
          <h5>Sisters</h5>
          <p>Frieren </p>
        </ImageCard>
        <ImageCard
          className="popular artists"
          imageUrl={Frieren}
          redirectUrl=""
        >
          <h5>Sisters</h5>
          <p>Frieren </p>
        </ImageCard>
        <ImageCard
          className="popular artists"
          imageUrl={Frieren}
          redirectUrl=""
        >
          <h5>Sisters</h5>
          <p>Frieren </p>
        </ImageCard>
      </div>
    </Card>
  );
}

export default Playlist;
