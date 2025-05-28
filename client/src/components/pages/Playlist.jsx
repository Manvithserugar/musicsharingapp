import React, { useState } from "react";
import Card from "../Card";
import ImageCard from "../ImageCard";

import "./Playlist.css";
import { IoAdd } from "react-icons/io5";

import CreatePlaylistForm from "../CreatePlaylistForm";
import Modal from "../Modal";

import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../store/modalSlice";
import { useFetch } from "../../hooks";
import config from "../../config";

function Playlist() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] =
    useState(false);

  const handleCloseCreatePlaylistModal = () => {
    setIsCreatePlaylistModalOpen(false);
    dispatch(closeModal());
  };

  const {
    data: playlists,
    loading,
    error,
  } = useFetch(`${config.baseURL}/playlists/user`, [isOpen]);
  console.log(playlists);

  return (
    <Card variantName="right-panel">
      <h2>Playlists</h2>
      <div className="playlist-section rows">
        <div className="flex flex-col gap-2  items-center hover:scale-110 transition-all duration-300 ">
          <button
            type="button"
            className="create-new-playlist size-[150px] !m-[10px] border rounded-lg cursor-pointer flex justify-center items-center"
            onClick={() => {
              setIsCreatePlaylistModalOpen(true);
              dispatch(openModal());
            }}
          >
            <span className="!p-2 rounded-full bg-[var(--color-primary)]">
              <IoAdd size={50} />
            </span>
          </button>
          <h3>Create New</h3>
        </div>
        {playlists &&
          playlists.userPlaylists.length > 0 &&
          playlists.userPlaylists.map((playlist) => (
            <ImageCard
              key={playlist._id}
              className="popular playlists"
              imageUrl={playlist.coverImage}
              redirectUrl={`/playlist/${playlist._id}`}
            >
              <h5>{playlist.name}</h5>
            </ImageCard>
          ))}
      </div>
      {isCreatePlaylistModalOpen && (
        <Modal
          openState={isCreatePlaylistModalOpen}
          handleClose={handleCloseCreatePlaylistModal}
        >
          <CreatePlaylistForm handleClose={handleCloseCreatePlaylistModal} />
        </Modal>
      )}
    </Card>
  );
}

export default Playlist;
