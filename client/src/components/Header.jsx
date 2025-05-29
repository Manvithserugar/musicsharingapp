import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import searchIcon from "../assets/search-icon.svg";
import musicIcon from "../assets/music-icon.svg";
import homeIcon from "../assets/home-icon.svg";
import { Button, RoundButton } from "./Button";
import { search } from "../APIs";
import { useErrorHandler } from "../hooks";
import { useDispatch, useSelector } from "react-redux";
import { showPlayer } from "../store/audioPlayerSlice";

function Header() {
  const dispatch = useDispatch();

  const { handleError } = useErrorHandler();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState("");
  const [results, setResults] = React.useState({});

  const onChange = async (e) => {
    const value = e.target.value;
    const trimmed = value.trim();
    if (!trimmed) {
      setSearchValue(null);
      return;
    }
    setSearchValue(value);
    try {
      const results = await search(value);
      setResults(results);
      console.log(results);
    } catch (err) {
      handleError(err);
      console.log("error while fetching search results:", err);
    }
  };

  return (
    <div className="header-container">
      <Link to="/">
        <div className="logo-container">
          <img src={musicIcon} alt="musicLogo" className="music-icon" />
          <div className="logo-text">MusicBud</div>
        </div>
      </Link>

      <div className="middle-container">
        <Link to="/">
          <RoundButton width={40} height={40} contentScale={0.4}>
            <img src={homeIcon} alt="home" className="home-icon" />
          </RoundButton>
        </Link>
        <div className="search relative flex flex-col justify-center items-center z-15">
          <div className="search-container">
            <img src={searchIcon} alt="Search" className="search-icon" />
            <input
              className="searchBar"
              type="text"
              placeholder="Search Songs, Artists..."
              onChange={onChange}
            />
          </div>
          {searchValue && (
            <div className="result-container w-full min-h-40 bg-[var(--color-secondary)] !mt-3 !p-2 rounded-2xl border-2">
              {results &&
              results.results?.tracks.length === 0 &&
              results.results?.artists.length === 0 ? (
                <div className="text-center text-gray-400 py-4">
                  No results found
                </div>
              ) : (
                <>
                  <h3 className="!mb-2">Songs</h3>
                  {results &&
                    results.results?.tracks?.length > 0 &&
                    results.results.tracks.map((track) => (
                      <div
                        key={track._id}
                        className="flex items-center gap-3 !p-2 rounded-md hover:bg-[#243752] cursor-pointer "
                        onClick={() =>
                          dispatch(showPlayer({ track, queue: null }))
                        }
                      >
                        <img
                          src={track.thumbnailPath}
                          alt={track.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold">{track.name}</span>
                          <span className="text-sm text-gray-500">
                            {track.artist}
                          </span>
                        </div>
                      </div>
                    ))}
                  <h3 className="!mb-2">Artists</h3>
                  {results &&
                    results.results?.artists?.length > 0 &&
                    results.results.artists.map((artist) => (
                      <Link to={`/artist/${artist._id}`} key={artist._id}>
                        <div className="flex items-center gap-3 !p-2 rounded-md hover:bg-[#243752] cursor-pointer ">
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold">{artist.name}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="user-setup-buttons">
        <Button onClick={() => navigate("/userauth/signup")}>Sign Up</Button>
        <Button onClick={() => navigate("/userauth/login")}>Login</Button>
      </div>
    </div>
  );
}

export default Header;
