import Card from "../Card";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { format } from "date-fns";

import DisplayPage from "../DisplayPage";
import RegisterArtistForm from "../RegisterArtistForm";
import Button from "../Button";
import Modal from "../Modal";
import UploadTrackForm from "../UploadTrackForm";

import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../store/modalSlice";

import { useFetch, useErrorHandler } from "../../hooks";

import config from "../../config";

import "../DisplayList.css";
import { showPlayer } from "../../store/audioPlayerSlice";
import { useForm, Controller } from "react-hook-form";

const YourProfile = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  const [isUploadTrackModalOpen, setIsUploadTrackModalOpen] = useState(false);

  const handleCloseUploadTrackModal = () => {
    setIsUploadTrackModalOpen(false);
    dispatch(closeModal());
  };

  const [showForm, setShowForm] = useState(true);

  const {
    data: profileData,
    loading,
    error,
  } = useFetch(`${config.baseURL}/userdata/profile`, [showForm]);

  const user = profileData?.profile?.User || {};
  const artistInfo = profileData?.profile?.artist || {};

  const artistId = artistInfo?._id;
  console.log("Artist ID:", artistId);

  const { data: artistTracks } = useFetch(
    artistId ? `${config.baseURL}/artists/tracks/${artistId}` : null,
    [artistId, isUploadTrackModalOpen]
  );

  const artist = artistTracks?.artist || {};
  const tracks = artistTracks?.data || [];
  const numberOfSongs = tracks?.length || 0;

  const topBanner = (
    <div
      className="flex items-center !p-4 h-full w-full gap-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${artistInfo?.bannerImage})` }}
    >
      {user?.usertype === "artist" && artistInfo?.image ? (
        <img
          src={artist.image}
          alt="artist-image"
          className="size-50 rounded-full shadow-2xl !ml-2"
        />
      ) : (
        <div className="size-50 rounded-full shadow-2xl !ml-2 bg-gray-600 flex items-center justify-center">
          <span className="text-7xl font-bold text-white">
            {user?.name?.charAt(0)?.toUpperCase()}
          </span>
        </div>
      )}
      <div className="flex flex-col  rounded-lg items-baseline !p-2 justify-evenly !ml-2">
        <span className="text-2xl">{user.name}</span>
        {user?.usertype === "artist" && (
          <>
            <span className="text-7xl !mt-8">{artistInfo.name}</span>
            <span className="text-2xl">Artist</span>
            <span className="text-xl !mt-2">
              {numberOfSongs} {numberOfSongs !== 1 ? "songs" : "song"}
            </span>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <DisplayPage topBanner={topBanner}>
        {user.usertype !== "artist" && showForm && (
          <RegisterArtistForm showForm={showForm} setShowForm={setShowForm} />
        )}
        {user.usertype === "artist" && (
          <div className="flex flex-col gap-2 !m-4 !my-6 w-30">
            <span>Upload tracks</span>
            <Button
              className="add-btn"
              onClick={() => {
                setIsUploadTrackModalOpen(true);
                dispatch(openModal());
              }}
            >
              Add +
            </Button>
          </div>
        )}
        <DisplayList tracks={artistTracks?.data} />
      </DisplayPage>
      {isUploadTrackModalOpen && (
        <Modal
          openState={isUploadTrackModalOpen}
          handleClose={handleCloseUploadTrackModal}
        >
          <UploadTrackForm
            artist={artistInfo?.name}
            artistId={artistInfo?._id}
            handleClose={handleCloseUploadTrackModal}
          />
        </Modal>
      )}
    </>
  );
};

export default YourProfile;

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
