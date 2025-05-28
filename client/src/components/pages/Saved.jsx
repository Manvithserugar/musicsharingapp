import React from "react";
import Card from "../Card";
import { useFetch } from "../../hooks";
import config from "../../config";
import { useDispatch } from "react-redux";
import { showPlayer } from "../../store/audioPlayerSlice";
import ImageCard from "../ImageCard";

const Saved = () => {
  const dispatch = useDispatch();

  const url = `${config.baseURL}/userdata/tracks/saved`;
  const { data: savedTracks, loading, error } = useFetch(url);
  console.log(savedTracks);

  const handlePlayTrack = (trackDetails) => {
    dispatch(showPlayer(trackDetails));
  };

  return (
    <Card variantName={"right-panel"}>
      <h4>saved</h4>

      <div className="rows">
        {savedTracks &&
          savedTracks.data.map((track) => (
            <ImageCard
              key={track._id}
              className="popular singles"
              imageUrl={track.thumbnailPath}
              onClick={() => handlePlayTrack({ track, queue: savedTracks })}
            >
              <h5>{track.name}</h5>
              <p>{track.artist}</p>
            </ImageCard>
          ))}
      </div>
    </Card>
  );
};

export default Saved;
