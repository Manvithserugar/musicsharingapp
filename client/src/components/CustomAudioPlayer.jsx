import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TbMaximize, TbMinimize } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import {
  hidePlayer,
  minimizePlayer,
  expandPlayer,
} from "../store/audioPlayerSlice";
import "./customAudioPlayer.css";

function CustomAudioPlayer() {
  const dispatch = useDispatch();
  const { isPlayerVisible, isMinimized, trackId } = useSelector(
    (state) => state.audioPlayer
  );

  const toggleScreen = () => {
    if (isMinimized) {
      dispatch(expandPlayer());
    } else {
      dispatch(minimizePlayer());
    }
  };

  if (!isPlayerVisible) return null;

  return (
    <div
      className={`audio-player-container flex flex-col justify-center items-center fixed bottom-0 left-0 right-0 bg-black z-[1000] transition-all duration-800 ${
        isMinimized ? "h-[11%]" : "h-full"
      }`}
    >
      <div
        className={`expanded-page w-[98%] bg-gray-800 !m-4 rounded-lg transition-all duration-800 ${
          isMinimized
            ? "opacity-0 scale-95 h-0"
            : "opacity-100 scale-100 h-[90%]"
        }`}
      ></div>
      <div className="audio-player flex justify-between items-center w-full">
        <div className="song-info"></div>
        <div className="central-player">
          <h1>Playing Track {trackId}</h1>
        </div>
        <div className="options">
          <div className="screen-options flex gap-3">
            <button
              onClick={toggleScreen}
              className="!p-1 rounded-full hover:bg-gray-600 hover:bg-opacity-50 transition duration-300"
            >
              {isMinimized ? <TbMaximize /> : <TbMinimize />}
            </button>
            <button
              onClick={() => dispatch(hidePlayer())}
              className="!p-1 rounded-full hover:bg-gray-600 hover:bg-opacity-50 transition duration-300"
            >
              <IoClose />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomAudioPlayer;
