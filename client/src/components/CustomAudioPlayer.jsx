import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TbMaximize, TbMinimize } from "react-icons/tb";
import {
  IoClose,
  IoBookmarkOutline,
  IoBookmark,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";
import { IoIosShareAlt, IoIosAddCircleOutline } from "react-icons/io";
import {
  FaPlay,
  FaStepForward,
  FaStepBackward,
  FaPause,
  FaUndo,
} from "react-icons/fa";
import { MdHdrAuto, MdOutlineReplay } from "react-icons/md";
import {
  showPlayer,
  hidePlayer,
  minimizePlayer,
  expandPlayer,
  toggleIsPlaying,
} from "../store/audioPlayerSlice";

import useToggle from "../hooks/useToggle";

import "./CustomAudioPlayer.css";

import AddToPlaylist from "./AddToPlaylist";

import config from "../config";
import { useFetch, useErrorHandler } from "../hooks";
import { likeTrack, dislikeTrack, saveTrack, unsaveTrack } from "../APIs";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CustomAudioPlayer() {
  const { handleError } = useErrorHandler();
  const dispatch = useDispatch();
  const { isPlayerVisible, isMinimized, track, isPlaying, queue } = useSelector(
    (state) => state.audioPlayer
  );

  const { data: userTrackStatus, loading: userTrackStatusLoading } = useFetch(
    track?._id ? `${config.baseURL}/userdata/${track._id}` : null,
    [track?._id]
  );

  const [isLiked, toggleIsLiked, setIsLiked] = useToggle(false);
  const [isSaved, toggleIsSaved, setIsSaved] = useToggle(false);
  const [isAutoPlay, toggleIsAutoPlay] = useToggle(false);

  useEffect(() => {
    setIsLiked(!!userTrackStatus?.isLiked);
  }, [userTrackStatus?.isLiked, track]);

  useEffect(() => {
    setIsSaved(!!userTrackStatus?.isSaved);
  }, [userTrackStatus?.isSaved, track]);

  const handleToggleLike = async () => {
    toggleIsLiked();
    try {
      if (isLiked) await dislikeTrack(track._id);
      else await likeTrack(track._id);
    } catch (err) {
      handleError(err);
    }
  };

  const handleToggleSave = async () => {
    toggleIsSaved();
    try {
      if (isSaved) await unsaveTrack(track._id);
      else await saveTrack(track._id);
    } catch (err) {
      handleError(err);
    }
  };

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isEndOfTrack, setIsEndOfTrack] = useState(false);

  const audioRef = useRef(null);
  const prevTrackRef = useRef(null);
  const nextTrackRef = useRef(null);

  // Update duration once metadata is loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onLoaded = () => setDuration(audio.duration);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsEndOfTrack(true);

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      setDuration(0);
    };
  }, [track]);

  //handle auto play
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTrackEnd = () => {
      if (isAutoPlay) {
        handlePlayNext();
        setIsEndOfTrack(false);
      }
    };

    if (isAutoPlay) {
      audio.addEventListener("ended", handleTrackEnd);
    } else {
      audio.removeEventListener("ended", handleTrackEnd);
    }

    return () => {
      audio.removeEventListener("ended", handleTrackEnd);
    };
  }, [isAutoPlay]);

  // Update previous and next track references
  useEffect(() => {
    if (queue && queue.length > 0) {
      const currentTrackIndex = queue.findIndex((t) => t._id === track._id);
      prevTrackRef.current = queue[currentTrackIndex - 1] || null;
      nextTrackRef.current = queue[currentTrackIndex + 1] || null;
    }
  }, [queue, track]);

  //Handle Play next
  const handlePlayNext = () => {
    if (nextTrackRef.current) {
      dispatch(showPlayer({ track: nextTrackRef.current, queue }));
    }
  };

  //Handle Play previous
  const handlePlayPrev = () => {
    if (prevTrackRef.current) {
      dispatch(showPlayer({ track: prevTrackRef.current, queue }));
    }
  };

  // Play / pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.play();
    else audioRef.current.pause();
  }, [isPlaying, track]);

  if (!isPlayerVisible) return null;

  // Handle seeking
  const handleSeek = (e) => {
    const value = Number(e.target.value);
    audioRef.current.currentTime = value;
    setCurrentTime(value);
    console.log(`Current Time: ${calculateTime(value)}`);
    // Check if the track has ended and player is seeking after the end
    if (isEndOfTrack && !isAutoPlay) {
      audioRef.current.play();
      setIsEndOfTrack(false);
    }
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60) || 0;
    const seconds = Math.floor(secs % 60) || 0;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  };

  const handlePlayTrack = () => {
    if (isEndOfTrack && !isAutoPlay) {
      // Reset to start if the track has ended and auto-play is off
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsEndOfTrack(false);
      audioRef.current.play();
      return;
    }

    // Toggle play/pause if the track hasn't ended
    dispatch(toggleIsPlaying());
  };

  const toggleScreen = () =>
    dispatch(isMinimized ? expandPlayer() : minimizePlayer());

  // Progress bar style -- uses CSS variable for filled portion
  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="audio-player-container fixed inset-0 pointer-events-none !z-50 flex flex-col items-center justify-end transition-all duration-800">
      {/* Expanded View */}
      <div
        className={`expanded-page !bg-[var(--color-primary)] w-full h-full pointer-events-auto flex flex-col justify-center items-center transition-all duration-800 ease-in-out transform origin-bottom ${
          isMinimized
            ? "scale-y-0 opacity-0 pointer-events-none"
            : "scale-y-100 opacity-100"
        }`}
      >
        <div className="expanded-song-info-container flex flex-col justify-center gap-1.5 items-center !bg-[var(--color-secondary)] h-[95%] w-[98%] rounded-md transition-all ease-in-out duration-800 ">
          <div className="song-details-expanded flex flex-col justify-center items-center !mb-2">
            <h4>{track.name}</h4>
            <Link
              to={`/artist/${track.artistId}`}
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={() => dispatch(minimizePlayer())}
            >
              <h3 className="hover:underline">{track.artist}</h3>
            </Link>
          </div>
          <img
            className="thumbnail-expanded rounded-lg size-120 !mb-4"
            src={track.thumbnailPath}
            alt="thumbnailImg"
          />
        </div>
      </div>

      {/* Mini Player */}
      <div className="audio-player !bg-[var(--color-primary)] h-20 w-full pointer-events-auto flex justify-between items-center">
        {/* Song Info */}
        <div className="song-info h-full flex justify-center items-center gap-3 !p-2">
          <img
            className="size-16 !ml-4 rounded-sm"
            src={track.thumbnailPath}
            alt="thumbnail-img"
          />
          <div className="song-details flex flex-col">
            <h3>{track.name}</h3>
            <Link
              to={`/artist/${track.artistId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h2 className="hover:underline">{track.artist}</h2>
            </Link>
          </div>
          <AddToPlaylist
            alreadyPresentPlaylistIds={userTrackStatus?.playlistIds}
          />
        </div>

        {/* Controls + Progress */}
        <div className="central-player flex flex-col items-center">
          <audio
            ref={audioRef}
            src={`http://localhost:3000/api/v1/tracks/${track._id}/stream`}
            preload="metadata"
          />

          {/* Playback Buttons */}
          <div className="player-controls flex items-center justify-center gap-5">
            <button
              onClick={handlePlayPrev}
              className={`next-button !p-2 transition duration-300  ${
                !prevTrackRef.current
                  ? "opacity-25 cursor-not-allowed"
                  : "hover:scale-120 cursor-pointer"
              }`}
            >
              <FaStepBackward />
            </button>
            <button
              onClick={handlePlayTrack}
              className="play-button !p-2 hover:scale-120 transition duration-300 cursor-pointer"
            >
              {isEndOfTrack && !isAutoPlay ? (
                <FaUndo />
              ) : isPlaying ? (
                <FaPause />
              ) : (
                <FaPlay />
              )}
            </button>
            <button
              onClick={handlePlayNext}
              className={`next-button !p-2 transition duration-300  ${
                !nextTrackRef.current
                  ? "opacity-25 cursor-not-allowed"
                  : "hover:scale-120 cursor-pointer"
              }`}
            >
              <FaStepForward />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar flex items-center justify-center gap-2 !m-2">
            <span className="current-time">{calculateTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className="progress-bar-range rounded-lg cursor-pointer appearance-none"
              style={{ "--seek-before-width": `${progressPercent}%` }}
            />
            <span className="duration">
              {duration > 0 && !isNaN(duration)
                ? calculateTime(duration)
                : "00:00"}
            </span>

            <button
              className="auto-play !ml-2 !mb-0.5 hover:scale-120 transition duration-300 cursor-pointer"
              onClick={toggleIsAutoPlay}
            >
              <MdHdrAuto size={20} color={isAutoPlay && "#269bc9"} />
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="options flex flex-row-reverse gap-1 !m-2">
          <div className="screen-options flex gap-3 !mr-1.5 flex-row-reverse">
            <button
              onClick={() => dispatch(hidePlayer())}
              className="!p-1 rounded-full hover:scale-120 transition duration-300 cursor-pointer"
            >
              <IoClose />
            </button>
            <button
              onClick={toggleScreen}
              className="!p-1 rounded-full hover:scale-120 transition duration-300 cursor-pointer"
            >
              {isMinimized ? <TbMaximize /> : <TbMinimize />}
            </button>
          </div>

          <div className="other-options flex col-end-1 !mr-10 gap-4">
            <button
              onClick={handleToggleLike}
              className="next-button !p-2 hover:scale-120 transition duration-300 cursor-pointer"
            >
              {isLiked ? (
                <IoHeart size={22} color="red" />
              ) : (
                <IoHeartOutline size={22} />
              )}
            </button>
            <button
              onClick={handleToggleSave}
              className="next-button !p-2 hover:scale-120 transition duration-300 cursor-pointer"
            >
              {isSaved ? (
                <IoBookmark size={22} color="white" />
              ) : (
                <IoBookmarkOutline size={22} />
              )}
            </button>
            {/* <button className="next-button !p-2 hover:scale-120 transition duration-300 cursor-pointer">
              <IoIosShareAlt size={25} />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
