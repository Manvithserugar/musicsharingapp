import React from "react";
import Card from "../Card";
import ImageCard from "../ImageCard";
import Gojo from "../../assets/Gojo.png";
import "./Home.css";

const Trending = () => {
  return (
    <Card variantName="right-panel">
      <h2>Trending Artists</h2>
      <div className="rows">
        <ImageCard className="trending artists" imageUrl={Gojo} redirectUrl="">
          <h5>Gojo</h5>
          <p>Artist</p>
        </ImageCard>
        <ImageCard className="trending artists" imageUrl={Gojo} redirectUrl="">
          <h5>Gojo</h5>
          <p>Artist</p>
        </ImageCard>
        <ImageCard className="trending artists" imageUrl={Gojo} redirectUrl="">
          <h5>Gojo</h5>
          <p>Artist</p>
        </ImageCard>
        <ImageCard className="trending artists" imageUrl={Gojo} redirectUrl="">
          <h5>Gojo</h5>
          <p>Artist</p>
        </ImageCard>
        <ImageCard className="trending artists" imageUrl={Gojo} redirectUrl="">
          <h5>Gojo</h5>
          <p>Artist</p>
        </ImageCard>
        <ImageCard className="trending artists" imageUrl={Gojo} redirectUrl="">
          <h5>Gojo</h5>
          <p>Artist</p>
        </ImageCard>
      </div>
      <h2>Trending Albums</h2>
      <div className="rows">
        <ImageCard className="trending albums" imageUrl={Gojo} redirectUrl="">
          <h5>Amaterasu</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard className="trending albums" imageUrl={Gojo} redirectUrl="">
          <h5>Amaterasu</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard className="trending albums" imageUrl={Gojo} redirectUrl="">
          <h5>Amaterasu</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard className="trending albums" imageUrl={Gojo} redirectUrl="">
          <h5>Amaterasu</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard className="trending albums" imageUrl={Gojo} redirectUrl="">
          <h5>Amaterasu</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard className="trending albums" imageUrl={Gojo} redirectUrl="">
          <h5>Amaterasu</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
      </div>
      <h2>Trending Singles</h2>
      <div className="rows">
        <ImageCard className="trending singles" imageUrl={Gojo} redirectUrl="">
          <h5>Massacre</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard className="trending singles" imageUrl={Gojo} redirectUrl="">
          <h5>Massacre</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard className="trending singles" imageUrl={Gojo} redirectUrl="">
          <h5>Massacre</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard className="trending singles" imageUrl={Gojo} redirectUrl="">
          <h5>Massacre</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard className="trending singles" imageUrl={Gojo} redirectUrl="">
          <h5>Massacre</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard className="trending singles" imageUrl={Gojo} redirectUrl="">
          <h5>Massacre</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
      </div>
      <h2>Trending Playlists</h2>
      <div className="rows">
        <ImageCard
          className="trending playlists"
          imageUrl={Gojo}
          redirectUrl=""
        >
          <h5>Brothers</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard
          className="trending playlists"
          imageUrl={Gojo}
          redirectUrl=""
        >
          <h5>Brothers</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard
          className="trending playlists"
          imageUrl={Gojo}
          redirectUrl=""
        >
          <h5>Brothers</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard
          className="trending playlists"
          imageUrl={Gojo}
          redirectUrl=""
        >
          <h5>Brothers</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard
          className="trending playlists"
          imageUrl={Gojo}
          redirectUrl=""
        >
          <h5>Brothers</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
        <ImageCard
          className="trending playlists"
          imageUrl={Gojo}
          redirectUrl=""
        >
          <h5>Brothers</h5>
          <p>Gojo Satoru</p>
        </ImageCard>
      </div>
    </Card>
  );
};

export default Trending;
