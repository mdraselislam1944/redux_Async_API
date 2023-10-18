import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAb-DhZTpMaHPYSo6bNnP6w5tMimw6sPIY",
  authDomain: "bistro-boss-auth-f754e.firebaseapp.com",
  projectId: "bistro-boss-auth-f754e",
  storageBucket: "bistro-boss-auth-f754e.appspot.com",
  messagingSenderId: "751209494296",
  appId: "1:751209494296:web:573d9c6e27297bfe3ad06d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export default app;

const auth = getAuth(app);

export default auth;