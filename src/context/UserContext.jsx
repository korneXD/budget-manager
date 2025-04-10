import React from "react";
import { auth } from "../utility/firebaseApp";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  addSettings,
  deleteCategories,
  deleteSettings,
  deleteTransactions,
} from "../utility/crudUtility";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState({});

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unSubscribe();
  }, []);

  const signInUser = async (email, password) => {
    setMsg({});
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMsg({ signin: "Sikeres bejelentkezés!" });
    } catch {
      setMsg({ err: "Sikertelen bejelentkezés!" });
    }
  };

  const logOut = async () => {
    setMsg({});
    try {
      setMsg({ logout: "Sikeres kijelentkezés!" });
      await signOut(auth);
    } catch {
      setMsg({ err: "Sikertelen kijelentkezés!" });
    }
  };

  const signUpUser = async (email, displayName, password) => {
    setMsg({});
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName });
      addSettings(auth.currentUser.uid);
      setMsg({ signup: "Sikeres regisztráció" });
    } catch {
      setMsg({ err: "Sikertelen regisztráció!" });
    }
  };

  const resetPassword = async (email) => {
    setMsg({});
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg({ resetPw: "A jelszó visszaállítási email elküldve!" });
    } catch {
      setMsg({ err: "Ezzel az email címmel nem regisztráltak felhasználót" });
    }
  };

  const deleteAccount = async () => {
    setMsg({});
    try {
      await deleteCategories(auth.currentUser.uid);
      await deleteTransactions(auth.currentUser.uid);
      await deleteSettings(auth.currentUser.uid);
      await deleteUser(auth.currentUser);
      setMsg({ deleteUser: "Sikeres törlés!" });
    } catch (error) {
      setMsg({ err: error.message });
    }
  };

  const updateCredentials = async (displayName, photoURL) => {
    try {
      if (displayName && photoURL)
        await updateProfile(auth.currentUser, { displayName, photoURL });
      else if (displayName)
        await updateProfile(auth.currentUser, { displayName });
      else if (photoURL) await updateProfile(auth.currentUser, { photoURL });

      setMsg({});
      setMsg({ update: "Sikeres módosítás!" });
    } catch (error) {
      setMsg({ err: error.message });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signInUser,
        logOut,
        signUpUser,
        msg,
        setMsg,
        resetPassword,
        deleteAccount,
        updateCredentials,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
