// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAukVpJV4_iJo3fuuX7ZzK_mN99jrrijwU",
  authDomain: "cart-demo-b1f98.firebaseapp.com",
  projectId: "cart-demo-b1f98",
  storageBucket: "cart-demo-b1f98.firebasestorage.app",
  messagingSenderId: "238828734707",
  appId: "1:238828734707:web:8a4baf1ea7ccc538b48f86",
  measurementId: "G-P25X8SDZ2T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

const analytics = getAnalytics(app);
