import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyCOg5gACeT40Eo0cc-g4t9fHzHc_MB7kgM",
  authDomain: "ntst-e6c04.firebaseapp.com",
  projectId: "ntst-e6c04",
  storageBucket: "ntst-e6c04.firebasestorage.app",
  messagingSenderId: "9797160324",
  appId: "1:9797160324:web:26e45f8fa666b9e97621d1"

};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);