import React, { PureComponent } from "react";
import styles from "./Chat.module.scss";
import {
  createMessage,
  createUser,
  getCurrentRoom,
  getMessageSubs,
  getUserRooms,
} from "../../firebase";
import Users from "./Users";
import { Avatar } from "../Avatar/Avatar";
import Message from "../Message/Message";
import Header from "../Header/Header";
import Rooms from "../Rooms/Rooms";

export default class Chat extends PureComponent {
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
    return getMessageSubs(currentRoom, (messages) => {
      this.setState({ messages });
    });
  };

  init = async () => {
    const { currentUser, users } = this.props;
    if (currentUser) {
      createUser(currentUser);
      if (users?.length) {
        const currentRoom = await getCurrentRoom([currentUser, ...users]);
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

  // createRoom = async () => {
  //   const { currentUser, users } = this.props;
  //   const currentRoom = await createRoom([currentUser, ...users]);
  //   this.setState({ currentRoom, newRoom: false, rooms: [currentRoom, ...this.state.rooms] });
  // };

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


    return <div className={styles.container}>
      <Rooms currentUser={currentUser} rooms={rooms} openRoom={(room) => this.setState(room)}/>
    </div>;

    return (
      <div className={styles.container}>
        <Header currentUser={currentUser} />
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
