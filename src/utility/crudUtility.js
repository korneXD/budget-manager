import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseApp";

export const readCategories = (setCategories) => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};

export const readExpenses = (setExpenses) => {
  const collectionRef = collection(db, "expenses");
  const q = query(collectionRef);
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setExpenses(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
  return unsubscribe;
};
