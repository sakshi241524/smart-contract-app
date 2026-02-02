import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  

const firebaseConfig = {
  apiKey: "AIzaSyBXbsgqs07nR10ziwLVuR18I-Xkw9A1E_E",
  authDomain: "swcp-app-91b5c.firebaseapp.com",
  projectId: "swcp-app-91b5c",
  storageBucket: "swcp-app-91b5c.firebasestorage.app",
  messagingSenderId: "301809525698",
  appId: "1:301809525698:web:0b18b7176faa2447abec5b",
  measurementId: "G-D73J38JHXR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
