import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

const trackerContext = createContext(null);

export const TrackerProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const signup = async ({ name, email, password, monthlyBudget }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      monthlyBudget: Number(monthlyBudget) || 0,
      createdAt: Date.now(),
    });

    setProfile({
      uid: user.uid,
      name,
      email,
      monthlyBudget: Number(monthlyBudget) || 0,
    });
    setUser(user);

    return res;
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const snap = await getDoc(doc(db, "users", firebaseUser.uid));
        if (snap.exists()) setProfile(snap.data());
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <trackerContext.Provider value={{ user, profile, signup, login, logout }}>
      {!loading && children}
    </trackerContext.Provider>
  );
};

export const useAuth = () => useContext(trackerContext);
