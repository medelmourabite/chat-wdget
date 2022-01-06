import React, { Component } from "react";

import styles from "./Avatar.module.scss";

function getUserNameForAvatar(userName = "") {
  const arrayStr = userName.split(" ");
  let result = "";
  for (let i = 0; i < arrayStr.length; i++) {
    if (arrayStr[i]) {
      result += arrayStr[i].substring(0, 1);
    }
  }
  return result.toUpperCase();
}

export class Avatar extends Component {
  render() {
    const {
      avatarUrl,
      showInfo,
      avatarSignature,
      userName,
    } = this.props;

    return (
      <div className={styles.avatarContainer}>
        {avatarUrl ? (
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${avatarUrl})` }}
          ></div>
        ) : (
          <div className={`${styles.avatar} ${styles.emptyAvatar}`}>
            {getUserNameForAvatar(userName)}
          </div>
        )}
        {showInfo && (
          <div className={styles.avatarInfo}>
            <div className={styles.avatarName}>{userName}</div>
            {avatarSignature && (
              <div className={styles.avatarSignature}>{avatarSignature}</div>
            )}
          </div>
        )}
      </div>
    );
  }
}

