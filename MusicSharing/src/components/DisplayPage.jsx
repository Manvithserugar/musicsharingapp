import React from "react";
import Card from "./Card";
import { Button, RoundButton } from "./Button";
import { AiOutlineCaretRight } from "react-icons/ai";
import DisplayList from "./DisplayList";
import Itachi from "../assets/Itachi.png";
import "./DisplayPage.css";

function DisplayPage() {
  const spanArray = [
    {
      song: (
        <div>
          <img src={Itachi} alt="song-image" />
          <span>songname</span>
        </div>
      ),
      artist: <span>artist name</span>,
      listners: <span>no. of listners</span>,
    },
    {
      song: (
        <div>
          <img src={Itachi} alt="song-image" />
          <span>songname</span>
        </div>
      ),
      artist: <span>artist name</span>,
      listners: <span>no. of listners</span>,
    },
    {
      song: (
        <div>
          <img src={Itachi} alt="song-image" />
          <span>songname</span>
        </div>
      ),
      artist: <span>artist name</span>,
      listners: <span>no. of listners</span>,
    },
    {
      song: (
        <div>
          <img src={Itachi} alt="song-image" />
          <span>songname</span>
        </div>
      ),
      artist: <span>artist name</span>,
      listners: <span>no. of listners</span>,
    },
    {
      song: (
        <div>
          <img src={Itachi} alt="song-image" />
          <span>songname</span>
        </div>
      ),
      artist: <span>artist name</span>,
      listners: <span>no. of listners</span>,
    },
  ];

  return (
    <Card variantName="right-panel display-page">
      <div className="top-banner"></div>
      <div className="middle-container">
        <RoundButton
          className="play-button"
          width={50}
          height={50}
          contentScale={2.2}
        >
          <AiOutlineCaretRight color="#cd2020" />
        </RoundButton>
        <Button>Follow</Button>
      </div>
      <div className="song-list">
        <DisplayList data={spanArray} />
      </div>
    </Card>
  );
}

export default DisplayPage;
