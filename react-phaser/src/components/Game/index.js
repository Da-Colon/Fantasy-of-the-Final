import React, { useState } from "react";
import store from "../../store";
import GameEngine from "./GameEngine";

// import avatar pictures
import mogPicture from "./assets/AvatarPicture/Mog.gif";
import celesPicture from "./assets/AvatarPicture/Celes.gif";
import cyanPicture from "./assets/AvatarPicture/Cyan.gif";
import lockePicture from "./assets/AvatarPicture/Locke.gif";
import relmPicture from "./assets/AvatarPicture/Relm.gif";
import terraPicture from "./assets/AvatarPicture/Terra.gif";

// Import Styles
import {Main, CharacterStats } from "./styles";

export default function Game() {
  const userInfo = store.getState().user;
  const [user] = useState(userInfo);

  const getAvatar = () => {
    switch (user.avatar) {
      case "1":
        return lockePicture;
      case "2":
        return celesPicture;
      case "3":
        return cyanPicture;
      case "4":
        return terraPicture;
      case "5":
        return relmPicture;
      case "admin":
        return mogPicture;
      default:
        return console.log("ERROR: You must have be logged in");
    }
  };
  return (
    <Main>
        <GameEngine />
        <CharacterStats>
          <img alt="Avatar" src={getAvatar()} />
        </CharacterStats>
    </Main>
  );
}
