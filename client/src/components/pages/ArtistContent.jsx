import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";

import DisplayPage from "../DisplayPage";

import { useDispatch, useSelector } from "react-redux";

import { useFetch, useErrorHandler } from "../../hooks";

import config from "../../config";

import "../DisplayList.css";
import { showPlayer } from "../../store/audioPlayerSlice";

const ArtistContent = () => {
  const location = useLocation();
  const { artistId } = useParams();
  console.log("Artist Id:", artistId);

  const {
    data: artistTracks,
    loading,
    error,
  } = useFetch(`${config.baseURL}/artists/tracks/${artistId}`, [artistId]);

  const artist = artistTracks?.artist || {};
  const tracks = artistTracks?.data || [];
  const numberOfSongs = tracks?.length || 0;

  const topBanner = (
    <div
      className="flex items-center !p-4 h-full w-full gap-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${artist.bannerImage})` }}
    >
      <img
        src={artist.image}
        alt="artist-image"
        className="size-50 rounded-full shadow-2xl !ml-2"
      />
      <div className="flex flex-col  rounded-lg items-baseline !p-2 justify-evenly !ml-2">
        <h3> Artist</h3>
        <span className="text-7xl !mt-8  ">{artist.name}</span>
        <span className="text-xl !mt-2">
          {numberOfSongs} {numberOfSongs !== 1 ? "songs" : "song"}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <DisplayPage topBanner={topBanner}>
        <DisplayList tracks={artistTracks?.data} />
      </DisplayPage>
    </>
  );
};

export default ArtistContent;

function DisplayList({ tracks }) {
  const dispatch = useDispatch();

  const handlePlayTrack = (trackDetails) => {
    dispatch(showPlayer(trackDetails));
  };

  return tracks && tracks.length > 0 ? (
    <>
      <ul className="display-list">
        <li className=" display-list-row">
          <span className="song-col">Song</span>
          <span className="likes-col">Likes</span>
          <span className="artist-col">Posted</span>
        </li>
        {tracks.map((item) => (
          <li
            key={item._id}
            className="display-list-item display-list-row hover:cursor-pointer"
            onClick={() => handlePlayTrack({ track: item, queue: tracks })}
          >
            <span className="song-col flex items-center gap-2">
              <img src={item.thumbnailPath} alt="song-image" />
              <span>{item.name}</span>
            </span>
            <span className="likes-col">{item.likes}</span>
            <span className="artist-col">
              <span className="artist-col">
                {item.createdAt
                  ? format(new Date(item.createdAt), "dd-MM-yyyy")
                  : ""}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </>
  ) : (
    <span className="text-3xl !p-5">No songs added yet</span>
  );
}
