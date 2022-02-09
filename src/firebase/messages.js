import firestore from "./firestore";
import {BOT, getUID, MESSAGES, ROOMS} from "./misc";

export const createMessage = async (msg, user, room, firstMessage) => {
  try {
    const dbMessages = firestore.collection(MESSAGES);
    const dbRooms = firestore.collection(ROOMS);

    const message = {
      from: user,
      msg,
      ts: Date.now(),
    };

    if (firstMessage && room.isDraft) {
      await dbMessages.add({rid: room.rid, ...firstMessage});
    }

    delete room.isDraft;
    await dbRooms.doc(room.rid).set({
      ...room,
      lastMsg: message,
      unreads: room.userIds.reduce((acc, uid) => {
        if (uid === getUID(user.id)) {
          return {[uid]: 0}
        }
        if (!room.unreads || !room.unreads[uid]) {
          acc = {[uid]: 1};
        } else {
          acc[uid] = room.unreads[uid] + 1;
        }
        return acc;
      }, {})
    });
    const docRef = await dbMessages.add({rid: room.rid, ...message});

    return {result: "OK", insertedId: docRef.id};
  } catch (e) {
    console.error(e);
    return {result: "nOK"};
  }
};

export const getMessageSubs = (room, callback) => {
  const db = firestore.collection(MESSAGES);
  return db
    .where("rid", "==", room.rid)
    .orderBy("ts", "asc")
    .onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      callback(items);
    });
};
