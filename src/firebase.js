import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getIdToken,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let authReadyPromise;

export async function getFirebaseIdToken() {
  if (!authReadyPromise) {
    authReadyPromise = new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, () => {
        unsubscribe();
        resolve();
      });
    });
  }
  await authReadyPromise;
  return auth.currentUser ? getIdToken(auth.currentUser, false) : null;
}

export async function registerWithFirebase({ fullName, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(credential.user, { displayName: fullName });
  return credential.user.getIdToken(true);
}

export async function loginWithFirebase({ email, password }) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user.getIdToken(true);
}
