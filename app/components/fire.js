import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcGFhLRzZrZVq9hu2W20efDOzt6nPK8o0",
  authDomain: "tatsupopopo-react.firebaseapp.com",
  projectId: "tatsupopopo-react",
  storageBucket: "tatsupopopo-react.firebasestorage.app",
  messagingSenderId: "826305947550",
  appId: "1:826305947550:web:cd8fb90340316be3eb988f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
