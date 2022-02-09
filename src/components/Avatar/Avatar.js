import React from "react";
import styles from "./Avatar.module.scss";

function getUserNameForAvatar(userName = "") {
  const arrayStr = userName.split(" ");
  let result = "";
  for (let i = 0; i < arrayStr.length && i < 2; i++) {
    if (arrayStr[i]) {
      result += arrayStr[i].substring(0, 1);
    }
  }
  return result.toUpperCase();
}

export const Avatar = (props) => {
    let { avatar, name, firstName, userName, lastName, showInfo, style = {}} = props;
    if(!name) {
      name = userName || firstName + " " + lastName
    }
    return (
      <div className={styles.avatarContainer}>
        {avatar ? (
          <div className={styles.avatar} style={{ backgroundImage: `url(${avatar})`, ...style }}/>
        ) : (
          <div className={`${styles.avatar} ${styles.emptyAvatar}`} style={style}>
            {getUserNameForAvatar(name)}
          </div>
        )}
        {showInfo && (
          <div className={styles.avatarInfo}>
            <div className={styles.avatarName}>{name}</div>
          </div>
        )}
      </div>
    );
};

export default Avatar;

