import React, { createContext, useEffect, useState } from "react";
import { auth, generateUserDocument } from "../Firebase/firebase";

export const UserContext = createContext({ user: null });

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(async () => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      const newUser = await generateUserDocument(userAuth);
      setUser(newUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {!loading && children}
    </UserContext.Provider>
  );
}
export default UserProvider;
