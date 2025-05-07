import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Card from "../Card";
import Dropzone from "../Dropzone";
import "./BecomeArtist.css";

function BecomeArtist() {
  const ref = useRef();
  const [Step, setStep] = useState(0);
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const {
    watch,
    register,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const handleNext = () => {
    Step < 2 && setStep(Step + 1);
  };

  const handleBack = () => {
    Step > 0 && setStep(Step - 1);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setValue("profilePicture", selectedFile);
      //  console.log("Selected File:", getValues("profilePicture"));
      const imgUrl = URL.createObjectURL(selectedFile);
      setImgUrl(imgUrl);
    }
  };

  return (
    <Card variantName="right-panel ">
      <div className="become-artist">
        <h2>Become an Artist</h2>
        <p>Please fill the below form to register as an Artist</p>
        <form className="become-artist-form">
          <span className="steps">Step {Step + 1} of 3</span>
          {Step == 0 && (
            <section className="basic-info">
              <h3>Basic Information</h3>
              <label htmlFor="fullName">
                Full Name: {errors.fullName && <p>{errors.fullName.message}</p>}
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName", {
                  required: "* full name is required",
                })}
              />

              <label htmlFor="artistName">
                Stage/Artist Name:{" "}
                {errors.artistName && <p>{errors.artistName.message}</p>}
              </label>
              <input
                type="text"
                id="artistName"
                placeholder="Enter your stage/artist name"
                {...register("artistName", {
                  required: "* artist name is required",
                })}
              />

              <label htmlFor="email">
                Email: {errors.email && <p>{errors.email.message}</p>}
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                {...register("email", { required: "* email required" })}
              />

              <label htmlFor="phone">
                Phone Number: {errors.phone && <p>{errors.phone.message}</p>}
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                {...register("phone", { required: "* phone number required" })}
              />
            </section>
          )}

          {Step == 1 && (
            <section className="artist-profile">
              <h3>Artist Profile</h3>
              <label htmlFor="profilePicture">Profile Picture:</label>
              <Dropzone />

              <label htmlFor="bio">Bio/Description:</label>
              <textarea
                id="bio"
                rows="4"
                placeholder="Tell us about yourself..."
                {...register("bio")}
              ></textarea>

              <label htmlFor="genres">Genres:</label>
              <input
                type="text"
                id="genres"
                name="genres"
                placeholder="List your music genres"
                required
              />

              <label htmlFor="socialLinks">
                Social Media Links (comma-separated):
              </label>
              <input
                type="text"
                id="socialLinks"
                name="socialLinks"
                placeholder="e.g., instagram.com/yourprofile, soundcloud.com/yourmusic"
              />
            </section>
          )}

          {Step == 2 && (
            <section className="verification">
              <h3>Verification and Agreements</h3>
              <label htmlFor="idProof">Upload Government ID Proof:</label>
              <input
                type="file"
                id="idProof"
                name="idProof"
                accept="image/*,application/pdf"
                required
              />

              <label>
                <input type="checkbox" name="terms" required />I agree to the{" "}
                <a href="/terms" target="_blank">
                  Terms and Conditions
                </a>
              </label>
            </section>
          )}
          <div className="become-artist-form-buttons">
            {Step > 0 && (
              <Button
                className="back-button"
                type="button"
                onClick={handleBack}
              >
                Back
              </Button>
            )}
            {Step < 2 && (
              <Button
                disabled={!isValid}
                className="next-button"
                type="button"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
            {Step == 2 && (
              <Button
                disabled={!isValid}
                className="submit-button"
                type="submit"
              >
                Submit
              </Button>
            )}
          </div>
          <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </form>
      </div>
    </Card>
  );
}

export default BecomeArtist;
