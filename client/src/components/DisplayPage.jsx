import React from "react";
import Card from "./Card";
import { Button, RoundButton } from "./Button";
import { AiOutlineCaretRight } from "react-icons/ai";
import DisplayList from "./DisplayList";
import Itachi from "../assets/Itachi.png";
import Gojo from "../assets/Gojo.png";
import Frieren from "../assets/Frieren.jpg";
import singer1 from "../assets/singer1.png";
import singer2 from "../assets/singer2.png";
import singer3 from "../assets/singer3.png";
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
      listners: <span>20</span>,
    },
    {
      song: (
        <div>
          <img src={Gojo} alt="song-image" />
          <span>songname</span>
        </div>
      ),
      artist: <span>artist name</span>,
      listners: <span>10</span>,
    },
    {
      song: (
        <div>
          <img src={Frieren} alt="song-image" />
          <span>songname</span>
        </div>
      ),
      artist: <span>artist name</span>,
      listners: <span>50</span>,
    },
    {
      song: (
        <div>
          <img src={singer1} alt="song-image" />
          <span>songname</span>
        </div>
      ),
      artist: <span>artist name</span>,
      listners: <span>25</span>,
    },
    {
      song: (
        <div>
          <img src={singer2} alt="song-image" />
          <span>songname</span>
        </div>
      ),
      artist: <span>artist name</span>,
      listners: <span>30</span>,
    },
  ];

  return (
    <Card variantName="right-panel display-page">
      <div className="top-banner">
        <img src={Frieren} alt="artist" className="artist-image" />
      </div>
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
