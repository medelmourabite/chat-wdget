import React from "react";
import styles from "./Header.module.scss";
import {Avatar} from "../Avatar/Avatar";
import {CloseIcon, MaximiseIcon, MinimiseIcon} from "../icons";

const Header = ({avatar, name, status, setStatus}) => {
  return <div className={styles.header}>
    <Avatar name={name} avatar={avatar} showInfo={true}/>
    <div className={styles.headerActions}>
      {status !== "MINIMIZED" ? (
        <button onClick={() => setStatus("MINIMIZED")}>
          <MinimiseIcon/>
        </button>
      ) : (
        <button onClick={() => setStatus("MAXIMIZED")}>
          <MaximiseIcon/>
        </button>
      )}
      <button onClick={() => setStatus("CLOSED")}>
        <CloseIcon/>
      </button>
    </div>
  </div>
};

export default Header;
