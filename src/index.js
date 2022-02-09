import React from 'react';
import ReactDOM from 'react-dom';
import ChatContainer from "./components/Chat/ChatContainer";

function Widget() {
  this.container = undefined;

  this.mount = function (props, container) {
    if(this.container) {
      ReactDOM.unmountComponentAtNode(this.container);
    }
    this.container = container;
    ReactDOM.render(<ChatContainer {...props} />, this.container);
  };

  this.unmount = function () {
    ReactDOM.unmountComponentAtNode(this.container);
  }
}


// EBOX - discussion entre 2 users
window.ChatWidget = new Widget();

window.ChatWidget.mount({
  scope: "EMAILING",
  // roomId: "user-1_user-2",
  roomName: "",
  showRooms: true,
  firstMsg: "<h2>Hello world !</h2><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also </p>",
  currentUser: {
    id: 2,
    userName: "User 2",
    mainEmail: "user2@mail.com",
    // avatarUrl: "https://i.pravatar.cc/150?img=2",
  },
  users: [
    {
      id: 1,
      userName: "User 1",
      mainEmail: "user1@mail.com",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      userName: "User 2",
      mainEmail: "user2@mail.com",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
  ]
}, document.getElementById("root"));


/*
// EVENT - discussion entre 1 user et un group de partner admins
window.ChatWidget = new Widget();
window.ChatWidget.mount({
  roomId: "user-1_partner-1",
  // roomName: "Partner 1",
  scope: "EVENT",
  // firstMsg : "<h2>Hello world !</h2>",
  showRooms: true,
  currentUser: {
    id: 1,
    userName: "User 1",
    mainEmail: "user1@mail.com",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
  },
  users: [
    {
      id: 1,
      userName: "User 1",
      mainEmail: "user1@mail.com",
      avatarUrl: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      userName: "User 2",
      mainEmail: "user2@mail.com",
      avatarUrl: "https://i.pravatar.cc/150?img=2",
    },
    // {
    //   id: 3,
    //   userName: "User 3",
    //   mainEmail: "user3@mail.com",
    //   avatarUrl: "https://i.pravatar.cc/150?img=3",
    // },
    {
      id: 4,
      userName: "User 4",
      mainEmail: "user4@mail.com",
      avatarUrl: "https://i.pravatar.cc/150?img=3",
    }
  ]
},document.getElementById("root"));
*/


// Chat publique:
// window.ChatWidget = new Widget();
// window.ChatWidget.mount({
//   roomId: "public-channel-event-6",
//   roomName: "Chat Publique Event 6",
//   scope: "EVENT",
//   firstMsg : "<h2>Hello world !</h2>",
//   showRooms: true,
//   currentUser: {
//     id: 5,
//     userName: "User 5",
//     mainEmail: "user5@mail.com",
//     avatarUrl: "https://i.pravatar.cc/150?img=5",
//   },
//   users: [
//     {
//       id: 5,
//       userName: "User 5",
//       mainEmail: "user5@mail.com",
//       avatarUrl: "https://i.pravatar.cc/150?img=5",
//     },
//   ]
// },document.getElementById("root"));
