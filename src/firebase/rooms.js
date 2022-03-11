import firebase from "./firebase";
import {BOT, getUID, MESSAGES, ROOMS} from "./misc";

const firestore = firebase.firestore();

export const getCurrentRoom = async (rid, roomName = "", user, users = [], firstMsg) => {
  try {
    const db = firestore.collection(ROOMS);
    const querySnapshot = await db.doc(rid).get();
    if (querySnapshot.exists) {
      const room = querySnapshot.data();
      const newData = {
        ...room,
        users: users.map((u)=> {return Object.assign({}, u)}),
        name: roomName || users.map(({userName}) => userName).join(","),
        userIds: users.map(({id}) => getUID(id)),
      };
      await db.doc(rid).update(newData);
      return {...room, ...newData};
    }
  } catch (e) {
    console.error(e);
  }
  const userIds = users.map(({id}) => getUID(id));
  const unreads = userIds.reduce((acc, uid) => {
    if (uid !== getUID(user.id)) {
      acc[uid] = 0;
    } else {
      acc[uid] = 1;
    }
    return acc;
  }, {});
  return {
    rid,
    users,
    name: roomName || users.map(({userName}) => userName).join(","),
    userIds,
    unreads,
    lastMsg: {
      from: BOT,
      ts: Date.now(),
      ...firstMsg
    },
    isDraft: true,
  };
};

export const updateRoom = (rid, newData) => {
  try {
    const db = firestore.collection(ROOMS);
    db.doc(rid).update(newData);
  } catch (e) {
    console.error(e);
  }
};

export const getUserRooms = async (fromId) => {
  const db = firestore.collection(ROOMS);
  const querySnapshot = await db
    .where("userIds", "array-contains", getUID(fromId))
    .get();
  let items = [];
  querySnapshot.forEach((doc) => {
    const room = doc.data();
    items.push(room);
  });
  return items;
};


export const getUserRoomsSubs = (fromId, callback) => {
  const db = firestore.collection(ROOMS);
  return db
    .where("userIds", "array-contains", getUID(fromId))
    .orderBy("lastMsg.ts", "desc")
    .onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      callback(items);
    });
};
