import React, {useState, useEffect, useMemo} from "react";
import styles from "./Rooms.module.scss";
import Header from "../Header/Header";
import Item from "../Item/Item";
import {getUserRoomsSubs} from "../../firebase";
import cx from "classnames";
import {SearchBar} from "../SearchBar/SearchBar";

const Rooms = ({currentUser, currentRoom, openRoom}) => {
  const {userName, firstName, lastName, avatarUrl} = currentUser;
  const [rooms, setRooms] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const unsub = getUserRoomsSubs(currentUser.id, (rooms) => {
      setRooms(rooms);
    });
    return () => {
      unsub();
    }
  }, [currentUser.id]);

  const filteredRooms = useMemo(() => {
    if (!query?.trim()) return rooms;
    return rooms.filter(({name, users}) => name && name.search(new RegExp(query, "gi")) > -1 ||
      users.some(({userName}) => userName && userName.search(new RegExp(query, "gi")) > -1));
  }, [rooms, query]);

  if (status === "CLOSED") {
    return null;
  }
  return <div className={cx(styles.rooms, {[styles.minimized]: status === "MINIMIZED"})}>
    <Header name={userName || `${firstName} ${lastName}`} avatar={avatarUrl} status={status} setStatus={setStatus}/>
    <div className={styles.roomsList}>
      <SearchBar setQuery={setQuery} />
      {currentRoom?.isDraft ? <Item currentUser={currentUser} room={currentRoom} openRoom={openRoom}/> : null}
      {filteredRooms.map((room) => (
        <Item key={room.rid} currentUser={currentUser} room={room} openRoom={openRoom}/>
      ))}
    </div>
  </div>
};

export default Rooms;
