import React from "react";
import Card from "./Card";
import { Button, RoundButton } from "./Button";
import { AiOutlineCaretRight } from "react-icons/ai";

import "./DisplayPage.css";

function DisplayPage({  topBanner, children }) {
  return (
    <Card variantName="right-panel display-page overflow-x-hidden">
      <div className="top-banner">{topBanner}</div>
      {/* <div className="middle-container">
        <RoundButton
          className="play-button"
          width={50}
          height={50}
          contentScale={2.2}
        >
          <AiOutlineCaretRight color="#cd2020" />
        </RoundButton>
        <Button>Follow</Button>
      </div> */}
      <div className="song-list">{children}</div>
    </Card>
  );
}

export default DisplayPage;
