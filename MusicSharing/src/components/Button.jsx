import React, { Children } from "react";
import { AiOutlineCaretRight } from "react-icons/ai";
import "./Button.css"


export function Button({disabled, className, type,onClick, children }) {
  return <button disabled={disabled} type={type} onClick={onClick} className={`simple-button ${className}`}>{children}</button>;
}

export function RoundButton({
  width,
  height,
  contentScale,
  children,
  className
}) {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: `${Math.min(width, height) / 2}px`, 
  };

  const contentStyle = {
    transform: `scale(${contentScale})`, 
  };

  return (
    <button className={`round-button ${className}`}  style={style}>
      <div className="button-content" style={contentStyle}>
        {children}
      </div>
    </button>
  );
}


export default Button;
