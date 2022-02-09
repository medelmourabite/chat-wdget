import React, { useMemo } from "react";
import { Avatar } from "../Avatar/Avatar";
import styles from "./Chat.module.scss";

const Users = (props) => {
  const { users } = props;
  const { name, avatars } = useMemo(() => {
    const name = users
      .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
      .join(", ");
    const avatars = users.map(({ id, userName, firstName, lastName, avatarUrl }) => (
      <Avatar
        key={"user-" + id}
        lastName={lastName}
        firstName={firstName}
        userName={userName}
        avatarUrl={avatarUrl}
        showInfo={false}
      />
    ));
    return { name, avatars };
  }, []);

  return (
    <div className={styles.users}>
      {avatars}
      <span>{name}</span>
    </div>
  );
};

export default Users;
