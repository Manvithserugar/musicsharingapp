import React from "react";
import Card from "../Card";
import { useFetch } from "../../hooks";
import config from "../../config";
import { useDispatch } from "react-redux";
import { showPlayer } from "../../store/audioPlayerSlice";
import ImageCard from "../ImageCard";

const Liked = () => {
  const dispatch = useDispatch();

  const url = `${config.baseURL}/userdata/tracks/liked`;
  const { data: likedTracks, loading, error } = useFetch(url);
  console.log(likedTracks);

  const handlePlayTrack = (trackDetails) => {
    dispatch(showPlayer(trackDetails));
  };

  return (
    <Card variantName={"right-panel"}>
      <h4>Liked Songs</h4>

      <div className="rows">
        {likedTracks &&
          likedTracks.data.map((track) => (
            <ImageCard
              key={track._id}
              className="popular singles"
              imageUrl={track.thumbnailPath}
              onClick={() => handlePlayTrack({ track, queue: likedTracks })}
            >
              <h5>{track.name}</h5>
              <p>{track.artist}</p>
            </ImageCard>
          ))}
      </div>
    </Card>
  );
};

export default Liked;
