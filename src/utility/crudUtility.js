import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebaseApp";

//read

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

//add

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

export const addSettings = async (id) => {
  const docRef = doc(db, "settings", id);
  const newItem = { currency: "HUF" };
  await setDoc(docRef, newItem);
};

//update

export const updateCurrency = async (id, currencyName) => {
  const docRef = doc(db, "settings", id);
  await updateDoc(docRef, { currency: currencyName });
};

//delete

export const deleteCategories = async (userId) => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  snapshot.forEach(async (docSnapshot) => {
    await deleteDoc(doc(db, "categories", docSnapshot.id));
  });
};

export const deleteTransactions = async (userId) => {
  const collectionRef = collection(db, "transactions");
  const q = query(collectionRef, where("userId", "==", userId));
  const snapshot = await getDocs(q);
  snapshot.forEach(async (docSnapshot) => {
    await deleteDoc(doc(db, "transactions", docSnapshot.id));
  });
};

export const deleteTransaction = async (id) => {
  const docRef = doc(db, "transactions", id);
  await deleteDoc(docRef);
};

export const deleteSettings = async (userId) => {
  const docRef = doc(db, "settings", userId);
  await deleteDoc(docRef);
};



