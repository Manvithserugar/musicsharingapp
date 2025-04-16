import React from "react";
import Card from "../Card";
import ImageCard from "../ImageCard";
import Itachi from "../../assets/Itachi.png";
import "./Home.css"

const Home = () => {
  return (
    <Card variantName="right-panel">
      <div className="home">
        <h2>Popular Artists</h2>
        <div className="rows">
          <ImageCard
            className="popular artists"
            imageUrl={Itachi}
            redirectUrl="/artist1"
          >
            <h5>Itachi</h5>
            <p>Artist</p>
          </ImageCard>
          <ImageCard
            className="popular artists"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Itachi</h5>
            <p>Artist</p>
          </ImageCard>
          <ImageCard
            className="popular artists"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Itachi</h5>
            <p>Artist</p>
          </ImageCard>
          <ImageCard
            className="popular artists"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Itachi</h5>
            <p>Artist</p>
          </ImageCard>
          <ImageCard
            className="popular artists"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Itachi</h5>
            <p>Artist</p>
          </ImageCard>
          <ImageCard
            className="popular artists"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Itachi</h5>
            <p>Artist</p>
          </ImageCard>
        </div>
        <h2>Popular Albums</h2>
        <div className="rows">
          <ImageCard
            className="popular albums"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Amaterasu</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular albums"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Amaterasu</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular albums"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Amaterasu</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular albums"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Amaterasu</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular albums"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Amaterasu</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular albums"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Amaterasu</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
        </div>
        <h2>Popular Singles</h2>
        <div className="rows">
          <ImageCard
            className="popular singles"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Massacre</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular singles"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Massacre</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular singles"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Massacre</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular singles"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Massacre</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular singles"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Massacre</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular singles"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Massacre</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
        </div>
        <h2>Popular Playlists</h2>
        <div className="rows">
          <ImageCard
            className="popular playlists"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Brothers</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular playlists"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Brothers</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular playlists"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Brothers</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular playlists"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Brothers</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular playlists"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Brothers</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
          <ImageCard
            className="popular playlists"
            imageUrl={Itachi}
            redirectUrl=""
          >
            <h5>Brothers</h5>
            <p>Itachi Uchiha</p>
          </ImageCard>
        </div>
      </div>
    </Card>
  );
};

export default Home;
