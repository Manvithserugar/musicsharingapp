import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "./Button";

import { IoClose } from "react-icons/io5";

import { uploadTrack } from "../APIs";
import { useErrorHandler } from "../hooks";

const UploadTrackForm = ({ artist, artistId, handleClose }) => {
  const { handleError } = useErrorHandler();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [musicFileName, setMusicFileName] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("artist", artist);
    formData.append("artistId", artistId);
    formData.append("name", data.songName);
    if (data.thumbnail?.[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }
    if (data.musicFile?.[0]) {
      formData.append("musicFile", data.musicFile[0]);
    }
    try {
      const response = await uploadTrack(formData);
      if (response.status === 201) {
        console.log("track uploaded successfully");
        handleClear();
        handleClose();
      }
    } catch (error) {
      console.error("Error uploading track:", error);
      handleError(error);
    }
  };

  const RemoveThumbnailImagePreview = () => {
    setThumbnailPreview(null);
    document.getElementById("thumbnailLabel").innerText =
      "Upload Thumbnail Image";
    document.getElementById("thumbnail").value = null;
  };

  const RemoveMusicFilePreview = () => {
    setMusicFileName(null);
    document.getElementById("musicFile").value = null;
  };

  const handleClear = () => {
    reset();
    RemoveMusicFilePreview();
    RemoveThumbnailImagePreview();
  };

  return (
    <div className="upload-track-form !mb-4">
      <h3 className="text-center !p-3 w-full">Upload a Track</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-2"
      >
        {/* Song Name */}
        <input
          type="text"
          id="songName"
          placeholder="Song Name *"
          className="song-name-input !p-1 border-1 rounded-sm placeholder:text-gray-500"
          {...register("songName", { required: "Song name is required" })}
        />
        {errors.songName && (
          <p className="text-red-500 text-xs">{errors.songName.message}</p>
        )}

        {/* Thumbnail Image */}
        <div className="relative flex items-center !mt-1">
          <Controller
            name="thumbnail"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                id="thumbnail"
                name="thumbnail"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  field.onChange(e.target.files);
                  document.getElementById("thumbnailLabel").innerText =
                    file?.name || "Upload Thumbnail Image";
                  if (file) {
                    setThumbnailPreview(URL.createObjectURL(file));
                  } else {
                    setThumbnailPreview(null);
                  }
                }}
              />
            )}
          />
          <label
            htmlFor="thumbnail"
            id="thumbnailLabel"
            className="cursor-pointer border-1 border-white !p-2 rounded text-gray-500"
          >
            Upload Thumbnail Image
          </label>
          {thumbnailPreview && (
            <div className="relative flex items-center">
              <img
                src={thumbnailPreview}
                alt="Preview"
                className="!ml-4 w-12 h-12 object-cover rounded"
              />
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow cursor-pointer"
                onClick={RemoveThumbnailImagePreview}
                aria-label="Remove image"
              >
                <IoClose className="text-gray-700" size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Music File */}
        <div className="relative flex items-center !mt-1">
          <Controller
            name="musicFile"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <input
                type="file"
                accept="audio/*"
                id="musicFile"
                name="musicFile"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  field.onChange(e.target.files);
                  setMusicFileName(file?.name || null);
                }}
              />
            )}
          />
          <label
            htmlFor="musicFile"
            id="musicFileLabel"
            className="cursor-pointer border-1 border-white !p-2 rounded text-gray-500 flex items-center"
            style={{ minWidth: "120px" }}
          >
            {musicFileName ? musicFileName : "Upload Music File"}
            {musicFileName && (
              <button
                type="button"
                className="ml-2 bg-white rounded-full p-1 shadow cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  RemoveMusicFilePreview();
                }}
                aria-label="Remove music file"
                tabIndex={-1}
              >
                <IoClose className="text-gray-700" size={16} />
              </button>
            )}
          </label>
        </div>

        {/* Buttons */}
        <div className="buttons flex items-center justify-between !mt-2">
          <Button type="button" className="clear-btn" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" className="register-btn">
            Upload
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadTrackForm;
