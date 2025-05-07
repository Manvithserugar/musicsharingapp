import React, { useEffect, useState } from "react";
import Card from "../Card";
import ImageCard from "../ImageCard";
import Itachi from "../../assets/Itachi.png";
import Gojo from "../../assets/Gojo.png";
import Frieren from "../../assets/Frieren.jpg";
import singer1 from "../../assets/singer1.png";
import singer2 from "../../assets/singer2.png";
import singer3 from "../../assets/singer3.png";
import "./Home.css";
import trackAPI from "../../APIs/track";
import useErrorHandler from "../../hooks/useErrorHandler";
import { useDispatch } from "react-redux";
import { showPlayer } from "../../store/audioPlayerSlice";

const Home = () => {
  const [topTracks, setTopTracks] = useState([]);
  const handleError = useErrorHandler();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await trackAPI.getTopTracks();
        setTopTracks(response.topTracks);
      } catch (error) {
        handleError(error);
      }
    };

    fetchTopTracks();
  }, []);

  const handlePlayTrack = (trackId) => {
    dispatch(showPlayer(trackId));
  };

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
            <h5>Artist 1</h5>
            <p>Artist</p>
          </ImageCard>
          <ImageCard
            className="popular artists"
            imageUrl={Gojo}
            redirectUrl="/artist1"
          >
            <h5>Artist 2</h5>
            <p>Artist</p>
          </ImageCard>
          <ImageCard
            className="popular artists"
            imageUrl={Frieren}
            redirectUrl="/artist1"
          >
            <h5>Artist 3</h5>
            <p>Artist</p>
          </ImageCard>
          <ImageCard
            className="popular artists"
            imageUrl={singer1}
            // redirectUrl="/artist1"
          >
            <h5>Artist 4</h5>
            <p>Artist</p>
          </ImageCard>
          {/* <ImageCard
            className="popular artists"
            imageUrl={singer2}
            // redirectUrl="/artist1"
          >
            <h5>Artist 5</h5>
            <p>Artist</p>
          </ImageCard>
          <ImageCard
            className="popular artists"
            imageUrl={singer3}
            // redirectUrl="/artist1"
          >
            <h5>Artist 6</h5>
            <p>Artist</p>
          </ImageCard> */}
        </div>
        <h2>Popular Singles</h2>
        <div className="rows">
          {topTracks.map((track) => (
            <ImageCard
              key={track._id}
              className="popular singles"
              imageUrl={track.thumbnailPath}
              onClick={() => handlePlayTrack(track._id)}
              // redirectUrl={`/track/${track._id}`}
            >
              <h5>{track.name}</h5>
              <p>{track.artist}</p>
            </ImageCard>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Home;
