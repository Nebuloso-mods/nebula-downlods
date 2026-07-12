import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCEa3uN9x4hUMt02DkHIsnyPSmWO9caIzE",
  authDomain: "portal-nebuloso.firebaseapp.com",
  projectId: "portal-nebuloso",
  storageBucket: "portal-nebuloso.firebasestorage.app",
  messagingSenderId: "755593713969",
  appId: "1:755593713969:web:0c3a45cb65061d1457f810"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { app, auth, db, provider };