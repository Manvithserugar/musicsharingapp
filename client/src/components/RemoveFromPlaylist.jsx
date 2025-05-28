import React from "react";
import Button from "./Button";

const RemoveFromPlaylist = ({ handleRemove, handleClose }) => {
  return (
    <div className="flex flex-col gap-12 !p-4">
      <p className="!mt-5">
        Are you sure you want to remove the track from playlist?
      </p>
      <div className="buttons flex items-center justify-between !mt-2">
        <Button type={"button"} className={"cancel-btn"} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className={"create-btn !border-red-900 !text-red-900"}
          type={"button"}
          onClick={handleRemove}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default RemoveFromPlaylist;
