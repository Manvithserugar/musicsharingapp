import React from "react";
import Card from "./Card";
import NavGuide from "./NavGuide";
import {
  AiOutlineClockCircle,
  AiOutlineFire,
  AiOutlineUser,
  AiOutlinePlaySquare,
  AiOutlineUpload,
  AiOutlinePlusSquare,
  AiOutlineHeart,
} from "react-icons/ai";
import { IoAlbumsOutline } from "react-icons/io5";
import { LuMicVocal } from "react-icons/lu";
import { SlPeople } from "react-icons/sl";
import { MdBookmarkBorder } from "react-icons/md";
import "./LeftPanel.css";

const LeftPanel = () => {
  const generalEntries = [
    // { id: "trending", label: "Trending", icon: <AiOutlineFire size={30} /> },
    { id: "artists", label: "Artists", icon: <SlPeople size={30} /> },
    {
      id: "playlist",
      label: "Playlist",
      icon: <AiOutlinePlaySquare size={30} />,
    },
    { id: "album", label: "Album", icon: <IoAlbumsOutline size={30} /> },
  ];

  const userSpecificEntries = [
    // { id: "recent", label: "Recent", icon: <AiOutlineClockCircle size={30} /> },
    {
      id: "profile",
      label: "Your Profile",
      icon: <AiOutlineUser size={30} />,
    },
    // {
    //   id: "become-artist",
    //   label: "Become Artist",
    //   icon: <LuMicVocal size={30} />,
    // },
    { id: "saved", label: "Saved", icon: <MdBookmarkBorder size={30} /> },
    { id: "liked", label: "Liked", icon: <AiOutlineHeart size={30} /> },
    {
      id: "playlist",
      label: "Playlist",
      icon: <AiOutlinePlaySquare size={30} />,
    },
  ];

  function mapDataToNav(entries) {
    return entries.map((entry) => (
      <NavGuide
        key={entry.id}
        id={entry.id}
        icon={entry.icon}
        label={entry.label}
      />
    ));
  }

  return (
    <Card variantName="left-panel">
      {/* {mapDataToNav(generalEntries)}
      <hr className="hor-line" /> */}
      <h4>You</h4>
      {mapDataToNav(userSpecificEntries)}
    </Card>
  );
};

export default LeftPanel;
