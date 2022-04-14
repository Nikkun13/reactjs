import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDn3KtYEDm5Xm3Bf33PxivdORD3nhZokkw",
  authDomain: "backendmoe-7c763.firebaseapp.com",
  projectId: "backendmoe-7c763",
  storageBucket: "backendmoe-7c763.appspot.com",
  messagingSenderId: "134879506451",
  appId: "1:134879506451:web:b4afef666f836ad7180fe6"
};

const app = initializeApp(firebaseConfig);

export const firestoreDb = getFirestore(app)