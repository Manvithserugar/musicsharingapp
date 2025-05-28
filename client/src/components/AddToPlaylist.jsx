import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  Children,
} from "react";
import { useToggle, useFetch, useErrorHandler } from "../hooks";
import { useForm, Controller } from "react-hook-form";

import config from "../config";
import {
  IoIosAddCircleOutline,
  IoIosCheckmark,
  IoMdCreate,
  IoIosCheckmarkCircle,
  IoIosRemoveCircleOutline,
} from "react-icons/io";
import { FaCheckCircle, FaRegTrashAlt } from "react-icons/fa";

import Button from "./Button";
import CreatePlaylistForm from "./CreatePlaylistForm";
import RemoveFromPlaylist from "./RemoveFromPlaylist";
import Modal from "./Modal";
import "./AddToPlaylist.css";

import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../store/modalSlice";
import { addTrackToPlaylists, removeTrackFromPlaylist } from "../APIs";

const AddToPlaylist = ({ alreadyPresentPlaylistIds: initialIds }) => {
  const { isOpen } = useSelector((state) => state.modal);
  const [isAddToPlaylist, toggleIsAddToPlaylist, setIsAddToPlaylist] =
    useToggle(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [alreadyPresentPlaylistIds, setAlreadyPresentPlaylistIds] = useState(
    initialIds || []
  );

  const { track } = useSelector((state) => state.audioPlayer);

  const btnRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isAddToPlaylist) return;
    const handleClickOutside = (event) => {
      if (
        !isOpen &&
        btnRef.current &&
        !btnRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsAddToPlaylist(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAddToPlaylist, setIsAddToPlaylist, isOpen]);

  const togglePlaylistPopover = () => {
    toggleIsAddToPlaylist();
  };

  //reset already present playlist ids when track changes
  // This is to ensure that the component reflects the current track's playlists
  useEffect(() => {
    setAlreadyPresentPlaylistIds(initialIds);
  }, [initialIds]);

  return (
    <div className="add-to-playlist  z-10 overflow-visible relative">
      <button
        ref={btnRef}
        className="add-button !p-2 hover:scale-120 transition duration-300 cursor-pointer"
        onClick={togglePlaylistPopover}
      >
        <IoIosAddCircleOutline size={22} />
      </button>
      {isAddToPlaylist && (
        <PlaylistDropdown
          ref={dropdownRef}
          alreadyPresentPlaylistIds={alreadyPresentPlaylistIds}
          onPlaylistsAdded={(newIds) => {
            setAlreadyPresentPlaylistIds((prev) => [...prev, ...newIds]);
          }}
          onTrackRemoved={(removedId) => {
            setAlreadyPresentPlaylistIds((prev) =>
              prev.filter((id) => id !== removedId)
            );
          }}
        />
      )}
    </div>
  );
};

export default AddToPlaylist;

const PlaylistDropdown = forwardRef((props, ref) => {
  const { alreadyPresentPlaylistIds, onPlaylistsAdded, onTrackRemoved } = props;
  const { handleError } = useErrorHandler();
  const dispatch = useDispatch();

  //lookup
  const alreadyPresentSet = React.useMemo(
    () => new Set(alreadyPresentPlaylistIds || []),
    [alreadyPresentPlaylistIds]
  );

  const {
    watch,
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const { isOpen } = useSelector((state) => state.modal);
  const { track } = useSelector((state) => state.audioPlayer);
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] =
    useState(false);
  const [isRemoveFromPlaylistModalOpen, setIsRemoveFromPlaylistModalOpen] =
    useState(false);

  const [playlistId, setPlaylistId] = useState(null);

  const {
    data: playlists,
    loading,
    error,
  } = useFetch(`${config.baseURL}/playlists/user`, [isOpen]);

  const onSubmit = async (data) => {
    data.trackId = track._id;
    try {
      const response = await addTrackToPlaylists(data);
      // After successful addition, update parent state
      if (onPlaylistsAdded && data.selectedPlaylists) {
        // data.selectedPlaylists can be a string or array
        const newIds = Array.isArray(data.selectedPlaylists)
          ? data.selectedPlaylists
          : [data.selectedPlaylists];
        onPlaylistsAdded(newIds);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleCloseCreatePlaylistModal = () => {
    setIsCreatePlaylistModalOpen(false);
    dispatch(closeModal());
  };

  const handleCloseRemoveFromPlaylistModal = () => {
    setIsRemoveFromPlaylistModalOpen(false);
    dispatch(closeModal());
  };

  const handleRemoveTrackFromPlaylist = async (playlistId, trackId) => {
    try {
      const response = await removeTrackFromPlaylist(playlistId, trackId);
      if (response.status === 200) {
        onTrackRemoved(playlistId);
        reset();
        handleCloseRemoveFromPlaylistModal();
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          ref={ref}
          className="playlist-dropdown absolute bg-[#001120] text-white p-2 rounded-lg shadow-lg w-50 max-h-80 overflow-y-auto flex flex-col justify-center items-center divide-y divide-gray-800 border-1 border-gray-800 "
          style={{
            bottom: 50,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <h3 className="text-center !p-3 w-full">Add to playlist</h3>

          <div className="flex flex-col divide-y divide-gray-800 w-full h-full overflow-auto">
            {playlists &&
              playlists.userPlaylists.length > 0 &&
              playlists.userPlaylists.map((playlist) =>
                alreadyPresentSet.has(playlist._id) ? (
                  <div
                    className="flex items-center !p-3 gap-2"
                    key={playlist._id}
                  >
                    <FaCheckCircle />
                    <p>{playlist.name}</p>
                    <button
                      type="button"
                      className="remove-btn !ml-auto hover:bg-[var(--color-secondary)]/70 rounded-full !p-1 transition duration-300 cursor-pointer"
                      onClick={() => {
                        setIsRemoveFromPlaylistModalOpen(true);
                        dispatch(openModal());
                        setPlaylistId(playlist._id);
                      }}
                    >
                      <IoIosRemoveCircleOutline color="red" />
                    </button>
                  </div>
                ) : (
                  <label
                    key={playlist._id}
                    htmlFor={playlist._id}
                    className="flex items-center !p-3 gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="selectedPlaylists"
                      id={playlist._id}
                      value={playlist._id}
                      className="hidden-checkbox"
                      {...register("selectedPlaylists")}
                    />
                    <span className="custom-checkbox">
                      <IoIosCheckmark size={20} className="check-icon" />
                    </span>
                    <p className="!mt-0.25">{playlist.name}</p>
                  </label>
                )
              )}
          </div>
          <div className="!p-2 w-full flex items-center justify-between">
            <Button type={"submit"}>Add</Button>
            <Button
              type={"button"}
              className={"new-playlist-btn"}
              onClick={() => {
                setIsCreatePlaylistModalOpen(true);
                dispatch(openModal());
              }}
            >
              New +
            </Button>
          </div>
        </div>
      </form>

      {isCreatePlaylistModalOpen && (
        <Modal
          openState={isCreatePlaylistModalOpen}
          handleClose={handleCloseCreatePlaylistModal}
        >
          <CreatePlaylistForm handleClose={handleCloseCreatePlaylistModal} />
        </Modal>
      )}
      {isRemoveFromPlaylistModalOpen && (
        <Modal
          openState={isRemoveFromPlaylistModalOpen}
          handleClose={handleCloseRemoveFromPlaylistModal}
        >
          <RemoveFromPlaylist
            handleRemove={() =>
              handleRemoveTrackFromPlaylist(playlistId, track._id)
            }
            handleClose={handleCloseRemoveFromPlaylistModal}
          />
        </Modal>
      )}
    </>
  );
});
