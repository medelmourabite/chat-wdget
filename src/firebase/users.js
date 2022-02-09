import firestore from "./firestore";
import {USERS, getUID} from "./misc";

export const createUser = async (user) => {
  try {
    let { id, firstName, lastName, userName, mainEmail } = user;
    if (!userName) {
      userName = `${firstName} ${lastName}`;
    }
    const _id = getUID(id);
    const db = firestore.collection(USERS);
    await db.doc(_id).set({ _id, id, userName, mainEmail });
    return { result: "OK", insertedId: _id };
  } catch (e) {
    console.error(e);
    return { result: "nOK" };
  }
};
