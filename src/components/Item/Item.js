import React from "react";
import styles from "./Item.module.scss";
import Avatar from "../Avatar/Avatar";
import {stripeTags, timeSince} from "../../utils";

const Item = ({currentUser, room, openRoom}) => {
  let {name, avatar, users, lastMsg, unreads} = room;
  let nbrUnreads = 0;
  if (lastMsg) {
    const u = lastMsg.from;
    avatar = u?.avatarUrl;
    if (u && !name) {
      name = u?.userName;
    }
  }

  if(unreads) {
    nbrUnreads = unreads["user-" + currentUser.id] || 0;
  }


  return <div className={styles.roomItem} onClick={() => openRoom(room)}>
    <Avatar avatar={avatar} name={name} showInfo={false} style={{width: "40px", height: "40px"}}/>
    <div>
      <h5 className={styles.roomName}>{name}</h5>
      {lastMsg && <p className={styles.roomLastMsg}>{stripeTags(lastMsg.msg)}</p>}
    </div>
    <div>
      {lastMsg && <h5 className={styles.roomLastMsgTs}>{timeSince(lastMsg?.ts)}</h5>}
      {nbrUnreads ? <span className={styles.roomUserUnreads}>{nbrUnreads}</span> : null}
    </div>
  </div>
};

export default Item;
