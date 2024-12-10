import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";

let firebaseApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!
};

const createFirebaseApp = () => {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
  }
  return firebaseApp;
};

const createFirebaseAuth = () => {
  if (!firebaseAuth && typeof window !== "undefined") {
    firebaseAuth = getAuth(createFirebaseApp());
    if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR) {
      connectAuthEmulator(firebaseAuth, process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR, {
        disableWarnings: true,
      });
    }
  }
  return firebaseAuth;
};

firebaseApp = createFirebaseApp();

firebaseAuth = createFirebaseAuth();

export { firebaseApp, firebaseAuth };