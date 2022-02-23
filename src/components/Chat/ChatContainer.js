import React, {useState, useEffect} from "react";
import styles from "./Chat.module.scss";
import Rooms from "../Rooms/Rooms";
import Room from "../Room/Room";
import {createUser, getCurrentRoom} from "../../firebase";
import {useTranslation} from "../../i18n";

const ChatContainer = ({currentUser, roomId, roomName, scope = "GLOBAL", users = [], showRooms = true, firstMsg = null, lng = "fr"}) => {
  const [showRoom, setShowRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(undefined);
  const [draftRoom, setDraftRoom] = useState(undefined);
  const {setLng} = useTranslation();

  useEffect(async () => {
    if (currentUser) {
      await createUser(currentUser);
    }
    setLng(lng);
  }, [currentUser.id]);

  useEffect(async () => {
    if (roomId && users?.length) {
      const r = await getCurrentRoom(`${scope}_${roomId}`, roomName, currentUser, users, firstMsg);
      if(r.isDraft) {
        setDraftRoom(r);
      }
      setCurrentRoom(r);
      if(!showRooms) {
        setShowRoom(true);
      }
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
    {showRooms && <Rooms draftRoom={draftRoom} currentUser={currentUser} openRoom={openRoom}/>}
  </div>;
};

export default ChatContainer;
