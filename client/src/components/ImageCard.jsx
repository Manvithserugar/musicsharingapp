import React from "react";
import { Link } from "react-router-dom";
import "./ImageCard.css";

function ImageCard({
  className,
  imageUrl,
  children,
  redirectUrl,
  redirectProps,
  onClick,
}) {
  if (redirectUrl) {
    // If redirectUrl is provided, use Link for navigation
    return (
      <Link
        to={redirectUrl}
        state={redirectProps}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className={className}>
          <img src={imageUrl} alt="Card Image" />
          <div>{children}</div>
        </div>
      </Link>
    );
  }

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <img src={imageUrl} alt="Card Image" />
      <div>{children}</div>
    </div>
  );
}

export default ImageCard;
