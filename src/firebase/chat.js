import firestore from "./firestore";
const USERS = "users";
const MESSAGES = "messages";
const ROOMS = "rooms";

const getUID = (id) => "user-" + id;
const getRoomId = (users) => {
  return users
    .sort((a, b) => a.id > b.id)
    .map((u) => getUID(u.id))
    .join("_");
};

export const createUser = async (user) => {
  try {
    let { id, firstName, lastName, userName, mainEmail } = user;
    if (!userName) {
      userName = `${user.firstName} ${user.lastName}`;
    }
    debugger
    const _id = getUID(id);
    const db = firestore.collection(USERS);
    await db.doc(_id).set({ _id, id, firstName, lastName, userName, mainEmail });
    return { result: "OK", insertedId: _id };
  } catch (e) {
    console.error(e);
    return { result: "nOK" };
  }
};

export const createRoom = async (users) => {
  try {
    const sortedUsers = users.sort((a, b) => a.id > b.id);
    const name = sortedUsers
      .map((u) => u.firstName + " " + u.lastName)
      .join(", ");
    const _id = getRoomId(users);
    const db = firestore.collection(ROOMS);
    const room = {
      _id,
      name,
      userIds: users.map(({ id }) => getUID(id)),
      users,
    };
    await db.doc(_id).set(room);
    return room;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUsers = async (userIds) => {
  const db = firestore.collection(USERS);
  const querySnapshot = await db.where("_id", "in", userIds).get();
  let items = [];
  querySnapshot.forEach((doc) => {
    items.push(doc.data());
  });
  return items;
};

export const getCurrentRoom = async (users) => {
  try {
    const _id = getRoomId(users);
    const db = firestore.collection(ROOMS);
    const querySnapshot = await db.doc(_id).get();
    if (querySnapshot.exists) {
      const room = querySnapshot.data();
      return room;
    } else {
      users.forEach((user) => {
        createUser(user);
      });
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createMessage = async (msg) => {
  try {
    const db = firestore.collection(MESSAGES);
    const docRef = await db.add(msg);
    return { result: "OK", insertedId: docRef.id };
  } catch (e) {
    console.error(e);
    return { result: "nOK" };
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

export const getMessageSubs = (room, callback) => {
  const rid = room._id;
  const db = firestore.collection(MESSAGES);
  return db
    .where("rid", "==", rid)
    .orderBy("ts", "asc")
    .onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      callback(items);
    });
};
