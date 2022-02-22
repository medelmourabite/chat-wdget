import React, {useRef, useEffect} from "react";
import {Avatar} from "../Avatar/Avatar";
import styles from "./Massage.module.scss";
import {timeSince} from "../../utils";

const Message = (props) => {
  const msgRef = useRef();
  const {
    message: {_id, msg, from, ts},
  } = props;

  useEffect(() => {
    if(!msgRef.current || !msg) return;
    msgRef.current.attachShadow({mode: "open"}).innerHTML = msg;
  }, [msg]);

  return (
    <div className={styles.message}>
      <Avatar name={from.userName} avatar={from.avatarUrl} style={{width: "40px", height: "40px"}} showInfo={false}/>
      <div>
        <div className={styles.userInfo}>
          <div>{from.userName}</div>
          <div>{timeSince(ts)}</div>
        </div>
        <div ref={msgRef} className={styles.messageContent} ></div>
      </div>
    </div>
  );
};

export default Message;
