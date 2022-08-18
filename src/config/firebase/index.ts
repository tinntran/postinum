import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyATa6XIPMWU1zNPNEecPGsM7Fyp6Xe0rYE',
  authDomain: 'postinum-c041e.firebaseapp.com',
  projectId: 'postinum-c041e',
  storageBucket: 'postinum-c041e.appspot.com',
  messagingSenderId: '690021517895',
  appId: '1:690021517895:web:12e29a2771a77dce44ff62',
  measurementId: 'G-VVZL5SJBK6'
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)

if (window.location.hostname.includes('localhost')) {
  connectAuthEmulator(auth, 'http://localhost:9099')
  connectFirestoreEmulator(db, 'localhost', 8080)
}

export default app
