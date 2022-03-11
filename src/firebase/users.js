import firebase from "./firebase";
import {USERS, getUID} from "./misc";

const firestore = firebase.firestore();

export const login = async () => {
  try {
    await firebase.auth().signInAnonymously();
    return { isLogged: true};
  }catch (e) {
    console.error(e);
    return { isLogged: false};
  }
};

export const createUser = async (user) => {
  try {
    let { id, firstName, lastName, userName } = user;
    if (!userName) {
      userName = `${firstName} ${lastName}`;
    }
    const _id = getUID(id);
    const db = firestore.collection(USERS);
    await db.doc(_id).set({ _id, id, userName });
    return { result: "OK", insertedId: _id };
  } catch (e) {
    console.error(e);
    return { result: "nOK" };
  }
};
