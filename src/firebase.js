// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBkYPs5qcPIBMR_N7TCgA0FiOV_a8ZFxYs',
  authDomain: 'flappybirdnft-4d8ed.firebaseapp.com',
  projectId: 'flappybirdnft-4d8ed',
  storageBucket: 'flappybirdnft-4d8ed.appspot.com',
  messagingSenderId: '852268210204',
  appId: '1:852268210204:web:464f2213a92bb4389067d9',
  measurementId: 'G-NZ0FT7YYVD',
  databaseURL: 'https://flappybirdnft-4d8ed-default-rtdb.firebaseio.com/',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const db = getDatabase(app)
