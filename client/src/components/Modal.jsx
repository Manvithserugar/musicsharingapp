import React, { Children, useState } from "react";
import { IoClose } from "react-icons/io5";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice";

import CreatePlaylistForm from "./CreatePlaylistForm";
import RemoveFromPlaylist from "./RemoveFromPlaylist";

const Modal = ({ openState, children, handleClose }) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  // let content = null;
  // switch (modalType) {
  //   case "CREATE_PLAYLIST":
  //     content = <CreatePlaylistForm />;
  //     break;
  //   case "REMOVE_FROM_PLAYLIST":
  //     content = <RemoveFromPlaylist props={modalProps} />;
  //     break;
  //   default:
  //     content = null;
  // }

  if (!isOpen) return null;

  return (
    <div className="modal-bg fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[var(--color-primary)]/50 backdrop-blur-[2px] z-100">
      <div className="modal bg-[#001120] min-w-120 min-h-60 rounded-lg !p-4 relative flex flex-col justify-between">
        <button
          className="close-btn absolute right-0 top-0 !m-3 !mr-3 hover:bg-[var(--color-secondary)] cursor-pointer rounded-full !p-0.5 hover:transition duration-300"
          onClick={handleClose}
        >
          <IoClose />
        </button>
        {/* {content} */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
