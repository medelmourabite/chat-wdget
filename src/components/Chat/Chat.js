import React, { Component } from "react";
import ReactDOM from "react-dom";
import styles from "./Chat.module.scss";
import {
  createMessage,
  createRoom,
  createUser,
  getCurrentRoom,
  getMessageSubs,
  getUserRooms,
} from "../../firebase/chat";
import Users from "./Users";
import { Avatar } from "../Avatar/Avatar";
import Message from "./Message";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      rooms: [],
      messages: [],
      currentRoom: null,
      newRoom: false,
      status: "",
    };
    this.unsubscribe = undefined;
  }

  subscribeToMessages = () => {
    const { currentRoom } = this.state;
    getMessageSubs(currentRoom, (messages) => {
      this.setState({ messages });
    });
  };

  init = async () => {
    const { currentUser, users } = this.props;
    if (currentUser) {
      createUser(currentUser);
      if (users?.length) {
        const currentRoom = await getCurrentRoom(users);
        this.setState({ currentRoom, newRoom: !currentRoom });
      }
      const rooms = await getUserRooms(currentUser.id);
      this.setState({ rooms });
    }
  };

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentRoom } = this.state;
    if (prevState.currentRoom !== currentRoom) {
      this.unsubscribe && this.unsubscribe();
      if (currentRoom) {
        this.unsubscribe = this.subscribeToMessages();
      } else {
        this.setState({ messages: [] });
        this.unsubscribe && this.unsubscribe();
        this.unsubscribe = undefined;
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  createRoom = async () => {
    const { users } = this.props;
    const currentRoom = await createRoom(users);
    this.setState({ currentRoom, newRoom: false });
  };

  send = async () => {
    const { currentUser } = this.props;
    const { msg, currentRoom } = this.state;
    if (!msg.trim()){
      return;
    }
    await createMessage({
      from: "user-" + currentUser.id,
      rid: currentRoom._id,
      msg,
      ts: Date.now(),
    });
    this.setState({ msg: "" });
  };

  render() {
    const { currentUser } = this.props;
    const { msg, messages, currentRoom, rooms, newRoom, status } = this.state;

    if (status === "CLOSED") return "";

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {currentRoom?.users?.length ? (
            <Users
              users={currentRoom.users.filter(
                ({ id }) => id !== currentUser.id
              )}
            />
          ) : (
            <Avatar {...currentUser} />
          )}
          <div className={styles.headerActions}>
            {currentRoom || newRoom ? (
              <button
                onClick={() =>
                  this.setState({ currentRoom: null, newRoom: false })
                }
              >
                {"<-"}
              </button>
            ) : null}
            <button onClick={() => this.setState({ status: "CLOSED" })}>
              X
            </button>
            {status !== "MINIMIZED" ? (
              <button onClick={() => this.setState({ status: "MINIMIZED" })}>
                _
              </button>
            ) : (
              <button onClick={() => this.setState({ status: "MAXIMIZED" })}>
                =
              </button>
            )}
          </div>
        </div>
        {status !== "MINIMIZED" ? (
          <div className={styles.body}>
            {currentRoom
              ? messages.map((message) => (
                  <Message
                    key={"key-" + message.ts}
                    message={message}
                    users={currentRoom.users || []}
                  />
                ))
              : null}
            {!currentRoom && newRoom ? (
              <div>
                <button onClick={this.createRoom}>start discution</button>
              </div>
            ) : null}
            {!currentRoom && !newRoom ? (
              <ul>
                {rooms.map((room) => (
                  <li
                    key={room._id}
                    onClick={() => this.setState({ currentRoom: room })}
                  >
                    <Users users={room.users} />
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
        {status !== "MINIMIZED" ? (
          <div className={styles.footer}>
            {currentRoom ? (
              <>
                <input
                  type={"text"}
                  value={msg}
                  onChange={(e) => this.setState({ msg: e.target.value || "" })}
                />
                <button onClick={this.send}>send</button>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}
