import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDTWWtjtFUxhMOpXVgE7CSdF4OnzqO1V9c",
  authDomain: "fir-medical-assistant-d0e73.firebaseapp.com",
  projectId: "fir-medical-assistant-d0e73",
  storageBucket: "fir-medical-assistant-d0e73.appspot.com",
  messagingSenderId: "947948487702",
  appId: "1:947948487702:web:6633c5df868922eccc2137",
  measurementId: "G-3DWT0WBRNL"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
