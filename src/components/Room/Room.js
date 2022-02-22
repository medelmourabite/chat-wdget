import React, {useEffect, useState, useRef} from "react";
import styles from "./Room.module.scss";
import Header from "../Header/Header";
import {createMessage, getMessageSubs, updateRoom} from "../../firebase";
import Message from "../Message/Message";
import cx from "classnames";
import Editor from "../Editor/Editor";
import {stripeTags} from "../../utils";
import {BOT} from "../../firebase/misc";
import {useTranslation} from "../../i18n";

const Room = ({currentUser, currentRoom, closeRoom, firstMsg}) => {
  let {name, avatar, users} = currentRoom;
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");
  const {t,lng} = useTranslation();
  const bottomRef = useRef();

  const firstMessage  = firstMsg && currentRoom.isDraft ? {ts: Date.now(), from: BOT, ...firstMsg} : null;

  const subscribeToMessages = () => {
    return getMessageSubs(currentRoom, (messages) => {
      setMessages(messages);
    });
  };

  useEffect(() => {
    if (status === "CLOSED") {
      closeRoom();
    }
  }, [status]);

  useEffect(() => {
    const lastMsg = document.querySelector(`.${styles.roomBody} > div:last-child`);
    if(lastMsg) {
      lastMsg.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages.length]);

  useEffect(() => {
    if (currentRoom.isDraft) return;
    const unsubscribe = subscribeToMessages();
    setStatus("MAXIMIZED");
    updateRoom(currentRoom.rid, {["unreads.user-" + currentUser.id] : 0});
    return () => {
      unsubscribe();
    }
  }, [currentRoom.rid, currentRoom.isDraft]);

  const send = async () => {
    if (!stripeTags(msg).trim()) {
      return;
    }
    await createMessage(msg, currentUser, currentRoom, firstMessage);
    setMsg("");
  };

  return <div className={cx(styles.room, {[styles.minimized]: status === "MINIMIZED"})}>
    <Header name={name} avatar={avatar} status={status} setStatus={setStatus}/>
    <div className={styles.roomBody}>
      {firstMessage && <Message message={firstMessage}/>}
      {messages.map((message) => <Message key={"msg-" + message.ts} message={message}/>)}
    </div>
    <div className={styles.roomFooter}>
      <Editor content={msg} onChange={(value) => setMsg(value)} />
      <button onClick={send}>{t("Send")}</button>
    </div>
  </div>
};

export default Room;
