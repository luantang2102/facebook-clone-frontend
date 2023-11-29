import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBQptJ1fB4qDdSGoQscsT9iuUBmX8IWxfA",
  authDomain: "facebook-clone-87933.firebaseapp.com",
  projectId: "facebook-clone-87933",
  storageBucket: "facebook-clone-87933.appspot.com",
  messagingSenderId: "505131426122",
  appId: "1:505131426122:web:24e24ec055ee596e0961b3",
  measurementId: "G-X9EHTPRK29"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);