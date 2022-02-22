import React, {useState, useEffect} from "react";
import styles from "./Chat.module.scss";
import Rooms from "../Rooms/Rooms";
import Room from "../Room/Room";
import {createUser, getCurrentRoom} from "../../firebase";
import {useTranslation} from "../../i18n";

const ChatContainer = ({currentUser, roomId, roomName, scope = "GLOBAL", users = [], showRooms = true, firstMsg = null, lng = "fr"}) => {
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
      const currentRoom = await getCurrentRoom(`${scope}_${roomId}`, roomName, currentUser, users, firstMsg);
      setCurrentRoom(currentRoom);
    }
  }, [roomId, users.length]);

  const openRoom = (room) => {
    setCurrentRoom(room);
    setShowRoom(true);
  };

  return <div className={styles.container}>
    {currentRoom && showRoom ? <Room currentUser={currentUser}
                                   currentRoom={currentRoom}
                                   closeRoom={() => setShowRoom(false)}
                                   firstMsg={firstMsg}/> : null}
    {showRooms && <Rooms currentRoom={currentRoom} currentUser={currentUser} openRoom={openRoom}/>}
  </div>;
};

export default ChatContainer;
