import { initializeApp } from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBWo1_xJKP_wbgZG35LhGEj9NDUvpwofdA",
  authDomain: "answerbucket-bc54b.firebaseapp.com",
  databaseURL: "https://answerbucket-bc54b.firebaseio.com",
  projectId: "answerbucket-bc54b",
  storageBucket: "answerbucket-bc54b.appspot.com",
  messagingSenderId: "608330836262",
  appId: "1:608330836262:web:66adfb20fb7668eea8b9e7",
};

export const initFirestore = () => {
  const app = initializeApp(firebaseConfig);
  var db = app.firestore();
  return db;
};
export const findList = async (db, collection, filter = {}) => {
  const querySnapshot = await db.collection(collection).get();
  return querySnapshot.map((doc) => doc.data());
};
export const create = async (db, collection, doc) => {
  const docRef = await db.collection(collection).add(doc);
  return docRef.id;
};
export const update = async (db, collection, ref, data) => {
  const docRef = await db.collection(collection).doc(ref).set(data);
  return docRef.id;
};

