import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCGjynQULi8g3-o9YiyyMRqtZJocJrb0rU",
  authDomain: "vbox-store.firebaseapp.com",
  projectId: "vbox-store",
  storageBucket: "vbox-store.firebasestorage.app",
  messagingSenderId: "416888897534",
  appId: "1:416888897534:web:549324ae408988e88f4aaf",
  measurementId: "G-0PL2Z5MPK1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);