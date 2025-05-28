import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../store/modalSlice";
import { createPlaylist } from "../APIs";
import { useErrorHandler } from "../hooks";

const CreatePlaylistForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const { handleError } = useErrorHandler();

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

  const [imagePreview, setImagePreview] = useState(null);

  const handleRemoveCoverImage = () => {
    setImagePreview(null);
    document.getElementById("playlistsCoverImage").value = "";
    document.getElementById("coverImageLabel").innerText =
      "Upload a Cover Image";
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("playlistName", data.playlistName);

      if (data.playlistsCoverImage?.length) {
        formData.append("playlistsCoverImage", data.playlistsCoverImage[0]);
      }

      const response = await createPlaylist(formData);

      console.log("upload response:", response);
      if (response.status === 201) {
        reset();
        handleRemoveCoverImage();
        handleClose();
      }
    } catch (error) {
      console.error("Error during create playlist:", error);
      handleError(error);
    }
  };

  return (
    <div className="create-playlist-form !mb-4">
      <h3 className="text-center !p-3 w-full">Create a new playlist</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            id="playlistName"
            placeholder="Playlist name *"
            className="playlist-name-input !p-1 border-1 rounded-sm placeholder:text-gray-500"
            {...register("playlistName", {
              required: "Playlist name is required",
            })}
          />
          {/* Show error for playlistName */}
          {errors.playlistName && (
            <p className="text-red-500 text-xs">
              {errors.playlistName.message}
            </p>
          )}
          <div className="relative flex items-center !mt-1">
            <Controller
              name="playlistsCoverImage"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <input
                  type="file"
                  accept="image/*"
                  id="playlistsCoverImage"
                  name="playlistsCoverImage"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    field.onChange(e.target.files); // update react-hook-form state
                    document.getElementById("coverImageLabel").innerText =
                      file?.name || "Upload a Cover Image";
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                    } else {
                      setImagePreview(null);
                    }
                  }}
                />
              )}
            />
            <label
              htmlFor="playlistsCoverImage"
              id="coverImageLabel"
              className="cursor-pointer border-1 border-white !p-2 rounded text-gray-500"
            >
              Upload a Cover Image
            </label>
            <span id="fileName" className="ml-2 text-gray-300"></span>
            {imagePreview && (
              <div className="relative flex items-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="!ml-4 w-12 h-12 object-cover rounded"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow cursor-pointer"
                  onClick={handleRemoveCoverImage}
                  aria-label="Remove image"
                >
                  <IoClose className="text-gray-700" size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="buttons flex items-center justify-between !mt-2">
          <Button
            type={"button"}
            className={"cancel-btn"}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button className={"create-btn"} type={"submit"}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylistForm;


