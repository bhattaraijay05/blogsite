import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDAX3K8it9U2dudxtCfIRu77paAr4vSkWE",
  authDomain: "yourideass.firebaseapp.com",
  projectId: "yourideass",
  storageBucket: "yourideass.appspot.com",
  messagingSenderId: "172326789029",
  appId: "1:172326789029:web:3f3808e6040245be75524c",
  measurementId: "G-TX0P1M1ZEZ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();
const auth = firebase.auth();

const googleAuth = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const { user } = await auth.signInWithPopup(googleAuth);
  generateUserDocument(user);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt: new Date(
          firebase.firestore.Timestamp.now().seconds * 1000
        ).toLocaleDateString(),
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export { db, auth };

export default firebase;
