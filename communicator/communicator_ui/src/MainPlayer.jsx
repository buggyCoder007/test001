import React from "react";
import { useState, useEffect } from "react";
import "./Player.css";
import Player from "./components/Player";
import { getUser, removeUserSession } from './Utils/Common';


function MainPlayer(props) {

    const user = getUser();

    // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  const [songs] = useState([
    {
      title: "Audio 1",
      artist: "Peachy!",
      album: " Shiloh",
      track: "Audio 1",
      year: "1",
      img_src: "./songs_images/$orries_Cover (front)_e.jpg",
      src: "./songs/transmission-01.wav",
    },
    {
      title: "Audio 2",
      artist: "potsu",
      album: "Audio 2",
      track: "1",
      year: "",
      img_src: "./songs_images/[oops]_Cover (front)_e.jpg",
      src: "./songs/transmission-02.wav",
    },
    {
      title: "Audio 3",
      artist: "The Deli",
      album: "Audio 3",
      track: "12",
      year: "",
      img_src: "./songs_images/5 32pm_Cover (front)_e.jpg",
      src: "./songs/transmission-03.wav",
    },
    {
      title: "Audio 4",
      artist: "Oatmello",
      album: "Audio 4",
      track: "3",
      year: "",
      img_src: "./songs_images/88 Keys_Cover (front)_e.jpg",
      src: "./songs/transmission-04.wav",
    },
    {
      title: "Audio 5",
      artist: "Jinsang",
      album: "Audio 5",
      track: "15",
      year: "",
      img_src: "./songs_images/Affection_Cover (front)_e.jpg ",
      src: "./songs/transmission-05.wav",
    },
    {
      title: "Audio 6",
      artist: "Wun Two",
      album: "Audio 6",
      track: "4",
      year: "",
      img_src: "./songs_images/Again_Cover (front)_e.jpg",
      src: "./songs/transmission-07.wav",
    },
    {
      title: "Audio 7",
      artist: "prxz",
      album: " Audio 7",
      track: "Love Wounds",
      year: "2",
      img_src: "./songs_images/Alone and Lonely_Cover (front)_e.jpg",
      src: "./songs/transmission-06.wav",
    },
    {
      title: "Audio 8",
      artist: "Kina",
      album: "Audio 8",
      track: "1",
      year: "",
      img_src: "./songs_images/Baby You're Worth It_Cover (front)_e.jpg",
      src: "./songs/transmission-08.wav",
    }
  ]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);

  return (
    <div className="MainPlayer">

      Welcome {user.firstName}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout"  style={{marginLeft : "500px"}}/>
      {/* <div className="weirdShape"></div> */}
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      />
    </div>
  );
}

export default MainPlayer;