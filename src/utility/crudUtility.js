import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
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
  const q = query(collectionRef);
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setTransactions(
      snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
    );
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
  const newItem = { ...transactionData };
  await addDoc(collectionRef, newItem);
};
