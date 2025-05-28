import React, { useEffect, useState } from "react";
import Card from "../Card";
import ImageCard from "../ImageCard";
import Itachi from "../../assets/Itachi.png";
import Gojo from "../../assets/Gojo.png";
import Frieren from "../../assets/Frieren.jpg";
import singer1 from "../../assets/singer1.png";
import "./Home.css";
import { getTopTracks } from "../../APIs";
import { useErrorHandler, useFetch } from "../../hooks";
import { useDispatch } from "react-redux";
import { showPlayer } from "../../store/audioPlayerSlice";
import config from "../../config";

const Home = () => {
  const [topTracks, setTopTracks] = useState([]);
  const handleError = useErrorHandler();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await getTopTracks();
        setTopTracks(response.topTracks);
      } catch (error) {
        handleError(error);
      }
    };

    fetchTopTracks();
  }, []);

  const {
    data: topArtists,
    loading,
    error,
  } = useFetch(`${config.baseURL}/artists/top`);
  console.log("Top Artists:", topArtists);

  const handlePlayTrack = (trackDetails) => {
    dispatch(showPlayer(trackDetails));
  };

  return (
    <Card variantName="right-panel">
      <div className="home">
        <h2>Popular Artists</h2>
        <div className="rows">
          {topArtists &&
            topArtists.topArtists &&
            topArtists.topArtists.length > 0 &&
            topArtists.topArtists.map((artist) => (
              <ImageCard
                className="popular artists"
                imageUrl={artist.image}
                key={artist._id}
                redirectUrl={`/artist/${artist._id}`}
              >
                <h5>{artist.name}</h5>
                <p>Artist</p>
              </ImageCard>
            ))}
        </div>
        <h2>Popular Singles</h2>
        <div className="rows">
          {topTracks.map((track) => (
            <ImageCard
              key={track._id}
              className="popular singles"
              imageUrl={track.thumbnailPath}
              onClick={() => handlePlayTrack({ track, queue: topTracks })}
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
