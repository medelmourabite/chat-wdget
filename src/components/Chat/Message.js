import React, { useMemo } from "react";
import { Avatar } from "../Avatar/Avatar";
import styles from "./Chat.module.scss";

const Message = (props) => {
  const {
    message: { _id, msg, from, ts },
    users,
  } = props;

  const user = users.find(({ id }) => "user-" + id === from);
  if (!user) {
    return null;
  }

  return (
    <div className={styles.message}>
      <Avatar {...user} showInfo={false} />
      <span>{msg}</span>
    </div>
  );
};

export default Message;
