import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBAiAmdmscHdtpyzPWnG-JVAN5d-jStWH4",
  authDomain: "sistema-de-chamado-9ec02.firebaseapp.com",
  projectId: "sistema-de-chamado-9ec02",
  storageBucket: "sistema-de-chamado-9ec02.appspot.com",
  messagingSenderId: "434062976659",
  appId: "1:434062976659:web:1731db8544036b38f50f66",
  measurementId: "G-4BF54S86VL"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage }