import React, {useState, useEffect} from "react";
import styles from "./Chat.module.scss";
import Rooms from "../Rooms/Rooms";
import Room from "../Room/Room";
import {createUser, getCurrentRoom} from "../../firebase";
import {useTranslation} from "../../utils";

const ChatContainer = ({currentUser, roomId, roomName, scope = "GLOBAL", users = [], showRooms = true, firstMsg = "", lng = "fr"}) => {
  const [showRoom, setShowRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(undefined);
  const {setLng} = useTranslation();

  useEffect(async () => {
    if (currentUser) {
      await createUser(currentUser);
    }
    setLng(lng);
  }, [currentUser.id]);

  useEffect(async () => {
    if (roomId && users?.length) {
      const currentRoom = await getCurrentRoom(`${scope}_${roomId}`, roomName, users);
      setCurrentRoom(currentRoom);
      setShowRoom(true);
    }
  }, [roomId, users.length]);

  return <div className={styles.container}>
    {currentRoom && <Room currentUser={currentUser} currentRoom={currentRoom} closeRoom={() => setCurrentRoom(null)}
                          firstMsg={firstMsg}/>}
    {showRooms && <Rooms currentUser={currentUser} openRoom={(room) => setCurrentRoom(room)}/>}
  </div>;
};

export default ChatContainer;
