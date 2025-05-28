import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Card from "../Card";
import Modal from "../Modal";
import DisplayPage from "../DisplayPage";
import RemoveFromPlaylist from "../RemoveFromPlaylist";

import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../store/modalSlice";
import { useFetch, useErrorHandler } from "../../hooks";
import { removeTrackFromPlaylist } from "../../APIs";
import config from "../../config";

import "../DisplayList.css";
import { showPlayer } from "../../store/audioPlayerSlice";

import { IoIosRemoveCircleOutline } from "react-icons/io";

const PlaylistContenet = () => {
  const { id } = useParams();
  const {
    data: playlistData,
    loading,
    error,
  } = useFetch(`${config.baseURL}/playlists/${id}`, [id]);

  const {
    _id: playListId,
    name,
    coverImage,
    playlist,
  } = playlistData?.data || {};
  const numberOfSongs = playlist?.length || 0;

  const topBanner = (
    <div className="flex items-center !p-4  h-full w-full gap-4">
      <img
        src={coverImage}
        alt="cover-image"
        className="size-50 rounded-lg shadow-2xl !ml-2"
      />
      <div className="flex flex-col  rounded-lg items-baseline !p-2 justify-evenly !ml-2">
        <h3>playlist</h3>
        <span className="text-7xl !mt-8">{name}</span>
        <span className="text-xl !mt-2">
          {numberOfSongs} {numberOfSongs !== 1 ? "songs" : "song"}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <DisplayPage topBanner={topBanner}>
        <DisplayList playlist={playlist} playListId={playListId} />
      </DisplayPage>
    </>
  );
};

export default PlaylistContenet;

function DisplayList({ playlist: initialPlaylist, playListId }) {
  const { handleError } = useErrorHandler();
  const dispatch = useDispatch();

  const [playlist, setPlaylist] = useState(initialPlaylist || []);
  useEffect(() => {
    setPlaylist(initialPlaylist || []);
  }, [initialPlaylist]);

  const [trackId, setTrackId] = useState(null);

  const handlePlayTrack = (trackDetails) => {
    dispatch(showPlayer(trackDetails));
  };

  const [isRemoveFromPlaylistModalOpen, setIsRemoveFromPlaylistModalOpen] =
    useState(false);

  const handleCloseRemoveFromPlaylistModal = () => {
    setIsRemoveFromPlaylistModalOpen(false);
    dispatch(closeModal());
  };

  const handleRemoveTrackFromPlaylist = async (playlistId, trackId) => {
    console.log("Removing track from playlist:", playlistId, trackId);

    try {
      const response = await removeTrackFromPlaylist(playlistId, trackId);
      if (response.status === 200) {
        setPlaylist((prev) => prev.filter((item) => item._id !== trackId));
        handleCloseRemoveFromPlaylistModal();
      }
    } catch (error) {
      handleError(error);
    }
  };

  return playlist && playlist.length > 0 ? (
    <>
      <ul className="display-list">
        <li className="display-list-item display-list-row">
          <span className="song-col">Song</span>
          <span className="likes-col">Likes</span>
          <span className="artist-col">Artist</span>
        </li>
        {playlist.map((item) => (
          <li
            key={item._id}
            className="display-list-item display-list-row hover:cursor-pointer"
            onClick={() => handlePlayTrack({ track: item, queue: playlist })}
          >
            <span className="song-col flex items-center gap-2">
              <img src={item.thumbnailPath} alt="song-image" />
              <span>{item.name}</span>
            </span>
            <span className="likes-col">{item.likes}</span>
            <span className="artist-col">
              <span>{item.artist}</span>
              <span className="remove-btn-container !pl-20">
                <button
                  type="button"
                  className="remove-btn hover:bg-[var(--color-secondary)]/70 rounded-full !p-1 transition duration-300 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsRemoveFromPlaylistModalOpen(true);
                    dispatch(openModal());
                    setTrackId(item._id);
                  }}
                >
                  <IoIosRemoveCircleOutline color="red" />
                </button>
              </span>
            </span>
          </li>
        ))}
      </ul>
      {isRemoveFromPlaylistModalOpen && (
        <Modal
          openState={isRemoveFromPlaylistModalOpen}
          handleClose={handleCloseRemoveFromPlaylistModal}
        >
          <RemoveFromPlaylist
            handleRemove={() =>
              handleRemoveTrackFromPlaylist(playListId, trackId)
            }
            handleClose={handleCloseRemoveFromPlaylistModal}
          />
        </Modal>
      )}
    </>
  ) : (
    <span className="text-3xl !p-5">No songs added yet</span>
  );
}
