import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD9jiDqmlEHdog01dWniZ6WYEYZvpxQM34",
  authDomain: "social-chat-aff34.firebaseapp.com",
  projectId: "social-chat-aff34",
  storageBucket: "social-chat-aff34.appspot.com",
  messagingSenderId: "1018766018210",
  appId: "1:1018766018210:web:38799c00bcd0f83678f9fb",
  measurementId: "G-K4E1KVCF89",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export interface UserInterface {
  authProvider: string;
  name: string;
  email: string;
  uid: string;
  password: string;
  image?: string;
};
export interface User{
  name:string,
  email: string,
  password: string | number,
  photoURL: string,
  uid: string,
  authProvider: string
}