import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebaseApp";

export const readCategories = (setCategories) => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};

export const readTransactions = (setTransactions) => {
  const collectionRef = collection(db, "transactions");
  const q = query(collectionRef, orderBy("name", "asc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setTransactions(
      snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    );
  });
  return unsubscribe;
};

export const readSettings = async (setSettings) => {
  const collectionRef = collection(db, "settings");
  const q = query(collectionRef);
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setSettings(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};

export const addCateg = async (categData) => {
  const collectionRef = collection(db, "categories");
  const newItem = { ...categData };
  await addDoc(collectionRef, newItem);
};

export const addTransaction = async (transactionData) => {
  const collectionRef = collection(db, "transactions");
  const newItem = { ...transactionData, timeStamp: serverTimestamp() };
  await addDoc(collectionRef, newItem);
};

export const updateCurrency = async (id, currencyName) => {
  const docRef = doc(db, "settings", id);
  await updateDoc(docRef, { currency: currencyName });
};

export const deleteTransaction = async (id) => {
  const docRef = doc(db, "transactions", id);
  await deleteDoc(docRef);
};
