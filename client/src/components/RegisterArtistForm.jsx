import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "./Button";

import { IoClose } from "react-icons/io5";

import { registerAsArtist } from "../APIs";
import { useErrorHandler } from "../hooks";

const RegisterArtistForm = ({ showForm, setShowForm }) => {
  const { handleError } = useErrorHandler();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [artistImagePreview, setArtistImagePreview] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);

  const onSubmit = async (data) => {
    console.log("Form Data Submitted:", data);
    const formData = new FormData();
    formData.append("artistName", data.artistName);
    if (data.artistImage?.[0]) {
      formData.append("artistImage", data.artistImage[0]);
    }
    if (data.bannerImage?.[0]) {
      formData.append("bannerImage", data.bannerImage[0]);
    }
    try {
      const response = await registerAsArtist(formData);
      if (response.status === 201) {
        console.log("Artist registered successfully");
        reset();
        handleClear();
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error registering artist:", error);
      handleError(error);
    }
  };

  const RemoveArtistImagePreview = () => {
    setArtistImagePreview(null);
    document.getElementById("artistImageLabel").innerText =
      "Upload Artist Image";
    document.getElementById("artistImage").value = null;
  };

  const RemoveBannerImagePreview = () => {
    setBannerImagePreview(null);
    document.getElementById("bannerImageLabel").innerText =
      "Upload Banner Image";
    document.getElementById("bannerImage").value = null;
  };

  const handleClear = () => {
    reset();
    RemoveArtistImagePreview();
    RemoveBannerImagePreview();
  };

  return showForm ? (
    <div className="register-artist-form w-100 !m-4">
      <h3 className=" !pb-3 w-full">
        want to upload songs? Register as an Artist
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col gap-2"
      >
        {/* Artist Name */}
        <input
          type="text"
          id="artistName"
          placeholder="Artist Name *"
          className="artist-name-input !p-1 border-1 rounded-sm placeholder:text-gray-500 placeholder:!pl-1"
          {...register("artistName", { required: "Artist name is required" })}
        />
        {errors.artistName && (
          <p className="text-red-500 text-xs">{errors.artistName.message}</p>
        )}

        {/* Artist Image */}
        <div className="relative flex items-center !mt-1">
          <Controller
            name="artistImage"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                id="artistImage"
                name="artistImage"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  field.onChange(e.target.files);
                  document.getElementById("artistImageLabel").innerText =
                    file?.name || "Upload Artist Image";
                  if (file) {
                    setArtistImagePreview(URL.createObjectURL(file));
                  } else {
                    setArtistImagePreview(null);
                  }
                }}
              />
            )}
          />
          <label
            htmlFor="artistImage"
            id="artistImageLabel"
            className="cursor-pointer border-1 border-white !p-2 rounded text-gray-500"
          >
            Upload Artist Image
          </label>
          {artistImagePreview && (
            <div className="relative flex items-center">
              <img
                src={artistImagePreview}
                alt="Preview"
                className="!ml-4 w-12 h-12 object-cover rounded"
              />
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow cursor-pointer"
                onClick={RemoveArtistImagePreview}
                aria-label="Remove image"
              >
                <IoClose className="text-gray-700" size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Banner Image */}
        <div className="relative flex items-center !mt-1">
          <Controller
            name="bannerImage"
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                id="bannerImage"
                name="bannerImage"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  field.onChange(e.target.files);
                  document.getElementById("bannerImageLabel").innerText =
                    file?.name || "Upload Banner Image";
                  if (file) {
                    setBannerImagePreview(URL.createObjectURL(file));
                  } else {
                    setBannerImagePreview(null);
                  }
                }}
              />
            )}
          />
          <label
            htmlFor="bannerImage"
            id="bannerImageLabel"
            className="cursor-pointer border-1 border-white !p-2 rounded text-gray-500"
          >
            Upload Banner Image
          </label>
          {bannerImagePreview && (
            <div className="relative flex items-center">
              <img
                src={bannerImagePreview}
                alt="Preview"
                className="!ml-4 w-12 h-12 object-cover rounded"
              />
              <button
                type="button"
                className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow cursor-pointer"
                onClick={RemoveBannerImagePreview}
                aria-label="Remove image"
              >
                <IoClose className="text-gray-700" size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="buttons flex items-center justify-between !mt-2">
          <Button type="button" className="clear-btn" onClick={handleClear}>
            Clear
          </Button>
          <Button type="submit" className="register-btn">
            Register
          </Button>
        </div>
      </form>
    </div>
  ) : null;
};

export default RegisterArtistForm;
