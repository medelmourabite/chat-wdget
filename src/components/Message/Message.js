import React, {useMemo} from "react";
import {Avatar} from "../Avatar/Avatar";
import styles from "./Massage.module.scss";
import {timeSince} from "../../utils";

const Message = (props) => {
  const {
    message: {_id, msg, from, ts},
  } = props;

  return (
    <div className={styles.message}>
      <Avatar name={from.userName} avatar={from.avatarUrl} style={{width: "40px", height: "40px"}} showInfo={false}/>
      <div>
        <div className={styles.userInfo}>
          <div>{from.userName}</div>
          <div>{timeSince(ts)}</div>
        </div>
        <div className={styles.messageContent} dangerouslySetInnerHTML={{__html: msg}}/>
      </div>
    </div>
  );
};

export default Message;
