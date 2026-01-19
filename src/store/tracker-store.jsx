import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig/firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

const trackerContext = createContext(null);

export const TrackerProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, name = "") => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // if (name) {
    //   await updateProfile(res.user, { displayName: name });
    // }

    await addDoc(collection(db, "users"), {
      uid: res.user.uid,
      email: res.user.email,
      name,
      createdAt: Date.now(),
    });

    return res;
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <trackerContext.Provider value={{ user, signup, login, logout }}>
      {!loading && children}
    </trackerContext.Provider>
  );
};

export const useAuth = () => useContext(trackerContext);
