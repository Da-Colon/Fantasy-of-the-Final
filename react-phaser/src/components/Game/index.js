import React, { useState } from "react";
import store from "../../store";
import GameEngine from "./GameEngine";
import Axios from "axios";

// import avatar pictures
import mogPicture from "./assets/AvatarPicture/Mog.gif";
import celesPicture from "./assets/AvatarPicture/Celes.gif";
import cyanPicture from "./assets/AvatarPicture/Cyan.gif";
import lockePicture from "./assets/AvatarPicture/Locke.gif";
import relmPicture from "./assets/AvatarPicture/Relm.gif";
import terraPicture from "./assets/AvatarPicture/Terra.gif";

// Import Styles
import {Main, CharacterStats, AvatarPicture, UList, Stat, Label, Logout } from "./styles";

export default function Game() {
  const userInfo = store.getState().user;
  const [user] = useState(userInfo);

  const handleLogout = async (e) => {
    const logout = await Axios.post('http://localhost:3000/logout')
    console.log("logout", logout)
    store.dispatch({
      type: 'user logged out'
    })
    window.location.replace('/')
  }

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
          <AvatarPicture alt="Avatar" src={getAvatar()} />
          <UList>
            <Stat><Label>Level:</Label> {user.level}</Stat>
            <Stat><Label>HP:</Label>  {user.currentHp} / {user.maxHp}</Stat>
            <Stat><Label>MP:</Label>  {user.currentMp} / {user.maxMp}</Stat>
            <Stat><Label>Attack:</Label> {user.attackPower} </Stat>
            <Stat><Label>Defense:</Label> {user.defensePower} </Stat>
            <Stat><Label>Agility:</Label> {user.agility} </Stat>
            <Stat><Label>Luck:</Label> {user.agility} </Stat>
            <Stat><Label>Experience:</Label> {user.experience}</Stat>
          </UList>
          <Logout onClick={handleLogout}>Logout</Logout>
        </CharacterStats>
    </Main>
  );
}
