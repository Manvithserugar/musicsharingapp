import React from "react";
import "./DisplayList.css";

import { useDispatch } from "react-redux";
import { showPlayer } from "../../store/audioPlayerSlice";

function DisplayList({ data, onClick }) {
  const dispatch = useDispatch();
  const handlePlayTrack = (trackDetails) => {
    dispatch(showPlayer(trackDetails));
  };
  return data && data.length > 0 ? (
    <ul className="display-list">
      <li className="header flex items-center justify-between !p-2 !mb-2">
        <span className="song">Song</span>
        <span className="likes !ml-18">Likes</span>
        <span className="artist">Artist</span>
      </li>
      {data.map((item, index) => (
        <li
          key={index}
          className="display-list-item hover:cursor-pointer"
          onClick={onClick}
        >
          {item.song}
          {item.likes}
          {item.artist}
        </li>
      ))}
    </ul>
  ) : (
    <span className="text-3xl !p-5">No songs added yet</span>
  );
}

export default DisplayList;
