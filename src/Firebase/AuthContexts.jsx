import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

import { reset, setData } from "../redux/user_reducer";
import { useDispatch } from "react-redux";

const AuthContext = React.createContext();

export const AuthContexts = ({ children }) => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setLoading] = useState(true);

  const signUp = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then((res) =>
      console.log(res.user.uid)
    );
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async (id) => {
    try {
      if (id) {
        const docRef = doc(db, "users", id);
        await updateDoc(docRef, { isLoggedIn: false });
        dispatch(reset());
      }
    } catch (err) {
      console.error(err);
    }
    return signOut(auth);
  };

  const sendPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          const userDetails = collection(db, "users");
          const q = query(userDetails, where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);
          if (querySnapshot.docs.length != 0) {
            const data = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            dispatch(setData(data[0]));
          }
        }
      } catch (err) {
        console.error(err);
      }
      setCurrentUser(user);
    });
    setLoading(false);

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    logout,
    sendPasswordReset,
    signInWithGoogle,
  };
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
