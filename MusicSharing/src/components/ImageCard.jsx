import React from "react";
import { Link } from "react-router-dom";
import "./ImageCard.css";

function ImageCard({ className, imageUrl, children, redirectUrl }) {
  return (
    <Link to={redirectUrl} style={{ textDecoration: "none", color: "inherit" }}>
      <div className={className}>
        <img src={imageUrl} alt="Card Image" />
        <div>{children}</div>
      </div>
    </Link>
  );
}

export default ImageCard;
